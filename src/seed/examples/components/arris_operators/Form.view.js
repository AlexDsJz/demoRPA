/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const ArrisOperatorFormView = ({ arrisOperator= {}, orders= [], users= [], onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Arris operator</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={arrisOperator}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* Active */}
            <div class="form-group">
            <Field type="checkbox" name="active"
              class="d-inline mr-2" />
            <label class="input-label d-inline">Active</label>
            </div>
            {/* Turn */}
            <div class="form-group">
            <label class="input-label">Turn</label>
            <Field as="select" name="turn"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="FIRST">FIRST</option>
              <option value="SECOND">SECOND</option>
              <option value="SECURITY">SECURITY</option>
            </Field>
            </div>
            {/* Order */}
            <div class="form-group">
            <div>
            <label class="input-label">Order</label>
            <Field as="select" name="order.id"
              class="form-control"  >
              <option value="">Select an option</option>
              {orders.map((e, idx) => <option key={idx} value={e.id}>{e.id}</option>) }
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
            </div>
            {error ? <div class="alert alert-soft-danger">{error}</div> : null}
            <button type="submit" class="btn btn-block btn-primary">Send</button>
          </Form> }
          </Formik>
        </div>
      </div>
    </div>

  </div>;

ArrisOperatorFormView.propTypes = {
  arrisOperator: PropTypes.object,
  orders: PropTypes.array,
  users: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default ArrisOperatorFormView;