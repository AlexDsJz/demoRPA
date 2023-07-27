/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const EvidenceFormView = ({ evidence= {}, shippings= [], users= [], onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Evidence</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={evidence}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* Evidence file */}
            <div class="form-group">
            <label class="input-label">Evidence file</label>
            <FileField name="evidenceFile"
              accept="*/*" setFieldValue={setFieldValue}
              class="form-control"  />
            </div>
            {/* Shipping */}
            <div class="form-group">
            <div>
            <label class="input-label">Shipping</label>
            <Field as="select" name="shipping.id"
              class="form-control"  >
              <option value="">Select an option</option>
              {shippings.map((e, idx) => <option key={idx} value={e.id}>{e.id}</option>) }
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
            {/* Flutter path */}
            <div class="form-group">
            <label class="input-label">Flutter path</label>
            <Field type="text" name="flutterPath"
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

EvidenceFormView.propTypes = {
  evidence: PropTypes.object,
  shippings: PropTypes.array,
  users: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default EvidenceFormView;