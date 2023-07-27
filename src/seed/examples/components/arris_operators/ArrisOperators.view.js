/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import ArrisOperatorDetails from "seed/examples/components/arris_operators/Details";
import ArrisOperatorList from "seed/examples/components/arris_operators/List";
import ArrisOperatorFormSave from "seed/examples/components/arris_operators/FormSave";
import ArrisOperatorFormSet from "seed/examples/components/arris_operators/FormSet";
import { ModalRoute } from "seed/helpers";

const ArrisOperatorsView = () =>
  <BrowserRouter basename="/examples/arris_operators">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Arris operators</h1>
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
    <ArrisOperatorList />

    {/* Modals */}
    <ModalRoute
        path="/:arrisOperatorId(\d+)"
        component={ArrisOperatorDetails} />
    <ModalRoute
      path="/create"
      component={ArrisOperatorFormSave} />
    <ModalRoute
      path="/:arrisOperatorId(\d+)/edit"
      component={ArrisOperatorFormSet} />

    </div>
  </BrowserRouter>;

ArrisOperatorsView.propTypes = {};

export default ArrisOperatorsView;