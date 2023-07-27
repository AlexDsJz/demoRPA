import React, { useState, useRef, useEffect } from "react";
import View from "components/arris/arris_reports/weekly_report/WeeklyReport.view";
import { useGet, useGetCall, usePost } from "seed/api";
import { API_URL } from "settings";
import { mapArrisCraneStatus, mapArrisOperatorTurn } from "components/utils/enum_mapper";
import { downloadCSV } from "components/utils/file";
import moment from "moment";
import { useQuery } from "seed/gql";
import { useHistory } from "react-router";
import { Loading } from "seed/helpers";

const getStartDate = (path) => {

  if(path == "daily_report") return moment().format("YYYY-MM-DD");

  const date = new Date();
  const day = date.getDay();
  const diff = date.getDate() - day + 1;
  return moment(new Date(date.setDate(diff))).format("YYYY-MM-DD");

}

const DailySubmissions = () => {

  const history = useHistory();
  const path = history.location.pathname.split("/").at(-1);

  const searchRef = useRef(null);
  const [search, setSearch] = useState("");
  const [reports, setReports] = useState([]);
  const [missing, setMissing] = useState(0);
  const [presented, setPresented] = useState(0);
  const [failures, setFailures] = useState(0);
  const [selectedReport, setSelectedReport] = useState(null);
  const [startDate, setStartDate] = useState(getStartDate(path));
  const [supervisorFilters, setSupervisorFilters] = useState([]);
  const [orderDate, setOrderDate] = useState("DESC");
  const [turnFilters, setTurnFilters] = useState({
    "FIRST": true,
    "SECOND": true
  });
  const [detailFilters, setDetailFilters] = useState({
    "DAILY": path == "daily_report",
    "FAILURES": path == "weekly_report" || path == "failure_report" || path == "daily_report",
    "NOT_FAILURES": path == "weekly_report" || path == "daily_report" || path == "not_sent_report",
    "COMPLETE": path == "weekly_report" || path == "daily_report" || path == "failure_report",
    "NOT_COMPLETE": path == "weekly_report" || path == "not_sent_report" || path == "daily_report",
  });

  const getDetailsFilters = (details) =>
    Object.keys(details).filter(key => details[key]).join(",");

  const updateQuery = async (turns, details, filteredDate, date, filtersSup) => {

    const filteredTurns = Object.keys(turns).filter(key => turns[key]).join(",");
    const filteredDetails = getDetailsFilters(details);
    const filteredSupervisors = filtersSup ? filtersSup.join(",") : supervisorFilters;

    const query = `?turns=${filteredTurns}&details=${filteredDetails}&order_date=${filteredDate}&date=${date}&supervisors=${filteredSupervisors}`;

    const req = await fetch(API_URL + "/arris_operators/get_weekly_report/" + query, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Token ${sessionStorage.getItem("token")}`
      },
    });

    const res = await req.json();

    if(res.loading) return <Loading/>;

    setReports(res.reports);
    setMissing(res.missing_reports);
    setPresented(res.presented_reports);
    setFailures(res.failures_reports);

  };

  const reqWeeklyReport = useGet("/arris_operators/get_weekly_report", {
    turns: "FIRST,SECOND",
    details: getDetailsFilters(detailFilters),
    order_date: "DESC",
    date: startDate,
  }, {
    onCompleted: (data) => {
      setReports(data.reports);
      setMissing(data.missing_reports);
      setPresented(data.presented_reports);
      setFailures(data.failures_reports);
    }
  });  
  
  const qSupervisors = useQuery(`
    {
      arrisOperators{
        id
        turn
        user {
          id
          firstName
        }
      }
    }`,
    "turn = SECURITY"
  );

  useEffect(() => {
    if (qSupervisors.data) {
      const securityAdminUsers = qSupervisors.data.arrisOperators ?? [];
      const securityAdminIds = securityAdminUsers.map((operator) => operator.user.id);
      setSupervisorFilters(securityAdminIds);
      if (securityAdminIds.length > 0) {
        updateQuery(turnFilters, detailFilters, orderDate, startDate, securityAdminIds);
      }
    }
  }, [qSupervisors.data]);

  if (reqWeeklyReport.loading) return <Loading/>;
  if (qSupervisors.loading) return <Loading />;
  if (qSupervisors.error) return "Error";

  const supervisors = qSupervisors.data.arrisOperators

  const handleSupervisorFilterChange = (event, supervisorId) => {
    const { checked } = event.target;
    let updatedFilters = [];
    if (checked) {
      updatedFilters = [...supervisorFilters, supervisorId];
    } else {
      updatedFilters = supervisorFilters.filter((filter) => filter !== supervisorId);
    }
    setSupervisorFilters(updatedFilters);
    updateQuery(turnFilters, detailFilters, orderDate, startDate, updatedFilters);
  };
  
  const downloadReport = () => {
    let headers = [
      "Fecha", 
      "Modelo", 
      "Serie", 
      "Operador", 
      "Turn", 
      "Evidencias", 
      "Fallas", 
      "Bitácora", 
      "Actividades", 
      "Justificación"
    ];
    let rows = reports.map(report => [
      report.date,
      report.crane.model + report.crane.number,
      report.crane.series,
      report.operator.first_name + " " + report.operator.last_name,
      mapArrisOperatorTurn(report.operator.turn),
      '"' + report.evidences.map(evidence => evidence.file.url).join("\n") + '"',
      '"' + report.failures.join("\n") + '"',
      '"' + report.binnacle.map(binnacle => binnacle.type + " - " + binnacle.name + " => " 
        + mapArrisCraneStatus(binnacle.status)).join("\n") + '"',
      report.activity
    ]);
    downloadCSV([], headers, rows, "envios_diarios_" + moment().format("YYYY-MM-DD"));
  };

  const uniqueSupervisors = supervisors.filter((supervisor, index) => {
    const firstIndexOfUser = supervisors.findIndex(
      (s) => s.user.id === supervisor.user.id
    );
    return index === firstIndexOfUser;
  });

  return <View 
    path={path}
    failures={failures}
    missing={missing}
    presented={presented}
    reports={reports}
    search={search}
    setSearch={setSearch}
    searchRef={searchRef}
    selectedReport={selectedReport}
    setSelectedReport={setSelectedReport}
    updateQuery={updateQuery}
    turnFilters={turnFilters}
    setTurnFilters={setTurnFilters}
    detailFilters={detailFilters}
    setDetailFilters={setDetailFilters}
    orderDate={orderDate}
    setOrderDate={setOrderDate}
    downloadReport={downloadReport}
    startDate={startDate}
    setStartDate={setStartDate}
    uniqueSupervisors={uniqueSupervisors}
    handleSupervisorFilterChange={handleSupervisorFilterChange}
    supervisorFilters={supervisorFilters}
  />;

}

DailySubmissions.propTypes = {};

export default DailySubmissions;
