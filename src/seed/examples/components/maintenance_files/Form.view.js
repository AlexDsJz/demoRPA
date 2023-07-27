/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const MaintenanceFileFormView = ({ maintenanceFile= {}, users= [], maintenanceEvidences= [], onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Maintenance file</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={maintenanceFile}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* File */}
            <div class="form-group">
            <label class="input-label">File</label>
            <FileField name="file"
              accept="*/*" setFieldValue={setFieldValue}
              class="form-control"  />
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
            {/* Maintenance evidence */}
            <div class="form-group">
            <div>
            <label class="input-label">Maintenance evidence</label>
            <Field as="select" name="maintenanceEvidence.id"
              class="form-control"  >
              <option value="">Select an option</option>
              {maintenanceEvidences.map((e, idx) => <option key={idx} value={e.id}>{e.id}</option>) }
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

MaintenanceFileFormView.propTypes = {
  maintenanceFile: PropTypes.object,
  users: PropTypes.array,
  maintenanceEvidences: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default MaintenanceFileFormView;