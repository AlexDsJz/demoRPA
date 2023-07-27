
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { PaginationFooter } from "seed/helpers"
import { Typeahead } from "react-bootstrap-typeahead";

const MaintenanceListView = ({
  cranes = [],
  searchRef,
  search,
  handleChange,
  maintenances,
  pageNum = 1,
  totalPages = 0,
  onClickPage = () => { },
  activeMaintenanceExist,
  updateStatus,
  setShowOnlyActiveMaintenances,
  showOnlyActiveMaintenances,
  redirectToCategories,
  redirectToResponsibles
}) =>
  <div>

    <div style={{ height: "65vh", overflowY: "auto", overflowX: "hidden" }}>
      {maintenances.map((maintenance, idx) =>
        <div className="row border mx-1 text-reset" key={maintenance.id}
          style={{ background: idx % 2 == 0 ? "#fff" : "#f5f5f5" }}>

          <div className="col-md-2 p-2 text-center">
            {maintenance.crane.series + " / " + maintenance.crane.model + maintenance.crane.number}
          </div>

          <div className="col-md-2 p-2 text-center">
            {maintenance.type == "NORMAL" ? "Normal" : maintenance.type == "FINAL" ? "Supervisor" : "Final"}
          </div>

          <div className="col-md-2 p-2 text-center">
            {maintenance?.start ? (maintenance.start.split("T")[0].replaceAll("-", "/")) : "-"}
          </div>

          <div className="col-md-2 p-2 text-center">
            <div
              className="custom-badge"
              style={function () {
                if (maintenance.status == "ACTIVE") return { "backgroundColor": "#38538C" }
                if (maintenance.status == "FINISHED") return { "backgroundColor": "#eb6859" }
              }()}
            >
              {function () {
                if (maintenance.status == "ACTIVE")
                  return "Activo";
                else if (maintenance.status == "FINISHED")
                  return "Terminado";
              }()}
            </div>
          </div>

          <div className="col-md-4 p-2 text-center">
            <button className="btn-secondary px-3 py-1" onClick={() => { redirectToCategories(maintenance.id) }}>
              Ver evidencias
            </button>
            <button className="btn-light px-3 py-1 ml-2"
              onClick={
                maintenance.status == "FINISHED"
                  ? activeMaintenanceExist(maintenance.crane.id)
                    ? () => alert("Ya existe un mantenimiento activo para esta grúa")
                    : () => updateStatus(maintenance.id, maintenance.status)
                  : () => updateStatus(maintenance.id, maintenance.status)
              }
              style={function () {
                if (maintenance.status == "ACTIVE") return { "color": "#eb6859" }
                if (maintenance.status == "FINISHED") return { "color": "#00A3BF" }
              }()}
            >
              {function () {
                if (maintenance.status == "ACTIVE")
                  return "Marcar como terminado";
                else if (maintenance.status == "FINISHED")
                  return "Activar";
              }()}
              </button>
            <Link to={`/${maintenance.id}/print`} className="ml-3">
              <i className="fa fa-clipboard text-warning"></i>
            </Link>
            {maintenance.type == "NORMAL" ?
              <i className="fa fa-users text-success ml-3"
                style = {{cursor: "pointer"}}
                onClick = {() => {redirectToResponsibles(maintenance.id)}}></i>
            :null}
          </div>

        </div>
      )}
    </div>

    <PaginationFooter pageNum={pageNum} totalPages={totalPages} onClickPage={onClickPage} />

  </div>;

MaintenanceListView.propTypes = {
  maintenances: PropTypes.array.isRequired,
  pageNum: PropTypes.number,
  totalPages: PropTypes.number,
  onClickPage: PropTypes.func,
  activeMaintenanceExist: PropTypes.func,
  updateStatus: PropTypes.func,
  setShowOnlyActiveMaintenances: PropTypes.func,
  showOnlyActiveMaintenances: PropTypes.bool,
  redirectToCategories: PropTypes.func,
  redirectToResponsibles: PropTypes.func,
  cranes: PropTypes.array,
  searchRef: PropTypes.object,
  search: PropTypes.string,
  handleChange: PropTypes.func
};

export default MaintenanceListView;