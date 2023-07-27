/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const ArrisFileFormView = ({ arrisFile= {}, arrisForms= [], onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Arris file</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={arrisFile}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* File */}
            <div class="form-group">
            <label class="input-label">File</label>
            <FileField name="file"
              accept="*/*" setFieldValue={setFieldValue}
              class="form-control"  />
            </div>
            {/* Category */}
            <div class="form-group">
            <label class="input-label">Category</label>
            <Field as="select" name="category"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="LIMPIEZA_PIE">LIMPIEZA_PIE</option>
              <option value="LACRADO_ANCLAS_TORNILLOS_DE_PIE">LACRADO_ANCLAS_TORNILLOS_DE_PIE</option>
              <option value="LACRADO_TORNILLOS_DE_CORONA">LACRADO_TORNILLOS_DE_CORONA</option>
              <option value="TORNILLOS_ANCLA_CHAM_MECA_ELEVACION_CARRO_LACRADO">TORNILLOS_ANCLA_CHAM_MECA_ELEVACION_CARRO_LACRADO</option>
              <option value="MECANISMO_GIRO">MECANISMO_GIRO</option>
              <option value="FUNCIONAMIENTO_VELETA">FUNCIONAMIENTO_VELETA</option>
              <option value="MECANISMO_CARRO_ABATIMIENTO">MECANISMO_CARRO_ABATIMIENTO</option>
              <option value="CABLE_CARRO_ABATIMIENTO">CABLE_CARRO_ABATIMIENTO</option>
              <option value="LIMITADORES">LIMITADORES</option>
              <option value="REVISION_FRENO_160">REVISION_FRENO_160</option>
              <option value="REVISION_PINON">REVISION_PINON</option>
              <option value="VIDEO_TRASLACION">VIDEO_TRASLACION</option>
              <option value="ABATIMIENTO">ABATIMIENTO</option>
              <option value="MOTOR_ELEVACION">MOTOR_ELEVACION</option>
              <option value="ARRIOSTRAMIENTO">ARRIOSTRAMIENTO</option>
            </Field>
            </div>
            {/* Arris form */}
            <div class="form-group">
            <div>
            <label class="input-label">Arris form</label>
            <Field as="select" name="arrisForm.id"
              class="form-control"  >
              <option value="">Select an option</option>
              {arrisForms.map((e, idx) => <option key={idx} value={e.id}>{e.id}</option>) }
            </Field>
            </div>
            </div>
            </div>
            {error ? <div class="alert alert-soft-danger">{error}</div> : null}
            <button type="submit" class="btn btn-block btn-primary">Send</button>
          </Form> }
          </Formik>
        </div>
      </div>
    </div>

  </div>;

ArrisFileFormView.propTypes = {
  arrisFile: PropTypes.object,
  arrisForms: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default ArrisFileFormView;