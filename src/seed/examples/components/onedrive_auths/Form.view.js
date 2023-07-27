/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const OnedriveAuthFormView = ({ onedriveAuth= {}, onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Onedrive auth</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={onedriveAuth}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* Access token */}
            <div class="form-group">
            <label class="input-label">Access token</label>
            <Field type="text" name="accessToken"
              class="form-control" />
            </div>
            {/* Refresh token */}
            <div class="form-group">
            <label class="input-label">Refresh token</label>
            <Field type="text" name="refreshToken"
              class="form-control" />
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

OnedriveAuthFormView.propTypes = {
  onedriveAuth: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default OnedriveAuthFormView;