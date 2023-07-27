/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const SuggestionFormView = ({ suggestion= {}, shippings= [], parts= [], orders= [], onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Suggestion</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={suggestion}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* Quantity */}
            <div class="form-group">
            <label class="input-label">Quantity</label>
            <Field type="number" name="quantity"
              class="form-control" />
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
            {/* Part */}
            <div class="form-group">
            <div>
            <label class="input-label">Part</label>
            <Field as="select" name="part.id"
              class="form-control"  >
              <option value="">Select an option</option>
              {parts.map((e, idx) => <option key={idx} value={e.id}>{e.id}</option>) }
            </Field>
            </div>
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
            {/* Elevation number */}
            <div class="form-group">
            <label class="input-label">Elevation number</label>
            <Field type="number" name="elevationNumber"
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

SuggestionFormView.propTypes = {
  suggestion: PropTypes.object,
  shippings: PropTypes.array,
  parts: PropTypes.array,
  orders: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default SuggestionFormView;