/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const SecurityRevisionFormView = ({ securityRevision= {}, orders= [], onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Security revision</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={securityRevision}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* Crane model */}
            <div class="form-group">
            <label class="input-label">Crane model</label>
            <Field type="text" name="craneModel"
              class="form-control" />
            </div>
            {/* Active */}
            <div class="form-group">
            <Field type="checkbox" name="active"
              class="d-inline mr-2" />
            <label class="input-label d-inline">Active</label>
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
            {/* Type */}
            <div class="form-group">
            <label class="input-label">Type</label>
            <Field as="select" name="type"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="INITIAL">INITIAL</option>
              <option value="FINAL">FINAL</option>
            </Field>
            </div>
            {/* Status */}
            <div class="form-group">
            <label class="input-label">Status</label>
            <Field as="select" name="status"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="CREATED">CREATED</option>
              <option value="IN_PROCESS">IN_PROCESS</option>
              <option value="COMPLETED">COMPLETED</option>
            </Field>
            </div>
            {/* Init date */}
            <div class="form-group">
            <label class="input-label">Init date</label>
            <Field type="date" name="initDate"
              class="form-control" />
            </div>
            {/* End date */}
            <div class="form-group">
            <label class="input-label">End date</label>
            <Field type="date" name="endDate"
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

SecurityRevisionFormView.propTypes = {
  securityRevision: PropTypes.object,
  orders: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default SecurityRevisionFormView;