/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import ArrisFileDetails from "seed/examples/components/arris_files/Details";
import ArrisFileList from "seed/examples/components/arris_files/List";
import ArrisFileFormSave from "seed/examples/components/arris_files/FormSave";
import ArrisFileFormSet from "seed/examples/components/arris_files/FormSet";
import { ModalRoute } from "seed/helpers";

const ArrisFilesView = () =>
  <BrowserRouter basename="/examples/arris_files">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Arris files</h1>
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
    <ArrisFileList />

    {/* Modals */}
    <ModalRoute
        path="/:arrisFileId(\d+)"
        component={ArrisFileDetails} />
    <ModalRoute
      path="/create"
      component={ArrisFileFormSave} />
    <ModalRoute
      path="/:arrisFileId(\d+)/edit"
      component={ArrisFileFormSet} />

    </div>
  </BrowserRouter>;

ArrisFilesView.propTypes = {};

export default ArrisFilesView;