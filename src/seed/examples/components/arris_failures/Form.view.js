/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const ArrisFailureFormView = ({ arrisFailure= {}, arrisOperators= [], arrisForms= [], onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Arris failure</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={arrisFailure}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* Description */}
            <div class="form-group">
            <label class="input-label">Description</label>
            <Field type="text" name="description"
              as="textarea" rows="3"
              class="form-control" />
            </div>
            {/* Solution */}
            <div class="form-group">
            <label class="input-label">Solution</label>
            <Field type="text" name="solution"
              as="textarea" rows="3"
              class="form-control" />
            </div>
            {/* Status */}
            <div class="form-group">
            <label class="input-label">Status</label>
            <Field as="select" name="status"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="REPORTED">REPORTED</option>
              <option value="ASSIGNED">ASSIGNED</option>
              <option value="SOLVED">SOLVED</option>
            </Field>
            </div>
            {/* Reported solved */}
            <div class="form-group">
            <div>
            <label class="input-label">Reported solved</label>
            <Field as="select" name="reportedSolved.id"
              class="form-control"  >
              <option value="">Select an option</option>
              {arrisOperators.map((e, idx) => <option key={idx} value={e.id}>{e.id}</option>) }
            </Field>
            </div>
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
            {/* Solved report */}
            <div class="form-group">
            <Field type="checkbox" name="solvedReport"
              class="d-inline mr-2" />
            <label class="input-label d-inline">Solved report</label>
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

ArrisFailureFormView.propTypes = {
  arrisFailure: PropTypes.object,
  arrisOperators: PropTypes.array,
  arrisForms: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default ArrisFailureFormView;