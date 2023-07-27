import React, { useState, useRef } from "react";
import View from "components/cranes/Cranes.view";
import { useHistory } from "react-router";
import { useQuery } from "seed/gql";
import { Loading } from "seed/helpers";
import Error from "components/helpers/Error";
import { downloadCSV } from "components/utils/file";
import { mapCraneStatus } from "components/utils/enum_mapper";
import moment from "moment";

const buildReport = (cranes) => {

  let report = [];

  cranes.forEach((crane) => {

    let activeOrder = {};
    let segurity = {};

    if(crane.orders != null && crane.orders.length > 0) {
      let orders = [...crane.orders];
      orders.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
      activeOrder = orders[0]; 
    }

    if(crane.inUse && activeOrder.status != "FINISHED") {

      if(activeOrder.arrisOperators != null && activeOrder.arrisOperators.length > 0) {
        let arrisOperators = [...activeOrder.arrisOperators];
        arrisOperators.forEach((operator) => {
          if(operator.turn == "SECURITY") 
            segurity = {...operator};
        });
      }
  
      report.push({
        crane: crane,
        activeOrder: activeOrder,
        segurity: segurity
      });

    }
    
  });

  return report;

}

const Cranes = () => {

  const rol = sessionStorage.getItem("rol")
  if(rol != "ADMIN") window.location.replace("/login");

  const searchRef = useRef(null);
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [created, setCreated] = useState(false);

  const [inUseFilters, setInUseFilters] = useState({
    "true": true,
    "false": true
  });
  const [ownerFilters, setOwnerFilters] = useState({
    "GROKE": true,
    "RENTED": true,
    "SOLD": false
  });
  const [statusFilters, setStatusFilters] = useState({
    // "NA": true,
    "COMMERCIAL": true,
    "CLOSED": true,
    "RELOCATED": true,
    "MOUNTING": true,
    "DISASSEMBLY": true,
    "CONSTRUCTION": true
  });
  const [orderStatusFilters, setOrderStatusFilters] = useState({
    "CREATED": true,
    // "CHARGING": true,
    // "TRAVELING": true,
    // "RECEIVED": true,
    "IN_BUILDING": true,
    // "RETURNED": true,
    // "FINISHED": false,
  });

  const qCranes = useQuery(`{
    cranes {
      inUse
      status
      model
      series
      number
      orders {
        createdAt
        clientName 
        buildingState
        buildingCity
        buildingStreet
        arrisOperators {
          turn
          user {
            firstName
            lastName
            email
          }
        }
      }
    }
    commercialCount: craneCount(query:"status=COMMERCIAL") {
      count
    }
    closedCount: craneCount(query:"status=CLOSED") {
      count
    }
    relocatedCount: craneCount(query:"status=RELOCATED") {
      count
    }
    mountingCount: craneCount(query:"status=MOUNTING") {
      count
    }
    disassemblyCount: craneCount(query:"status=DISASSEMBLY") {
      count
    }
  }`);

  if(qCranes.loading) return <Loading/>;
  if(qCranes.error) return <Error/>;

  const { 
    cranes,
    commercialCount = { count: 0 },
    closedCount = { count: 0 },
    relocatedCount = { count: 0 },
    mountingCount = { count: 0 },
    disassemblyCount = { count: 0 }
  } = qCranes.data;

  const handleChange = (value) =>
    setSearch(value);

  const onClose = () => {    
    setCreated(false);
    history.goBack();
    document.location.href = "/cranes";
  };

  const downloadReport = () => {
    
    let reports = buildReport(cranes);
    let notes = ["Comercial: " + commercialCount.count, "Clausuradas: " + closedCount.count, 
      "Reubicación: " + relocatedCount.count, "Montaje:" + mountingCount.count, 
      "Desmontaje: " + disassemblyCount.count];    

    let headers = ["Modelo", "Serie", "Cliente", "Ubicación", "Seguridad", "Estado"];

    let rows = reports.map((report) => [
      report.crane.model + report.crane.number,
      report.crane.series,
      report.activeOrder.clientName,
      report.activeOrder.buildingState + " " + report.activeOrder.buildingCity + " " 
        + report.activeOrder.buildingStreet,
      report.segurity.user ? report.segurity.user.firstName + " " + report.segurity.user.lastName : "Sin asignar",
      mapCraneStatus(report.crane.status)
    ]);

    downloadCSV(notes, headers, rows, "reporte_semanal_" + moment().format("DD_MM_YYYY"));

  };

  return <View 
    orderStatusFilters={orderStatusFilters}
    setOrderStatusFilters={setOrderStatusFilters}
    searchRef={searchRef}
    cranes={cranes}
    search={search}
    inUseFilters={inUseFilters}
    setInUseFilters={setInUseFilters}
    statusFilters={statusFilters}
    setStatusFilters={setStatusFilters}
    ownerFilters={ownerFilters}
    setOwnerFilters={setOwnerFilters}
    handleChange={handleChange}
    created={created}
    setCreated={setCreated}
    onClose={onClose}
    commercialCount={commercialCount.count}
    closedCount={closedCount.count}
    relocatedCount={relocatedCount.count}
    mountingCount={mountingCount.count}
    disassemblyCount={disassemblyCount.count}
    downloadReport={downloadReport}
    qCranes={qCranes}
  />;

}

Cranes.propTypes = {};

export default Cranes;