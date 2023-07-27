import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ReactToPrint from "react-to-print";
import moment from "moment";

const MaintenanceReportView = ({ 
  maintenance, 
  maintenanceCategories, 
  toPrintRef,
}) => (
  <div class="card">
    <div style={{ border: "none" }} class="m-5" ref={toPrintRef}>
      <div className="mx-0 my-0" style={{ "border-bottom": "2px solid black" }}>
        <div className="row mx-4 my-4">
          <div class="col-2">
            <img src="/theme/img/comansaLogo.png" className="logo-header" width="150" alt="Comansa" />
          </div>
          <div class="col-6 position-relative">
            <h1 class="position-absolute" style={{ top: "30%", left: "30%" }}>
              Mantenimiento
            </h1>
          </div>
          <div class="col-4">
            <img src="/theme/img/groke.png" className="logo-header" width="230" alt="Groke" />
          </div>
        </div>
      </div>

      <div className="row m-0 mt-3">
        <div class="col-6 p-0">
          <table
            class="table"
            style={{
              "border-bottom": ".0625rem solid rgba(231,234,243,.7)",
              "border-right": ".0625rem solid rgba(231,234,243,.7)",
              "border-left": ".0625rem solid rgba(231,234,243,.7)",
            }}
          >
            <tbody>
              <tr>
                <th scope="row" class="border border-dark">
                  Fecha de inicio
                </th>
                <th scope="row" class="border border-dark">
                  {maintenance?.start ? moment.utc(maintenance.start).format("YYYY/MM/DD") : "-"}
                </th>
              </tr>
              <tr>
                <th scope="row" class="border border-dark">
                  Fecha de fin
                </th>
                <th scope="row" class="border border-dark">
                  {maintenance?.end ? moment.utc(maintenance.end).format("YYYY/MM/DD") : "-"}
                </th>
              </tr>
              <tr>
                <th scope="row" class="border border-dark">
                  Modelo de grúa
                </th>
                <th scope="row" class="border border-dark">
                  {maintenance?.crane?.model}
                </th>
              </tr>
              <tr>
                <th scope="row" class="border border-dark">
                  Serie de grúa
                </th>
                <th scope="row" class="border border-dark">
                  {maintenance?.crane?.series}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="row m-0 mt-5">
        <h2>ACTIVIDADES</h2>
        <div class="col-md-12 mt-3">
          {
            maintenanceCategories.map((maintenanceCategory) => (
              <div class="mt-5">
                <h3 key={maintenanceCategory.id}>{maintenanceCategory.name}</h3>
                <ul>
                  <div class="row mt-5">
                    <div class="col-md-4 align-self-center">
                      <h4>Responsables</h4>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <ul>
                        {
                          maintenanceCategory.categoryMaintenancePermses[0].users.length > 0
                            ? maintenanceCategory.categoryMaintenancePermses[0].users.map((maintenanceUser) =>
                              <li key={maintenanceUser.id}>
                                {maintenanceUser.firstName + " (" + maintenanceUser.email + ")"}
                              </li>
                            )
                            : <p class="text-danger">
                              Aún no se han agregado responsables para esta categoría
                            </p>
                        }
                      </ul>
                    </div>
                  </div>
                  <div class="row mt-5">
                    <div class="col-md-4 align-self-center">
                      <h4>Evidencias</h4>
                    </div>
                  </div>
                  {
                    maintenanceCategory.categoryMaintenanceTypes.filter((maintenanceType) => maintenanceType.name != "Refacciones" && maintenanceType.name != "Comentarios").map((maintenanceType) => (
                      <li class="list-checked-item" key={maintenanceType.id}>
                        <div>
                          {maintenanceType.name} <b>({maintenanceType.typeMaintenanceEvidences[0].maintenanceFiles.length} evidencias)</b>
                        </div>
                        <div class="d-flex flex-wrap">
                          {
                            maintenanceType.typeMaintenanceEvidences[0].maintenanceFiles.map((evidenceMaintenance) => (
                              <>
                                {
                                  function () {

                                    const url = evidenceMaintenance.url;
                                    const urlSplitted = url.split(".")
                                    const isVideo = urlSplitted[urlSplitted.length - 1] == "mp4";

                                    if (isVideo) {
                                      return (
                                        <div style={{ maxWidth: "100px", marginLeft: "10px" }}>
                                          <video src={evidenceMaintenance.url} style={{ maxWidth: "100px" }} controls /> <br />
                                          <a style={{ textDecoration: "underline" }} href={evidenceMaintenance.url} rel="noreferrer" target="_blank">Ver video</a>
                                        </div>
                                      )
                                    } else {
                                      return (
                                        <div style={{ maxWidth: "100px", marginLeft: "10px" }}>
                                          <img src={evidenceMaintenance.url} alt="Foto de la evidencia" style={{ maxWidth: "100px" }} /> <br />
                                          <a style={{ textDecoration: "underline" }} href={evidenceMaintenance.url} rel="noreferrer" target="_blank">Ver imagen</a>
                                        </div>
                                      )
                                    }

                                  }()
                                }

                              </>
                            ))
                          }
                        </div>
                      </li>
                    ))
                  }
                  {
                    maintenanceCategory.categoryMaintenanceTypes.filter((maintenanceType) => maintenanceType.name == "Refacciones" || maintenanceType.name == "Comentarios").map((maintenanceType) => (
                      <div key={maintenanceType.id}>
                        <div class="row mt-5" key={maintenanceType.id}>
                          <div class="col-md-4 align-self-center">
                            <h4>{maintenanceType.name}</h4>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <ul>
                              <b>
                                {
                                  maintenanceType.typeMaintenanceEvidences[0].value ||
                                    maintenanceType.typeMaintenanceEvidences[0].maintenanceFiles.length > 0 ? (
                                    <li>{maintenanceType.typeMaintenanceEvidences[0].value}</li>
                                  ) : (
                                    maintenanceType.name == "Refacciones" ?
                                      (
                                        <li>No se agregaron refacciones</li>
                                      ) : <li>No se agregaron comentarios</li>
                                  )
                                }
                              </b>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </ul>
                <hr style={{ border: "1px solid black", marginTop: "20px" }} />
              </div>
            ))
          }
        </div>
      </div>

      <div className="row m-0 mt-5">
        <div class="col-6 p-0">
          <table
            class="table"
            style={{
              "border-bottom": ".0625rem solid rgba(231,234,243,.7)",
              "border-right": ".0625rem solid rgba(231,234,243,.7)",
              "border-left": ".0625rem solid rgba(231,234,243,.7)",
            }}
          >
            <tbody>
              <tr>
                <th scope="row" class="border border-dark" style={{ width: "40%" }}>Validación</th>
                <th scope="row" class="border border-dark" style={{ width: "60%" }}></th>
              </tr>
              <tr>
                <th scope="row" class="border border-dark" style={{ width: "40%" }}>Nombre</th>
                <th scope="row" class="border border-dark" style={{ width: "60%" }}></th>
              </tr>
              <tr>
                <th scope="row" class="border border-dark" style={{ width: "40%" }}>Actividad terminada</th>
                <th scope="row" class="border border-dark" style={{ width: "60%" }}></th>
              </tr>
              <tr>
                <th scope="row" class="border border-dark" style={{ width: "40%" }}>Limpieza área de trabajo</th>
                <th scope="row" class="border border-dark" style={{ width: "60%" }}></th>
              </tr>
              <tr>
                <th scope="row" class="border border-dark" style={{ width: "40%" }}>Calificación</th>
                <th scope="row" class="border border-dark" style={{ width: "60%" }}></th>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-1 position-relative"></div>
        <div class="col-5 p-0">
          <table
            class="table"
            style={{
              "border-bottom": ".0625rem solid rgba(231,234,243,.7)",
              "border-left": ".0625rem solid rgba(231,234,243,.7)",
              "border-right": ".0625rem solid rgba(231,234,243,.7)",
            }}
          >
            <tbody>
              <tr>
                <th scope="row" class="border border-dark" style={{ width: "40%" }}>Firma de seguridad</th>
                <th scope="row" class="border border-dark" style={{ width: "60%" }}></th>
              </tr>
              <tr>
                <th scope="row" class="border border-dark" style={{ width: "40%" }}>Firma de supervisor</th>
                <th scope="row" class="border border-dark" style={{ width: "60%" }}></th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <ReactToPrint
      debug={true}
      content={() => toPrintRef.current}
      trigger={() =>
        <button className="btn btn-primary btn-block w-50 mx-auto mt-3 mb-6">
          Imprimir reporte de mantenimiento
        </button>
      }
    />

  </div>
)
MaintenanceReportView.propTypes = {};

export default MaintenanceReportView;