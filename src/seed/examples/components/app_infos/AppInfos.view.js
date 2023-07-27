/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import AppInfoDetails from "seed/examples/components/app_infos/Details";
import AppInfoList from "seed/examples/components/app_infos/List";
import AppInfoFormSave from "seed/examples/components/app_infos/FormSave";
import AppInfoFormSet from "seed/examples/components/app_infos/FormSet";
import { ModalRoute } from "seed/helpers";

const AppInfosView = () =>
  <BrowserRouter basename="/examples/app_infos">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">App infos</h1>
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
    <AppInfoList />

    {/* Modals */}
    <ModalRoute
        path="/:appInfoId(\d+)"
        component={AppInfoDetails} />
    <ModalRoute
      path="/create"
      component={AppInfoFormSave} />
    <ModalRoute
      path="/:appInfoId(\d+)/edit"
      component={AppInfoFormSet} />

    </div>
  </BrowserRouter>;

AppInfosView.propTypes = {};

export default AppInfosView;