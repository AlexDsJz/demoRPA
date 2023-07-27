/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const MaintenanceFormView = ({ maintenance= {}, cranes= [], onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Maintenance</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={maintenance}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* Crane */}
            <div class="form-group">
            <div>
            <label class="input-label">Crane</label>
            <Field as="select" name="crane.id"
              class="form-control"  >
              <option value="">Select an option</option>
              {cranes.map((e, idx) => <option key={idx} value={e.id}>{e.id}</option>) }
            </Field>
            </div>
            </div>
            {/* Status */}
            <div class="form-group">
            <label class="input-label">Status</label>
            <Field as="select" name="status"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="FINISHED">FINISHED</option>
            </Field>
            </div>
            {/* Start */}
            <div class="form-group">
            <label class="input-label">Start</label>
            <Field type="date" name="start"
              class="form-control" />
            </div>
            {/* End */}
            <div class="form-group">
            <label class="input-label">End</label>
            <Field type="date" name="end"
              class="form-control" />
            </div>
            {/* Type */}
            <div class="form-group">
            <label class="input-label">Type</label>
            <Field as="select" name="type"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="NORMAL">NORMAL</option>
              <option value="FINAL">FINAL</option>
              <option value="LAST">LAST</option>
            </Field>
            </div>
            {/* Phase */}
            <div class="form-group">
            <label class="input-label">Phase</label>
            <Field type="number" name="phase"
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

MaintenanceFormView.propTypes = {
  maintenance: PropTypes.object,
  cranes: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default MaintenanceFormView;