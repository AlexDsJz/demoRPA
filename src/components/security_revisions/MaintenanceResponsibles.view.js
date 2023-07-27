import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter } from "react-router-dom";
import css from "styles/css/Maintenance.css"

const MaintenanceResponsiblesView = ({ 
  maintenanceId, 
  maintenance, 
  maintenanceWorkers, 
  maintenancePerms,
  displayedUsers, 
  changeDisplayedUsers, 
  userInPerms, 
  onChangePermses 
}) =>
  <BrowserRouter basename={"/maintenances/responsibles/" + maintenanceId}>
    <div class="content container-fluid p-7 mt-3">

      <div class="page-header">
        <div class="row align-items-end">
          <div class="col-sm mb-2 mb-sm-0">
            <h1 class="page-header-title">
              Asignaciones de {" "} {maintenance.crane.series + " / " 
              + maintenance.crane.model + maintenance.crane.number}
            </h1>
          </div>
        </div>
      </div>

      <div class="row justify-content-center">

        <div class="col-lg-3" style={{ height: "80vh", overflowY: "auto", overflowX: "hidden" }}>
          <div class="navbar-expand-lg navbar-vertical mb-3 mb-lg-5">
            <div id="navbarVerticalNavMenu" class="collapse navbar-collapse">
              <ul id="navbarSettings" class={"js-sticky-block js-scrollspy card card-navbar-nav " +
                "nav nav-tabs nav-lg nav-vertical"}>
                {
                  maintenancePerms.map((maintenancePerm, i) => 
                    <li class="nav-item" key={maintenancePerm.id}>
                      <a
                        onClick={() => changeDisplayedUsers(maintenancePerm.id)} 
                        class={displayedUsers == maintenancePerm.id 
                          ? "nav-link nav-no-css active" 
                          : "nav-link nav-no-css"
                        }
                      >
                        <div class="d-flex justify-content-between" style={{color: "#000"}}>
                          {maintenancePerm.category.name}
                          {maintenancePerm.users.length > 0 ? <i class="fa fa-check icon-no-css"></i> : null}
                        </div>
                      </a>
                    </li>
                  )
                }
              </ul>
            </div>
          </div>
        </div>

        <div class="col-lg-5" style={{ height: "80vh", overflowY: "auto", overflowX: "hidden" }}>
          {
            maintenancePerms.map((maintenancePerm, i) => (
              <div key={maintenancePerm.id}>
                <div class="row">
                  {
                    displayedUsers == maintenancePerm.id 
                    ? <div class="col-12 text-center">
                        <div class="row justify-content-center">
                          <h3 class="mt-4 mb-4">{maintenancePerm.category.name}</h3>
                        </div>
                        {
                          maintenanceWorkers.map((maintenanceWorker) =>
                            <div class="form-check" key={maintenanceWorker.id}>
                              <input class="form-check-input" type="checkbox"
                                value={maintenanceWorker.id} id={`workers_${maintenanceWorker.id}`}
                                checked={userInPerms(maintenanceWorker.id, maintenancePerm.users)}
                                onChange={(e) =>
                                  onChangePermses(
                                    maintenanceWorker,
                                    maintenancePerm.category.id,
                                    1,
                                    e.target.checked,
                                    i
                                  )
                                }
                              />
                              <label class="form-check-label" for={`workers_${maintenanceWorker.id}`}>
                                <h5>{maintenanceWorker.firstName + " (" + maintenanceWorker.email + ")"}</h5>
                              </label>
                            </div>
                          )
                        }
                      </div>
                    : null
                  }
                </div>
              </div>
            ))
          }
        </div>

        <div class="col-lg-4" style={{ height: "80vh", overflowY: "auto", overflowX: "hidden" }}>

        <div class="card mb-3 mb-lg-5">
          
          <div class="card-header">
            <h3 class="card-header-title">Asignación por usuario</h3>
          </div>

          <div class="card-body">
            <ul class="step steo-icon-xs">
              {
                maintenanceWorkers.map((maintenanceWorker, idx) =>
                  <li class="step-item" key={idx}>
                    <div class="step-content-wrapper">

                      <div class="step-content">

                        <h5 class="mb-1">
                          {maintenanceWorker.firstName + " (" + maintenanceWorker.email + ")"}
                        </h5>

                        <p>
                          <a data-toggle="collapse" href={`#details_${maintenanceWorker.id}`}
                            role="button" aria-expanded="true" aria-controls={`details_${maintenanceWorker.id}`}>
                            Ver tareas
                          </a>
                          <span className="mx-3 font-weight-bold">
                            Tiempo estimado: { 
                              maintenancePerms.reduce(
                                (acc, maintenancePerm) => 
                                  userInPerms(maintenanceWorker.id, maintenancePerm.users) 
                                    ? acc + maintenancePerm.estimatedTime 
                                    : acc, 0
                              )
                            }
                          </span>
                        </p>

                        <div class="collapse" id={`details_${maintenanceWorker.id}`}>
                          <div class="row my-2">
                            <div className="col-7">
                              <h5 class="mb-1">Tarea</h5>
                            </div>
                            <div className="col-3">
                              <h5 class="mb-1">Tiempo</h5>
                            </div>
                            <div className="col-1">
                              <h5 class="mb-1">
                                <i class="fa fa-check icon-no-css"></i>
                              </h5>
                            </div>
                          </div>
                          {
                            maintenancePerms.map((maintenancePerm, i) => (
                              userInPerms(maintenanceWorker.id, maintenancePerm.users) 
                              ? <div key={maintenancePerm.id}>
                                  <div class="row my-2">
                                    <div class="col-7">{maintenancePerm.category.name}</div>
                                    <div className="col-3 d-flex w-100">
                                      <input 
                                        type="number" 
                                        className="form-control" 
                                        defaultValue={maintenancePerm.estimatedTime}
                                        style={{
                                          height: "22px", 
                                          width: "100%",
                                          margin: "0px",
                                          padding: "0px"
                                        }}
                                        onChange={(e) =>
                                          onChangePermses(
                                            maintenanceWorker,
                                            maintenancePerm.category.id,
                                            e.target.value,
                                            true,
                                            i
                                          )
                                        }
                                      />
                                    </div>
                                    <div class="col-1 text-center">
                                      <input 
                                        type="checkbox" 
                                        value={maintenanceWorker.id}
                                        defaultChecked={true}
                                        onChange={(e) =>
                                          onChangePermses(
                                            maintenanceWorker,
                                            maintenancePerm.category.id,
                                            maintenancePerm.estimatedTime,
                                            e.target.checked,
                                            i
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              : null
                            ))
                          }
                        </div>
                      
                      </div>
                    </div>
                  </li>
                )
              }
            </ul>
          </div>

        </div>

        </div>
      </div>
      
    </div>
  </BrowserRouter>;

MaintenanceResponsiblesView.propTypes = {
  maintenanceWorkers: PropTypes.array,
  maintenancePerms: PropTypes.array,
  maintenance: PropTypes.object,
  maintenanceId: PropTypes.number,
  displayedUsers: PropTypes.number,
  changeDisplayedUsers: PropTypes.func,
  onChangePermses: PropTypes.func,
  userInPerms: PropTypes.func,
};

export default MaintenanceResponsiblesView;