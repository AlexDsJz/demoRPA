/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const SecurityCheckTypeFormView = ({ securityCheckType= {}, securityCategories= [], onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Security check type</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={securityCheckType}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* Number */}
            <div class="form-group">
            <label class="input-label">Number</label>
            <Field type="number" name="number"
              class="form-control" />
            </div>
            {/* Name */}
            <div class="form-group">
            <label class="input-label">Name</label>
            <Field type="text" name="name"
              class="form-control" />
            </div>
            {/* Security category */}
            <div class="form-group">
            <div>
            <label class="input-label">Security category</label>
            <Field as="select" name="securityCategory.id"
              class="form-control"  >
              <option value="">Select an option</option>
              {securityCategories.map((e, idx) => <option key={idx} value={e.id}>{e.id}</option>) }
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

SecurityCheckTypeFormView.propTypes = {
  securityCheckType: PropTypes.object,
  securityCategories: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default SecurityCheckTypeFormView;