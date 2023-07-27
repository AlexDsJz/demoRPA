/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const CraneFormView = ({ crane= {}, onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Crane</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={crane}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* Crane id */}
            <div class="form-group">
            <label class="input-label">Crane id</label>
            <Field type="text" name="craneId"
              class="form-control" />
            </div>
            {/* Model */}
            <div class="form-group">
            <label class="input-label">Model</label>
            <Field type="text" name="model"
              class="form-control" />
            </div>
            {/* Number */}
            <div class="form-group">
            <label class="input-label">Number</label>
            <Field type="text" name="number"
              class="form-control" />
            </div>
            {/* Series */}
            <div class="form-group">
            <label class="input-label">Series</label>
            <Field type="text" name="series"
              class="form-control" />
            </div>
            {/* In use */}
            <div class="form-group">
            <Field type="checkbox" name="inUse"
              class="d-inline mr-2" />
            <label class="input-label d-inline">In use</label>
            </div>
            {/* Owner */}
            <div class="form-group">
            <label class="input-label">Owner</label>
            <Field as="select" name="owner"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="GROKE">GROKE</option>
              <option value="RENTED">RENTED</option>
              <option value="SOLD">SOLD</option>
            </Field>
            </div>
            {/* Status */}
            <div class="form-group">
            <label class="input-label">Status</label>
            <Field as="select" name="status"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="NA">NA</option>
              <option value="COMMERCIAL">COMMERCIAL</option>
              <option value="CLOSED">CLOSED</option>
              <option value="RELOCATED">RELOCATED</option>
              <option value="MOUNTING">MOUNTING</option>
              <option value="DISASSEMBLY">DISASSEMBLY</option>
              <option value="CONSTRUCTION">CONSTRUCTION</option>
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

CraneFormView.propTypes = {
  crane: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default CraneFormView;