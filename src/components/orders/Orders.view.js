import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import ModalRoute from "components/helpers/ModalRoute";
import OrderList from "components/orders/List";
import OrderFormSave from "components/orders/FormSave";
import OrderDetails from "components/orders/Details";
import OrderFormSet from "components/orders/FormSet";

const Orders = ({
  cranes,
  search,
  statusFilters,
  setStatusFilters,
  orderDate,
  setOrderDate,
  handleChange,
  created,
  onClose,
  setCreated,
  searchRef
}) => (
  <BrowserRouter basename="/reports">
    <div className="content container-fluid p-7">
      {/* Header */}
      <div className="page-header pt-4">
        <div className="row align-items-end">
          <div className="col-sm">
            <h1 className="page-header-title">Reportes de incidencias</h1>
          </div>
          <div className="col-sm-auto">
            <div className="btn-group" role="group">
              <Link to="/create" className="btn btn-success">
                <i className="tio-add mr-1"></i>Crear registro
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="row border font-weight-bold mx-1">
        <div className="col-md-2 p-2">Cliente</div>
        <div className="col-md-3 p-2">ID de la empresa</div>
        <div className="col-md-3 p-2">Encargado</div>
        <div className="col-md-2 p-2">Fecha de envío</div>
        <div className="col-md-2 p-2">Acciones</div>
      </div>

      {/* List */}
      <OrderList statusFilters={statusFilters} orderDate={orderDate} search={search} />

      <ModalRoute
        path="/create"
        width={created ? 500 : 1050}
        height={created ? 300 : 700}
        onClose={onClose}
        component={OrderFormSave}
        setCreated={setCreated}
      />
    </div>
  </BrowserRouter>
);

Orders.propTypes = {
  searchRef: PropTypes.object,
  cranes: PropTypes.array,
  search: PropTypes.string,
  statusFilters: PropTypes.object,
  setStatusFilters: PropTypes.func,
  orderDate: PropTypes.string,
  setOrderDate: PropTypes.func,
  handleChange: PropTypes.func,
  created: PropTypes.bool,
  onClose: PropTypes.func,
  setCreated: PropTypes.func,
};

export default Orders;