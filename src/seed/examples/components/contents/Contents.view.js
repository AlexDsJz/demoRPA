/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import ContentDetails from "seed/examples/components/contents/Details";
import ContentList from "seed/examples/components/contents/List";
import ContentFormSave from "seed/examples/components/contents/FormSave";
import ContentFormSet from "seed/examples/components/contents/FormSet";
import { ModalRoute } from "seed/helpers";

const ContentsView = () =>
  <BrowserRouter basename="/examples/contents">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Contents</h1>
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
    <ContentList />

    {/* Modals */}
    <ModalRoute
        path="/:contentId(\d+)"
        component={ContentDetails} />
    <ModalRoute
      path="/create"
      component={ContentFormSave} />
    <ModalRoute
      path="/:contentId(\d+)/edit"
      component={ContentFormSet} />

    </div>
  </BrowserRouter>;

ContentsView.propTypes = {};

export default ContentsView;