/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const ArrisCraneStatusFormView = ({ arrisCraneStatus= {}, arrisForms= [], onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Arris crane status</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={arrisCraneStatus}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* Type */}
            <div class="form-group">
            <label class="input-label">Type</label>
            <Field type="text" name="type"
              class="form-control" />
            </div>
            {/* Name */}
            <div class="form-group">
            <label class="input-label">Name</label>
            <Field type="text" name="name"
              class="form-control" />
            </div>
            {/* Status */}
            <div class="form-group">
            <label class="input-label">Status</label>
            <Field as="select" name="status"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="OK">OK</option>
              <option value="NOT_OK">NOT_OK</option>
              <option value="NA">NA</option>
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

ArrisCraneStatusFormView.propTypes = {
  arrisCraneStatus: PropTypes.object,
  arrisForms: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default ArrisCraneStatusFormView;