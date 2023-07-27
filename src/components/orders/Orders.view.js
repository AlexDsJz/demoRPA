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
}) =>
  <BrowserRouter basename="/orders">
    <div class="content container-fluid p-7">

      {/* Header */}
      <div class="page-header pt-4">
        <div class="row align-items-end">
          <div class="col-sm">
            <h1 class="page-header-title">Órdenes</h1>
          </div>
          <div class="col-sm-auto">
            <div class="btn-group" role="group">
              <Link to="/create" className="btn btn-primary">
                <i class="tio-add mr-1"></i>Nueva Orden
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3 mx-1">
        <div className="row">
          <div className="col-md-6">
            <h4>Órdenes Activas</h4>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-row justify-content-end align-items-center">
              <div className="">
                <Typeahead
                  id="menu"
                  ref={searchRef}
                  placeholder="Buscar Órdenes"
                  onInputChange={handleChange}
                  labelKey={(crane) => `${crane.series} - ${crane.model} ${crane.number}`}
                  onChange={(selected) => selected.length > 0
                    ? handleChange(selected[0].series)
                    : ""
                  }
                  options={[
                    ...cranes
                  ]}
                >
                  <div className="rbt-aux">
                    {search.length == 0 && <i className="fa fa-search rbt-aux"></i>}
                    {search.length > 0 && <i className="fa fa-times rbt-close text-danger"
                      style={{ paddingTop: "4px" }} role="button" onClick={() => {
                        searchRef.current.clear()
                        handleChange("")
                      }}></i>}
                  </div>
                </Typeahead>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row border font-weight-bold mx-1">
        <div className="col-md-2 p-2">
          Grúa
        </div>
        <div className="col-md-3 p-2">
          Obra
        </div>
        <div className="col-md-2 p-2">
          Comerciante Solicitante
        </div>
        <div className="col-md-1 p-2">
          <div className="d-flex flex-row align-items-center" style={{ marginTop: "-10px", marginBottom: "-10px" }}>
            <span>Fecha</span>
            <div className="mx-1">
              <button type="button" className={`btn btn-text mx-1 px-0 ${orderDate == "" ? "text-primary" : ""}`}
                onClick={() => setOrderDate("")}
              >
                <i className="fa fa-arrow-up"></i>
              </button>
              <button type="button" className={`btn btn-text mx-1 px-0 ${orderDate == "-" ? "text-primary" : ""}`}
                onClick={() => setOrderDate("-")}
              >
                <i className="fa fa-arrow-down"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-2 p-2 text-center">
          <div class="dropdown" style={{ marginTop: "-10px", marginBottom: "-10px" }}>

            <a class="btn btn-link dropdown-toggle"
              href="#"
              role="button"
              id="statusFilterDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ color: "#677788" }}
            >
              Estado
            </a>

            <div class="dropdown-menu" aria-labelledby="statusFilterDropdown">
              <form>

                <div class="dropdown-item">
                  <input type="checkbox" id="filter1" name="filter1" defaultChecked={statusFilters["CREATED"]}
                    onChange={(e) => setStatusFilters({ ...statusFilters, "CREATED": e.target.checked })} />
                  <label className="px-2 align-middle" for="filter1">
                    <h5>En carga</h5>
                  </label>
                </div>

                {/* <div class="dropdown-item">
                  <input type="checkbox" id="filter2" name="filter2" defaultChecked={statusFilters["CHARGING"]}
                    onChange={(e) => setStatusFilters({...statusFilters, "CHARGING": e.target.checked})}/>
                  <label className="px-2 align-middle" for="filter2">
                    <h5>En carga</h5>
                  </label>
                </div> */}

                {/* <div class="dropdown-item">
                  <input type="checkbox" id="filter3" name="filter3" defaultChecked={statusFilters["TRAVELING"]}
                    onChange={(e) => setStatusFilters({...statusFilters, "TRAVELING": e.target.checked})}/>
                  <label className="px-2 align-middle" for="filter3">
                    <h5>Carga completa</h5>
                  </label>
                </div> */}

                {/* <div class="dropdown-item">
                  <input type="checkbox" id="filter4" name="filter4" defaultChecked={statusFilters["RECEIVED"]}
                    onChange={(e) => setStatusFilters({...statusFilters, "RECEIVED": e.target.checked})}/>
                  <label className="px-2 align-middle" for="filter4">
                    <h5>Recibida</h5>
                  </label>
                </div> */}

                <div class="dropdown-item">
                  <input type="checkbox" id="filter5" name="filter5" defaultChecked={statusFilters["IN_BUILDING"]}
                    onChange={(e) => setStatusFilters({ ...statusFilters, "IN_BUILDING": e.target.checked })} />
                  <label className="px-2 align-middle" for="filter5">
                    <h5>En destino</h5>
                  </label>
                </div>

                {/* <div class="dropdown-item">
                  <input type="checkbox" id="filter7" name="filter7" defaultChecked={statusFilters["RETURNED"]}
                    onChange={(e) => setStatusFilters({...statusFilters, "RETURNED": e.target.checked})}/>
                  <label className="px-2 align-middle" for="filter7">
                    <h5>Retornada</h5>
                  </label>
                </div> */}

                <div class="dropdown-item">
                  <input type="checkbox" id="filter6" name="filter6" defaultChecked={statusFilters["FINISHED"]}
                    onChange={(e) => setStatusFilters({ ...statusFilters, "FINISHED": e.target.checked })} />
                  <label className="px-2 align-middle" for="filter6">
                    <h5>Finalizada</h5>
                  </label>
                </div>

              </form>
            </div>

          </div>
        </div>
        <div className="col-md-2 p-2">
        </div>
      </div>

      {/* List */}
      <OrderList
        statusFilters={statusFilters}
        orderDate={orderDate}
        search={search} />

      <ModalRoute
        path="/create"
        width={created ? 500 : 1050}
        height={created ? 300 : 700}
        onClose={onClose}
        component={OrderFormSave}
        setCreated={setCreated} />

      <ModalRoute
        path="/:orderId(\d+)/print"
        width={1050}
        height={750}
        component={OrderDetails}
        setCreated={setCreated} />

      <ModalRoute
        path="/:orderId(\d+)/edit"
        width={created ? 500 : 1050}
        height={created ? 300 : 700}
        onClose={onClose}
        component={OrderFormSet}
        setCreated={setCreated} />

    </div>
  </BrowserRouter>;

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