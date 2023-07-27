/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const ArrisFormFormView = ({ arrisForm= {}, arrisOperators= [], onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Arris form</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={arrisForm}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* Q1 */}
            <div class="form-group">
            <label class="input-label">Q1</label>
            <Field type="text" name="q1"
              as="textarea" rows="3"
              class="form-control" />
            </div>
            {/* Q2 */}
            <div class="form-group">
            <label class="input-label">Q2</label>
            <Field type="text" name="q2"
              as="textarea" rows="3"
              class="form-control" />
            </div>
            {/* Activity */}
            <div class="form-group">
            <label class="input-label">Activity</label>
            <Field type="text" name="activity"
              as="textarea" rows="3"
              class="form-control" />
            </div>
            {/* Reason missing */}
            <div class="form-group">
            <label class="input-label">Reason missing</label>
            <Field type="text" name="reasonMissing"
              as="textarea" rows="3"
              class="form-control" />
            </div>
            {/* Solution missing */}
            <div class="form-group">
            <label class="input-label">Solution missing</label>
            <Field type="text" name="solutionMissing"
              as="textarea" rows="3"
              class="form-control" />
            </div>
            {/* Onedrive status */}
            <div class="form-group">
            <label class="input-label">Onedrive status</label>
            <Field as="select" name="onedriveStatus"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="PENDING">PENDING</option>
              <option value="UPLOADED">UPLOADED</option>
              <option value="ERROR">ERROR</option>
              <option value="UPLOADING">UPLOADING</option>
            </Field>
            </div>
            {/* Status */}
            <div class="form-group">
            <label class="input-label">Status</label>
            <Field as="select" name="status"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="SENT">SENT</option>
              <option value="MISSING">MISSING</option>
            </Field>
            </div>
            {/* Operator */}
            <div class="form-group">
            <div>
            <label class="input-label">Operator</label>
            <Field as="select" name="operator.id"
              class="form-control"  >
              <option value="">Select an option</option>
              {arrisOperators.map((e, idx) => <option key={idx} value={e.id}>{e.id}</option>) }
            </Field>
            </div>
            </div>
            {/* Date */}
            <div class="form-group">
            <label class="input-label">Date</label>
            <Field type="date" name="date"
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

ArrisFormFormView.propTypes = {
  arrisForm: PropTypes.object,
  arrisOperators: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default ArrisFormFormView;