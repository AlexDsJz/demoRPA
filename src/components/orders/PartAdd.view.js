import React from "react";
import PropTypes, { object } from "prop-types";
import Modal from "components/helpers/Modal";
import { Typeahead } from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';

const PartAdd = ({ 
  onClose,
  elevationEdit,
  elevationParts = [[]], 
  setElevationParts, 
  allParts, 
  setHideModal, 
  handleAdd, 
  handleChangeQuantity, 
  handleRemove 
}) => 
  <Modal
    width={800}
    height={400}
    onClose={onClose}
    component={
      () => <>
        <div className="card">
          <div className="card-header">
            <h4>Agregar partes</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">
                <div>

                  {elevationParts[elevationEdit].length > 0 && 
                    <>
                      <div className="row">
                        <div className="col-md-6">
                          <h4>Parte</h4>
                        </div>
                        <div className="col-md-4">
                          <h4>Cantidad</h4>
                        </div>
                      </div>
                    </>
                  }

                  {elevationParts[elevationEdit].map((part, index) => 
                    <div className="row my-4" key={index}>
                      <div className="col-md-6">
                        <Typeahead
                          id={`part-${index}`}
                          // allowNew={true}
                          onInputChange={(text) => {
                            // let newParts = elevationParts;
                            // newParts[elevationEdit][index].part = text;
                            // setElevationParts(newParts);
                          }}
                          onChange={(selected) => {

                            if(selected.length === 0) return;

                            if(typeof selected[0] === "object") {
                              let newParts = elevationParts;
                              newParts[elevationEdit][index].part = selected[0].label;
                              setElevationParts(newParts);
                            }
                            else {
                              let newParts = elevationParts;
                              newParts[elevationEdit][index].part = selected[0];
                              setElevationParts(newParts);
                            }
                            
                          }}
                          defaultInputValue={part.part}
                          options={[...allParts, part.part]}/>
                      </div>
                      <div className="col-md-4">
                        <input type="number" className="form-control" defaultValue={part.quantity}
                          onBlur={(event) => handleChangeQuantity(index, event)}/>
                      </div>
                      <div className="col-md-2">
                        <button className="btn btn-danger" onClick={() => handleRemove(index)}>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  )}

                  <button className="btn btn-primary btn-block" onClick={handleAdd}>
                    Agregar parte +
                  </button>
                  <button 
                    className="btn btn-secondary btn-block" 
                    onClick={onClose}
                  >
                    Listo
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    }
  />;

PartAdd.propTypes = {
  setHideModal: PropTypes.func,
  allParts: PropTypes.array,
  elevationParts: PropTypes.array,
  setElevationParts: PropTypes.func,
  elevationEdit: PropTypes.number,
  onClose: PropTypes.func,
  handleAdd: PropTypes.func,
  handleChangeQuantity: PropTypes.func,
  handleRemove: PropTypes.func
};
  
export default PartAdd;