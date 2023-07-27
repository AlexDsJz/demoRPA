/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const MaintenanceTypeFormView = ({ maintenanceType= {}, maintenanceCategories= [], onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Maintenance type</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={maintenanceType}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* Name */}
            <div class="form-group">
            <label class="input-label">Name</label>
            <Field type="text" name="name"
              class="form-control" />
            </div>
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
            {/* Input type */}
            <div class="form-group">
            <label class="input-label">Input type</label>
            <Field as="select" name="inputType"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="FILE">FILE</option>
              <option value="TEXT">TEXT</option>
            </Field>
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

MaintenanceTypeFormView.propTypes = {
  maintenanceType: PropTypes.object,
  maintenanceCategories: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default MaintenanceTypeFormView;