/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import SuggestionDetails from "seed/examples/components/suggestions/Details";
import SuggestionList from "seed/examples/components/suggestions/List";
import SuggestionFormSave from "seed/examples/components/suggestions/FormSave";
import SuggestionFormSet from "seed/examples/components/suggestions/FormSet";
import { ModalRoute } from "seed/helpers";

const SuggestionsView = () =>
  <BrowserRouter basename="/examples/suggestions">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Suggestions</h1>
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
    <SuggestionList />

    {/* Modals */}
    <ModalRoute
        path="/:suggestionId(\d+)"
        component={SuggestionDetails} />
    <ModalRoute
      path="/create"
      component={SuggestionFormSave} />
    <ModalRoute
      path="/:suggestionId(\d+)/edit"
      component={SuggestionFormSet} />

    </div>
  </BrowserRouter>;

SuggestionsView.propTypes = {};

export default SuggestionsView;