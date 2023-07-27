/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Link } from "react-router-dom";
import { ModalRoute } from "seed/helpers";
import Evidences from "components/maintenance_evidences/Evidences";

const MaintenanceCategoriesView = ({
  maintenanceCategories,
  maintenanceId,
  maintenance,
  noOfElementsWithEvidences,
  noOfMaintenanceTypes,
  minPhase,
  categoryDataArray,
  maintenancePerms
}) =>
  <BrowserRouter basename={"/categories/" + maintenanceId}>
    <div class="content container-fluid p-7 mt-4" style={{ overflow: "auto", height: window.innerHeight - 50 }}>

      <div class="page-header">
        <div class="row align-items-end">
          <div class="col-sm mb-2 mb-sm-0">
            <h1 class="page-header-title">
              Mantenimiento de {maintenance.crane.series + " / " + maintenance.crane.model + maintenance.crane.number}
            </h1>
            <h2>
              Cargadas {noOfElementsWithEvidences}/{noOfMaintenanceTypes} ({noOfMaintenanceTypes > 0 ?
                (noOfElementsWithEvidences * 100 / noOfMaintenanceTypes).toFixed(2) : 0}%)
            </h2>
          </div>

        </div>
      </div>

      <div class="row justify-content-center">
        {
          maintenanceCategories.map((maintenanceCategory) => (
            maintenanceCategory.categoryMaintenancePermses[0].users.length > 0 ?
              <div class="col-6" key={`category_${maintenanceCategory.id}`}>
                <div class="card mb-3 mb-lg-5">
                  <div class="card-body">
                    <ul class="step step-icon-xs">
                      <li class="step-item">
                        <div class="step-content-wrapper">
                          <div class="step-content">
                            <h3 class="mb-1">
                  
                              
                              {maintenancePerms.map((maintenancePerm) => (
                                maintenancePerm.category.id == maintenanceCategory.id ?
                                
                                categoryDataArray.find(category => (category.phase == maintenancePerm.category.phase 
                                  && category.name == maintenancePerm.category.name) && category.complete) ?
                                  <>
                                    <i class="fas fa-lock-open mt-1 mr-1 text-success"/>- 
                                    <span className = "ml-1">{maintenancePerm.category.phase}</span>
                                  </>
                                : 
                                  categoryDataArray.find(category => (category.phase == maintenancePerm.category.phase 
                                    && category.name == maintenancePerm.category.name) && 
                                      !category.complete && maintenancePerm.category.phase <= minPhase) ?
                                    <>
                                      <i class="fas fa-lock-open mt-1 mr-1 text-success"/>- 
                                      <span className = "ml-1">{maintenancePerm.category.phase}</span>
                                    </>
                                : 
                                  maintenancePerm.manuallyEnabled ?
                                    <>
                                      <i class="fas fa-lock-open mt-1 mr-1 mt-1 mr-1 text-success"/>- 
                                      <span className = "ml-1">{maintenancePerm.category.phase}</span>
                                    </>
                                :
                                  <>
                                    <i class="fas fa-lock mt-1 mr-1"/>- 
                                    <span className = "ml-1">{maintenancePerm.category.phase}</span>
                                  </>
                                : null
                              ))} 
                              &nbsp;&nbsp;&nbsp;&nbsp;{" " + maintenanceCategory.name + " "}
                              ({maintenanceCategory.typesWithEvidence - maintenanceCategory.noOfTypes == 0
                                ? "Evidencias completas"
                                : maintenanceCategory.typesWithEvidence + " evidencias cargadas, " + (maintenanceCategory.noOfTypes - maintenanceCategory.typesWithEvidence) + " pendientes"})
                            </h3>

                            <p>
                              <a data-toggle="collapse" href={`#details_category_${maintenanceCategory.id}`}
                                role="button" aria-expanded="true" aria-controls={`details_category_${maintenanceCategory.id}`}>
                                Ver detalles
                              </a>
                            </p>

                            <div class="collapse" id={`details_category_${maintenanceCategory.id}`}>
                              <div class="card">
                                <div class="card-body">

                                  <ul class="list-checked list-checked-primary">

                                    <li class="list-checked-item">
                                      Responsables:
                                      <ul class="list-checked list-checked-soft-bg-primary">
                                        {
                                          maintenanceCategory.categoryMaintenancePermses[0].users.length > 0
                                            ? maintenanceCategory.categoryMaintenancePermses[0].users.map((maintenanceUser) =>
                                              <li key={maintenanceUser.id} class="list-checked-item">
                                                {maintenanceUser.firstName + " (" + maintenanceUser.email + ")"}
                                              </li>
                                            )
                                            : <p class="text-danger">
                                              Aún no se han agregado responsables para esta categoría
                                            </p>
                                        }
                                      </ul>
                                    </li>

                                    {
                                      maintenanceCategory.categoryMaintenanceTypes.map((maintenanceType) =>
                                        maintenanceType.name != "Refacciones" && maintenanceType.name != "Comentarios"
                                          ? <li class="list-checked-item" key={maintenanceType.id}>
                                            <div class="row justify-content-betweeb">
                                              <div class="col-8">
                                                {maintenanceType.name}
                                                <br />
                                                ({maintenanceType.typeMaintenanceEvidences[0].maintenanceFiles.length} evidencias)
                                              </div>
                                              <div class="col-4 my-auto">
                                                {
                                                  maintenanceType.typeMaintenanceEvidences[0].maintenanceFiles.length > 0 && !maintenanceType.typeMaintenanceEvidences[0].skipEvidence
                                                    ? <Link to={"/evidences/" + maintenanceType.id} className="btn btn-primary p-2">
                                                      Ver evidencias
                                                    </Link>
                                                    : !maintenanceType.typeMaintenanceEvidences[0].skipEvidence ?
                                                      <span class="badge bg-danger rounded-pill text-white ml-2">
                                                        Evidencias pendientes
                                                      </span>
                                                      : <span class="badge bg-secondary text-white rounded-pill ml-2">
                                                        N/A
                                                      </span>
                                                }
                                              </div>
                                            </div>
                                          </li>
                                          : <>
                                              <div class="row mt-5" key={maintenanceType.id}>
                                                <div class="col text-center align-self-center">
                                                  <h3>
                                                    {maintenanceType.name}
                                                  </h3>
                                                </div>
                                              </div>
                                              <div class="row justify-content-center">
                                                <div class="col-4 text-center">
                                                  <b>
                                                    {
                                                      maintenanceType.typeMaintenanceEvidences[0].value ||
                                                        maintenanceType.typeMaintenanceEvidences[0].maintenanceFiles.length > 0 ?
                                                        maintenanceType.typeMaintenanceEvidences[0].value
                                                        : (maintenanceType.name == "Refacciones" ? "No se agregaron refacciones" : "No se agregaron comentarios")
                                                    }
                                                  </b>
                                                </div>
                                              </div>
                                              <div class="row justify-content-center mt-2">
                                                <div class="col-4 text-center">
                                                  {
                                                    maintenanceType.typeMaintenanceEvidences[0].maintenanceFiles.length > 0
                                                      ? <Link to={"/evidences/" + maintenanceType.id} className="btn btn-primary p-2">
                                                        {maintenanceType.name == "Refacciones" ? "Ver refacciones" : "Ver comentarios"}
                                                      </Link> : <div></div>
                                                  }
                                                </div>
                                              </div>
                                          </>
                                      )
                                    }

                                  </ul>

                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                </div>
              </div> :
              <></>
          ))
        }
      </div>

      <ModalRoute
        width="900"
        height="600"
        path="/evidences/:maintenanceTypeId(\d+)"
        component={Evidences}
        props={{ "maintenanceId": maintenanceId }} />
    </div>
  </BrowserRouter>;

MaintenanceCategoriesView.propTypes = {
  maintenanceCategories: PropTypes.array,
  maintenanceId: PropTypes.string,
  maintenance: PropTypes.object,
  noOfElementsWithEvidences: PropTypes.number,
  noOfMaintenanceTypes: PropTypes.number,
  minPhase: PropTypes.number,
  categoryDataArray: PropTypes.array,
  maintenancePerms: PropTypes.array,
};

export default MaintenanceCategoriesView;