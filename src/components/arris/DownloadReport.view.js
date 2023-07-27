import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import "styles/css/Form.css";

const DownloadReport = ({ onSubmit, onClose, step }) =>
  <div class="card">

    {/* Header */}
    {step === 1 && 
      <>
        <div class="card-header">
          <h3 class="card-header-title">Descargar Reporte</h3>
        </div>
      </>
    }

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik initialValues={{}} onSubmit={onSubmit}>
            {({ values, setFieldValue }) => (
              <Form>
                {step === 1 && 
                  <>
                    <div class="mb-3">
                      <div className="row justify-content-center">     
                        <div className="col-md-6">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Fecha de inicio:</label>
                            <Field name="start_date" type="date" class="form-control" />
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div class="form-group form-group-default required">
                            <label class="control-label">Fecha de fin:</label>
                            <Field name="end_date" type="date" class="form-control" />
                            <div class="invalid-feedback">Required</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-md-10">
                        <button type="submit" class="btn btn-block btn-primary">
                          Descargar
                        </button>
                      </div>
                    </div>
                  </>
                }
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>

  </div>;

DownloadReport.propTypes = {
  user: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  step: PropTypes.number,
};

export default DownloadReport;