/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import ArrisCraneStatusDetails from "seed/examples/components/arris_crane_statuses/Details";
import ArrisCraneStatusList from "seed/examples/components/arris_crane_statuses/List";
import ArrisCraneStatusFormSave from "seed/examples/components/arris_crane_statuses/FormSave";
import ArrisCraneStatusFormSet from "seed/examples/components/arris_crane_statuses/FormSet";
import { ModalRoute } from "seed/helpers";

const ArrisCraneStatusesView = () =>
  <BrowserRouter basename="/examples/arris_crane_statuses">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Arris crane statuses</h1>
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
    <ArrisCraneStatusList />

    {/* Modals */}
    <ModalRoute
        path="/:arrisCraneStatusId(\d+)"
        component={ArrisCraneStatusDetails} />
    <ModalRoute
      path="/create"
      component={ArrisCraneStatusFormSave} />
    <ModalRoute
      path="/:arrisCraneStatusId(\d+)/edit"
      component={ArrisCraneStatusFormSet} />

    </div>
  </BrowserRouter>;

ArrisCraneStatusesView.propTypes = {};

export default ArrisCraneStatusesView;