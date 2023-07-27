/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import OnedriveAuthDetails from "seed/examples/components/onedrive_auths/Details";
import OnedriveAuthList from "seed/examples/components/onedrive_auths/List";
import OnedriveAuthFormSave from "seed/examples/components/onedrive_auths/FormSave";
import OnedriveAuthFormSet from "seed/examples/components/onedrive_auths/FormSet";
import { ModalRoute } from "seed/helpers";

const OnedriveAuthsView = () =>
  <BrowserRouter basename="/examples/onedrive_auths">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Onedrive auths</h1>
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
    <OnedriveAuthList />

    {/* Modals */}
    <ModalRoute
        path="/:onedriveAuthId(\d+)"
        component={OnedriveAuthDetails} />
    <ModalRoute
      path="/create"
      component={OnedriveAuthFormSave} />
    <ModalRoute
      path="/:onedriveAuthId(\d+)/edit"
      component={OnedriveAuthFormSet} />

    </div>
  </BrowserRouter>;

OnedriveAuthsView.propTypes = {};

export default OnedriveAuthsView;