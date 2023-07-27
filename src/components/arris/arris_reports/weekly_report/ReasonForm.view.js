import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import "styles/css/Form.css";
import moment from "moment";

const ReasonFormView = ({ onSubmit, report }) =>
  <div class="card h-100">

    {/* Header */}
    <div className="card-header d-flex flex-column justify-content-center mb-0">
      <h3 className="">
        Justificar falta de envío - reporte {moment(report.date).format("DD/MM/YYYY")}
      </h3>
      <h4 className="">
        {report.operator.first_name} {report.operator.last_name} 
        ({function(){
          if(report.operator.turn == "FIRST") return "Primer turno";
          if(report.operator.turn == "SECOND") return "Segundo turno";
        }()})
        [{report.crane.model}{report.crane.number} - {report.crane.series}]
      </h4>
    </div>

    {/* Body */}
    <div class="card-body">
      <div class="row">
        <div class="col">
          <Formik
            initialValues={{
              form_id: report.id,
              operator_id: report.operator.id,
              reason: report.reason_missing
            }}
            onSubmit={onSubmit}>
            {({ values, setFieldValue }) =>
              <Form>

                <div class="mb-1">
                  <div className="row">
                    <div className="col-md-12">
                      <div class="form-group form-group-default required">
                        <label class="control-label">Justificación</label>
                        <textarea 
                          type="textarea" 
                          name="reason" 
                          id="reason" 
                          class="form-control"
                          rows="3" 
                          onChange={(event) => setFieldValue("reason", event.target.value)} 
                          value={values.reason}/>
                        <div class="invalid-feedback">Required</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col">
                    <button type="submit" class="btn btn-block btn-primary">
                      Guardar
                    </button>
                  </div>
                </div>

              </Form>}
          </Formik>
        </div>
      </div>
    </div>

  </div>;

ReasonFormView.propTypes = {
  onSubmit: PropTypes.func,
  report: PropTypes.object
};

export default ReasonFormView;