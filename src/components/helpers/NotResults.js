import React from "react";
import PropTypes from "prop-types";

class NotResults extends React.Component {

  render() {
    return <div className="row">
      <div className="col-md-12 text-center my-4">
        <h4>No se han encontrado resultados</h4>
      </div>
    </div>
  }

}

NotResults.propTypes = {
};

export default NotResults;