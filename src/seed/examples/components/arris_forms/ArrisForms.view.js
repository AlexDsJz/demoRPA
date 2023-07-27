/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import ArrisFormDetails from "seed/examples/components/arris_forms/Details";
import ArrisFormList from "seed/examples/components/arris_forms/List";
import ArrisFormFormSave from "seed/examples/components/arris_forms/FormSave";
import ArrisFormFormSet from "seed/examples/components/arris_forms/FormSet";
import { ModalRoute } from "seed/helpers";

const ArrisFormsView = () =>
  <BrowserRouter basename="/examples/arris_forms">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Arris forms</h1>
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
    <ArrisFormList />

    {/* Modals */}
    <ModalRoute
        path="/:arrisFormId(\d+)"
        component={ArrisFormDetails} />
    <ModalRoute
      path="/create"
      component={ArrisFormFormSave} />
    <ModalRoute
      path="/:arrisFormId(\d+)/edit"
      component={ArrisFormFormSet} />

    </div>
  </BrowserRouter>;

ArrisFormsView.propTypes = {};

export default ArrisFormsView;