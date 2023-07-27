import React, { useState, useRef, useEffect } from "react";
import View from "components/arris/arris_reports/FailuresReport.view";
import { useGet, usePost } from "seed/api";
import { downloadCSV } from "components/utils/file";
import { mapArrisFailureStatus, mapArrisOperatorTurn } from "components/utils/enum_mapper";
import moment from "moment";
import { Loading } from "seed/helpers";
import { API_URL } from "settings";

const FailuresReport = () => {

  const searchRef = useRef(null);
  const [search, setSearch] = useState("");
  const [reports, setReports] = useState([]);
  const [supervisorFilter, setSupervisorFilter] = useState([]);
  const [statusFilters, setStatusFilters] = useState({
    "REPORTED": true,
    "ASSIGNED": true,
    "SOLVED": true,
  });

  const [callUpdateStatus, qUpdateStatus] = usePost("/arris_failures/update_status", {});
  const failuresReports = useGet("/arris_operators/get_failures_report", {})
  


  const updateQuery = async (filtersSup, status) => {
    const filteredSupervisors = filtersSup ? filtersSup.join(",") : supervisorFilter;
    const filteredStatus = Object.keys(status).filter(key => status[key]).join(",");

    const query = `?supervisors=${filteredSupervisors}&status=${filteredStatus}`;

    const req = await fetch(API_URL + "/arris_operators/get_failures_report/" + query, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Token ${sessionStorage.getItem("token")}`
      },
    });
    
    if(req.loading) return "Cargando";
    
    const res = await req.json();

    setReports(res.failures);
  };

  const reqSupervisors = useGet("/arris_operators/get_supervisors",{},{
    onCompleted: (data) => {
      updateQuery(data.map((supervisor) => supervisor.id), statusFilters);
    }
  });

  useEffect(() => {
    if (reqSupervisors.data) {
      const supervisorIds = reqSupervisors.data.map((supervisor) => supervisor.id);
      setSupervisorFilter(supervisorIds);
      updateQuery(supervisorIds, statusFilters);
    }
  }, [reqSupervisors.data]);

  if(reqSupervisors.loading) return <Loading />;
  if(failuresReports.loading) return <Loading />;

  const supervisors = reqSupervisors?.data;

  const handleSupervisorFilterChange = (event, supervisorId) => {
    const { checked } = event.target;
    let updatedFilters = [];
    if (checked) {
      updatedFilters = [...supervisorFilter, supervisorId];
    } else {
      updatedFilters = supervisorFilter.filter((filter) => filter !== supervisorId);
    }
    setSupervisorFilter(updatedFilters);
    updateQuery(updatedFilters, statusFilters);
  };

  const onSetStatus = (failure, status) =>
    callUpdateStatus({
      failure_id: failure.id,
      status: status
    });

  const downloadReport = () => {
    let notes = ["Fallas: " + reports.length];
    let headers = ["Modelo", "Serie", "Cliente", "Operador", "Turno", "Seguridad", "Falla", "Estado", "Resuelta por"];
    let rows = reports.map((report) => [
      report.crane.model + report.crane.number,
      report.crane.series,
      report.order.client,
      report.operator.first_name + " " + report.operator.last_name,
      mapArrisOperatorTurn(report.operator.turn),
      report.security != null 
        ? report.security.first_name + " " + report.security.last_name 
        : "Sin asignar",
      report.failure.description,
      // report.failure.solution,
      mapArrisFailureStatus(report.failure.status),
      report.failure.reported_solved != null 
        ? report.failure.reported_solved.user.first_name + " " + report.failure.reported_solved.user.last_name 
        : ""
    ]);
    downloadCSV(notes, headers, rows, "reporte_fallas" + moment().format("DD_MM_YYYY"));
  };

  return <View 
    search={search}
    reports={reports}
    searchRef={searchRef}
    setSearch={setSearch}
    supervisors={supervisors}
    updateQuery={updateQuery}
    onSetStatus={onSetStatus}
    statusFilters={statusFilters}
    downloadReport={downloadReport}
    setStatusFilters={setStatusFilters}
    supervisorFilter={supervisorFilter}
    handleSupervisorFilterChange={handleSupervisorFilterChange}
  />

}

FailuresReport.propTypes = {};

export default FailuresReport;
