/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";
import { Typeahead } from "react-bootstrap-typeahead";

const SecurityRevisionFormView = ({ securityRevision = {}, orders = [], onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Nueva Revisión de Seguridad</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
            initialValues={securityRevision}
            onSubmit={onSubmit}>
            {({ values, setFieldValue }) =>
              <Form>
                <div class="mb-3">
                  {/* Crane */}
                  <div class="form-group">
                    <div>
                      <label class="input-label">Órdenes</label>
                      {/* The React Typeahead library require selected[0] */}
                      <Typeahead
                        id="menu"
                        placeholder="Buscar Grúas"
                        labelKey={(order) => `${order?.crane?.series} - ${order?.crane?.model} ${order?.crane?.number}`}
                        onChange={(selected) => {
                          if (selected.length > 0) {
                            setFieldValue("order", selected[0].id);
                            setFieldValue("craneModel", selected[0].crane.model)
                          } else {
                            setFieldValue("order", undefined);
                            setFieldValue("craneModel", undefined)
                          }
                        }}
                        options={orders}
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="input-label">Tipo de revisión</label>
                    <Field as="select" name="type"
                      class="form-control"  >
                      <option value="" disabled selected>Selecciona una opción</option>
                      <option value="INITIAL">Inicial</option>
                      <option value="FINAL">Final</option>
                    </Field>
                  </div>
                </div>
                {error ? <div class="alert alert-soft-danger">{error}</div> : null}
                <button type="submit" class="btn btn-block btn-primary">Crear Revisión de Seguridad</button>
              </Form>}
          </Formik>
        </div>
      </div>
    </div>

  </div>;

SecurityRevisionFormView.propTypes = {
  maintenance: PropTypes.object,
  cranes: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default SecurityRevisionFormView;