/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import CraneDetails from "seed/examples/components/cranes/Details";
import CraneList from "seed/examples/components/cranes/List";
import CraneFormSave from "seed/examples/components/cranes/FormSave";
import CraneFormSet from "seed/examples/components/cranes/FormSet";
import { ModalRoute } from "seed/helpers";

const CranesView = () =>
  <BrowserRouter basename="/examples/cranes">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Cranes</h1>
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
    <CraneList />

    {/* Modals */}
    <ModalRoute
        path="/:craneId(\d+)"
        component={CraneDetails} />
    <ModalRoute
      path="/create"
      component={CraneFormSave} />
    <ModalRoute
      path="/:craneId(\d+)/edit"
      component={CraneFormSet} />

    </div>
  </BrowserRouter>;

CranesView.propTypes = {};

export default CranesView;