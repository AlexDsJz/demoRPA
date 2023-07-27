/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import ItemDetails from "seed/examples/components/items/Details";
import ItemList from "seed/examples/components/items/List";
import ItemFormSave from "seed/examples/components/items/FormSave";
import ItemFormSet from "seed/examples/components/items/FormSet";
import { ModalRoute } from "seed/helpers";

const ItemsView = () =>
  <BrowserRouter basename="/examples/items">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Items</h1>
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
    <ItemList />

    {/* Modals */}
    <ModalRoute
        path="/:itemId(\d+)"
        component={ItemDetails} />
    <ModalRoute
      path="/create"
      component={ItemFormSave} />
    <ModalRoute
      path="/:itemId(\d+)/edit"
      component={ItemFormSet} />

    </div>
  </BrowserRouter>;

ItemsView.propTypes = {};

export default ItemsView;