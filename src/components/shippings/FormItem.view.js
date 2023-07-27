import React from "react";
import PropTypes from "prop-types";
import Modal from "components/helpers/Modal";
import { Formik, Field, Form } from "formik";

const FormItem = ({ content = {}, setHideModal, onSubmit }) =>
  <Modal 
    width={800}
    height={500}
    onClose={() => setHideModal(true)}
    component={() => 
      <div className="card">

        <div className="card-header">
          <h3>
            Agregar piezas
          </h3>
        </div>

        <div className="card-body">
          <Formik
            initialValues={{
              partId: content.partId,
              partName: content.partName,
              um: content.um,
              elevationNumber: content.elevationNumber??0,
              quantity: content.quantity??1,
              items: content.items??"",
              index: content.index
            }}
            onSubmit={onSubmit}>
            {({ values, setFieldValue }) => <Form>

              <div className="mb-3">
                <h3>Datos de la pieza</h3>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div class="form-group form-group-default required">
                    <label class="control-label">ID Pieza</label>
                      <Field type="text" className="form-control" name="partId" placeholder="Nombre" required/>
                    <div class="invalid-feedback">Required</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="form-group form-group-default required">
                    <label class="control-label">Nombre pieza</label>
                      <Field type="text" className="form-control" name="partName" placeholder="Nombre" required/>
                    <div class="invalid-feedback">Required</div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div class="form-group form-group-default required">
                    <label class="control-label">Cantidad</label>
                      <Field type="number" className="form-control" name="quantity" placeholder="Cantidad" 
                        defaultValue={1} required/>
                    <div class="invalid-feedback">Required</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="form-group form-group-default required">
                    <label class="control-label">U.M.</label>
                      <Field component="select" name="um" class="form-control" required>
                        <option value="">Seleccione una opción</option>
                        <option value="JUEGO">Juego</option>
                        <option value="PIEZA">Pieza</option>
                        <option value="KG">Kilogramo</option>
                        <option value="L">Litro</option>
                        <option value="METRO">Metro</option>
                      </Field>
                    <div class="invalid-feedback">Required</div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <h3>Datos de los items</h3>
              </div>

              {values.items != "" && values.items.split(";").map((item, index) => 
                <div className="row d-flex" key={index}>

                  {/* Working with items, 
                      follow the format quantity|name|descrption|comment;... */}
                      
                  <div className="col-md-2">
                    <div class="form-group form-group-default required">
                      <label class="control-label">Cantidad</label>
                        <input 
                          required
                          type="number" 
                          className="form-control" 
                          placeholder="Cantidad"
                          value={item.split("|")[0]} 
                          onChange={(e) => {
                            let value = e.target.value;
                            setFieldValue("items", values.items.split(";").map((it, idx) => index == idx 
                              ? value + "|" + it.split("|")[1] + "|" + it.split("|")[2] + "|" + it.split("|")[3] 
                              : it).join(";")
                            );
                          }} 
                        />
                      <div class="invalid-feedback">Required</div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div class="form-group form-group-default required">
                      <label class="control-label">Nombre</label>
                        <input 
                          required
                          type="text" 
                          className="form-control" 
                          placeholder="Nombre" 
                          value={item.split("|")[1]} 
                          onChange={(e) => {
                            let value = e.target.value;
                            setFieldValue("items", values.items.split(";").map((it, idx) => index == idx 
                              ? it.split("|")[0] + "|" + value + "|" + it.split("|")[2] + "|" + it.split("|")[3] 
                              : it).join(";")
                            );
                          }} 
                        />
                      <div class="invalid-feedback">Required</div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div class="form-group form-group-default">
                      <label class="control-label">Descripción</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Descripción" 
                          value={item.split("|")[2]} 
                          onChange={(e) => {
                            let value = e.target.value;
                            setFieldValue("items", values.items.split(";").map((it, idx) => index == idx 
                              ? it.split("|")[0] + "|" + it.split("|")[1] + "|" + value + "|" + it.split("|")[3] 
                              : it).join(";")
                            );
                          }}
                        />
                      <div class="invalid-feedback">Required</div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div class="form-group form-group-default">
                      <label class="control-label">Comentarios</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Descripción" 
                          value={item.split("|")[3]} 
                          onChange={(e) => {
                            let value = e.target.value;
                            setFieldValue("items", values.items.split(";").map((it, idx) => index == idx 
                              ? it.split("|")[0] + "|" + it.split("|")[1] + "|" + it.split("|")[2] + "|" + value 
                              : it).join(";")
                            );
                          }} 
                        />
                      <div class="invalid-feedback">Required</div>
                    </div>
                  </div>

                  <div className="col-md-1 pt-1">
                    <button 
                      type="button" 
                      className="btn text-danger" 
                      onClick={() => 
                          setFieldValue("items", values.items.split(";").filter((_, idx) => index != idx).join(";"))
                      }
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>

                </div>
              )}

              <div className="row">
                <div className="col-md-12">
                  <button 
                    type="button" 
                    className="btn btn-primary btn-block" 
                    onClick={() => {
                      if(values.items == "")
                        setFieldValue("items", values.items + "|||")
                      else
                        setFieldValue("items", values.items + ";|||")
                    }}
                  >
                    Agregar item
                  </button>
                  <button type="submit" className="btn btn-secondary btn-block">Listo</button>
                </div>
              </div>

          </Form>}
          </Formik> 
        </div>
      </div>}
  />;

FormItem.propTypes = {
  setHideModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  content: PropTypes.object
}
    
export default FormItem;