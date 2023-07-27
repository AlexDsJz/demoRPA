import React from "react";
import PropTypes from "prop-types";
import { Typeahead } from "react-bootstrap-typeahead";
import Advice from "components/helpers/Advice";

const UploadView = ({ 
  order, 
  orders, 
  setOrder, 
  callDownload, 
  loadFile, 
  onClickRetry, 
  onClose, 
  logs, 
  step,
  setShippingType,
  statusUpload
}) => 
  <div className="card px-3 py-2">
    <div className="card-header">
      <h3 className="card-header-title">Cargar embarques</h3>
    </div>
    <div className="card-body">

      {step == 1 && 
        <>
          <div className="row">
            <div className="col-md-12">
              <h4> 1.- Seleccione una orden </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div class="form-group form-group-default required">
                <label class="control-label">Orden</label>
                <Typeahead
                  id="order"
                  required
                  placeholder="Selecciona una orden"
                  labelKey={(option) => option.crane.model + "" + option.crane.number + "/ " + option.crane.series}
                  options={orders}
                  onChange={(selected) => {
                    if(selected.length > 0) 
                      setOrder(selected[0]);
                  }}
                />
              </div>
            </div>
          </div>
          {
            order != null && <>
            
              <div className="row">
                <div className="col-md-12">
                  <h4> 2.- Descargue los datos registrados </h4>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <button 
                    className="btn btn-secondary btn-block" 
                    type="button"
                    onClick={() => {
                      if(order != null) 
                        callDownload({ order_id: order.id });
                    }}
                  >
                    Descargar
                  </button>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-12">
                  <h4> 3.- Realice los cambios deseados </h4>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-12">
                  <h4> 4.- Seleccione el destino del embarque </h4>
                  <div class="form-group form-group-default required">
                    <label class="control-label">Tipo de embarque</label>
                    <select onChange={(e) => setShippingType(e.target.value)} className="form-control">
                      <option value="">Seleccione una opción</option>
                      <option value="TO_BUILDING">Obra</option>
                      <option value="FROM_BUILDING">Taller</option>
                    </select>
                    <div class="invalid-feedback">Required</div>
                  </div>     
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <h4> 5.- Suba el archivo modificado </h4>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <button className="btn btn-primary btn-block" type="button" onClick={() => loadFile(order)}>
                    <i class="tio-add mr-1"></i>Cargar embarques
                  </button>
                </div>
              </div>
            </>
          }
        </>
      }

      {logs != null && step == 2 &&
        <>
          <div className="row bg-light">
            <div className="col-md-12">
              <h4>
                {
                  logs.length > 0 ? "Cambios realizados" : "No se han realizado cambios"
                }
              </h4>
              {logs.map((log, index) =>
                <div key={index}>
                  <p>
                    <span 
                      className={function(){
                        if(log.type == "DELETE") return "text-warning font-weight-bold mr-2";
                        if(log.type == "UPDATE") return "text-info font-weight-bold mr-2";
                        if(log.type == "CREATE") return "text-success font-weight-bold mr-2";
                        if(log.type == "ERROR") return "text-danger font-weight-bold mr-2";
                      }()}
                    >
                      {function(){
                        if(log.type == "DELETE") return <i class="tio-delete"></i>;
                        if(log.type == "UPDATE") return <i class="tio-edit"></i>;
                        if(log.type == "CREATE") return <i class="tio-add"></i>;
                        if(log.type == "ERROR") return <i class="tio-error"></i>;
                      }()}
                    </span>
                    {log.message}
                  </p>
                </div>  
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {
                statusUpload == 200 &&  
                  <button className="btn btn-primary btn-block" type="button" onClick={onClose}>
                   Finalizar
                  </button>
              }
              {
                statusUpload == 400 &&  
                  <button className="btn btn-primary btn-block" type="button" onClick={onClickRetry}>
                   Reintentar
                  </button>
              }
            </div>
          </div>
        </>
      }

      {step == 3 &&
        <>
          <Advice 
            title="Ha ocurrido un error"
            subtitle={statusUpload == 400 
              ? "Revise que el formato del archivo sea correcto" 
              : "Ha ocurrido un error inesperado"}
            btnTitle="Volver a intentar"
            error="true"
            onClose={onClose}
            onClick={onClickRetry}
          />
        </>
      }
      
    </div>
  </div>;

UploadView.propTypes = {
  orders: PropTypes.array,
  setOrder: PropTypes.func,
  callDownload: PropTypes.func,
  order: PropTypes.object,
  callUpload: PropTypes.func,
  logs: PropTypes.string,
  step: PropTypes.number,
  onClickRetry: PropTypes.func,
  onClose: PropTypes.func,
  loadFile: PropTypes.func,
  setShippingType: PropTypes.func,
  statusUpload: PropTypes.number,
};

export default UploadView;