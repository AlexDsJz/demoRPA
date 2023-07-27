import React from "react";
import PropTypes from "prop-types";
import Modal from "components/helpers/Modal";
import moment from "moment";
import { mapArrisCraneStatus, mapArrisFailureStatus, mapArrisFailureStatusColor } from "components/utils/enum_mapper";
import { Link } from "react-router-dom";

function getCategoryName(category) {
  if (category == "LIMPIEZA_PIE") return "Limpieza de pie";
  if (category == "LACRADO_ANCLAS_TORNILLOS_DE_PIE") return "Lacrado de anlcas y tornillo de pie";
  if (category == "LACRADO_TORNILLOS_DE_CORONA") return "Lacrado tornillos de corona";
  if (category == "TORNILLOS_ANCLA_CHAM_MECA_ELEVACION_CARRO_LACRADO")
    return "Tornillos de ancla de chamusera mecanismo de elevación y mecanismo de carro, lacrado";
  if (category == "MECANISMO_GIRO") return "Mecanismo de giro";
  if (category == "FUNCIONAMIENTO_VELETA") return "Funcionamiento de veleta";
  if (category == "MECANISMO_CARRO_ABATIMIENTO") return "Mecanismo de carro / abatimiento";
  if (category == "CABLE_CARRO_ABATIMIENTO") return "Cable de carro / abatimiento";
  if (category == "LIMITADORES") return "Limitadores";
  if (category == "REVISION_FRENO_160") return "Revisión de freno 160";
  if (category == "REVISION_PINON") return "Revisión de pinón";
  if (category == "VIDEO_TRASLACION") return "Video de traslación";
  if (category == "ABATIMIENTO") return "Abatimiento";
  if (category == "MOTOR_ELEVACION") return "Motor de elevación";
  if (category == "ARRIOSTRAMIENTO") return "Arriostramiento";
}

const SubmissionsView = ({ categories, selectedReport, setSelectedReport }) =>
  <Modal
    width={1000}
    height={600}
    onClose={() => setSelectedReport(null)}
    component={() =>
      <>
        <div className="card">
          <div className="card-header">
            <h4>Información enviada</h4>
          </div>
          <div className="card-body">

            <div className="row">
              <div className="col-md-12">
                {selectedReport.activity.length > 0 &&
                  <div className="row d-flex mt-2">
                    <div className="col-md-2 mt-1">
                      Observaciones y actividad
                    </div>
                    <div className="col-md-10">
                      <textarea
                        className="form-control"
                        value={selectedReport.activity}
                        disabled
                        style={{ resize: "none" }}
                      />
                    </div>
                  </div>
                }
                {selectedReport.failures.length > 0 &&
                  <div className="row d-flex mt-3">
                    <div className="col-md-2 mt-1">
                      Fallas y/o anomalías
                    </div>
                    <div className="col-md-10">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col" className="w-25">Falla</th>
                            <th scope="col" className="w-25">Solución</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Resuelta por</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedReport.failures.map((failure, index) =>
                            <tr key={index}>
                              <td>{failure.description}</td>
                              <td>{failure.solution.length > 0 ? failure.solution : "Sin solución"}</td>
                              <td style={{ color: mapArrisFailureStatusColor(failure.status) }}>
                                {mapArrisFailureStatus(failure.status)}
                              </td>
                              <td>
                                {failure.reported_solved &&
                                  `${failure.reported_solved.user.first_name} ` +
                                  `${failure.reported_solved.user.last_name}`}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                }

                <div className="row d-flex mt-3">
                  <div className="col-md-2 mt-1">
                    Evidencias de fallas
                  </div>
                  <div className="col-md-10">
                    <div class="list-group">
                      {selectedReport.failures.map((failure, idx) => (
                        failure.evidences.length > 0 ? (
                        <div class="list-group-item flex-column align-items-start" key={idx}>
                          <div class="d-flex w-100 justify-content-between" data-toggle="collapse"
                            href={`#details-failures`} role="button" aria-expanded="false"
                            aria-controls={`details-failures`}
                          >
                            <span class="badge badge-primary badge-pill" style={{ fontSize: "14px" }}>
                              {failure.evidences.length}
                            </span>
                          </div>

                          <div class="collapse my-3" id={`details-failures`}>
                            <div class="card card-body shadow-none" style = {{overflowX:"auto"}}>
                              <div className="d-flex mb-2" style={{ maxWidth: "auto"}}>
                                <>
                                  {failure.evidences.map((evidence, index) => (
                                    <div 
                                      className="d-flex flex-column align-items-center mr-3" 
                                      key = {index} 
                                      style = {{ maxHeight:"auto"}}>
                                      <div className = "ml-2">
                                        <a href={evidence.url} target="_blank" rel="noopener noreferrer">
                                          {function () {
                                            if (evidence.url.includes(".mp4"))
                                              return <video
                                                style={{ height: "12em" }}
                                                controls={true}
                                              >
                                                <source src={evidence.url} type="video/mp4" />
                                              </video>
                                            else
                                              return <img
                                                style={{ maxHeight: "12em"}}
                                                className="img-fluid mx-0"
                                                src={evidence.url}
                                                alt={"Evidencia " + index}
                                              />
                                          }()}
                                        </a>
                                        <b className="mt-1">
                                          {moment.utc(evidence.createdAt).local().format("DD/MM/YYYY HH:mm")}
                                        </b>
                                      </div>
                                    </div>
                                  ))}
                                </>
                              </div>
                            </div>
                          </div>
                        </div>
                        ) :
                        (
                          <div className="card card-body shadow-none" key = {idx}>
                            <div className="d-flex w-100 text-center">
                              No hay evidencias para esta falla
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                </div>

                {selectedReport.binnacle.length > 0 &&
                  <div className="row d-flex mt-3">
                    <div className="col-md-2 mt-1">
                      Bitácora
                    </div>
                    <div className="col-md-10">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Tipo</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Estado</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedReport.binnacle.map((binnacle, index) =>
                            <tr key={index}>
                              <td>{binnacle.type}</td>
                              <td>{binnacle.name}</td>
                              <td className={binnacle.status == "NOT_OK" ? "text-danger" : ""}>
                                {mapArrisCraneStatus(binnacle.status)}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                }
                {selectedReport.evidences.length > 0 &&
                  <div className="row d-flex mt-3">
                    <div className="col-md-2 mt-1">
                      Evidencias
                    </div>
                    <div className="col-md-10">
                      <div class="list-group">
                        {
                          categories.map((category) => (

                            <div class="list-group-item flex-column align-items-start" key={category.id}>
                              <div class="d-flex w-100 justify-content-between" data-toggle="collapse"
                                href={`#details-${category.id}`} role="button" aria-expanded="false"
                                aria-controls={`details-${category.id}`}
                              >
                                {getCategoryName(category.name)}
                                <span class="badge badge-primary badge-pill" style={{ fontSize: "14px" }}>
                                  {category.evidences.length}
                                </span>
                              </div>

                              <div class="collapse my-3" id={`details-${category.id}`}>
                                <div class="card card-body shadow-none">
                                  <div className="d-flex align-items-center w-100 mb-2" style={{ overflowX: "auto" }}>
                                    {
                                      category.evidences.map((evidence, index) => (
                                        <div key={index} className="d-flex flex-column align-items-center mr-3">
                                          <a href={evidence.file.url} target="_blank" rel="noopener noreferrer">
                                            {function () {
                                              if (evidence.file.url.includes(".mp4"))
                                                return <video
                                                  style={{ height: "12em" }}
                                                  controls={true}
                                                >
                                                  <source src={evidence.file.url} type="video/mp4" />
                                                </video>
                                              else
                                                return <img
                                                  style={{ maxHeight: "12em" }}
                                                  className="img-fluid mx-0"
                                                  src={evidence.file.url}
                                                  alt={"Evidencia " + index}
                                                />
                                            }()}
                                          </a>
                                          <b className="mt-1">
                                            {moment.utc(evidence.createdAt).local().format("DD/MM/YYYY HH:mm")}
                                          </b>
                                        </div>
                                      ))
                                    }
                                  </div>
                                </div>
                              </div>

                            </div>
                          ))
                        }
                      </div>
                    </div>

                  </div>
                }
                {selectedReport.evidences.length == 0 && selectedReport.binnacle.length == 0 &&
                  selectedReport.failures.length == 0 && selectedReport.activity.length == 0 &&
                  selectedReport.status != "MISSING" &&
                  <>
                    <div className="row justify-content-center text-center"> Sin evidencias </div>
                  </>
                }
                {selectedReport.binnacles.length > 0 &&
                  <div className="row d-flex mt-3">
                    <div className="col-md-2 mt-1">
                      Bitácoras
                    </div>
                    <div className="col-md-10">
                      <div class="list-group">
                        <div class="list-group-item flex-column align-items-start">
                          <div class="d-flex w-100 justify-content-between" data-toggle="collapse"
                            href={`#details-binnacles`} role="button" aria-expanded="false"
                            aria-controls={`details-binnacles`}
                          >
                            <span class="badge badge-primary badge-pill" style={{ fontSize: "14px" }}>
                              {selectedReport.binnacles.length}
                            </span>
                          </div>

                          <div class="collapse my-3" id={`details-binnacles`}>
                            <div class="card card-body shadow-none">
                              <div className="d-flex align-items-center w-100 mb-2" style={{ overflowX: "auto" }}>
                                {
                                  selectedReport.binnacles.map((binnacle, index) => (
                                    <div key={index} className="d-flex flex-column align-items-center mr-3">
                                      <a href={binnacle.url} target="_blank" rel="noopener noreferrer">
                                        {function () {
                                          if (binnacle.url.includes(".mp4"))
                                            return <video
                                              style={{ height: "12em" }}
                                              controls={true}
                                            >
                                              <source src={binnacle.url} type="video/mp4" />
                                            </video>
                                          else
                                            return <img
                                              style={{ maxHeight: "12em" }}
                                              className="img-fluid mx-0"
                                              src={binnacle.url}
                                              alt={"Evidencia " + index}
                                            />
                                        }()}
                                      </a>
                                      <b className="mt-1">
                                        {moment.utc(binnacle.createdAt).local().format("DD/MM/YYYY HH:mm")}
                                      </b>
                                    </div>
                                  ))
                                }
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                  </div>
                }
                {selectedReport.binnacles.length == 0  &&
                  <>
                    <div className="row justify-content-center text-center mt-3"> Sin bitácoras </div>
                  </>
                }
                {selectedReport.status == "MISSING" &&
                  <>
                    <div className="row d-flex justify-content-center text-center">
                      <div className="col">
                        {selectedReport.reason_missing}
                      </div>
                    </div>
                    <div className="d-flex justify-content-center my-2">
                      <Link to={{ pathname: "/justify", state: { report: selectedReport } }}>
                        <span className="btn btn-secondary" role="button">Justificar</span>
                      </Link>
                    </div>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </>
    }
  />;

SubmissionsView.propTypes = {
  categories: PropTypes.array,
  selectedReport: PropTypes.object,
  setSelectedReport: PropTypes.func
};

export default SubmissionsView;