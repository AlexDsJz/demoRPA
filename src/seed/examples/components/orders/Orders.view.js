/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Route } from "seed/helpers"
import { Link, NavLink } from "react-router-dom";

import OrderDetails from "seed/examples/components/orders/Details";
import OrderList from "seed/examples/components/orders/List";
import OrderFormSave from "seed/examples/components/orders/FormSave";
import OrderFormSet from "seed/examples/components/orders/FormSet";
import { ModalRoute } from "seed/helpers";

const OrdersView = () =>
  <BrowserRouter basename="/examples/orders">
    <div class="content container-fluid">

    {/* Header */}
    <div class="page-header">
      <div class="row align-items-end">

        <div class="col-sm">
          <h1 class="page-header-title">Orders</h1>
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
    <OrderList />

    {/* Modals */}
    <ModalRoute
        path="/:orderId(\d+)"
        component={OrderDetails} />
    <ModalRoute
      path="/create"
      component={OrderFormSave} />
    <ModalRoute
      path="/:orderId(\d+)/edit"
      component={OrderFormSet} />

    </div>
  </BrowserRouter>;

OrdersView.propTypes = {};

export default OrdersView;