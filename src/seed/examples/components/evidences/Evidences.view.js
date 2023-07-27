/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import EvidenceDetails from "seed/examples/components/evidences/Details";
import EvidenceList from "seed/examples/components/evidences/List";
import EvidenceFormSave from "seed/examples/components/evidences/FormSave";
import EvidenceFormSet from "seed/examples/components/evidences/FormSet";
import { ModalRoute } from "seed/helpers";

const EvidencesView = () =>
  <BrowserRouter basename="/examples/evidences">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Evidences</h1>
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
    <EvidenceList />

    {/* Modals */}
    <ModalRoute
        path="/:evidenceId(\d+)"
        component={EvidenceDetails} />
    <ModalRoute
      path="/create"
      component={EvidenceFormSave} />
    <ModalRoute
      path="/:evidenceId(\d+)/edit"
      component={EvidenceFormSet} />

    </div>
  </BrowserRouter>;

EvidencesView.propTypes = {};

export default EvidencesView;