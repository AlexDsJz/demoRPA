/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const SecurityCheckFormView = ({ securityCheck= {}, securityCheckTypes= [], securityRevisions= [], users= [], onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Security check</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={securityCheck}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* Value */}
            <div class="form-group">
            <label class="input-label">Value</label>
            <Field type="text" name="value"
              as="textarea" rows="3"
              class="form-control" />
            </div>
            {/* Security check type */}
            <div class="form-group">
            <div>
            <label class="input-label">Security check type</label>
            <Field as="select" name="securityCheckType.id"
              class="form-control"  >
              <option value="">Select an option</option>
              {securityCheckTypes.map((e, idx) => <option key={idx} value={e.id}>{e.id}</option>) }
            </Field>
            </div>
            </div>
            {/* Security revision */}
            <div class="form-group">
            <div>
            <label class="input-label">Security revision</label>
            <Field as="select" name="securityRevision.id"
              class="form-control"  >
              <option value="">Select an option</option>
              {securityRevisions.map((e, idx) => <option key={idx} value={e.id}>{e.id}</option>) }
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
            {/* Is deviation */}
            <div class="form-group">
            <Field type="checkbox" name="isDeviation"
              class="d-inline mr-2" />
            <label class="input-label d-inline">Is deviation</label>
            </div>
            {/* Deviation value */}
            <div class="form-group">
            <label class="input-label">Deviation value</label>
            <Field as="select" name="deviationValue"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="TRUE">TRUE</option>
              <option value="FALSE">FALSE</option>
              <option value="NONE">NONE</option>
            </Field>
            </div>
            {/* Findings */}
            <div class="form-group">
            <label class="input-label">Findings</label>
            <Field type="text" name="findings"
              as="textarea" rows="3"
              class="form-control" />
            </div>
            {/* Corrections */}
            <div class="form-group">
            <label class="input-label">Corrections</label>
            <Field type="text" name="corrections"
              as="textarea" rows="3"
              class="form-control" />
            </div>
            {/* Date */}
            <div class="form-group">
            <label class="input-label">Date</label>
            <Field type="date" name="date"
              class="form-control" />
            </div>
            {/* Scp liberation */}
            <div class="form-group">
            <label class="input-label">Scp liberation</label>
            <Field type="text" name="scpLiberation"
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

SecurityCheckFormView.propTypes = {
  securityCheck: PropTypes.object,
  securityCheckTypes: PropTypes.array,
  securityRevisions: PropTypes.array,
  users: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default SecurityCheckFormView;