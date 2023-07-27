/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import SecurityRevisionDetails from "seed/examples/components/security_revisions/Details";
import SecurityRevisionList from "seed/examples/components/security_revisions/List";
import SecurityRevisionFormSave from "seed/examples/components/security_revisions/FormSave";
import SecurityRevisionFormSet from "seed/examples/components/security_revisions/FormSet";
import { ModalRoute } from "seed/helpers";

const SecurityRevisionsView = () =>
  <BrowserRouter basename="/examples/security_revisions">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Security revisions</h1>
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
    <SecurityRevisionList />

    {/* Modals */}
    <ModalRoute
        path="/:securityRevisionId(\d+)"
        component={SecurityRevisionDetails} />
    <ModalRoute
      path="/create"
      component={SecurityRevisionFormSave} />
    <ModalRoute
      path="/:securityRevisionId(\d+)/edit"
      component={SecurityRevisionFormSet} />

    </div>
  </BrowserRouter>;

SecurityRevisionsView.propTypes = {};

export default SecurityRevisionsView;