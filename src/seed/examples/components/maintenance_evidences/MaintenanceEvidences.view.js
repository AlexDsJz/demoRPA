/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import MaintenanceEvidenceDetails from "seed/examples/components/maintenance_evidences/Details";
import MaintenanceEvidenceList from "seed/examples/components/maintenance_evidences/List";
import MaintenanceEvidenceFormSave from "seed/examples/components/maintenance_evidences/FormSave";
import MaintenanceEvidenceFormSet from "seed/examples/components/maintenance_evidences/FormSet";
import { ModalRoute } from "seed/helpers";

const MaintenanceEvidencesView = () =>
  <BrowserRouter basename="/examples/maintenance_evidences">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Maintenance evidences</h1>
        </div>

        <div class="col-sm-auto">
          <div class="btn-group" role="group">
            <Link to="/create" className="btn btn-primary">
              <i class="tio-add mr-1"></i>Create
            </Link>
          </div>
        </div>

      </div>
    </div>

    {/* List */}
    <MaintenanceEvidenceList />

    {/* Modals */}
    <ModalRoute
        path="/:maintenanceEvidenceId(\d+)"
        component={MaintenanceEvidenceDetails} />
    <ModalRoute
      path="/create"
      component={MaintenanceEvidenceFormSave} />
    <ModalRoute
      path="/:maintenanceEvidenceId(\d+)/edit"
      component={MaintenanceEvidenceFormSet} />

    </div>
  </BrowserRouter>;

MaintenanceEvidencesView.propTypes = {};

export default MaintenanceEvidencesView;