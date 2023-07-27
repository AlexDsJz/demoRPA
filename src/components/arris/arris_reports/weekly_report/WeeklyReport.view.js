import React, { useState, useRef } from "react";
import Proptypes from "prop-types";
import { Typeahead } from "react-bootstrap-typeahead";
import { Link, BrowserRouter } from "react-router-dom";
import ModalRoute from "components/helpers/ModalRoute";
import Submissions from "components/arris/arris_reports/weekly_report/Submissions";
import ReasonForm from "components/arris/arris_reports/weekly_report/ReasonForm";
import moment from "moment";

const DailySubmissionsView =({
  failures, 
  reports, 
  search, 
  setSearch, 
  searchRef, 
  selectedReport, 
  setSelectedReport, 
  updateQuery, 
  orderDate, 
  setOrderDate, 
  turnFilters, 
  setTurnFilters, 
  detailFilters, 
  setDetailFilters, 
  path,
  downloadReport, 
  missing, 
  presented, 
  startDate, 
  setStartDate,
  uniqueSupervisors,
  handleSupervisorFilterChange,
  supervisorsFilters
}) => 
  <BrowserRouter basename="/arris/daily_submissions">
    <div class="content container-fluid p-7">

      {selectedReport != null 
        ? <Submissions
            selectedReport={selectedReport}
            setSelectedReport={setSelectedReport}
          /> 
        : null
      }

      {/* Header */}
      <div class="page-header pt-4">
        <div class="row align-items-end">
          <div class="col-sm">
            <h1 class="page-header-title">
              {path == "daily_report" && <>Reporte diario</>}
              {path == "weekly_report" && <>Reporte semanal</>}
              {path == "failure_report" && <>Reportes con fallas</>}
              {path == "not_sent_report" && <>Reportes no enviados</>}
            </h1>
          </div>
          {/* <div class="btn-group ml-3" role="group">
            <a className="btn btn-primary" role="button" onClick={downloadReport}>
              Descargar Reporte
            </a>
          </div> */}
        </div>
      </div>

      <div className="mb-3 mx-1">
        <div className="row">
          <div className="col-md-6 d-flex align-items-center">
            <h4 className="pt-2">Reportes:</h4>
            <h5 className="pt-2 mx-2">{reports.length}</h5>
            <span>
              {presented + missing + failures == 0 ? "" : "("}
              {presented != 0 && <>{presented} enviados</>}
              {missing != 0 && <>{presented == 0 ? "" : ","} {missing} no enviados</>}
              {failures != 0 && <>{presented + failures == 0 ? "" : ","} {failures} con fallas</>}
              {presented + missing + failures == 0 ? "" : " )"}
            </span>
          </div>
          <div className="col-md-4 d-flex justify-content-end">
            {path == "daily_report" || path == "weekly_report" 
              ? <>
                <div class="form-group form-group-default mx-2 my-auto w-50">
                  <label class="control-label">
                    {path == "daily_report" ? "Día" : "Semana"}
                  </label>
                  <input 
                    type="date" 
                    name="startDate" 
                    class="form-control" 
                    value={startDate}
                    onChange={e => {
                      let selectedDate = moment(e.target.value).format("YYYY-MM-DD");
                      setStartDate(selectedDate);
                      updateQuery(turnFilters, detailFilters, "ASC", selectedDate, supervisorsFilters);
                    }}/>
                </div>
              </>
              : null
            }            
          </div>
          <div className="col-md-2 d-flex">
            <div className="float-right my-auto">
              <Typeahead
                id="menu"
                ref={searchRef}
                placeholder="Buscar Grúas"
                onInputChange={setSearch}
                labelKey={(report) => 
                  `${report.crane.series} - ${report.crane.model} ${report.crane.number}`
                }
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
          <div className="d-flex flex-row align-items-center" style={{marginTop: "-10px", marginBottom: "-10px"}}>
            <span>Fecha</span>   
            <div className="mx-1">
              <button type="button" className={`btn btn-text mx-1 px-0 ${orderDate == "ASC" ? "text-primary" : ""}`}
                onClick={() => {
                  setOrderDate("ASC");
                  updateQuery(turnFilters, detailFilters, "ASC", startDate, supervisorsFilters);
                }}
              >
                <i className="fa fa-arrow-up"></i>
              </button>
              <button type="button" className={`btn btn-text mx-1 px-0 ${orderDate == "DESC" ? "text-primary" : ""}`}
                onClick={() => {
                  setOrderDate("DESC");
                  updateQuery(turnFilters, detailFilters, "DESC", startDate, supervisorsFilters);
                }}
              >
                <i className="fa fa-arrow-down"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-1 p-2">
          Modelo
        </div>
        <div className="col-md-1 p-2">
          Serie
        </div>
        <div className="col-md-2 p-2">
          Operador
        </div>
        <div className="col-md-2 p-2">
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
                {uniqueSupervisors.map((supervisor, index) => (
                  <div class="dropdown-item" key={index}>
                    <input type="checkbox" id="filterS" name="filterS" 
                      defaultChecked={supervisor.user.id}
                      onChange={(event) => handleSupervisorFilterChange(event, supervisor.user.id)}/>
                    <label className="px-2 align-middle" for="filterS">
                      <h5>{supervisor.user.firstName}</h5>
                    </label>
                  </div>
                ))}
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-1 p-2 text-center pr-4">
          <div class="dropdown" style={{marginTop: "-10px", marginBottom: "-10px"}}>

            <a class="btn btn-link dropdown-toggle" 
              href="#" 
              role="button" 
              id="turnDropdown" 
              data-toggle="dropdown" 
              aria-haspopup="true" 
              aria-expanded="false"
              style={{color: "#677788"}}>
                Turno
            </a>

            <div class="dropdown-menu" aria-labelledby="turnDropdown">
              <form>

                <div class="dropdown-item">
                  <input type="checkbox" id="filter1" name="filter1" defaultChecked={turnFilters["FIRST"]}
                    onChange={(e) => {
                      setTurnFilters({...turnFilters, "FIRST": e.target.checked});
                      updateQuery({...turnFilters, "FIRST": e.target.checked}, detailFilters, orderDate, startDate, supervisorsFilters);
                    }}/>
                  <label className="px-2 align-middle" for="filter1">
                    <h5>Primero</h5>
                  </label>
                </div>

                <div class="dropdown-item">
                  <input type="checkbox" id="filter2" name="filter2" defaultChecked={turnFilters["SECOND"]}
                    onChange={(e) => {
                      setTurnFilters({...turnFilters, "SECOND": e.target.checked});
                      updateQuery({...turnFilters, "SECOND": e.target.checked}, detailFilters, orderDate, startDate);
                    }}/>
                  <label className="px-2 align-middle" for="filter2">
                    <h5>Segundo</h5>
                  </label>
                </div>

              </form>
            </div>

          </div>
        </div>
        <div className="col-md-2 p-2 text-center pr-4">     
          <a 
            class="btn btn-link"
            href="#" 
            role="button" 
            id="detailsDropdown" 
            data-toggle="dropdown" 
            aria-haspopup="true" 
            aria-expanded="false"
            style={{color: "#677788"}}
          >
              Estado
          </a>
        </div>
        <div className="col-md-2 p-2">
        </div>
      </div>

      <div style={{height: "60vh", overflowY: "auto", overflowX: "hidden"}}>
        {
          function(){

            let lastDate = null;
            let lastOperator = null;
            let components = [];

            reports.forEach((report, index) => {
              
              let reportDate = moment(report.date).format("DD/MM/YYYY");
              let reportOperator = `${report.operator.first_name} ${report.operator.last_name}`;
              let group = true;

              if(lastDate != reportDate || lastOperator != reportOperator) group = false;

              if(lastDate == null && lastOperator == null) {
                lastDate = reportDate;
                lastOperator = reportOperator;
              }
              
              components.push(
                <div 
                  className={
                    "row mx-1 align-items-center border-right border-left " + 
                    (group ? "" : "border-top ") + 
                    (index == reports.length - 1 ? "border-bottom" : "")
                  } 
                  key={index}
                >
                  <div className="col-md-1 p-2">
                    {group ? "" : reportDate}
                  </div>
                  <div className="col-md-1 p-2">
                    {group ? "" : report.crane.model + report.crane.number}
                  </div>
                  <div className="col-md-1 p-2">
                    {group ? "" : report.crane.series}
                  </div>
                  <div className="col-md-2 p-2">
                    {group ? "" : (report.operator.turn == "FIRST" || report.operator.turn == "SECOND" ? reportOperator : null)}
                  </div>
                  <div className="col-md-2 p-2">
                    {group ? "" : report.supervisor_name}
                  </div>
                  <div className="col-md-1 p-2 text-center">
                    {report.operator.turn == "FIRST" ? "1er turno" : report.operator.turn == "SECOND" ? "2do turno" : ""}
                  </div>
                  <div className="col-md-2 p-2 text-center">
                    {
                      report.status != "MISSING" && (
                        report.failures.filter(failure => failure.status != "SOLVED").length > 0 
                          ? <div className="custom-badge mb-2" style={{backgroundColor: "#F46471"}}>
                              Con fallas
                            </div>
                          : <div className="custom-badge mb-2" style={{backgroundColor: "#777"}}>
                              Enviado
                            </div>
                      )
                    }
                    {
                      report.status == "MISSING" && 
                        <div className="custom-badge mb-2" style={{backgroundColor: "#FFA823"}}>
                          No enviado
                        </div>
                    }
                  </div>
                  <div className="col-md-2 p-2">
                    <div className="row px-5">
                      <span
                        className={`btn-primary btn`} 
                        role="button" 
                        onClick={() => { setSelectedReport(report) }}>
                          Ver detalles
                      </span>
                    </div>
                  </div>
                </div>
              );

              lastDate = reportDate;
              lastOperator = reportOperator;

            });

            return components;

          }()
        }
      </div>
      
      <ModalRoute
        path="/justify"
        width={500}
        height={350}
        component={({ location }) => 
          <ReasonForm updateQuery={updateQuery} location={location} />
        }/>

    </div>
  </BrowserRouter>;

DailySubmissionsView.propTypes = {
  path: Proptypes.string,
  failures: Proptypes.number,
  missing: Proptypes.number,
  presented: Proptypes.number,
  reports: Proptypes.array,
  search: Proptypes.string,
  setSearch: Proptypes.func,
  searchRef: Proptypes.object,
  selectedReport: Proptypes.object,
  setSelectedReport: Proptypes.func,
  updateQuery: Proptypes.func,
  orderDate: Proptypes.string,
  setOrderDate: Proptypes.func,
  turnFilters: Proptypes.array,
  setTurnFilters: Proptypes.func,
  detailFilters: Proptypes.array,
  setDetailFilters: Proptypes.func,
  downloadReport: Proptypes.func,
  startDate: Proptypes.string,
  setStartDate: Proptypes.func,
};

export default DailySubmissionsView;