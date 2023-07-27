import React from "react";
import PropTypes from "prop-types";
import CraneList from "components/cranes/List";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import CraneFormSave from "components/cranes/FormSave";
import ModalRoute from "components/helpers/ModalRoute";
import { Typeahead } from "react-bootstrap-typeahead";
import CraneFormSet from "components/cranes/FormSet";

const Orders = ({ 
  cranes, 
  search, 
  statusFilters, 
  setStatusFilters, 
  ownerFilters, 
  setOwnerFilters, 
  inUseFilters, 
  setInUseFilters, 
  handleChange, 
  created, 
  setCreated, 
  onClose, 
  searchRef, 
  orderStatusFilters, 
  setOrderStatusFilters, 
  commercialCount, 
  closedCount, 
  relocatedCount, 
  mountingCount, 
  disassemblyCount, 
  downloadReport,
  qCranes
}) =>
  <BrowserRouter basename="/cranes">
    <div class="content container-fluid p-7">
    
    {/* Header */}
    <div class="page-header pt-4">
      <div class="row align-items-end">
        <div class="col-sm">
          <h1 class="page-header-title">Grúas</h1>
        </div>
        <div class="col-sm-auto">
          <div class="btn-group" role="group">
            <Link to="/create" className="btn btn-primary mx-3">
              <i class="tio-add mr-1"></i>Nueva Grúa
            </Link>
            <a className="btn btn-primary" role="button" onClick={downloadReport}>
              Descargar Reporte
            </a>
          </div>
        </div>
      </div>
    </div>

    <div className="mb-3 mx-1">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center">
          <h4>Grúas Activas</h4>
          <h5 className="mx-2">
            ({commercialCount} comercial, {closedCount} clausuradas
            , {relocatedCount} reubicación, {mountingCount} montaje, {disassemblyCount} desmontaje)
          </h5>
        </div>
        <div className="col-md-6">
          <div className="float-right">
            {/* The React Typeahead library require selected[0] */}
            <Typeahead
              id="menu"
              ref={searchRef}
              placeholder="Buscar Grúas"
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

      <div className="col-md-2 p-2">
        Obra actual
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
              Propietario
          </a>

          <div class="dropdown-menu" aria-labelledby="statusFilterDropdown">
            <form>

              <div class="dropdown-item">
                <input type="checkbox" id="owner_filter1" name="owner_filter1" defaultChecked={ownerFilters["GROKE"]}
                  onChange={(e) => setOwnerFilters({...ownerFilters, "GROKE": e.target.checked})}/>
                <label className="px-2 align-middle" for="owner_filter1">
                  <h5>Groke</h5>
                </label>
              </div>

              <div class="dropdown-item">
                <input type="checkbox" id="owner_filter2" name="owner_filter2" defaultChecked={ownerFilters["RENTED"]}
                  onChange={(e) => setOwnerFilters({...ownerFilters, "RENTED": e.target.checked})}/>
                <label className="px-2 align-middle" for="owner_filter2">
                  <h5>Rentada</h5>
                </label>
              </div>

              <div class="dropdown-item">
                <input type="checkbox" id="owner_filter3" name="owner_filter3" defaultChecked={ownerFilters["SOLD"]}
                  onChange={(e) => setOwnerFilters({...ownerFilters, "SOLD": e.target.checked})}/>
                <label className="px-2 align-middle" for="owner_filter3">
                  <h5>Vendida</h5>
                </label>
              </div>

            </form>
          </div>

        </div>
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
                <input type="checkbox" id="status_filter1" name="status_filter1" 
                  defaultChecked={inUseFilters["false"]} 
                  onChange={(e) => {
                    setInUseFilters({...inUseFilters, "false": e.target.checked})
                  }}/>
                <label className="px-2 align-middle" for="status_filter1">
                  <h5>Disponible</h5>
                </label>
              </div>

              <div class="dropdown-item">
                <input type="checkbox" id="filter2" name="filter2" defaultChecked={orderStatusFilters["CREATED"]}
                  onChange={(e) => setOrderStatusFilters({...orderStatusFilters, "CREATED": e.target.checked})}/>
                <label className="px-2 align-middle" for="filter2">
                  <h5>En carga</h5>
                </label>
              </div>

              {/* <div class="dropdown-item">
                <input type="checkbox" id="filter3" name="filter3" defaultChecked={orderStatusFilters["CHARGING"]}
                  onChange={(e) => setOrderStatusFilters({...orderStatusFilters, "CHARGING": e.target.checked})}/>
                <label className="px-2 align-middle" for="filter3">
                  <h5>En carga</h5>
                </label>
              </div> */}

              {/* <div class="dropdown-item">
                <input type="checkbox" id="filter4" name="filter4" defaultChecked={orderStatusFilters["TRAVELING"]}
                  onChange={(e) => setOrderStatusFilters({...orderStatusFilters, "TRAVELING": e.target.checked})}/>
                <label className="px-2 align-middle" for="filter4">
                  <h5>Carga completada</h5>
                </label>
              </div> */}

              {/* <div class="dropdown-item">
                <input type="checkbox" id="filter5" name="filter5" defaultChecked={orderStatusFilters["RECEIVED"]}
                  onChange={(e) => setOrderStatusFilters({...orderStatusFilters, "RECEIVED": e.target.checked})}/>
                <label className="px-2 align-middle" for="filter5">
                  <h5>Recibida</h5>
                </label>
              </div> */}

              <div class="dropdown-item">
                <input type="checkbox" id="filter6" name="filter6" defaultChecked={orderStatusFilters["IN_BUILDING"]}
                  onChange={(e) => setOrderStatusFilters({...orderStatusFilters, "IN_BUILDING": e.target.checked})}/>
                <label className="px-2 align-middle" for="filter6">
                  <h5>En destino</h5>
                </label>
              </div>

              {/* <div class="dropdown-item">
                <input type="checkbox" id="filter7" name="filter7" defaultChecked={orderStatusFilters["RETURNED"]}
                  onChange={(e) => setOrderStatusFilters({...orderStatusFilters, "RETURNED": e.target.checked})}/>
                <label className="px-2 align-middle" for="filter7">
                  <h5>Retornada</h5>
                </label>
              </div> */}

            </form>
          </div>

        </div>
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
              Estado en obra
          </a>

          <div class="dropdown-menu" aria-labelledby="statusFilterDropdown">
            <form>

              <div class="dropdown-item">
                <input type="checkbox" id="status_filter1" name="status_filter1" 
                  defaultChecked={statusFilters["COMMERCIAL"]} 
                  onChange={(e) => setStatusFilters({...statusFilters, "COMMERCIAL": e.target.checked})}/>
                <label className="px-2 align-middle" for="status_filter1">
                  <h5>Comercial</h5>
                </label>
              </div>

              <div class="dropdown-item">
                <input type="checkbox" id="status_filter2" name="status_filter2" 
                  defaultChecked={statusFilters["CLOSED"]} 
                  onChange={(e) => setStatusFilters({...statusFilters, "CLOSED": e.target.checked})}/>
                <label className="px-2 align-middle" for="status_filter2">
                  <h5>Clausurada</h5>
                </label>
              </div>

              <div class="dropdown-item">
                <input type="checkbox" id="status_filter3" name="status_filter3" 
                  defaultChecked={statusFilters["RELOCATED"]} 
                  onChange={(e) => setStatusFilters({...statusFilters, "RELOCATED": e.target.checked})}/>
                <label className="px-2 align-middle" for="status_filter3">
                  <h5>Reubicación</h5>
                </label>
              </div>

              <div class="dropdown-item">
                <input type="checkbox" id="status_filter4" name="status_filter4" 
                  defaultChecked={statusFilters["MOUNTING"]} 
                  onChange={(e) => setStatusFilters({...statusFilters, "MOUNTING": e.target.checked})}/>
                <label className="px-2 align-middle" for="status_filter4">
                  <h5>Montaje</h5>
                </label>
              </div>

              <div class="dropdown-item">
                <input type="checkbox" id="status_filter5" name="status_filter5" 
                  defaultChecked={statusFilters["DISASSEMBLY"]} 
                  onChange={(e) => setStatusFilters({...statusFilters, "DISASSEMBLY": e.target.checked})}/>
                <label className="px-2 align-middle" for="status_filter5">
                  <h5>Desmontaje</h5>
                </label>
              </div>

              <div class="dropdown-item">
                <input type="checkbox" id="status_filter6" name="status_filter6" 
                  defaultChecked={statusFilters["CONSTRUCTION"]} 
                  onChange={(e) => setStatusFilters({...statusFilters, "CONSTRUCTION": e.target.checked})}/>
                <label className="px-2 align-middle" for="status_filter6">
                  <h5>En obra</h5>
                </label>
              </div>

            </form>
          </div>

        </div>
      </div>

    </div>

    {/* List */}
    <CraneList 
      qCranes={qCranes}
      orderStatusFilters={orderStatusFilters}
      inUseFilters={inUseFilters}
      statusFilters={statusFilters}
      ownerFilters={ownerFilters}
      search={search} />

    <ModalRoute 
      path="/:craneId(\d+)/edit"
      width={created ? 500 : 700}
      height={created ? 230 : 410}
      setCreated={setCreated}
      onClose={onClose}
      component={CraneFormSet} />

    <ModalRoute
      path="/create"
      width={created ? 500 : 700}
      height={created ? 230 : 410}
      setCreated={setCreated}
      onClose={onClose}
      component={CraneFormSave} />

    </div>
  </BrowserRouter>;

Orders.propTypes = {
  searchRef: PropTypes.object,
  cranes: PropTypes.array,
  search: PropTypes.string,
  inUseFilters: PropTypes.object,
  setInUseFilters: PropTypes.func,
  statusFilters: PropTypes.object,
  setStatusFilters: PropTypes.func,
  ownerFilters: PropTypes.object,
  setOwnerFilters: PropTypes.func,
  handleChange: PropTypes.func,
  created: PropTypes.bool,
  setCreated: PropTypes.func,
  onClose: PropTypes.func,
  orderStatusFilters: PropTypes.object, 
  setOrderStatusFilters: PropTypes.func,
  commercialCount: PropTypes.number,
  closedCount: PropTypes.number,
  relocatedCount: PropTypes.number,
  mountingCount: PropTypes.number,
  disassemblyCount: PropTypes.number,
  downloadReport: PropTypes.func,
  qCranes: PropTypes.object,
};

export default Orders;