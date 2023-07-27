/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import ArrisFailureDetails from "seed/examples/components/arris_failures/Details";
import ArrisFailureList from "seed/examples/components/arris_failures/List";
import ArrisFailureFormSave from "seed/examples/components/arris_failures/FormSave";
import ArrisFailureFormSet from "seed/examples/components/arris_failures/FormSet";
import { ModalRoute } from "seed/helpers";

const ArrisFailuresView = () =>
  <BrowserRouter basename="/examples/arris_failures">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Arris failures</h1>
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
    <ArrisFailureList />

    {/* Modals */}
    <ModalRoute
        path="/:arrisFailureId(\d+)"
        component={ArrisFailureDetails} />
    <ModalRoute
      path="/create"
      component={ArrisFailureFormSave} />
    <ModalRoute
      path="/:arrisFailureId(\d+)/edit"
      component={ArrisFailureFormSet} />

    </div>
  </BrowserRouter>;

ArrisFailuresView.propTypes = {};

export default ArrisFailuresView;