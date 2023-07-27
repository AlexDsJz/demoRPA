/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const OperationFormView = ({ operation= {}, contents= [], users= [], onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Operation</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={operation}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* Checked */}
            <div class="form-group">
            <Field type="checkbox" name="checked"
              class="d-inline mr-2" />
            <label class="input-label d-inline">Checked</label>
            </div>
            {/* Type */}
            <div class="form-group">
            <label class="input-label">Type</label>
            <Field as="select" name="type"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="CHECK">CHECK</option>
              <option value="CHARGE">CHARGE</option>
              <option value="REPORT">REPORT</option>
            </Field>
            </div>
            {/* Item checked */}
            <div class="form-group">
            <label class="input-label">Item checked</label>
            <Field type="text" name="itemChecked"
              as="textarea" rows="3"
              class="form-control" />
            </div>
            {/* Comment */}
            <div class="form-group">
            <label class="input-label">Comment</label>
            <Field type="text" name="comment"
              as="textarea" rows="3"
              class="form-control" />
            </div>
            {/* Content */}
            <div class="form-group">
            <div>
            <label class="input-label">Content</label>
            <Field as="select" name="content.id"
              class="form-control"  >
              <option value="">Select an option</option>
              {contents.map((e, idx) => <option key={idx} value={e.id}>{e.id}</option>) }
            </Field>
            </div>
            </div>
            {/* User */}
            <div class="form-group">
            <div>
            <label class="input-label">User</label>
            <Field as="select" name="user.id"
              class="form-control"  >
              <option value="">Select an option</option>
              {users.map((e, idx) => <option key={idx} value={e.id}>{e.id}</option>) }
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

OperationFormView.propTypes = {
  operation: PropTypes.object,
  contents: PropTypes.array,
  users: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default OperationFormView;