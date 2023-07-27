/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { MultiField, FileField } from "seed/helpers";

const OrderFormView = ({ order= {}, users= [], cranes= [], onSubmit, error }) =>
  <div class="card">

    {/* Header */}
    <div class="card-header">
      <h3 class="card-header-title">Order</h3>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
          initialValues={order}
          onSubmit={onSubmit}>
          {({ values, setFieldValue}) =>
          <Form>
            <div class="mb-3">
            {/* Client name */}
            <div class="form-group">
            <label class="input-label">Client name</label>
            <Field type="text" name="clientName"
              class="form-control" />
            </div>
            {/* Building name */}
            <div class="form-group">
            <label class="input-label">Building name</label>
            <Field type="text" name="buildingName"
              class="form-control" />
            </div>
            {/* Building street */}
            <div class="form-group">
            <label class="input-label">Building street</label>
            <Field type="text" name="buildingStreet"
              class="form-control" />
            </div>
            {/* Building city */}
            <div class="form-group">
            <label class="input-label">Building city</label>
            <Field type="text" name="buildingCity"
              class="form-control" />
            </div>
            {/* Building state */}
            <div class="form-group">
            <label class="input-label">Building state</label>
            <Field type="text" name="buildingState"
              class="form-control" />
            </div>
            {/* Building address */}
            <div class="form-group">
            <label class="input-label">Building address</label>
            <Field type="text" name="buildingAddress"
              class="form-control" />
            </div>
            {/* Contact name */}
            <div class="form-group">
            <label class="input-label">Contact name</label>
            <Field type="text" name="contactName"
              class="form-control" />
            </div>
            {/* Contact phone */}
            <div class="form-group">
            <label class="input-label">Contact phone</label>
            <Field type="text" name="contactPhone"
              class="form-control" />
            </div>
            {/* Contact email */}
            <div class="form-group">
            <label class="input-label">Contact email</label>
            <Field type="text" name="contactEmail"
              class="form-control" />
            </div>
            {/* Feet model */}
            <div class="form-group">
            <label class="input-label">Feet model</label>
            <Field type="text" name="feetModel"
              class="form-control" />
            </div>
            {/* Dice size */}
            <div class="form-group">
            <label class="input-label">Dice size</label>
            <Field type="text" name="diceSize"
              class="form-control" />
            </div>
            {/* Requesting trader */}
            <div class="form-group">
            <label class="input-label">Requesting trader</label>
            <Field type="text" name="requestingTrader"
              class="form-control" />
            </div>
            {/* Applicant */}
            <div class="form-group">
            <div>
            <label class="input-label">Applicant</label>
            <Field as="select" name="applicant.id"
              class="form-control"  >
              <option value="">Select an option</option>
              {users.map((e, idx) => <option key={idx} value={e.id}>{e.id}</option>) }
            </Field>
            </div>
            </div>
            {/* Comments */}
            <div class="form-group">
            <label class="input-label">Comments</label>
            <Field type="text" name="comments"
              class="form-control" />
            </div>
            {/* Model reference */}
            <div class="form-group">
            <label class="input-label">Model reference</label>
            <Field type="text" name="modelReference"
              class="form-control" />
            </div>
            {/* Crane version */}
            <div class="form-group">
            <label class="input-label">Crane version</label>
            <Field type="text" name="craneVersion"
              class="form-control" />
            </div>
            {/* Order version */}
            <div class="form-group">
            <label class="input-label">Order version</label>
            <Field type="text" name="orderVersion"
              class="form-control" />
            </div>
            {/* Configuration */}
            <div class="form-group">
            <label class="input-label">Configuration</label>
            <Field type="text" name="configuration"
              class="form-control" />
            </div>
            {/* Elevations */}
            <div class="form-group">
            <label class="input-label">Elevations</label>
            <Field type="text" name="elevations"
              as="textarea" rows="3"
              class="form-control" />
            </div>
            {/* Mounting date */}
            <div class="form-group">
            <label class="input-label">Mounting date</label>
            <Field type="date" name="mountingDate"
              class="form-control" />
            </div>
            {/* Rent period */}
            <div class="form-group">
            <label class="input-label">Rent period</label>
            <Field type="number" name="rentPeriod"
              class="form-control" />
            </div>
            {/* Elevations number */}
            <div class="form-group">
            <label class="input-label">Elevations number</label>
            <Field type="number" name="elevationsNumber"
              class="form-control" />
            </div>
            {/* Transport number */}
            <div class="form-group">
            <label class="input-label">Transport number</label>
            <Field type="number" name="transportNumber"
              class="form-control" />
            </div>
            {/* Has power lift */}
            <div class="form-group">
            <Field type="checkbox" name="hasPowerLift"
              class="d-inline mr-2" />
            <label class="input-label d-inline">Has power lift</label>
            </div>
            {/* Has cabin */}
            <div class="form-group">
            <Field type="checkbox" name="hasCabin"
              class="d-inline mr-2" />
            <label class="input-label d-inline">Has cabin</label>
            </div>
            {/* Has radio control */}
            <div class="form-group">
            <Field type="checkbox" name="hasRadioControl"
              class="d-inline mr-2" />
            <label class="input-label d-inline">Has radio control</label>
            </div>
            {/* Has cage mounting */}
            <div class="form-group">
            <Field type="checkbox" name="hasCageMounting"
              class="d-inline mr-2" />
            <label class="input-label d-inline">Has cage mounting</label>
            </div>
            {/* Has remote control */}
            <div class="form-group">
            <Field type="checkbox" name="hasRemoteControl"
              class="d-inline mr-2" />
            <label class="input-label d-inline">Has remote control</label>
            </div>
            {/* Boom length */}
            <div class="form-group">
            <label class="input-label">Boom length</label>
            <Field type="number" name="boomLength"
              class="form-control" />
            </div>
            {/* Tower height */}
            <div class="form-group">
            <label class="input-label">Tower height</label>
            <Field type="number" name="towerHeight"
              class="form-control" />
            </div>
            {/* Final height */}
            <div class="form-group">
            <label class="input-label">Final height</label>
            <Field type="number" name="finalHeight"
              class="form-control" />
            </div>
            {/* Insurance responsable */}
            <div class="form-group">
            <label class="input-label">Insurance responsable</label>
            <Field as="select" name="insuranceResponsable"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="CLIENT">CLIENT</option>
              <option value="OWNER">OWNER</option>
              <option value="BOTH">BOTH</option>
            </Field>
            </div>
            {/* Forwarding system */}
            <div class="form-group">
            <label class="input-label">Forwarding system</label>
            <Field as="select" name="forwardingSystem"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="SIMPLE">SIMPLE</option>
              <option value="DOUBLE">DOUBLE</option>
            </Field>
            </div>
            {/* Status */}
            <div class="form-group">
            <label class="input-label">Status</label>
            <Field as="select" name="status"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="CREATED">CREATED</option>
              <option value="CHARGING">CHARGING</option>
              <option value="TRAVELING">TRAVELING</option>
              <option value="RECEIVED">RECEIVED</option>
              <option value="IN_BUILDING">IN_BUILDING</option>
              <option value="FINISHED">FINISHED</option>
              <option value="RETURNED">RETURNED</option>
              <option value="UNASSIGNED">UNASSIGNED</option>
            </Field>
            </div>
            {/* Feet type */}
            <div class="form-group">
            <label class="input-label">Feet type</label>
            <Field as="select" name="feetType"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="REUSABLE">REUSABLE</option>
              <option value="CONVENTIONALS">CONVENTIONALS</option>
              <option value="WITHOUT">WITHOUT</option>
              <option value="DIRECT">DIRECT</option>
            </Field>
            </div>
            {/* Base type */}
            <div class="form-group">
            <label class="input-label">Base type</label>
            <Field as="select" name="baseType"
              class="form-control"  >
              <option value="">Select an option</option>
              <option value="LINKED">LINKED</option>
              <option value="CONVENTIONAL">CONVENTIONAL</option>
              <option value="IN_CROSS">IN_CROSS</option>
              <option value="STRUCTURE">STRUCTURE</option>
            </Field>
            </div>
            {/* Crane */}
            <div class="form-group">
            <div>
            <label class="input-label">Crane</label>
            <Field as="select" name="crane.id"
              class="form-control"  >
              <option value="">Select an option</option>
              {cranes.map((e, idx) => <option key={idx} value={e.id}>{e.id}</option>) }
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

OrderFormView.propTypes = {
  order: PropTypes.object,
  users: PropTypes.array,
  cranes: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default OrderFormView;