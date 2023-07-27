import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { Typeahead } from "react-bootstrap-typeahead";
import Advice from "components/helpers/Advice";
import moment from "moment";
import PartAdd from "components/orders/PartAdd";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import "styles/css/Form.css";

const OrderForm = ({
  users = [],
  order = {},
  cranes = [],
  craneIds = [],
  feets = {},
  towers = {},
  onSubmit,
  onClose,
  error,
  onClickRetry,
  step,
  onPrev,
  craneSelected,
  setCraneSelected,
  typeaheadRef,
  validateStatus,
  hideModal,
  setHideModal,
  callGetSuggestions,
  onClickGoShippings,
  onChangeElevations,
  elevationEdit,
  elevationParts,
  setElevationParts,
  setElevationEdit,
  setStartHeight,
  setEndHeight,
  elevations,
  handleChangeModel,
  models,
  model
}) =>
  <div class="card h-100 px-3 py-2">


    {hideModal
      ? <></>
      : <PartAdd
        elevationEdit={elevationEdit}
        allParts={towers}
        elevationParts={elevationParts}
        setElevationParts={setElevationParts}
        setHideModal={setHideModal}
      />
    }

    {/* Header */}
    {step < 4
      ? <div class="card-header">
        <div className="d-flex align-items-center justify-content-start w-100">
          <h3 class="card-header-title">
            {order.id ? "Editar orden" : "Nueva orden"}
          </h3>
          <h6 class="card-header-title step-title mx-3 mt-1">Paso {step} de 3</h6>
        </div>
        {order.id != null
          ? <div className="d-flex align-items-center justify-content-end flex-wrap">
            <button className="btn btn-primary" style={{ height: "3em", width: "15em" }} onClick={() => {
              callGetSuggestions({
                order_id: order.id,
              });
            }}>
              Descargar sugerencias
            </button>
          </div>
          : <></>
        }
      </div>
      : <></>
    }

    {/* Body */}
    <div class="card-body pt-5" style={{ maxHeight: "1000px", overflowY: "auto" }}>
      <div class="row">
        <div class="col">
          <Formik
            initialValues={{
              ...order,
              configuration: order.configuration ? order.configuration.split(",") : [],
              crane_index: craneSelected == -1 ? -1 : craneIds.length - 1,
              mounting_date: order.mounting_date
                ? moment(order.mounting_date).format("YYYY-MM-DD")
                : moment().format("YYYY-MM-DD"),
              dice_size: order.dice_size ?? "",
              comments: order.comments ?? "",
            }}
            onSubmit={onSubmit}>
            {({ values, setFieldValue }) =>
              <Form>

                {/* Step 1 */}
                {step === 1 &&
                  <>

                    <div class="mb-1 w-100">

                      <h4>Datos del cliente</h4>
                      <div class="form-group form-group-default required mt-3 mb-3">
                        <label class="control-label">Nombre del Cliente o Razón Social</label>
                        <Field type="text" name="client_name" class="form-control" required />
                        <div class="invalid-feedback">Required</div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Nombre de la Obra</label>
                            <Field type="text" name="building_name" class="form-control" required />
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Contacto del cliente</label>
                            <Field type="text" name="contact_name" class="form-control" required />
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                      </div>

                      <div class="form-group form-group-default required mb-3">
                        <label class="control-label">Dirección (Calle, Municipio / Delegación, Estado)</label>
                        <Field type="text" name="building_address" class="form-control" required />
                        <div class="invalid-feedback">Required</div>
                      </div>

                      <h4 class="mt-1">Datos de contacto</h4>

                      <div className="row mt-3">
                        <div className="col-md-6">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Teléfono del contacto</label>
                            <Field type="tel" name="contact_phone" class="form-control" required />
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Correo del contacto</label>
                            <Field type="email" name="contact_email" class="form-control" required />
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                      </div>

                      <h4 class="mt-2">Datos de comerciante</h4>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Comerciante solicitante</label>
                            <Field component="select" name="applicant.id" class="form-control" required>
                              <option value="">Seleccione una opción</option>
                              {
                                users.map((user, idx) => (
                                  <option value={user.id} key={user.id}>
                                    {user.firstName} {user.lastName}
                                  </option>
                                ))
                              }
                            </Field>
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Versión de orden</label>
                            <Field type="number" min="0" max="9" name="order_version" class="form-control" required />
                            <div class="invalid-feedback">Required</div>
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
                {(step === 2) &&
                  <>

                    <div class="mb-3">

                      <h4 className="mb-4">Datos de la Grúa</h4>

                      <div className="row">
                        <div className="col-md-4">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Modelo</label>
                            <Typeahead
                              id="cranes"
                              required
                              ref={typeaheadRef}
                              placeholder="Selecciona un modelo"
                              options={models}
                              selected={models.find(m => m == model) ? [model] : []}
                              onInputChange={(selected) => handleChangeModel(selected)}
                              onChange={(selected) => handleChangeModel(selected)}
                            />
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="form-group form-group-default">
                            <label class="control-label">Grúa</label>
                            <Typeahead
                              id="ns"
                              ref={typeaheadRef}
                              placeholder="Selecciona una grúa"
                              options={cranes}
                              labelKey={(option) => option.series ?? ""}
                              defaultInputValue={craneSelected.series ?? ""}
                              onChange={(selected) => validateStatus(selected)}
                              onInputChange={(selected) => validateStatus(selected)}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Versión a montar</label>
                            <Field type="text" name="crane_version" class="form-control" required />
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Periodo de renta (en meses)</label>
                            <Field type="number" name="rent_period" class="form-control" required />
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Fecha tentativa del montaje</label>
                            <Field type="date" name="mounting_date" class="form-control" required />
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Responsabilidad de seguros</label>
                            <Field component="select" name="insurance_responsable" class="form-control" required>
                              <option value="">Seleccione una opción</option>
                              <option value="CLIENT">Cliente</option>
                              <option value="OWNER">Empresa</option>
                              <option value="BOTH">Ambos</option>
                            </Field>
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Transportes esperados y vendidos</label>
                            <Field type="number" name="transport_number" class="form-control" required />
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Longitud de pluma</label>
                            <Field type="number" name="boom_length" class="form-control" required />
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Altura bajo gancho inicial (m)</label>
                            <Field
                              type="number"
                              name="tower_height"
                              class="form-control"
                              required
                              onChange={(e) => {
                                setStartHeight(e.target.value)
                                setFieldValue('tower_height', e.target.value);
                              }}
                            />
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-4">
                        <div className="col-md-6">
                          <div class="form-group form-group-default required">
                            <label class="control-label">
                              Configuración de la grúa
                              <a className="ml-2 border-0 bg-light" role="button" onClick={() => {
                                setElevationEdit(0);
                                setHideModal(false);
                              }}>
                                <i className="fa fa-edit"></i>
                              </a>
                            </label>
                            <Typeahead
                              id="cranes"
                              className="border-0 shadow-none"
                              required
                              disabled
                              multiple
                              onFocus={() => null}
                              options={towers}
                              onChange={(selected) => null}
                              selected={elevationParts[0].map(part => `${part.part} (${part.quantity})`)} />
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Sistema de reenvíos</label>
                            <Field component="select" name="forwarding_system" class="form-control" required>
                              <option value="">Seleccione una opción</option>
                              <option value="SIMPLE">Simple</option>
                              <option value="DOUBLE">Doble</option>
                            </Field>
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Número de elevaciones</label>
                            <Field
                              type="number"
                              name="elevations_number"
                              class="form-control"
                              onChange={(e) => {
                                onChangeElevations(e);
                                setFieldValue('elevations_number', e.target.value);
                              }}
                              required
                            />
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Altura final gancho (m)</label>
                            <Field
                              type="number"
                              name="final_height"
                              class="form-control"
                              required
                              onChange={(e) => {
                                setEndHeight(e.target.value)
                                setFieldValue('final_height', e.target.value);
                              }}
                            />
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Power Lift</label>
                            <Field component="select" name="has_power_lift" class="form-control" required>
                              <option value="">Seleccione una opción</option>
                              <option value="true">Si</option>
                              <option value="false">No</option>
                            </Field>
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Cabina</label>
                            <Field component="select" name="has_cabin" class="form-control" required>
                              <option value="">Seleccione una opción</option>
                              <option value="true">Si</option>
                              <option value="false">No</option>
                            </Field>
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                      </div>

                    </div>

                    {
                      elevationParts && elevationParts.length > 1
                        ? <div class="mb-3">

                          <h4 className="mb-4">Elevaciones</h4>

                          {
                            elevationParts.map((elevation, idx) => {

                              if (idx === 0) return null;

                              return <div className="row" key={"elevation_" + idx}>
                                <div className="col-md-12">
                                  <div class="form-group form-group-default required">
                                    <label class="control-label">
                                      Elevación {idx}
                                      <a
                                        className="ml-2 border-0 bg-light"
                                        role="button"
                                        onClick={() => {
                                          setElevationEdit(idx);
                                          setHideModal(false);
                                        }}
                                      >
                                        <i className="fa fa-edit"></i>
                                      </a>
                                    </label>
                                    <Typeahead
                                      id="cranes"
                                      className="border-0 shadow-none"
                                      required
                                      disabled
                                      multiple
                                      onFocus={() => null}
                                      onChange={(selected) => null}
                                      options={towers}
                                      selected={elevation.map(part => `${part.part} (${part.quantity})`)} />
                                    <div class="invalid-feedback">Required</div>
                                  </div>
                                </div>
                              </div>
                            }
                            )
                          }

                          <div className="row">
                          </div>

                        </div>
                        : null
                    }


                    <div className="row mt-5">
                      <div className="col-md-6">
                        <button type="submit" class="btn btn-block btn-primary" onSubmit={onSubmit}>Siguiente</button>
                      </div>
                      <div className="col-md-6">
                        <button type="button" class="btn btn-block btn-secondary" onClick={onPrev}>Anterior</button>
                      </div>
                    </div>

                  </>
                }

                {/* Step 3 */}
                {step === 3 &&
                  <>

                    <div class="mb-3">

                      <div className="row">
                        <div className="col-md-4">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Radio control</label>
                            <Field component="select" name="has_radio_control" class="form-control" required>
                              <option value="">Seleccione una opción</option>
                              <option value="true">Si</option>
                              <option value="false">No</option>
                            </Field>
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Telemando</label>
                            <Field component="select" name="has_remote_control" class="form-control" required>
                              <option value="">Seleccione una opción</option>
                              <option value="true">Si</option>
                              <option value="false">No</option>
                            </Field>
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Montaje con jaula</label>
                            <Field component="select" name="has_cage_mounting" class="form-control" required>
                              <option value="">Seleccione una opción</option>
                              <option value="true">Si</option>
                              <option value="false">No</option>
                            </Field>
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                      </div>

                      <h4 className="mb-4 mt-3">Datos de Base</h4>

                      <div className="row">
                        <div className="col-md-4">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Tipo de pies</label>
                            <Field component="select" name="feet_type" class="form-control" required>
                              <option value="">Seleccione una opción</option>
                              <option value="REUSABLE">Reutilizables</option>
                              <option value="CONVENTIONALS">Convencionales</option>
                              <option value="WITHOUT">Sin pies</option>
                              <option value="DIRECT">Directo a marcos</option>
                            </Field>
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="form-group form-group-default">
                            <label class="control-label">Modelo de pies</label>
                            <Typeahead
                              id="feets"
                              placeholder="Seleccione el modelo de pies"
                              options={feets}
                              defaultInputValue={feets.find(feet => feet == values.feet_model)}
                              onChange={(selected) => setFieldValue("feet_model", selected[0])} />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Tipo de base</label>
                            <Field component="select" name="base_type" class="form-control" required>
                              <option value="">Seleccione una opción</option>
                              <option value="LINKED">Ligada</option>
                              <option value="CONVENTIONAL">Convencional</option>
                              <option value="IN_CROSS">En cruz</option>
                              <option value="STRUCTURE">Sobre estructura</option>
                            </Field>
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div class="form-group form-group-default">
                            <label class="control-label">Tamaño del dado si es base convencional</label>
                            <Field type="text" name="dice_size" id="dice_size" class="form-control" />
                            <div class="invalid-feedback"></div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <div class="form-group form-group-default">
                            <label class="control-label">
                              Comentarios adicionales para la ubicación de pies y/o montajes
                            </label>
                            <textarea type="textarea" name="comments" id="comments" class="form-control" rows="5"
                              onChange={(event) => setFieldValue("comments", event.target.value)} value={values.comments} />
                            <div class="invalid-feedback"></div>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="row mt-7">
                      <div className="col-md-6">
                        <button type="submit" class="btn btn-block btn-primary" onSubmit={onSubmit}>
                          {order.id ? "Actualizar orden" : "Crear orden"}
                        </button>
                      </div>
                      <div className="col-md-6">
                        <button type="button" class="btn btn-block btn-secondary" onClick={onPrev}>Anterior</button>
                      </div>
                    </div>

                  </>
                }

                {/* Step 4 */}
                {step === 4 &&
                  <>
                    <Advice
                      title={error === null
                        ? (order.id ? "Orden actualizada" : "Orden creada")
                        : (order.id ? "Error al actualizar orden" : "Error al crear orden")}
                      subtitle={null}
                      btnTitle={error === null
                        ? "Listo"
                        : "Volver a intentar"}
                      error={error}
                      onClose={onClose}
                      onClick={error === null
                        ? onClose
                        : onClickRetry} />
                  </>
                }

              </Form>}
          </Formik>
        </div>
      </div>
    </div>

  </div >;

OrderForm.propTypes = {
  order: PropTypes.object,
  cranes: PropTypes.array,
  craneIds: PropTypes.array,
  feets: PropTypes.array,
  towers: PropTypes.array,
  craneSelected: PropTypes.object,
  setCraneSelected: PropTypes.func,
  setCraneModel: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  error: PropTypes.string,
  step: PropTypes.number,
  onPrev: PropTypes.func,
  hideModal: PropTypes.bool,
  setHideModal: PropTypes.func,
  currentParts: PropTypes.array,
  setCurrentParts: PropTypes.func,
  onClickGoShippings: PropTypes.func,
  onClickRetry: PropTypes.func,
  callGetSuggestions: PropTypes.func,
  validateStatus: PropTypes.func,
  setFieldValue: PropTypes.func,
  typeaheadRef: PropTypes.object,
  onChangeElevations: PropTypes.func,
  elevationEdit: PropTypes.number,
  elevationParts: PropTypes.array,
  setElevationParts: PropTypes.func,
  setElevationEdit: PropTypes.func,
  elevations: PropTypes.number,
  setStartHeight: PropTypes.func,
  setEndHeight: PropTypes.func,
};

export default OrderForm;