import React from "react";
import PropTypes from "prop-types";

class NotFound extends React.Component {

  render() {
    return <div className="bg-white">
      <div className="d-flex align-items-center justify-content-center flex-column h-50">
        <br></br>
        <div className="mt-4">
          <h2>ID no encontrada</h2>
          <p>El registro buscado no existe</p>
        </div>
        <br></br>
      </div>
    </div>;
  }

}

NotFound.propTypes = {
  pageNum: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onClickPage: PropTypes.func.isRequired
};

export default NotFound;