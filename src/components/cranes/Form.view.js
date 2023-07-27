import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import Advice from "components/helpers/Advice";
import "styles/css/Form.css";

const CraneForm = ({ crane = {}, onSubmit, count, onClose, error, step, onClickRetry }) =>
  <div class="card h-100">

    {/* Header */}
    {step === 1 && 
      <>
        <div class="card-header">
          <h3 class="card-header-title">{crane.id ? "Editar grúa" : "Nueva grúa"}</h3>
        </div>
      </>
    }

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
            initialValues={{
              ...crane,
              status: crane.status || "NA",
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
                          <label class="control-label">Modelo</label>
                          <Field type="text" name="model" id="model" class="form-control" 
                            placeholder="Ej. 5LC5010" required />
                          <div class="invalid-feedback">Required</div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div class="form-group form-group-default required">
                          <label class="control-label">Tonelaje</label>
                          <Field type="text" name="number" id="number" class="form-control" 
                            placeholder="Ej. 5T" required />
                          <div class="invalid-feedback">Required</div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div class="form-group form-group-default required">
                          <label class="control-label">Serie</label>
                          <Field type="text" name="series" id="series" class="form-control" required />
                          <div class="invalid-feedback">Required</div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div class="form-group form-group-default required">
                          <label class="control-label">ID Groke</label>
                          <Field type="text" name="craneId" id="craneId" required
                            class="form-control" placeholder="Ej. GG-123"/>
                          <div class="invalid-feedback">Required</div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div class="form-group form-group-default required">
                          <label class="control-label">Propietario</label>
                          <Field as="select" name="owner" class="form-control" required>
                            <option value="">Seleccione una opción</option>
                            <option value="GROKE">Groke</option>
                            <option value="RENTED">Rentada</option>
                            <option value="SOLD">Vendida</option>
                          </Field>
                          <div class="invalid-feedback">Required</div>
                        </div>
                      </div>
                      {/* <div className="col-md-6">
                        <div class="form-group form-group-default required">
                          <label class="control-label">Estado</label>
                          <Field as="select" name="status" class="form-control">
                            <option value="">Seleccione una opción</option>
                            <option value="NA">N/A</option>
                            <option value="COMMERCIAL">Comercial</option>
                            <option value="CLOSED">Clausurada</option>
                            <option value="RELOCATED">Reubicación</option>
                            <option value="MOUNTING">Montaje</option>
                            <option value="DISASSEMBLY">Desmontaje</option>
                            <option value="CONSTRUCTION">En obra</option>
                          </Field>
                          <div class="invalid-feedback">Required</div>
                        </div>
                      </div> */}
                    </div>

                  </div>

                  <div className="row mt-4">
                    <div className="col-md-6">
                      <button type="submit" class="btn btn-block btn-primary">
                        {crane.id ? "Actualizar grúa" : "Crear grúa"}
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
                        ? (crane.id ? "Grúa actualizada" : "Grúa creada")
                        : (crane.id ? "Error al actualizar grúa" : "Error al crear grúa")}
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
    
  </div>;

CraneForm.propTypes = {
  crane: PropTypes.object,
  count: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  error: PropTypes.string,
  step: PropTypes.number,
  onClickRetry: PropTypes.func,
  editing: PropTypes.bool
};

export default CraneForm;
