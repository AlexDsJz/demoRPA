/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import SecurityCategoryDetails from "seed/examples/components/security_categories/Details";
import SecurityCategoryList from "seed/examples/components/security_categories/List";
import SecurityCategoryFormSave from "seed/examples/components/security_categories/FormSave";
import SecurityCategoryFormSet from "seed/examples/components/security_categories/FormSet";
import { ModalRoute } from "seed/helpers";

const SecurityCategoriesView = () =>
  <BrowserRouter basename="/examples/security_categories">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Security categories</h1>
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
    <SecurityCategoryList />

    {/* Modals */}
    <ModalRoute
        path="/:securityCategoryId(\d+)"
        component={SecurityCategoryDetails} />
    <ModalRoute
      path="/create"
      component={SecurityCategoryFormSave} />
    <ModalRoute
      path="/:securityCategoryId(\d+)/edit"
      component={SecurityCategoryFormSet} />

    </div>
  </BrowserRouter>;

SecurityCategoriesView.propTypes = {};

export default SecurityCategoriesView;