/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const ContentFormView = ({ content= {}, shippings= [], onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Content</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={content}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* Part id */}
            <div class="form-group">
            <label class="input-label">Part id</label>
            <Field type="text" name="partId"
              class="form-control" />
            </div>
            {/* Part name */}
            <div class="form-group">
            <label class="input-label">Part name</label>
            <Field type="text" name="partName"
              class="form-control" />
            </div>
            {/* Items */}
            <div class="form-group">
            <label class="input-label">Items</label>
            <Field type="text" name="items"
              as="textarea" rows="3"
              class="form-control" />
            </div>
            {/* Quantity */}
            <div class="form-group">
            <label class="input-label">Quantity</label>
            <Field type="number" name="quantity"
              class="form-control" />
            </div>
            {/* Um */}
            <div class="form-group">
            <label class="input-label">Um</label>
            <Field type="text" name="um"
              class="form-control" />
            </div>
            {/* Manual */}
            <div class="form-group">
            <Field type="checkbox" name="manual"
              class="d-inline mr-2" />
            <label class="input-label d-inline">Manual</label>
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
            {/* Suggest ref */}
            <div class="form-group">
            <label class="input-label">Suggest ref</label>
            <Field type="number" name="suggestRef"
              class="form-control" />
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

ContentFormView.propTypes = {
  content: PropTypes.object,
  shippings: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default ContentFormView;