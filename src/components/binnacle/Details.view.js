import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import CheckEvidences from "components/binnacle/CheckEvidences";

const OperationDetails = ({ shipping, groupEvidences, groupRevisions, selectedEvidences, setSelectedEvidences })  => 
  <div className="card">

    {
      selectedEvidences == null
        ? <></> 
        : <CheckEvidences
            evidences={selectedEvidences}
            setSelectedEvidences={setSelectedEvidences}
          />
    }

    <div className="card-header">
      <div className="d-flex flex-column">
        <h3 className="card-title valid">
          Datos del Envío
        </h3>
      </div>
    </div>

    <div className="card-body">
      
      <h2>Datos Generales</h2>

      <div className="row">
        <div className="col-md-3">
          <div class="form-group form-group-default">
            <label class="control-label">Transportista</label>
            <input type="text" class="form-control" value={shipping.transportCarrierName} disabled/>
          </div>
        </div>
        <div className="col-md-3">
          <div class="form-group form-group-default">
            <label class="control-label">Placas</label>
            <input type="text" class="form-control" value={shipping.transportPlate} disabled/>
          </div>
        </div>
        <div className="col-md-3">
          <div class="form-group form-group-default">
            <label class="control-label">Fecha de entrega</label>
            <input type="text" class="form-control" 
              value={moment(shipping.deliveryDate).format("DD/MM/YYYY")} disabled/>
          </div>
        </div>
        <div className="col-md-3">
          <div class="form-group form-group-default">
            <label class="control-label">Nombre del cliente</label>
            <input type="text" class="form-control" value={shipping.order.clientName} disabled/>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div class="form-group form-group-default">
            <label class="control-label">Dirección</label>
            <input type="text" class="form-control" disabled
              value={shipping.order.buildingStreet + " " + 
                shipping.order.buildingStreet + " " + shipping.order.buildingStreet}/>
          </div>
        </div>
      </div>

      <h2>Revisiones</h2>

      <div className="row">
        { shipping.order.securityRevisions.length == 0 
          ? <div className="d-flex text-center w-100 align-items-center justify-content-center"
              style={{minHeight: "5em"}}>
                <h4>No hay revisiones registradas</h4>
              </div>
          : <div style={{overflowY: "auto"}} className="col-md-12">
            {function(){
              
              const grouped = groupRevisions();

              return grouped.map((revision, idx) => (
                  <div key={idx} className="card">
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
                                  <td style={{width: "5%"}}>No.</td>
                                  <td style={{width: "25%"}}>Categoría</td>
                                  <td style={{width: "5%"}}>Estado</td>
                                  <td style={{width: "35%"}}>Desv</td>
                                  <td style={{width: "25%"}}>Acciones</td>
                                </tr>
                                {check.checks.map((check, idx3) =>
                                  <tr key={`check_${idx}_${idx2}_${idx3}`}>
                                    <td>
                                      {check.securityCheckType.number}
                                    </td>
                                    <td>
                                      {check.securityCheckType.name}
                                    </td>
                                    <td>
                                      {check.deviationValue == "TRUE" 
                                        ? <i className="fa fa-check text-success"></i> 
                                        : check.deviationValue == "FALSE"  ? 
                                        <i className="fa fa-times text-danger"></i> :
                                        <i className="fa fa-clock text-secondary"></i> 
                                      }
                                    </td>
                                    <td>
                                      {check.value}
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
              ))
            }()}
          </div>
        }
      </div>

      <h2 className="mt-4">Evidencias</h2>

      <div className="row">
        { shipping.evidences.length == 0 
          ? <div className="d-flex text-center w-100 align-items-center justify-content-center" 
              style={{minHeight: "5em"}}>
                <h4>No hay evidencias registradas</h4>
            </div>
          : <div style={{overflowY: "auto"}} className="col-md-12">
              {function(){

                const grouped = groupEvidences();
                const userTypes = Object.keys(grouped);

                return userTypes.map((key, idx1) => {

                  const users = Object.keys(grouped[key]);

                  return users.map((key2, idx2) => 
                    <div key={idx1 + "-" + idx2}>

                      {/* This grouping function returns an array which 0 index represents data grouped */}

                      <div className="d-flex">
                        <h4>
                          {grouped[key][key2][0].user.firstName + " " + grouped[key][key2][0].user.lastName}
                        </h4>
                        <h5 className="mx-2">
                          -
                        </h5>
                        <b>
                          {function(){
                            if(grouped[key][key2][0].user.rol == "ADMIN")
                              return "Administrador";
                            else if(grouped[key][key2][0].user.rol == "BUILDING_OPERATOR")
                              return "Operador de obra";
                            else if(grouped[key][key2][0].user.rol == "WORKSHOP_OPERATOR")
                              return "Trabajador taller";
                            else if(grouped[key][key2][0].user.rol == "QUALITY_CONTROL")
                              return "Control de calidad";
                          }()}
                        </b>
                      </div>

                      <div className="d-flex align-items-center w-100 mb-2" style={{overflowX: "auto"}}>
                        {grouped[key][key2].map((evidence, idx3) => 
                          <div key={idx1 + "-" + idx2 + "-" + idx3} 
                            className="d-flex flex-column align-items-center mr-3">
                              <a href={evidence.evidenceFile.url} target="_blank" rel="noopener noreferrer">
                                {
                                  evidence.evidenceFile.url.includes("mp4") 
                                    ? <video style={{maxHeight: "12em"}} className="img-fluid mx-0" controls>
                                        <source src={evidence.evidenceFile.url} type="video/mp4"/>
                                      </video>
                                    : <img style={{maxHeight: "12em"}} className="img-fluid mx-0"
                                        src={evidence.evidenceFile.url} alt={"Evidencia " + idx3}/>
                                }
                              </a>
                            <b className="mt-1">
                              {moment.utc(evidence.createdAt).local().format("DD/MM/YYYY HH:mm")}
                            </b>
                          </div>
                        )}
                      </div>

                      {idx1 != userTypes.length - 1 && idx2 != users.length - 1 && 
                        <hr style={{width: "100%"}}></hr>}

                    </div>
                  );

                });
                
              }()}
            </div>
        }
      </div>

    </div>
    
  </div>;

OperationDetails.propTypes = {
  shipping: PropTypes.object,
  groupEvidences: PropTypes.func,
  groupRevisions: PropTypes.func,
  setSelectedEvidences: PropTypes.func,
  selectedEvidences: PropTypes.array,
};
  
export default OperationDetails;