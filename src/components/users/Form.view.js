import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import Advice from "components/helpers/Advice";
import "styles/css/Form.css";

const OrderForm = ({ user = {}, onSubmit, onClose, error, step, onClickRetry }) =>
  <div class="card h-100">

    {/* Header */}
    {step === 1 && 
      <>
        <div class="card-header">
          <h3 class="card-header-title">
              {user.id ? "Editar usuario" : "Nuevo usuario"}
            </h3>
        </div>
      </>
    }

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={{
            first_name: user.firstName??"",
            rol: user.rol??"",
            order_notification: user.orderNotification??"false",
            shipping_notification: user.shippingNotification??"false",
            arris_notification: user.arrisNotification??"false",
            ...user
          }}
          onSubmit={onSubmit}>
          {({ values, setFieldValue }) =>
          <Form>

            {step === 1 && 
              <>
                <div class="mb-3">

                  <div className="row">
                    <div className="col-md-6">
                      <div class="form-group form-group-default required">
                        <label class="control-label">Nombre</label>
                        <Field type="text" name="first_name" id="first_name" class="form-control" required 
                          defaultValue={values.firstName}/>
                        <div class="invalid-feedback">Required</div>
                      </div>        
                    </div>
                    <div className="col-md-6">
                      <div class="form-group form-group-default required">
                        <label class="control-label">Correo</label>
                        <Field type="email" name="email" id="email" class="form-control" required 
                          defaultValue={values.email}/>
                        <div class="invalid-feedback">Required</div>
                      </div>        
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div class="form-group form-group-default required">
                        <label class="control-label">Puesto</label>
                        <Field component="select" name="rol" id="rol" class="form-control" value={values.rol} >
                          <option value="">Seleccione una opción</option>
                          <option value="BUILDING_OPERATOR">Operador obra</option>
                          <option value="WORKSHOP_OPERATOR">Trabajador taller</option>
                          <option value="QUALITY_CONTROL">Control de calidad</option>
                          <option value="ADMIN">Administrador</option>
                          <option value="SECURITY">Supervisor de seguridad</option>
                          <option value="MAINTENANCE_WORKER">Mantenimiento</option>
                          <option value="COMMERCIAL">Comercial</option>
                          <option value="MAINTENANCE_SUPERVISOR">Supervisor de Mantenimiento</option>
                        </Field>
                        <div class="invalid-feedback">Required</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="form-group form-group-default">
                        <label class="control-label">Contraseña</label>
                        <Field type="password" name="password" id="password" class="form-control" 
                          defaultValue={values.password} placeholder={user.id ? "**************" : ""}/>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div class="form-group form-group-default">
                        <label class="control-label">Teléfono</label>
                        <Field type="text" name="phone" id="phone" class="form-control"
                          defaultValue={values.phone} placeholder="+525512345678"/>
                      </div>
                    </div>
                  </div>

                  <h3>Notificaciones</h3>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="d-flex align-items-center mb-1">
                        <label className="col-md-5" for="order_notification">
                          Actualizaciones de órdenes
                        </label>                      
                        <input 
                          type="checkbox" 
                          defaultChecked={values.order_notification.toString() == "true"}
                          style={{width: "20px", height: "20px"}}
                          onChange={e => setFieldValue("order_notification", e.target.checked)}
                          name="order_notification"
                          id="order_notification"
                        />  
                      </div>
                      <div className="d-flex align-items-center mb-1">
                        <label className="col-md-5" for="order_notification">
                          Actualizaciones de embarques
                        </label>        
                        <input 
                          type="checkbox" 
                          defaultChecked={values.shipping_notification.toString() == "true"}
                          style={{width: "20px", height: "20px"}}
                          onChange={e => setFieldValue("shipping_notification", e.target.checked)}
                          name="shipping_notification"
                          id="shipping_notification"
                        />              
                      </div>
                      <div className="d-flex align-items-center mb-1">
                        <label className="col-md-5" for="arris_notification">
                          Incidencias en ARISS
                        </label>      
                        <input 
                          type="checkbox" 
                          defaultChecked={values.arris_notification.toString() == "true"}
                          style={{width: "20px", height: "20px"}}
                          onChange={e => setFieldValue("arris_notification", e.target.checked)}
                          name="arris_notification"
                          id="arris_notification"
                        />
                      </div>
                    </div>
                  </div>

                </div>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <button type="submit" class="btn btn-block btn-primary">
                      {user.id ? "Actualizar usuario" : "Crear usuario"}
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button type="button" class="btn btn-block btn-secondary" onClick={onClose}>Cancelar</button>
                  </div>
                </div>
              </> 
            }

            {step === 2 && 
              <>
                <Advice 
                  title={error === null 
                    ? (user.id ? "Usuario actualizado" : "Usuario creado")
                    : (user.id ? "Error al actualizar usuario" : "Error al crear usuario")}
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

OrderForm.propTypes = {
  user: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  error: PropTypes.string,
  step: PropTypes.number,
  onClickRetry: PropTypes.func
};
  
export default OrderForm;