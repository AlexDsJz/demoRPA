/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const SecurityCategoryFormView = ({ securityCategory= {}, onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Security category</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={securityCategory}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* Name */}
            <div class="form-group">
            <label class="input-label">Name</label>
            <Field type="text" name="name"
              class="form-control" />
            </div>
            {/* Part id */}
            <div class="form-group">
            <label class="input-label">Part id</label>
            <Field type="text" name="partId"
              class="form-control" />
            </div>
            {/* Crane model */}
            <div class="form-group">
            <label class="input-label">Crane model</label>
            <Field type="text" name="craneModel"
              class="form-control" />
            </div>
            {/* Is deviation */}
            <div class="form-group">
            <Field type="checkbox" name="isDeviation"
              class="d-inline mr-2" />
            <label class="input-label d-inline">Is deviation</label>
            </div>
            {/* Is initial */}
            <div class="form-group">
            <Field type="checkbox" name="isInitial"
              class="d-inline mr-2" />
            <label class="input-label d-inline">Is initial</label>
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

SecurityCategoryFormView.propTypes = {
  securityCategory: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default SecurityCategoryFormView;