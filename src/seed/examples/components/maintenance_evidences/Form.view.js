/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const MaintenanceEvidenceFormView = ({ maintenanceEvidence= {}, maintenanceTypes= [], maintenances= [], onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Maintenance evidence</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={maintenanceEvidence}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* Type */}
            <div class="form-group">
            <div>
            <label class="input-label">Type</label>
            <Field as="select" name="type.id"
              class="form-control"  >
              <option value="">Select an option</option>
              {maintenanceTypes.map((e, idx) => <option key={idx} value={e.id}>{e.id}</option>) }
            </Field>
            </div>
            </div>
            {/* Maintenance */}
            <div class="form-group">
            <div>
            <label class="input-label">Maintenance</label>
            <Field as="select" name="maintenance.id"
              class="form-control"  >
              <option value="">Select an option</option>
              {maintenances.map((e, idx) => <option key={idx} value={e.id}>{e.id}</option>) }
            </Field>
            </div>
            </div>
            {/* Skip evidence */}
            <div class="form-group">
            <Field type="checkbox" name="skipEvidence"
              class="d-inline mr-2" />
            <label class="input-label d-inline">Skip evidence</label>
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

MaintenanceEvidenceFormView.propTypes = {
  maintenanceEvidence: PropTypes.object,
  maintenanceTypes: PropTypes.array,
  maintenances: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default MaintenanceEvidenceFormView;