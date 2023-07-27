/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import MaintenancePermsDetails from "seed/examples/components/maintenance_permses/Details";
import MaintenancePermsList from "seed/examples/components/maintenance_permses/List";
import MaintenancePermsFormSave from "seed/examples/components/maintenance_permses/FormSave";
import MaintenancePermsFormSet from "seed/examples/components/maintenance_permses/FormSet";
import { ModalRoute } from "seed/helpers";

const MaintenancePermsesView = () =>
  <BrowserRouter basename="/examples/maintenance_permses">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Maintenance permses</h1>
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
    <MaintenancePermsList />

    {/* Modals */}
    <ModalRoute
        path="/:maintenancePermsId(\d+)"
        component={MaintenancePermsDetails} />
    <ModalRoute
      path="/create"
      component={MaintenancePermsFormSave} />
    <ModalRoute
      path="/:maintenancePermsId(\d+)/edit"
      component={MaintenancePermsFormSet} />

    </div>
  </BrowserRouter>;

MaintenancePermsesView.propTypes = {};

export default MaintenancePermsesView;