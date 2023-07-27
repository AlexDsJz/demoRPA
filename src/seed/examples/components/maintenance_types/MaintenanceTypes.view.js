/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import MaintenanceTypeDetails from "seed/examples/components/maintenance_types/Details";
import MaintenanceTypeList from "seed/examples/components/maintenance_types/List";
import MaintenanceTypeFormSave from "seed/examples/components/maintenance_types/FormSave";
import MaintenanceTypeFormSet from "seed/examples/components/maintenance_types/FormSet";
import { ModalRoute } from "seed/helpers";

const MaintenanceTypesView = () =>
  <BrowserRouter basename="/examples/maintenance_types">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Maintenance types</h1>
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
    <MaintenanceTypeList />

    {/* Modals */}
    <ModalRoute
        path="/:maintenanceTypeId(\d+)"
        component={MaintenanceTypeDetails} />
    <ModalRoute
      path="/create"
      component={MaintenanceTypeFormSave} />
    <ModalRoute
      path="/:maintenanceTypeId(\d+)/edit"
      component={MaintenanceTypeFormSet} />

    </div>
  </BrowserRouter>;

MaintenanceTypesView.propTypes = {};

export default MaintenanceTypesView;