/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import SecurityCheckTypeDetails from "seed/examples/components/security_check_types/Details";
import SecurityCheckTypeList from "seed/examples/components/security_check_types/List";
import SecurityCheckTypeFormSave from "seed/examples/components/security_check_types/FormSave";
import SecurityCheckTypeFormSet from "seed/examples/components/security_check_types/FormSet";
import { ModalRoute } from "seed/helpers";

const SecurityCheckTypesView = () =>
  <BrowserRouter basename="/examples/security_check_types">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Security check types</h1>
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
    <SecurityCheckTypeList />

    {/* Modals */}
    <ModalRoute
        path="/:securityCheckTypeId(\d+)"
        component={SecurityCheckTypeDetails} />
    <ModalRoute
      path="/create"
      component={SecurityCheckTypeFormSave} />
    <ModalRoute
      path="/:securityCheckTypeId(\d+)/edit"
      component={SecurityCheckTypeFormSet} />

    </div>
  </BrowserRouter>;

SecurityCheckTypesView.propTypes = {};

export default SecurityCheckTypesView;