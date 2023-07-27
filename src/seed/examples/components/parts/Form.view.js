/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const PartFormView = ({ part= {}, onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Part</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={part}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* Crane model */}
            <div class="form-group">
            <label class="input-label">Crane model</label>
            <Field type="text" name="craneModel"
              class="form-control" />
            </div>
            {/* Part id */}
            <div class="form-group">
            <label class="input-label">Part id</label>
            <Field type="text" name="partId"
              class="form-control" />
            </div>
            {/* Name */}
            <div class="form-group">
            <label class="input-label">Name</label>
            <Field type="text" name="name"
              class="form-control" />
            </div>
            {/* Um */}
            <div class="form-group">
            <label class="input-label">Um</label>
            <Field as="select" name="um"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="JUEGO">JUEGO</option>
              <option value="PIEZA">PIEZA</option>
              <option value="KG">KG</option>
              <option value="L">L</option>
              <option value="METRO">METRO</option>
            </Field>
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

PartFormView.propTypes = {
  part: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default PartFormView;