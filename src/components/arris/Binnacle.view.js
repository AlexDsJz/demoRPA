import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const BinnacleView = ({ operator }) =>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col d-flex align-items-center">
          <h1 class="">{operator.user.firstName + " " + operator.user.lastName}</h1>
          <h4 className="pt-1 mx-3">
            {function(){
              if(operator.turn == "FIRST")
                return "Primer turno";
              else if(operator.turn == "SECOND")
                return "Segundo turno";
              else if(operator.turn == "SECURITY")
                return "Supervisor de seguridad";
            }()}
          </h4>
        </div>
      </div>
      <hr/>
      <div className="container p-0">
        {operator.operatorArrisForms.map((form, index) => 
          <div key={index} className="p-3 table-bordered">
            <a 
              role="button" 
              data-toggle="collapse" 
              href={"#collapse" + index} 
              aria-expanded="false" 
              aria-controls={"collapse" + index} 
              className="d-flex"
            >
              <h3>Bitácora - {moment(form.createdAt).format("DD/MM/YYYY")}</h3>
              <i class="fas fa-angle-down mx-3 pt-1"></i>
            </a>
            <div className="collapse" id={"collapse" + index}>
              <div className="row d-flex mt-2">
                <div className="col-md-2 mt-1">
                  Observaciones y actividad
                </div>
                <div className="col-md-10">
                  <textarea className="form-control" value={form.activity} disabled style={{resize: "none"}}/>
                </div>
              </div>
              <div className="row d-flex mt-3">
                <div className="col-md-2 mt-1">
                  Fallas y/o anomalías
                </div>
                <div className="col-md-10">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Descripción</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Solucionada</th>
                      </tr>
                    </thead>
                    <tbody>
                      {form.arrisFailures.map((failure, index) => 
                        <tr key={index}>
                          <td>{failure.description}</td>
                          <td>
                            {function(){
                              if(failure.status == "REPORTED") return "Repordata";
                              if(failure.status == "ASSIGNED") return "Asignada";
                              if(failure.status == "SOLVED") return "Resuelta";
                            }()}
                          </td>
                          <td>
                            {failure.solvedReport ? "Si" : "No"}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
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
                      {form.arrisCraneStatuses.map((binnacle, index) => 
                        <tr key={index}>
                          <td>{binnacle.type}</td>
                          <td>{binnacle.name}</td>
                          <td>
                            {function(){
                              if(binnacle.status == "OK") return "Correcto";
                              if(binnacle.status == "NOT_OK") return "Incorrecto";
                              if(binnacle.status == "NA") return "N/A";
                            }()}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row d-flex mt-3">
                <div className="col-md-2 mt-1">
                  Evidencias
                </div>
                <div className="col-md-10">
                  <div className="d-flex align-items-center w-100 mb-2" style={{overflowX: "auto"}}>
                    {form.arrisFiles.map((evidence, index) => 
                      <div key={index} 
                        className="d-flex flex-column align-items-center mr-3">
                          <a href={evidence.file.url} target="_blank" rel="noopener noreferrer">
                            {
                              evidence.file.url.includes("mp4") 
                                ? <video style={{maxHeight: "12em"}} className="img-fluid mx-0" controls>
                                    <source src={evidence.file.url} type="video/mp4"/>
                                  </video>
                                : <img style={{maxHeight: "12em"}} className="img-fluid mx-0"
                                    src={evidence.file.url} alt={"Evidencia " + index}/>
                            }
                          </a>
                        <b className="mt-1">
                          {moment.utc(evidence.createdAt).local().format("DD/MM/YYYY HH:mm")}
                        </b>
                      </div>
                    )}
                    {form.arrisFiles == 0 && <span className="mt-1">No hay evidencias registradas</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {operator.operatorArrisForms.length == 0 &&
          <div className="d-flex justify-content-center">
            <h3>No hay registros</h3>
          </div>
        }
      </div>
    </div>
  </div>;

BinnacleView.propTypes = {
  operator: PropTypes.object
};

export default BinnacleView;