/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import MaintenanceCategoryDetails from "seed/examples/components/maintenance_categories/Details";
import MaintenanceCategoryList from "seed/examples/components/maintenance_categories/List";
import MaintenanceCategoryFormSave from "seed/examples/components/maintenance_categories/FormSave";
import MaintenanceCategoryFormSet from "seed/examples/components/maintenance_categories/FormSet";
import { ModalRoute } from "seed/helpers";

const MaintenanceCategoriesView = () =>
  <BrowserRouter basename="/examples/maintenance_categories">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Maintenance categories</h1>
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
    <MaintenanceCategoryList />

    {/* Modals */}
    <ModalRoute
        path="/:maintenanceCategoryId(\d+)"
        component={MaintenanceCategoryDetails} />
    <ModalRoute
      path="/create"
      component={MaintenanceCategoryFormSave} />
    <ModalRoute
      path="/:maintenanceCategoryId(\d+)/edit"
      component={MaintenanceCategoryFormSet} />

    </div>
  </BrowserRouter>;

MaintenanceCategoriesView.propTypes = {};

export default MaintenanceCategoriesView;