/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import moment from "moment";
import { MultiField, FileField } from "seed/helpers";
import { Typeahead } from "react-bootstrap-typeahead";

const MaintenanceFormView = ({ maintenance = {}, cranes = [], onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Nuevo Mantenimiento</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
            initialValues={maintenance}
            onSubmit={onSubmit}>
            {({ values, setFieldValue }) =>
              <Form>
                <div class="mb-3">
                  {/* Crane */}
                  <div class="form-group">
                    <div>
                      <label class="input-label">Modelo de Grúa (Solo se muestran las grúas que no cuentan con mantenimientos activos)</label>
                      {/* The React Typeahead library require selected[0] */}
                      {console.log(cranes)}
                      <Typeahead
                        id="menu"
                        placeholder="Buscar Grúas"
                        labelKey={(crane) => `${crane.series} - ${crane.model} ${crane.number}`}
                        onChange={(selected) => selected.length > 0 ? setFieldValue("crane", selected[0].id) : ""}
                        options={cranes}
                        required
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <div>
                      <label class="input-label">Seleccione un tipo de mantenimiento</label>
                      <Field
                        as="select"
                        name="type"
                        className="form-control"
                        required
                      >
                        <option value="">Seleccione una opción</option>
                        <option value="NORMAL">Normal</option>
                        <option value="FINAL">Supervisor</option>
                        <option value="LAST">Final</option>
                      </Field>
                    </div>
                  </div>

                  <div class="row mb-3">

                    <div className="col-md-6">
                      <div class="form-group form-group-default">
                        <label class="control-label">Fecha de inicio</label>
                        <Field type="date" required name="start" class="form-control" value={values?.start ? moment.utc(values.start).format("YYYY-MM-DD") : ''} />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div class="form-group form-group-default">
                        <label class="control-label">Fecha de fin</label>
                        <Field type="date" required name="end" class="form-control" value={values?.end ? moment.utc(values.end).format("YYYY-MM-DD") : ''} />
                      </div>
                    </div>

                  </div>

                </div>
                {error ? <div class="alert alert-soft-danger">{error}</div> : null}
                <button type="submit" class="btn btn-block btn-primary">Crear mantenimiento</button>
              </Form>}
          </Formik>
        </div>
      </div>
    </div>

  </div>;

MaintenanceFormView.propTypes = {
  maintenance: PropTypes.object,
  cranes: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default MaintenanceFormView;