/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import MaintenanceDetails from "seed/examples/components/maintenances/Details";
import MaintenanceList from "seed/examples/components/maintenances/List";
import MaintenanceFormSave from "seed/examples/components/maintenances/FormSave";
import MaintenanceFormSet from "seed/examples/components/maintenances/FormSet";
import { ModalRoute } from "seed/helpers";

const MaintenancesView = () =>
  <BrowserRouter basename="/examples/maintenances">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Maintenances</h1>
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
    <MaintenanceList />

    {/* Modals */}
    <ModalRoute
        path="/:maintenanceId(\d+)"
        component={MaintenanceDetails} />
    <ModalRoute
      path="/create"
      component={MaintenanceFormSave} />
    <ModalRoute
      path="/:maintenanceId(\d+)/edit"
      component={MaintenanceFormSet} />

    </div>
  </BrowserRouter>;

MaintenancesView.propTypes = {};

export default MaintenancesView;