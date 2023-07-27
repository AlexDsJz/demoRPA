/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import MaintenanceFileDetails from "seed/examples/components/maintenance_files/Details";
import MaintenanceFileList from "seed/examples/components/maintenance_files/List";
import MaintenanceFileFormSave from "seed/examples/components/maintenance_files/FormSave";
import MaintenanceFileFormSet from "seed/examples/components/maintenance_files/FormSet";
import { ModalRoute } from "seed/helpers";

const MaintenanceFilesView = () =>
  <BrowserRouter basename="/examples/maintenance_files">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Maintenance files</h1>
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
    <MaintenanceFileList />

    {/* Modals */}
    <ModalRoute
        path="/:maintenanceFileId(\d+)"
        component={MaintenanceFileDetails} />
    <ModalRoute
      path="/create"
      component={MaintenanceFileFormSave} />
    <ModalRoute
      path="/:maintenanceFileId(\d+)/edit"
      component={MaintenanceFileFormSet} />

    </div>
  </BrowserRouter>;

MaintenanceFilesView.propTypes = {};

export default MaintenanceFilesView;