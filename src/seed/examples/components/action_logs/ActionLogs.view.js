/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import ActionLogDetails from "seed/examples/components/action_logs/Details";
import ActionLogList from "seed/examples/components/action_logs/List";
import ActionLogFormSave from "seed/examples/components/action_logs/FormSave";
import ActionLogFormSet from "seed/examples/components/action_logs/FormSet";
import { ModalRoute } from "seed/helpers";

const ActionLogsView = () =>
  <BrowserRouter basename="/examples/action_logs">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Action logs</h1>
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
    <ActionLogList />

    {/* Modals */}
    <ModalRoute
        path="/:actionLogId(\d+)"
        component={ActionLogDetails} />
    <ModalRoute
      path="/create"
      component={ActionLogFormSave} />
    <ModalRoute
      path="/:actionLogId(\d+)/edit"
      component={ActionLogFormSet} />

    </div>
  </BrowserRouter>;

ActionLogsView.propTypes = {};

export default ActionLogsView;