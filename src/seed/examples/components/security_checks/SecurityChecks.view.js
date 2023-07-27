/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import SecurityCheckDetails from "seed/examples/components/security_checks/Details";
import SecurityCheckList from "seed/examples/components/security_checks/List";
import SecurityCheckFormSave from "seed/examples/components/security_checks/FormSave";
import SecurityCheckFormSet from "seed/examples/components/security_checks/FormSet";
import { ModalRoute } from "seed/helpers";

const SecurityChecksView = () =>
  <BrowserRouter basename="/examples/security_checks">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Security checks</h1>
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
    <SecurityCheckList />

    {/* Modals */}
    <ModalRoute
        path="/:securityCheckId(\d+)"
        component={SecurityCheckDetails} />
    <ModalRoute
      path="/create"
      component={SecurityCheckFormSave} />
    <ModalRoute
      path="/:securityCheckId(\d+)/edit"
      component={SecurityCheckFormSet} />

    </div>
  </BrowserRouter>;

SecurityChecksView.propTypes = {};

export default SecurityChecksView;