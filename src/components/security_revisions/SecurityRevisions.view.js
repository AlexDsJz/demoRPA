import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import SecurityRevisionDetails from "components/security_revisions/Details";
import SecurityRevisionList from "components/security_revisions/List";
import SecurityRevisionFormSave from "components/security_revisions/FormSave";
import { ModalRoute } from "seed/helpers";
import { Typeahead } from "react-bootstrap-typeahead";

const SecurityRevisionsView = ({
  cranes,
  searchRef,
  search,
  handleChange,
  showOnlyActiveSecurityRevisions,
  setShowOnlyActiveSecurityRevisions
}) =>
  <BrowserRouter basename="/security_revisions">
    <div class="content container-fluid p-7">

    {/* Header */}
    <div class="page-header pt-4">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Revisiones de seguridad</h1>
        </div>

        <div class="col-sm-auto">
          <div class="btn-group" role="group">
            <Link to="/create" className="btn btn-primary">
              <i class="tio-add mr-1"></i>Crear Revisión de Seguridad
            </Link>
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
          value={showOnlyActiveSecurityRevisions}
          checked={showOnlyActiveSecurityRevisions}
          onChange={(e) => setShowOnlyActiveSecurityRevisions(e.target.checked)} 
        />
        <label className="px-2 align-middle" for="filter1">
          <h5>Solo mostrar revisiones activas</h5>
        </label>
      </div>
    </div>

    <div className="row border font-weight-bold mx-1">
      <div className="col-md-2 p-2 text-center">
        Grúa
      </div>
      <div className="col-md-3 p-2 text-center">
        Orden
      </div>
      <div className="col-md-2 p-2 text-center">
        Status
      </div>
      <div className="col-md-2 p-2 text-center">
        Tipo
      </div>
      <div className="col-md-2 p-2 text-center">
        
      </div>
    </div>

    {/* List */}
    <SecurityRevisionList 
      search={search}
      showOnlyActiveSecurityRevisions={showOnlyActiveSecurityRevisions}
    />

    {/* Modals */}
    <ModalRoute
      path="/create"
      component={SecurityRevisionFormSave} />

    <ModalRoute 
          path="/:securityRevisionId(\d+)"
          width={1000}
          height={550}
          component={SecurityRevisionDetails} />

    </div>
  </BrowserRouter>;

SecurityRevisionsView.propTypes = {
  cranes: PropTypes.array,
  searchRef: PropTypes.object,
  search: PropTypes.string,
  handleChange: PropTypes.func,
  showOnlyActiveSecurityRevisions: PropTypes.bool,
  setShowOnlyActiveSecurityRevisions: PropTypes.func
};

export default SecurityRevisionsView;