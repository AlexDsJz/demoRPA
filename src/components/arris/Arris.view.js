import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { ModalRoute } from "seed/helpers";
import { Typeahead } from "react-bootstrap-typeahead";
import OperationList from "components/arris/List";
import ArrisForm from "components/arris/FormSave";
import ArrisFormSet from "components/arris/FormSet";
import DownloadReport from "components/arris/DownloadReport";
import Binnacle from "components/arris/Binnacle";

const Arris = ({ cranes, searchRef, search, handleChange, setCreated, created }) =>
  <BrowserRouter basename="/arris">
    <div class="content container-fluid p-7">

      {/* Header */}
      <div class="page-header pt-4">
        <div class="row align-items-end">
          <div class="col-sm">
            <h1 class="page-header-title">ARISS</h1>
          </div>
          <div class="col-sm-auto">
            <div class="btn-group" role="group">
              <Link to="/create" className="btn btn-primary">
                <i class="tio-add mr-1"></i> Asignar Grúa
              </Link>
            </div>
            <div class="btn-group ml-3" role="group">
              <Link to="/download" className="btn btn-primary">
                Descargar reporte
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
                  href="https://docs.google.com/spreadsheets/d/1ppwTYcjvNz1sQ02y7FNJ_DJZ2qGlp7b8_4iyoK7hk_M/edit?usp=sharing">
                    <i class="fas fa-bug"/> Reporte de incidencias técnicas
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3 mx-1">
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <div className="float-right">
              {/* The React Typeahead library require selected[0] */}
              <Typeahead
                id="menu"
                ref={searchRef}
                placeholder="Buscar Grúas"
                onInputChange={handleChange}
                labelKey={(crane) => `${crane.series} - ${crane.model} ${crane.number}`}
                onChange={(selected) => selected.length > 0 
                  ? handleChange(selected[0].series) 
                  : ""
                }
                options={cranes}
              >
                <div className="rbt-aux">
                  {search.length == 0 && <i className="fa fa-search rbt-aux"></i>}
                  {search.length > 0 && <i className="fa fa-times rbt-close text-danger" 
                    style={{paddingTop: "4px"}} role="button" onClick={() => {
                      searchRef.current.clear()
                      handleChange("")
                    }}></i>}
                </div>
              </Typeahead>
            </div>
          </div>
        </div>
      </div>

      <div className="row border font-weight-bold mx-1">
        <div className="col-md-2 p-2">Grúa</div>
        <div className="col-md-3 p-2">Nombre del Operador</div>
        <div className="col-md-5 p-2">Lugar</div>
      </div>

      {/* List */}
      <OperationList 
        search={search} />

      <ModalRoute
        path="/create"
        width={created ? 400 : 800}
        height={350}
        component={ArrisForm}
        setCreated={setCreated}
      />

      <ModalRoute
        path="/edit"
        width={created ? 400 : 800}
        height={350}
        component={ArrisFormSet}
        setCreated={setCreated}
      />

      <ModalRoute
        path="/download"
        width={500}
        height={500}
        component={DownloadReport}
      />

      <ModalRoute
        path="/:operatorId(\d+)/binnacle"
        width={800}
        height={600}
        component={Binnacle}
      />

    </div>
  </BrowserRouter>

Arris.propTypes = {
  searchRef: PropTypes.object,
  cranes: PropTypes.array,
  search: PropTypes.string,
  handleChange: PropTypes.func,
  setCreated: PropTypes.func,
  created: PropTypes.bool,
};

export default Arris;