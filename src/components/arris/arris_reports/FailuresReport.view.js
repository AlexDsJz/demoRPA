import React, { useState, useRef } from "react";
import Proptypes from "prop-types";
import { Link, BrowserRouter } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import { mapArrisFailureStatus, mapArrisFailureStatusColor } from "components/utils/enum_mapper";
import EvidencesFailure from "components/arris/arris_reports/EvidencesFailure";
import { ModalRoute } from "seed/helpers";

const FailuresReportView = ({ 
  reports, 
  search, 
  setSearch, 
  searchRef, 
  downloadReport, 
  onSetStatus,
  supervisors,
  handleSupervisorFilterChange,
  setStatusFilters,
  statusFilters,
  supervisorFilter,
  updateQuery
}) => (
<BrowserRouter basename = "/ariss/failures_report">
  <div class="content container-fluid p-7">

    {/* Header */}
    <div class="page-header pt-4">
      <div class="row align-items-end">
        <div class="col-sm">
          <h1 class="page-header-title">Control de Fallas</h1>
        </div>
        <div class="btn-group ml-3" role="group">
          <a className="btn btn-primary" role="button" onClick={downloadReport}>
            Descargar Reporte
          </a>
        </div>
      </div>
    </div>

    <div className="mb-3 mx-1">
      <div className="row">
      <div className="col-md-6 d-flex align-items-center">
        <h4 className="pt-2">Fallas:</h4>
        <h5 className="pt-2 mx-2">{reports.filter(report => report.failure.status != "SOLVED").length}</h5>
      </div>
      <div className="col-md-6">
        <div className="float-right">
          <Typeahead
            id="menu"
            ref={searchRef}
            placeholder="Buscar Grúas"
            onInputChange={setSearch}
            labelKey={(report) => `${report.crane.series} - ${report.crane.model} ${report.crane.number}`}
            onChange={(selected) => (selected != null && selected.length) > 0 
              ? setSearch(selected[0].crane.series) 
              : ""
            }
            options={reports}
          >
            <div className="rbt-aux">
              {search.length == 0 && <i className="fa fa-search rbt-aux"></i>}
              {search.length > 0 && <i className="fa fa-times rbt-close text-danger" 
                style={{paddingTop: "4px"}} role="button" onClick={() => {
                  searchRef.current.clear()
                  setSearch("")
                }}></i>}
            </div>
          </Typeahead>
          </div>
        </div>
      </div>
    </div>

    <div className="row border font-weight-bold mx-1 align-items-center">
      <div className="col-md-1 p-2">
        Modelo
      </div>
      <div className="col-md-1 p-2">
        Serie
      </div>
      <div className="col-md-1 p-2">
        Cliente
      </div>
      <div className="col-md-2 p-2">
        Operador
      </div>
      <div className="col-md-1" style = {{marginLeft: "-1vw"}}>	
        <div class="dropdown" style={{marginTop: "-10px", marginBottom: "-10px"}}>
          <a class="btn btn-link dropdown-toggle"
            href="#"
            role="button"
            id="supDropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{color: "#677788"}}>
              Supervisor
          </a>
          <div class="dropdown-menu" aria-labelledby="supDropdown">
            <form>
              {supervisors.map((supervisor, index) => (
                <div class="dropdown-item" key={index}>
                  <input type="checkbox" id="filterS" name="filterS" 
                    defaultChecked={supervisor.id} 
                    onChange={(event) => handleSupervisorFilterChange(event, supervisor.id)}
                    />
                  <label className="px-2 align-middle" for="filterS">
                    <h5>{supervisor.first_name}</h5>
                  </label>
                </div>
              ))}
            </form>
          </div>
        </div>
      </div>
      <div className="col-md-2 p-2 text-center"  style = {{marginLeft: "1vw"}}>
        Falla
      </div>
      <div className="col-md-2 p-2 text-center">
        <div class="dropdown" style={{marginTop: "-10px", marginBottom: "-10px"}}>

          <a class="btn btn-link dropdown-toggle" 
            href="#" 
            role="button" 
            id="turnDropdown" 
            data-toggle="dropdown" 
            aria-haspopup="true" 
            aria-expanded="false"
            style={{color: "#677788"}}>
              Estado
          </a>

          <div class="dropdown-menu" aria-labelledby="turnDropdown">
            <form>
              <div class="dropdown-item">
                <input type="checkbox" id="filter1" name="filter1" defaultChecked={statusFilters["REPORTED"]}
                  onChange={(e) => {
                    setStatusFilters({...statusFilters, "REPORTED": e.target.checked});
                    updateQuery(supervisorFilter, {...statusFilters, "REPORTED": e.target.checked});
                  }}/>
                <label className="px-2 align-middle" for="filter1">
                  <h5>Reportado</h5>
                </label>
              </div>
              <div class="dropdown-item">
                <input type="checkbox" id="filter2" name="filter2" defaultChecked={statusFilters["ASSIGNED"]}
                  onChange={(e) => {
                    setStatusFilters({...statusFilters, "ASSIGNED": e.target.checked});
                    updateQuery(supervisorFilter, {...statusFilters, "ASSIGNED": e.target.checked});
                  }}/>
                <label className="px-2 align-middle" for="filter2">
                  <h5>Asignado</h5>
                </label>
              </div>
              <div class="dropdown-item">
                <input type="checkbox" id="filter3" name="filter3" defaultChecked={statusFilters["SOLVED"]}
                  onChange={(e) => {
                    setStatusFilters({...statusFilters, "SOLVED": e.target.checked});
                    updateQuery(supervisorFilter, {...statusFilters, "SOLVED": e.target.checked});
                  }}/>
                <label className="px-2 align-middle" for="filter3">
                  <h5>Resuelto</h5>
                </label>
              </div>
            </form>
          </div>

        </div>
      </div>
      <div className="col-md-2 p-2 text-center">
        Acciones
      </div>
    </div>
    
    <div style={{"height": "60vh", "overflow": "hidden auto"}}>
    {reports.map((report, index) => 
      `${report.crane.series} - ${report.crane.model} ${report.crane.number}`.includes(search) &&
        <div className="row border mx-1 text-reset" key={index}>
          <div className="col-md-1 p-2">
            {report.crane.model}{report.crane.number}
          </div>
          <div className="col-md-1 p-2">
            {report.crane.series}
          </div>
          <div className="col-md-1 p-2">
            {report.order.client}
          </div>
          <div className="col-md-2 p-2">
            {report.operator.first_name} {report.operator.last_name}
          </div>
          <div className="col-md-1 p-2">
            {report.security != null ? report.security.first_name + " " + report.security.last_name : "Sin asignar"}
          </div>
          <div className="col-md-2 p-2 text-center">
            {report.failure.description}
          </div>
          <div className="col-md-2 p-2 mt-1">
            <div className="d-flex justify-content-center align-items-center">
              <select 
                className="custom-badge-select border-0" 
                style={{backgroundColor: mapArrisFailureStatusColor(report.failure.status)}}
                defaultValue={report.failure.status} 
                onChange={(e) => onSetStatus(report.failure, e.target.value)}
              >
                <option value="REPORTED">Reportada</option>
                <option value="ASSIGNED">Asignada</option>
                <option value="SOLVED">Resuelta</option>
              </select>
            </div>
            <div className="custom-badge" >
              {mapArrisFailureStatus(report.failure.status)}
            </div>
          </div>
          <div className="col-md-2 p-2 text-center">
            <Link to = {`/${report.failure.id}`}>
              <button className="btn-secondary px-3 py-1 ml-2">
                Ver evidencias
              </button>
            </Link>
          </div>
        </div>
    )}
    </div>

  </div>

  <ModalRoute
    path="/:failure_id"
    width={800}
    height={600}
    component={EvidencesFailure}
  />

</BrowserRouter>
);

FailuresReportView.propTypes = {
  reports: Proptypes.array,
  search: Proptypes.string,
  setSearch: Proptypes.func,
  searchRef: Proptypes.object,
  downloadReport: Proptypes.func,
  onSetStatus: Proptypes.func,
  supervisors: Proptypes.array,
  handleSupervisorFilterChange: Proptypes.func,
  statusFilters: Proptypes.object,
  setStatusFilters: Proptypes.func,
  supervisorFilter: Proptypes.object,
  updateQuery: Proptypes.func,
};

export default FailuresReportView;
