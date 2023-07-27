/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const UserFormView = ({ user= {}, onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">User</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={user}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* Rol */}
            <div class="form-group">
            <label class="input-label">Rol</label>
            <Field as="select" name="rol"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="ADMIN">ADMIN</option>
              <option value="QUALITY_CONTROL">QUALITY_CONTROL</option>
              <option value="BUILDING_OPERATOR">BUILDING_OPERATOR</option>
              <option value="WORKSHOP_OPERATOR">WORKSHOP_OPERATOR</option>
              <option value="SECURITY">SECURITY</option>
              <option value="MAINTENANCE_WORKER">MAINTENANCE_WORKER</option>
              <option value="COMMERCIAL">COMMERCIAL</option>
              <option value="MAINTENANCE_SUPERVISOR">MAINTENANCE_SUPERVISOR</option>
            </Field>
            </div>
            {/* Phone */}
            <div class="form-group">
            <label class="input-label">Phone</label>
            <Field type="text" name="phone"
              class="form-control" />
            </div>
            {/* Shipping notification */}
            <div class="form-group">
            <Field type="checkbox" name="shippingNotification"
              class="d-inline mr-2" />
            <label class="input-label d-inline">Shipping notification</label>
            </div>
            {/* Order notification */}
            <div class="form-group">
            <Field type="checkbox" name="orderNotification"
              class="d-inline mr-2" />
            <label class="input-label d-inline">Order notification</label>
            </div>
            {/* Arris notification */}
            <div class="form-group">
            <Field type="checkbox" name="arrisNotification"
              class="d-inline mr-2" />
            <label class="input-label d-inline">Arris notification</label>
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

UserFormView.propTypes = {
  user: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default UserFormView;