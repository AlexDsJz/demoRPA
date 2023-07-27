import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";

import "styles/index.css";
import "styles/css/General.css";
import "styles/css/Form.css";

const SupportView = ({ formikRef, onSubmit, error, message }) =>
  <main id="content" role="main" class="main pl-0">

    <div class="position-fixed top-0 right-0 left-0 bg-img-hero"
      style={ {height: "32rem", backgroundImage: "url(/theme/svg/components/abstract-bg-4.svg)"} }>
      <figure class="position-absolute right-0 bottom-0 left-0">
        <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
          x="0px" y="0px" viewBox="0 0 1921 273">
          <polygon fill="#fff" points="0,273 1921,273 1921,0 "/>
        </svg>
      </figure>
    </div>

    <div class="container py-5 py-sm-7">
      <a class="d-flex justify-content-center mb-5" href="index.html">
        <img class="z-index-2" src="/theme/img/groke.png" alt="Logo" style={ {width: "12rem"} }/>
      </a>
      <div class="row justify-content-center">
        <div class="col-md-7 col-lg-5">
          <div class="card card-lg mb-5 pt-2 pb-3">
            <div class="card-body">
              <Formik
                innerRef={formikRef}
                initialValues={{}}
                onSubmit={onSubmit}
              >
                {({ values, setFieldValue}) =>  
                  <Form>

                    <div className="row mb-4 text-center">
                      <div className="col-md-12">
                          <label class="control-label">
                            <h2>¿Necesitas ayuda?</h2>
                            Puedes contactarnos a través de este formulario o si lo prefieres, puedes escribirnos a  <a href="mailto:support@datagrid.com">support@datagrid.com</a>
                          </label>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <div class="form-group form-group-default">
                          <label class="control-label">Correo de contacto</label>
                          <Field required type="email" name="email" id="email" class="form-control"/>
                          <div class="invalid-feedback"></div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <div class="form-group form-group-default">
                          <label class="control-label">Asunto</label>
                          <Field required type="text" name="subject" id="subject" class="form-control"/>
                          <div class="invalid-feedback"></div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div class="form-group form-group-default">
                          <label class="control-label">
                            Descripción del problema
                          </label>
                          <textarea
                            required
                            type="textarea" 
                            name="message" 
                            id="message" 
                            class="form-control" 
                            rows="3" 
                            onChange={(event) => setFieldValue("message", event.target.value)} 
                            value={values.description}
                          />
                        </div>
                      </div>
                    </div>

                    { error && <div className="d-flex w-100 justify-content-center mb-4 text-center text-danger"> {error} </div> }
                    { message && <div className="d-flex w-100 justify-content-center mb-4 text-center text-success"> {message} </div> }

                    <div className="row">
                      <div className="d-flex w-100">
                        <button type="submit" class="btn btn-block btn-primary" onSubmit={onSubmit}>
                          Enviar
                        </button>
                      </div>
                    </div>

                  </Form>}
              </Formik>
            </div>
          </div>

        </div>
      </div>
    </div>

  </main>;

SupportView.propTypes = {
  formikRef: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  message: PropTypes.string
};

export default SupportView;