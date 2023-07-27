import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter } from "react-router-dom";
import ModalRoute from "components/helpers/ModalRoute";
import OperationList from "components/binnacle/List";
import OperationDetails from "components/binnacle/Details";
import { Typeahead } from "react-bootstrap-typeahead";

const Operations = ({ craneId, setCraneId, cranes, searchRef }) =>
  <BrowserRouter basename="/binnacles">
    <div class="content container-fluid p-7">
    
    {/* Header */}
    <div class="page-header pt-4">
      <div class="row align-items-end">
        <div class="col-sm">
          <h1 class="page-header-title">Bitácora</h1>
        </div>
      </div>
    </div>

    <div className="mb-3 mx-1">
      <div className="row">
        <div className="col-md-6">
          <h4>Registros</h4>
        </div>
        <div className="col-md-6">
          <div className="float-right">
            <i className="fa fa-search position-absolute mt-1"></i>
            {/* The React Typeahead library require selected[0] */}
            <Typeahead
              ref={searchRef}
              defaultInputValue={craneId??""}
              options={cranes.map(c => c.series + " / " + c.model + "" + c.number )}
              onChange={(selected) => setCraneId(selected[0])} 
              placeholder="Buscar Grúas"
            >
              <div className="rbt-aux">
                {craneId == null && <i className="fa fa-search rbt-aux"></i>}
                {craneId != null && <i className="fa fa-times rbt-close text-danger" 
                  style={{paddingTop: "4px"}} role="button" onClick={() => {
                    searchRef.current.clear()
                    setCraneId(null)
                  }}></i>}
              </div>
            </Typeahead>
          </div>
        </div>
      </div>
    </div>

    <OperationList 
      craneId={craneId} />

    <ModalRoute 
      path="/:shippingId(\d+)"
      width={1000}
      height={550}
      component={OperationDetails} />

    </div>
  </BrowserRouter>;

Operations.propTypes = {
  searchRef: PropTypes.object,
  craneId: PropTypes.string,
  setCraneId: PropTypes.func,
  cranes: PropTypes.array
};

export default Operations;