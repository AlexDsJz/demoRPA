/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import OperationDetails from "seed/examples/components/operations/Details";
import OperationList from "seed/examples/components/operations/List";
import OperationFormSave from "seed/examples/components/operations/FormSave";
import OperationFormSet from "seed/examples/components/operations/FormSet";
import { ModalRoute } from "seed/helpers";

const OperationsView = () =>
  <BrowserRouter basename="/examples/operations">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Operations</h1>
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
    <OperationList />

    {/* Modals */}
    <ModalRoute
        path="/:operationId(\d+)"
        component={OperationDetails} />
    <ModalRoute
      path="/create"
      component={OperationFormSave} />
    <ModalRoute
      path="/:operationId(\d+)/edit"
      component={OperationFormSet} />

    </div>
  </BrowserRouter>;

OperationsView.propTypes = {};

export default OperationsView;