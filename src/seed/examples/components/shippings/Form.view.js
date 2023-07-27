/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const ShippingFormView = ({ shipping= {}, orders= [], onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Shipping</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={shipping}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* Truck plate */}
            <div class="form-group">
            <label class="input-label">Truck plate</label>
            <Field type="text" name="truckPlate"
              class="form-control" />
            </div>
            {/* Transport plate */}
            <div class="form-group">
            <label class="input-label">Transport plate</label>
            <Field type="text" name="transportPlate"
              class="form-control" />
            </div>
            {/* Transport phone */}
            <div class="form-group">
            <label class="input-label">Transport phone</label>
            <Field type="text" name="transportPhone"
              class="form-control" />
            </div>
            {/* Transport other phone */}
            <div class="form-group">
            <label class="input-label">Transport other phone</label>
            <Field type="text" name="transportOtherPhone"
              class="form-control" />
            </div>
            {/* Transport carrier name */}
            <div class="form-group">
            <label class="input-label">Transport carrier name</label>
            <Field type="text" name="transportCarrierName"
              class="form-control" />
            </div>
            {/* Transport company */}
            <div class="form-group">
            <label class="input-label">Transport company</label>
            <Field type="text" name="transportCompany"
              class="form-control" />
            </div>
            {/* Delivery date */}
            <div class="form-group">
            <label class="input-label">Delivery date</label>
            <Field type="date" name="deliveryDate"
              class="form-control" />
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
              <option value="IN_REVIEW">IN_REVIEW</option>
              <option value="TRAVELING">TRAVELING</option>
              <option value="ARRIVED">ARRIVED</option>
              <option value="FINISHED">FINISHED</option>
              <option value="QUALITY_COMPLETED">QUALITY_COMPLETED</option>
              <option value="SECURITY_COMPLETED">SECURITY_COMPLETED</option>
              <option value="SECURITY_REVISION">SECURITY_REVISION</option>
              <option value="SECURITY_INITIAL">SECURITY_INITIAL</option>
              <option value="SECURITY_INITIAL_COMPLETED">SECURITY_INITIAL_COMPLETED</option>
            </Field>
            </div>
            {/* Type */}
            <div class="form-group">
            <label class="input-label">Type</label>
            <Field as="select" name="type"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="TO_BUILDING">TO_BUILDING</option>
              <option value="FROM_BUILDING">FROM_BUILDING</option>
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
            </div>
            {error ? <div class="alert alert-soft-danger">{error}</div> : null}
            <button type="submit" class="btn btn-block btn-primary">Send</button>
          </Form> }
          </Formik>
        </div>
      </div>
    </div>

  </div>;

ShippingFormView.propTypes = {
  shipping: PropTypes.object,
  orders: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default ShippingFormView;