/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const ItemFormView = ({ item= {}, parts= [], onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Item</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={item}
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
            {/* Description */}
            <div class="form-group">
            <label class="input-label">Description</label>
            <Field type="text" name="description"
              class="form-control" />
            </div>
            {/* Reference */}
            <div class="form-group">
            <label class="input-label">Reference</label>
            <Field type="text" name="reference"
              class="form-control" />
            </div>
            {/* Comment */}
            <div class="form-group">
            <label class="input-label">Comment</label>
            <Field type="text" name="comment"
              class="form-control" />
            </div>
            {/* Number */}
            <div class="form-group">
            <label class="input-label">Number</label>
            <Field type="number" name="number"
              class="form-control" />
            </div>
            {/* Quantity */}
            <div class="form-group">
            <label class="input-label">Quantity</label>
            <Field type="text" name="quantity"
              class="form-control" />
            </div>
            {/* Manual page */}
            <div class="form-group">
            <label class="input-label">Manual page</label>
            <Field type="number" name="manualPage"
              class="form-control" />
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
            </div>
            {error ? <div class="alert alert-soft-danger">{error}</div> : null}
            <button type="submit" class="btn btn-block btn-primary">Send</button>
          </Form> }
          </Formik>
        </div>
      </div>
    </div>

  </div>;

ItemFormView.propTypes = {
  item: PropTypes.object,
  parts: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default ItemFormView;