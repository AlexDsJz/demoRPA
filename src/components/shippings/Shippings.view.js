import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import ModalRoute from "components/helpers/ModalRoute";
import ShippingList from "components/shippings/List";
import ShippingFormSave from "components/shippings/FormSave";
import ShippingFormSet from "components/shippings/FormSet";
import ShippingDetails from "components/shippings/Details";
import Upload from "components/shippings/Upload";

const Orders = ({ 
  cranes,
  search,
  statusFilters,
  setStatusFilters,
  orderDate,
  setOrderDate,
  handleChange,
  created,
  setCreated,
  onClose,
  searchRef
}) => 
  <BrowserRouter basename="/shippings">
    <div class="content container-fluid p-7">
      
      {/* Header */}
      <div class="page-header pt-4">
        <div class="row align-items-end">
          <div class="col-sm">
            <h1 class="page-header-title">Embarques</h1>
          </div>
          <div class="col-sm-auto">
            <div class="btn-group" role="group">
              <Link to="/create" className="btn btn-primary mx-3">
                <i class="tio-add mr-1"></i>Nuevo embarque
              </Link>
              <Link to="/upload" className="btn btn-primary mx-3">
                <i class="tio-add mr-1"></i>Cargar por Excel
              </Link>
            </div>
            <div class="btn-group dropdown ml-1">
              <button class="dropdown-toggle-no-caret" id="dropdownMenuButton" data-toggle="dropdown" 
                aria-expanded="false" style = {{border:"none", backgroundColor:"white"}}>
                <i class="fas fa-ellipsis-v fa-lg"></i>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" 
                  href="https://docs.google.com/spreadsheets/d/1QzuwoXVD8xavZyiIZzw1No-SOGKGBOy4-H_ATF31iI4/edit?usp=sharing">
                    <i class="fas fa-bug"/> Reporte de incidencias técnicas
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3 mx-1">
        <div className="row">
          <div className="col-md-6">
            <h4>Cargas Activas</h4>
          </div>
          <div className="col-md-6">
            <div className="float-right">
              <Typeahead
                id="menu"
                ref={searchRef}
                placeholder="Buscar Cargas"
                onInputChange={handleChange}
                labelKey={(crane) => `${crane.series} - ${crane.model} ${crane.number}`}
                onChange={(selected) => selected.length > 0 ? handleChange(selected[0].series) : ""}
                options={cranes}
              >
                <div className="rbt-aux">
                  {search.length == 0 && <i className="fa fa-search rbt-aux"></i>}
                  {search.length > 0 && <i className="fa fa-times rbt-close text-danger" 
                    style={{paddingTop: "4px"}} role="button" onClick={() => {
                      searchRef.current.clear()
                      handleChange("")
                    }}></i>}
                </div>
              </Typeahead>
            </div>
          </div>
        </div>
      </div>

      <div className="row border font-weight-bold mx-1">
        <div className="col-md-2 p-2">
          Grúa
        </div>
        <div className="col-md-1 p-2">
          <div className="d-flex flex-row align-items-center" style={{marginTop: "-10px", marginBottom: "-10px"}}>
            <span>Fecha</span>
            <div className="mx-1">
              <button type="button" className={`btn btn-text mx-1 px-0 ${orderDate == "" ? "text-primary" : ""}`}
                onClick={() => setOrderDate("")}>
                <i className="fa fa-arrow-up"></i>
              </button>
              <button type="button" className={`btn btn-text mx-1 px-0 ${orderDate == "-" ? "text-primary" : ""}`}
                onClick={() => setOrderDate("-")}>
                <i className="fa fa-arrow-down"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-2 p-2">
          Destino
        </div>
        <div className="col-md-2 p-2">
          Transportista
        </div>
        <div className="col-md-1 p-2">
          Placas
        </div>
        <div className="col-md-2 p-2 text-center">
          <div class="dropdown" style={{marginTop: "-10px", marginBottom: "-10px"}}>

            <a class="btn btn-link dropdown-toggle" 
              href="#" 
              role="button" 
              id="statusFilterDropdown" 
              data-toggle="dropdown" 
              aria-haspopup="true" 
              aria-expanded="false"
              style={{color: "#677788"}}>
                Estado
            </a>

            <div class="dropdown-menu" aria-labelledby="statusFilterDropdown">
              <form>

                <div class="dropdown-item">
                  <input type="checkbox" id="filter1" name="filter1" defaultChecked={statusFilters["CREATED"]}
                    onChange={(e) => setStatusFilters({...statusFilters, "CREATED": e.target.checked})}/>
                  <label className="px-2 align-middle" for="filter1">
                    <h5>Creada</h5>
                  </label>
                </div>

                <div class="dropdown-item">
                  <input type="checkbox" id="filter6" name="filter6" defaultChecked={statusFilters["SECURITY_REVISION"]}
                    onChange={(e) => setStatusFilters({...statusFilters, "SECURITY_REVISION": e.target.checked})}/>
                  <label className="px-2 align-middle" for="filter6">
                    <h5>En revisión de seguridad</h5>
                  </label>
                </div>

                <div class="dropdown-item">
                  <input type="checkbox" id="filter6" name="filter6" 
                    defaultChecked={statusFilters["SECURITY_COMPLETED"]}
                    onChange={(e) => setStatusFilters({...statusFilters, "SECURITY_COMPLETED": e.target.checked})}/>
                  <label className="px-2 align-middle" for="filter6">
                    <h5>Revisión completada</h5>
                  </label>
                </div>

                <div class="dropdown-item">
                  <input type="checkbox" id="filter2" name="filter2" defaultChecked={statusFilters["IN_PROCESS"]}
                    onChange={(e) => setStatusFilters({...statusFilters, "IN_PROCESS": e.target.checked})}/>
                  <label className="px-2 align-middle" for="filter2">
                    <h5>En proceso de carga</h5>
                  </label>
                </div>

                <div class="dropdown-item">
                  <input type="checkbox" id="filter2" name="filter2" defaultChecked={statusFilters["COMPLETED"]}
                    onChange={(e) => setStatusFilters({...statusFilters, "COMPLETED": e.target.checked})}/>
                  <label className="px-2 align-middle" for="filter2">
                    <h5>Carga completada</h5>
                  </label>
                </div>

                {/* <div class="dropdown-item">
                  <input type="checkbox" id="filter6" name="filter6" defaultChecked={statusFilters["IN_REVIEW"]}
                    onChange={(e) => setStatusFilters({...statusFilters, "IN_REVIEW": e.target.checked})}/>
                  <label className="px-2 align-middle" for="filter6">
                    <h5>En revisión</h5>
                  </label>
                </div> */}

                {/* <div class="dropdown-item">
                  <input type="checkbox" id="filter3" name="filter3" defaultChecked={statusFilters["TRAVELING"]}
                    onChange={(e) => setStatusFilters({...statusFilters, "TRAVELING": e.target.checked})}/>
                  <label className="px-2 align-middle" for="filter3">
                    <h5>Por enviar</h5>
                  </label>
                </div> */}

                {/* <div class="dropdown-item">
                  <input type="checkbox" id="filter4" name="filter4" defaultChecked={statusFilters["ARRIVED"]}
                    onChange={(e) => setStatusFilters({...statusFilters, "ARRIVED": e.target.checked})}/>
                  <label className="px-2 align-middle" for="filter4">
                    <h5>En destino</h5>
                  </label>
                </div> */}

                <div class="dropdown-item">
                  <input type="checkbox" id="filter5" name="filter5" defaultChecked={statusFilters["FINISHED"]}
                    onChange={(e) => setStatusFilters({...statusFilters, "FINISHED": e.target.checked})}/>
                  <label className="px-2 align-middle" for="filter5">
                    <h5>En destino</h5>
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
      <ShippingList
        search={search}
        statusFilters={statusFilters}
        orderDate={orderDate}/>

      <ModalRoute
        path="/create"
        width={created ? 500 : 1200}
        height={created ? 300 : 800}
        setCreated={setCreated}
        onClose={onClose}
        component={ShippingFormSave} />

      <ModalRoute
        path="/:shippingId(\d+)/print"
        width={1000}
        height={700}
        setCreated={setCreated}
        component={ShippingDetails} />

      <ModalRoute
        path="/:shippingId(\d+)/edit"
        width={created ? 500 : 1200}
        height={created ? 300 : 800}
        setCreated={setCreated}
        onClose={onClose}
        component={ShippingFormSet} />

      <ModalRoute
        path="/upload" 
        width={600}
        height={600}
        component={Upload}/>

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
  setCreated: PropTypes.func,
  onClose: PropTypes.func,
};

export default Orders;