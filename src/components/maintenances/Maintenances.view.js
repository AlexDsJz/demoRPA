import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import MaintenanceDetails from "components/maintenances/Details";
import MaintenanceList from "components/maintenances/List";
import MaintenanceFormSave from "components/maintenances/FormSave";
import MaintenanceFormSet from "components/maintenances/FormSet";
import MaintenanceReport from "components/maintenances/MaintenanceReport";
import { ModalRoute } from "seed/helpers";
import { Typeahead } from "react-bootstrap-typeahead";

const MaintenancesView = ({
  cranes,
  searchRef,
  search,
  handleChange,
  showOnlyActiveMaintenances,
  setShowOnlyActiveMaintenances
}) =>
  <BrowserRouter basename="/maintenances">
    <div class="content container-fluid p-7">

      {/* Header */}
      <div class="page-header pt-4">
        <div class="row align-items-end">

          <div class="col-sm">
            <h1 class="page-header-title">Mantenimientos</h1>
          </div>

          <div class="col-sm-auto">
            <div class="btn-group" role="group">
              <Link to="/create" className="btn btn-primary">
                <i class="tio-add mr-1"></i>Crear Mantenimiento
              </Link>
            </div>
            <div class="btn-group dropdown ml-1">
              <button class="dropdown-toggle-no-caret" id="dropdownMenuButton" data-toggle="dropdown" 
                aria-expanded="false" style = {{border:"none", backgroundColor:"white"}}>
                <i class="fas fa-ellipsis-v fa-lg"></i>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" 
                  href="https://grokemx-my.sharepoint.com/personal/admin_grokemx_onmicrosoft_com/_layouts/15/onedrive.aspx?ga=1&id=%2Fpersonal%2Fadmin%5Fgrokemx%5Fonmicrosoft%5Fcom%2FDocuments%2Fgroke&view=0">
                  <i class="fas fa-cloud"/> OneDrive
                </a>
                <a class="dropdown-item" 
                  href="https://docs.google.com/spreadsheets/d/18LoIPFrxsm-zTbcIk8Y1tDfUmDZ5rg9PusIvXTqlFqE/edit?usp=sharing">
                    <i class="fas fa-bug"/> Reporte de incidencias técnicas 
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="row d-flex align-items-center mb-3">
        <div class="col-10 text-right">
          <input
            type="checkbox"
            id="owner_filter1"
            name="owner_filter1"
            value={showOnlyActiveMaintenances}
            checked={showOnlyActiveMaintenances}
            onChange={(e) => setShowOnlyActiveMaintenances(e.target.checked)}
          />
          <label className="px-2 align-middle" for="filter1">
            <h5>Solo mostrar mantenimientos activos</h5>
          </label>
        </div>
        <div className="col-md-2">
          <div className="float-right">
            {/* The React Typeahead library require selected[0] */}
            <Typeahead
              id="menu"
              ref={searchRef}
              placeholder="Buscar Grúas"
              onInputChange={handleChange}
              labelKey={(crane) => `${crane.series} - ${crane.model} ${crane.number}`}
              onChange={(selected) => selected.length > 0 ? handleChange(selected[0].series) : ""}
              options={cranes}
            >
              <div className="rbt-aux">
                {search.length == 0 && <i className="fa fa-search rbt-aux"></i>}
                {search.length > 0 && <i className="fa fa-times rbt-close text-danger"
                  style={{ paddingTop: "4px" }} role="button" onClick={() => {
                    searchRef.current.clear()
                    handleChange("")
                  }}></i>}
              </div>
            </Typeahead>
          </div>
        </div>
      </div>

      <div className="row border font-weight-bold mx-1">
        <div className="col-md-2 p-2 text-center">
          Grúa
        </div>
        <div className="col-md-2 p-2 text-center">
          Tipo
        </div>
        <div className="col-md-2 p-2 text-center">
          Fecha de inicio
        </div>
        <div className="col-md-2 p-2 text-center">
          Status
        </div>
        <div className="col-md-4 p-2 text-center">
          Acciones
        </div>
      </div>

      {/* List */}
      <MaintenanceList
        search={search}
        showOnlyActiveMaintenances={showOnlyActiveMaintenances}
      />

      {/* Modals */}
      {/* <ModalRoute
        path="/:maintenanceId(\d+)"
        component={MaintenanceDetails} /> */}
      <ModalRoute
        path="/create"
        component={MaintenanceFormSave} />
      <ModalRoute
        path="/:maintenanceId(\d+)/edit"
        component={MaintenanceFormSet} />
      <ModalRoute
        path="/:maintenanceId(\d+)/print"
        width={1000}
        height={700}
        // setCreated={setCreated}
        component={MaintenanceReport} />

    </div>

  </BrowserRouter>;

MaintenancesView.propTypes = {
  cranes: PropTypes.array,
  searchRef: PropTypes.object,
  search: PropTypes.string,
  handleChange: PropTypes.func,
  showOnlyActiveMaintenances: PropTypes.bool,
  setShowOnlyActiveMaintenances: PropTypes.func
};

export default MaintenancesView;