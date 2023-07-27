/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const MaintenancePermsFormView = ({ maintenancePerms= {}, maintenanceCategories= [], users= [], maintenances= [], onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Maintenance perms</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={maintenancePerms}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* Category */}
            <div class="form-group">
            <div>
            <label class="input-label">Category</label>
            <Field as="select" name="category.id"
              class="form-control"  >
              <option value="">Select an option</option>
              {maintenanceCategories.map((e, idx) => <option key={idx} value={e.id}>{e.id}</option>) }
            </Field>
            </div>
            </div>
            {/* Users */}
            <div class="form-group">
            <div>
            <label class="input-label">Users</label>
            <div class="form-control">
            <MultiField name="users"
              values={users.map((e, idx) => { return {value: e, label: e.id}; }) }
              setFieldValue={setFieldValue} value={values.users ? values.users : []} />
            </div>
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
            {/* Estimated time */}
            <div class="form-group">
            <label class="input-label">Estimated time</label>
            <Field type="number" name="estimatedTime"
              class="form-control" />
            </div>
            {/* Manually enabled */}
            <div class="form-group">
            <Field type="checkbox" name="manuallyEnabled"
              class="d-inline mr-2" />
            <label class="input-label d-inline">Manually enabled</label>
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

MaintenancePermsFormView.propTypes = {
  maintenancePerms: PropTypes.object,
  maintenanceCategories: PropTypes.array,
  users: PropTypes.array,
  maintenances: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default MaintenancePermsFormView;