import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import CheckEvidences from "components/binnacle/CheckEvidences";


const SecurityRevisionDetails = ({ 
  revision, 
  groupRevisions, 
  contDesv,
  selectedEvidences, 
  setSelectedEvidences,
 }) =>
  <div className="card">
    {
      selectedEvidences == null
        ? <></> 
        : <CheckEvidences
            evidences={selectedEvidences}
            setSelectedEvidences={setSelectedEvidences}
          />
    }

    <div className="card-body">
      <h2>Revisión de Seguridad</h2>
      <div className="row">
        {<div style={{ overflowY: "auto" }} className="col-md-12">
            {function () {
              return <div className="card">
                {/* <div className="card-header">
                <div className="d-flex flex-column">
                  <h3 className="card-title valid">
                    {moment(revision.createdAt).format("DD/MM/YYYY HH:mm")}
                  </h3>
                </div>
              </div> */}
                <div className="card-body">
                  <div className="row">
                    {revision.map((check, idx2) =>
                      <div key={idx2} className="col-md-12">
                        <table className="table table-bordered table-sm border text-center">
                          <thead className="bg-primary text-white">
                            <tr>
                              <th colSpan={5} className="d-flex justify-content-center align-items-center">
                                {check.name} {check.partId}
                                <button
                                  class="btn btn-link text-center accordion-btn text-white"
                                  type="button"
                                  data-toggle="collapse"
                                  data-target={"#id" + idx2}
                                  aria-expanded="true"
                                  aria-controls={"id" + idx2}
                                >
                                  <i className="fa fa-chevron-down"></i>
                                </button>
                              </th>
                            </tr>
                          </thead>
                          <div className="collapse" id={`id${idx2}`}>
                            <tbody>
                              <tr>
                                <td style={{ width: "5%" }}>No.</td>
                                <td style={{ width: "25%" }}>Categoría</td>
                                <td style={{ width: "5%" }}>Estado</td>
                                <td style={{ width: "35%" }}>Desv</td>
                                <td style={{ width: "25%" }}>Acciones</td>
                              </tr>
                              {check.checks.map((check, idx3) =>
                                <tr key={`check_${idx2}_${idx3}`}>
                                  <td>
                                    {check.securityCheckType.number}
                                  </td>
                                  <td>
                                    {check.securityCheckType.name}
                                  </td>
                                  <td>
                                    {check.deviationValue == "TRUE"
                                      ? <i className="fa fa-check text-success"></i>
                                      : check.deviationValue == "FALSE" ?
                                        <i className="fa fa-times text-danger"></i> :
                                        <i className="fa fa-clock text-secondary"></i>
                                    }
                                  </td>
                                  <td>
                                    {check.corrections != "" ? check.corrections : ""}
                                    {check.findings != "" ? check.findings : ""}
                                    {check.scpLiberation != "" ? check.scpLiberation : ""}
                                    {console.log(check.deviationValue)}
                                    {(contDesv.length > 0 && check.isDeviation == true) ? 
                                      <div>
                                        {contDesv.map((desv, idx) => (
                                          <div className = "border-bottom" key={idx}>
                                            Descripción: {desv.description}<br/>
                                            Revisión: {desv.revisionNumber}<br/>
                                            {desv.enabled ?
                                              "Habilitada"  
                                            :null}
                                            <br/>
                                            {desv.paintjob ?
                                              "Pintura"  
                                            :null}
                                            <br/>
                                            {desv.maintenance ?
                                              "Mantenimiento"
                                            :null}
                                            <br/>
                                            {desv.maneuvers ?
                                              "Maniobras"
                                            :null}
                                          </div>
                                        ))}
                                      </div>
                                    : check.value}
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-primary btn-sm"
                                      onClick={() => setSelectedEvidences(check.files)}
                                    >
                                      <i className="fa fa-eye mx-2"></i>
                                      Ver evidencias
                                    </button>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </div>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            }()}
          </div>
        }
      </div>

    </div>

  </div>;

SecurityRevisionDetails.propTypes = {
  shipping: PropTypes.object,
  groupEvidences: PropTypes.func,
  groupRevisions: PropTypes.func,
  setSelectedEvidences: PropTypes.func,
  selectedEvidences: PropTypes.array,
};

export default SecurityRevisionDetails;