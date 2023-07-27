import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import Advice from "components/helpers/Advice";
import "styles/css/Form.css";
import { Typeahead } from "react-bootstrap-typeahead";

const ArrisForm = ({
  onSubmit,
  onClose,
  error,
  step,
  phase,
  setPhase,
  operations,
  availableOrders,
  users,
  supervisors,
  onClickRetry,
  setOrderId,
  order = { crane: {} },
  operators = {}
}) => 
  <div class="card">

    {/* Header */}
    {step === 1 && 
      <>
        <div class="card-header">
          <h3 class="card-header-title">Asignar Grúa</h3>
        </div>
      </>
    }

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik initialValues={{
            ...operators
          }} onSubmit={onSubmit}>
            {({ values, setFieldValue }) => (
              <Form>
                {step === 1 && 
                  <>
                    <div class="mb-3">
                      <div className="row">
                        <div className="col-md-6">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Grúa</label>
                            <Typeahead
                              id="orderId"
                              required
                              placeholder="Seleccione una grúa"
                              options={availableOrders}
                              defaultInputValue={order.crane.id
                                ? order.crane.series + " / " +
                                  order.crane.model + " " +
                                  order.crane.number + " - " +
                                  order.buildingName
                                : ""
                              }
                              labelKey={operation =>
                                operation.crane.series + " / " +
                                operation.crane.model + " " +
                                operation.crane.number + " - " +
                                operation.buildingName
                              }
                              onKeyDown={(e) => {

                                let value = e.target.value;

                                if(value.length === 0) {
                                  setOrderId(null);
                                }
                                else {

                                  let order = availableOrders.filter(order => 
                                    order.crane.series + " / " +
                                    order.crane.model + " " +
                                    order.crane.number + " - " +
                                    order.buildingName == value
                                  )

                                  if(order.length > 0)
                                    setOrderId(order[0].id);
                                  else
                                    setOrderId(null);
                                    
                                }
                                  
                              }}
                              onChange={(selected) => {
                                if(selected.length > 0) 
                                  setOrderId(selected[0].id);
                                else 
                                  setOrderId(null);
                              }}
                            />
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div class="form-group form-group-default required">
                            <label class="control-label">
                              Operador Turno 1
                            </label>
                            <Field
                              component="select"
                              name="operatorFirst"
                              className="form-control"
                              required
                            >
                              <option value="">Seleccione una opción</option>
                              {users.map((user, index) =>
                                <option value={user.id} key={index}>
                                  {user.firstName} {user.lastName}
                                </option>
                              )}
                            </Field>
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div class="form-group form-group-default">
                            <label class="control-label">
                              Operador Turno 2
                            </label>
                            <Field
                              component="select"
                              name="operatorSecond"
                              defaultValue="na"
                              class="form-control"
                            >
                              <option value="">Seleccione una opción</option>
                              <option value="na" selected>N/A</option>
                              {users.map((user, index) =>
                                <option value={user.id} key={index}>
                                  {user.firstName} {user.lastName}
                                </option>
                              )}
                            </Field>
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div class="form-group form-group-default">
                            <label class="control-label">
                              Supervisor de seguridad
                            </label>
                            <Field
                              component="select"
                              name="securitySupervisor"
                              class="form-control"
                            >
                              <option value="">Seleccione una opción</option>
                              {supervisors.map((user, index) =>
                                <option value={user.id} key={index}>
                                  {user.firstName} {user.lastName}
                                </option>
                              )}
                            </Field>
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <button type="submit" class="btn btn-block btn-primary">
                          Asignar
                        </button>
                      </div>
                      <div className="col-md-6">
                        <button
                          type="button"
                          class="btn btn-block btn-secondary"
                          onClick={onClose}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </>
                }
              </Form>
            )}
          </Formik>
          {step === 2 && 
            <>
              <Advice 
                title={error === null 
                  ? "Operadores asignados correctamente" 
                  : "Error al asignar operadores"}
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
        </div>
      </div>
    </div>

  </div>;

ArrisForm.propTypes = {
  user: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  error: PropTypes.string,
  step: PropTypes.number,
  phase: PropTypes.number,
  setPhase: PropTypes.func,
  operations: PropTypes.array,
  users: PropTypes.array,
  supervisors: PropTypes.array,
  onClickRetry: PropTypes.func,
  setOrderId: PropTypes.func,
  operators: PropTypes.array,
  order: PropTypes.object,
  availableOrders: PropTypes.array,
};

export default ArrisForm;