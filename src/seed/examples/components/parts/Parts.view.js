/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import PartDetails from "seed/examples/components/parts/Details";
import PartList from "seed/examples/components/parts/List";
import PartFormSave from "seed/examples/components/parts/FormSave";
import PartFormSet from "seed/examples/components/parts/FormSet";
import { ModalRoute } from "seed/helpers";

const PartsView = () =>
  <BrowserRouter basename="/examples/parts">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Parts</h1>
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
    <PartList />

    {/* Modals */}
    <ModalRoute
        path="/:partId(\d+)"
        component={PartDetails} />
    <ModalRoute
      path="/create"
      component={PartFormSave} />
    <ModalRoute
      path="/:partId(\d+)/edit"
      component={PartFormSet} />

    </div>
  </BrowserRouter>;

PartsView.propTypes = {};

export default PartsView;