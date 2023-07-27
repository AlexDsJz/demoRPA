import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { Typeahead } from "react-bootstrap-typeahead";
import { CSVLink } from "react-csv";
import FormItemSave from "components/shippings/FormItemSave";
import FormItemSet from "components/shippings/FormItemSet";
import Advice from "components/helpers/Advice";
import moment from "moment";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import "styles/css/Form.css";

const ShippingForm = ({ 
  orders, 
  order, 
  shipping = {}, 
  suggestions, 
  selectedParts, 
  setSelectedParts, 
  onAddPart, 
  onRemovePart, 
  setOrder, 
  cranes = [], 
  onSubmit, 
  onClose, 
  error, 
  step, 
  setStep, 
  onPrev, 
  hideModal, 
  setHideModal,
  hideEditModal, 
  setHideEditModal, 
  content, 
  setContent, 
  onClickRetry 
}) => 
  <div class="card px-3 py-2">

    {hideModal 
      ? <></> 
      : <FormItemSave 
          setHideModal={setHideModal}
          selectedParts={selectedParts}
          setSelectedParts={setSelectedParts}
    />}

    {hideEditModal 
      ? <></> 
      : <FormItemSet
          content={content}
          setHideModal={setHideEditModal}
          selectedParts={selectedParts}
          setSelectedParts={setSelectedParts}/>
    }

    {/* Header */}
    {step < 3 
      ? <div class="card-header">
          <div className="row pl-2">
            <h3 class="card-header-title"> 
              {step == 1 && <>{shipping.id ? "Actualizar embarque" : "Nuevo embarque"}</>}
              {step == 2 && <>Contenido del embarque</>}
            </h3>
            <h5 class="card-header-title step-title mx-3 mt-1">Paso {step} de 2</h5>
          </div>
          <div>
            {step == 2 && 
              <button type="text" className="btn btn-primary mr-4" onClick={() => setHideModal(false)}>
                Agregar pieza
              </button>
            }
            {/* {step == 2 && 
              <CSVLink className="btn btn-primary" 
                filename={order.crane.craneId + "_" + order.clientName + "_sugerencias.csv"} 
                data={[
                  [
                    "Parte",
                    "ID Parte",
                    "Cantidad",
                    "U.M.",
                    "Items"
                  ],
                  ...suggestions.map((suggestion => 
                    [
                      suggestion.part.name,
                      suggestion.part.partId,
                      suggestion.quantity,
                      suggestion.part.um,
                      suggestion.part.items.map(item => item.quantity + " " + item.name + " " + item.description)
                        .join(" ; "),
                    ]
                  ))
                ]}>
                  Imprimir sugerencias
              </CSVLink>
            } */}
          </div>
        </div>
      : <></>
    }

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={{
            delivery_date: shipping.deliveryDate 
              ? moment(shipping.deliveryDate).format("YYYY-MM-DD") 
              : moment().format("YYYY-MM-DD"),
            shipping_date: shipping.createdAt 
              ? moment(shipping.createdAt).format("YYYY-MM-DD")   
              : moment().format("YYYY-MM-DD"),
            truck_plate: shipping.truckPlate??"",
            transport_company: shipping.transportCompany??"",
            transport_carrier_name: shipping.transportCarrierName??"",
            transport_plate: shipping.transportPlate??"",
            transport_phone: shipping.transportPhone??"",
            transport_other_phone: shipping.transportOtherPhone??"",
            type: shipping.type??"TO_BUILDING",
          }}
          onSubmit={onSubmit}>
          {({ values, setFieldValue }) =>
          <Form>

            {/* Step 1 */}
            {step === 1 && 
              <>
                <div class="mb-2">

                  <div className="row mt-2">
                    <div className="col-md-6">
                      <div class="form-group form-group-default required">
                        <label class="control-label">Grúa a la que pertenece</label>
                        <Typeahead
                          id="order"
                          required
                          placeholder="Selecciona una grúa"
                          defaultInputValue={order 
                            ? order.crane.model + "" + order.crane.number + "/ " + order.crane.series 
                            : ""
                          }
                          labelKey={(option) => 
                            option.crane.model + "" + option.crane.number + "/ " + option.crane.series
                          }
                          options={orders}
                          onChange={(selected) => {
                            if(selected.length > 0)
                              setOrder(selected[0]);
                          }}/>
                        <div class="invalid-feedback">Required</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="form-group form-group-default required">
                        <label class="control-label">Destino del embarque</label>
                        <Field as="select" className="form-control" name="type" required>
                          <option value="">Seleccione una opción</option>
                          <option value="TO_BUILDING">Obra</option>
                          <option value="FROM_BUILDING">Taller</option>
                        </Field>
                        <div class="invalid-feedback">Required</div>
                      </div>
                    </div>
                  </div>

                  <h4 className="mb-4 mt-2">Datos del Embarque</h4>

                  <div className="row">
                    <div className="col-md-6">
                      <div class="form-group form-group-default">
                        <label class="control-label">Nombre del cliente</label>
                        <Field type="text" name="contactName" id="contactName" class="form-control" 
                          value={order ? order.clientName : ""} disabled/>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="form-group form-group-default">
                        <label class="control-label">Destino</label>
                        <Field type="text" name="buildingAddress" id="buildingAddress" class="form-control"
                          value={order ? order.buildingStreet : ""} disabled/>
                        <div class="invalid-feedback">Required</div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div class="form-group form-group-default">
                        <label class="control-label">Grúa</label>
                        <Field type="text" name="model" id="model" class="form-control"
                          value={order ? order.crane.craneId : ""} disabled/>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="form-group form-group-default">
                        <label class="control-label">Serie</label>
                        <Field type="text" name="series" id="series" class="form-control" 
                          value={order ? order.crane.series : ""} disabled/>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div class="form-group form-group-default required">
                        <label class="control-label">Fecha de entrega</label>
                        <Field type="date" name="delivery_date" class="form-control" required/>
                        <div class="invalid-feedback">Required</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="form-group form-group-default required">
                        <label class="control-label">Fecha de la orden de embarque</label>
                        <Field type="date" name="shipping_date" class="form-control" required/>
                        <div class="invalid-feedback">Required</div>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="mb-4 mt-3">Datos de Contacto con Transportista</h4>

                  <div className="row">
                    <div className="col-md-4">
                      <div class="form-group form-group-default required">
                        <label class="control-label">Nombre del conductor</label>
                        <Field type="text" name="transport_carrier_name" class="form-control" required/>
                        <div class="invalid-feedback">Required</div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div class="form-group form-group-default">
                        <label class="control-label">Teléfono celular</label>
                        <Field type="tel" name="transport_phone" class="form-control"/>
                        <div class="invalid-feedback">Required</div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div class="form-group form-group-default">
                        <label class="control-label">Teléfono (otro)</label>
                        <Field type="tel" name="transport_other_phone" class="form-control"/>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div class="form-group form-group-default required">
                        <label class="control-label">No. de placas</label>
                        <Field type="text" name="transport_plate" class="form-control" required/>
                        <div class="invalid-feedback">Required</div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div class="form-group form-group-default">
                        <label class="control-label">Placas de caja</label>
                        <Field type="text" name="truck_plate" class="form-control"/>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div class="form-group form-group-default">
                        <label class="control-label">Compañía transportista</label>
                        <Field type="text" name="transport_company" class="form-control"/>
                      </div>
                    </div>
                  </div>
                
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <button type="submit" class="btn btn-block btn-primary">Siguiente</button>
                  </div>
                  <div className="col-md-6">
                    <button type="button" class="btn btn-block btn-secondary" onClick={onClose}>Cancelar</button>
                  </div>
                </div>
              </>
            }

            {/* Step 2 */}
            {step === 2 && 
              <>
                <div class="mb-0">

                  <div className="row">
                    <div className="col-md-6 text-center">
                      <h3>Sugerencias</h3>
                    </div>
                    <div className="col-md-6 text-center">
                      <h3>Piezas cargadas</h3>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6 p-1 suggestion-container">
                      <table className="table table-striped table-hover">
                        <thead>
                          <tr>
                            <th style={{width: "35%"}}>Descripción</th>
                            <th style={{width: "8%"}}>Q</th>
                            <th style={{width: "50%"}}>Observaciones</th>  
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {suggestions.map((suggestion, idx) => 
                            <tr key={idx}>
                              <td>
                                {
                                  suggestion.elevationNumber != 0 
                                    ? "[ELEVACIÓN " + suggestion.elevationNumber + "] " 
                                    : ""
                                }  
                                {suggestion.part.name} {suggestion.part.partId}
                              </td>
                              <td>
                                {suggestion.quantity}
                              </td>
                              <td>
                                <div className="d-flex flex-column-reverse">
                                  <div 
                                    className={suggestion.part.items.join(";").length > 50 ? "collapse" : ""}
                                    id={"id" + idx}
                                  >
                                    {suggestion.part.items.map((item, index) => 
                                      <div key={index}>
                                        {item.quantity} {item.name} <small>{item.description}</small>
                                      </div>
                                    )}
                                  </div>
                                  {suggestion.part.items.join("").length > 50 && 
                                    <button class="btn btn-block btn-link text-center accordion-btn" type="button" 
                                      data-toggle="collapse" data-target={"#id" + idx} aria-expanded="true" 
                                      aria-controls={"id" + idx}/>
                                  }
                                </div>  
                              </td>
                              <td>
                                <button type="button" className="btn btn-outline-success" 
                                  onClick={() => onAddPart(suggestion)}
                                >
                                  <i className="fa fa-plus"></i>
                                </button>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-6 p-1 suggestion-container">
                      <table className="table table-striped table-hover">
                        <thead>
                          <tr>
                            <th style={{width: "35%"}}>Descripción</th>
                            <th style={{width: "8%"}}>Q</th>
                            <th style={{width: "50%"}}>Observaciones</th>  
                          </tr>
                        </thead>
                        <tbody>
                          {selectedParts.map((part, idx) => 
                            <tr key={idx}>
                              <td>
                                {part.elevationNumber != 0 ? "[ELEVACIÓN " + part.elevationNumber + "] " : ""}
                                {part.partName} {part.partId}
                                {part.manual 
                                  ? <><br/><div className="badge badge-secondary">Manual</div></> 
                                  : <><br/><div className="badge badge-success">Autogenerado</div></> 
                                }
                              </td>
                              <td>
                                {part.quantity}
                              </td>
                              <td>
                                <div className="d-flex flex-column-reverse">
                                  <div 
                                    className={part.items.length > 50 ? "collapse" : "collapse show"} 
                                    id={"idr" + idx}
                                  >
                                    {part.items.split(";").map((item, index) => 
                                      <div key={index}>
                                        {/* Working with items, 
                                            follow the format quantity|name|descrption|comment;... */}
                                        {item.split("|")[0]} {item.split("|")[1]} <small>{item.split("|")[2]}</small>
                                      </div>
                                    )}
                                  </div>
                                  {part.items.length > 50 && 
                                    <button class="btn btn-block btn-link text-center accordion-btn" type="button" 
                                      data-toggle="collapse" data-target={"#idr" + idx} aria-expanded="true" 
                                      aria-controls={"idr" + idx}/>
                                  }
                                </div>
                              </td>
                              <td>
                                <button type="button" className="btn btn-outline-danger" 
                                  onClick={() => onRemovePart(idx)}
                                >
                                  <i className="fa fa-minus"></i>
                                </button>
                              </td>
                              <td>
                                <button 
                                  type="button"
                                  className="btn btn-outline-primary"
                                  onClick={() => {
                                    setContent({...part, index: idx});
                                    setHideEditModal(false);
                                  }}
                                >
                                  <i className="fa fa-pen"></i>
                                </button>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <button type="submit" class="btn btn-block btn-primary" onSubmit={onSubmit}>
                        {shipping.id ? "Actualizar embarque" : "Crear embarque"}
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button type="button" class="btn btn-block btn-secondary" onClick={onPrev}>
                        Anterior
                      </button>
                    </div>
                  </div>
                  
                </div>

              </>
            }
            
            {/* Step 3 */}
            {step === 3 && 
              <>
                <Advice 
                  title={error === null 
                    ? (shipping.id ? "Embarque actualizado" : "Embarque creado") 
                    : (shipping.id ? "Error al actualizar embarque" : "Error al crear embarque")}
                  subtitle={null}
                  btnTitle={error === null 
                    ? "Listo" 
                    : "Volver a intentar"}
                  error={error}
                  onClose={onClose}
                  onClick={error === null 
                    ? onClose 
                    : onClickRetry}/>
              </>
            }

          </Form> }
          </Formik>
        </div>
      </div>
    </div>
    
  </div>;

ShippingForm.propTypes = {
  orders: PropTypes.array.isRequired,
  order: PropTypes.object,
  shipping: PropTypes.object,
  setOrder: PropTypes.func.isRequired,
  suggestions: PropTypes.array,
  selectedParts: PropTypes.array.isRequired,
  setSelectedParts: PropTypes.func.isRequired,
  onAddPart: PropTypes.func.isRequired,
  onRemovePart: PropTypes.func.isRequired,
  cranes: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  error: PropTypes.string,  
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  hideModal: PropTypes.bool,
  setHideModal: PropTypes.func.isRequired,
  hideEditModal: PropTypes.bool,
  setHideEditModal: PropTypes.func.isRequired,
  content: PropTypes.object,
  setContent: PropTypes.func.isRequired,
  onClickRetry: PropTypes.func,
};
  
export default ShippingForm;