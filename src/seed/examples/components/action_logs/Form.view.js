/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const ActionLogFormView = ({ actionLog= {}, onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Action log</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={actionLog}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* Model id */}
            <div class="form-group">
            <label class="input-label">Model id</label>
            <Field type="number" name="modelId"
              class="form-control" />
            </div>
            {/* Model name */}
            <div class="form-group">
            <label class="input-label">Model name</label>
            <Field type="text" name="modelName"
              class="form-control" />
            </div>
            {/* Action */}
            <div class="form-group">
            <label class="input-label">Action</label>
            <Field as="select" name="action"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="CREATE">CREATE</option>
              <option value="UPDATE">UPDATE</option>
              <option value="DELETE">DELETE</option>
            </Field>
            </div>
            {/* Value */}
            <div class="form-group">
            <label class="input-label">Value</label>
            <Field type="text" name="value"
              as="textarea" rows="3"
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

ActionLogFormView.propTypes = {
  actionLog: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default ActionLogFormView;