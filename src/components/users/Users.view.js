import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import UserList from "components/users/List";
import ModalRoute from "components/helpers/ModalRoute";
import UserFormSave from "components/users/FormSave";
import OrderFormSet from "components/users/FormSet";

const Orders = ({ 
  users, 
  search, 
  rolFilters, 
  setRolFilters, 
  handleChange, 
  created, 
  setCreated, 
  onClose, 
  searchRef 
}) =>
  <BrowserRouter basename="/users">
    <div class="content container-fluid p-7">
    
    {/* Header */}
    <div class="page-header pt-4">
      <div class="row align-items-end">
        <div class="col-sm">
          <h1 class="page-header-title">Usuarios</h1>
        </div>
        <div class="col-sm-auto">
          <div class="btn-group" role="group">
            <Link to="/create" className="btn btn-primary">
              <i class="tio-add mr-1"></i>Nuevo Usuario
            </Link>
          </div>
        </div>
      </div>
    </div>

    <div className="mb-3 mx-1">
      <div className="row">
          <div className="col-md-6">
            <h4>Usuarios Activos</h4>
          </div>
          <div className="col-md-6">
            <div className="float-right">
              <Typeahead
                id="menu"
                ref={searchRef}
                placeholder="Buscar Usuarios"
                onInputChange={handleChange}
                labelKey={(user) => `${user.firstName} ${user.lastName} (${user.email})`}
                onChange={(selected) => selected.length > 0 ? handleChange(selected[0].email) : ""}
                options={users}
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
      <div className="col-md-4 p-2">
        Nombre
      </div>
      <div className="col-md-3 p-2">
        Correo
      </div>
      <div className="col-md-3 p-2 text-center">
        <div class="dropdown" style={{marginTop: "-10px", marginBottom: "-10px"}}>

          <a class="btn btn-link dropdown-toggle" 
            href="#" 
            role="button" 
            id="statusFilterDropdown" 
            data-toggle="dropdown" 
            aria-haspopup="true" 
            aria-expanded="false"
            style={{color: "#677788"}}
          >
            Puesto
          </a>

          <div class="dropdown-menu" aria-labelledby="statusFilterDropdown">
            <form>

              <div class="dropdown-item">
                <input type="checkbox" id="filter1" name="filter1" defaultChecked={rolFilters["ADMIN"]}
                  onChange={(e) => setRolFilters({...rolFilters, "ADMIN": e.target.checked})}/>
                <label className="px-2 align-middle" for="filter1">
                  <h5>Administrador</h5>
                </label>
              </div>

              <div class="dropdown-item">
                <input type="checkbox" id="filter2" name="filter2" defaultChecked={rolFilters["QUALITY_CONTROL"]}
                  onChange={(e) => setRolFilters({...rolFilters, "QUALITY_CONTROL": e.target.checked})}/>
                <label className="px-2 align-middle" for="filter2">
                  <h5>Control de calidad</h5>
                </label>
              </div>

              <div class="dropdown-item">
                <input type="checkbox" id="filter3" name="filter3" defaultChecked={rolFilters["BUILDING_OPERATOR"]}
                  onChange={(e) => setRolFilters({...rolFilters, "BUILDING_OPERATOR": e.target.checked})}/>
                <label className="px-2 align-middle" for="filter3">
                  <h5>Operador de obra</h5>
                </label>
              </div>

              <div class="dropdown-item">
                <input type="checkbox" id="filter4" name="filter4" defaultChecked={rolFilters["WORKSHOP_OPERATOR"]}
                  onChange={(e) => setRolFilters({...rolFilters, "WORKSHOP_OPERATOR": e.target.checked})}/>
                <label className="px-2 align-middle" for="filter4">
                  <h5>Operador de taller</h5>
                </label>
              </div>

              <div class="dropdown-item">
                <input type="checkbox" id="filter4" name="filter5" defaultChecked={rolFilters["SECURITY"]}
                  onChange={(e) => setRolFilters({...rolFilters, "SECURITY": e.target.checked})}/>
                <label className="px-2 align-middle" for="filter5">
                  <h5>Supervisor de seguridad</h5>
                </label>
              </div>

              <div class="dropdown-item">
                <input type="checkbox" id="filter4" name="filter5" defaultChecked={rolFilters["MAINTENANCE_WORKER"]}
                  onChange={(e) => setRolFilters({...rolFilters, "MAINTENANCE_WORKER": e.target.checked})}/>
                <label className="px-2 align-middle" for="filter5">
                  <h5>Mantenimiento</h5>
                </label>
              </div>

              <div class="dropdown-item">
                <input type="checkbox" id="filter4" name="filter5" defaultChecked={rolFilters["MAINTENANCE_SUPERVISOR"]}
                  onChange={(e) => setRolFilters({...rolFilters, "MAINTENANCE_SUPERVISOR": e.target.checked})}/>
                <label className="px-2 align-middle" for="filter5">
                  <h5>Supervisor de Mantenimiento</h5>
                </label>
              </div>

            </form>
          </div>

        </div>
      </div>
      <div className="col-md-1 p-2">
      </div>
      <div className="col-md-1 p-2">
      </div>
    </div>

    {/* List */}
    <UserList
      search={search}
      rolFilters={rolFilters}/>

    <ModalRoute
      path="/create"
      width={created ? 500 : 750}
      height={created ? 250 : 550}
      setCreated={setCreated}
      onClose={onClose}
      component={UserFormSave} />

    <ModalRoute
      path="/:userId(\d+)/edit"
      width={created ? 500 : 750}
      height={created ? 250 : 550}
      setCreated={setCreated}
      onClose={onClose}
      component={OrderFormSet} />
      
    </div>
  </BrowserRouter>;

Orders.propTypes = {
  searchRef: PropTypes.object,
  users: PropTypes.array,
  search: PropTypes.string,
  rolFilters: PropTypes.object,
  setRolFilters: PropTypes.func,
  handleChange: PropTypes.func,
  created: PropTypes.bool,
  setCreated: PropTypes.func,
  onClose: PropTypes.func
};

export default Orders;