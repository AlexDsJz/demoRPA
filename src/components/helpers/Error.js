import React from "react";
import PropTypes from "prop-types";

class Error extends React.Component {

  render() {
    return <div className="bg-white">
      <div className="d-flex align-items-center justify-content-center flex-column">
        <div className="mt-4">
          <h2>Ha ocurrido un error</h2>
        </div>
        <p>Intenta realizar la operación más tarde</p>
      </div>
    </div>;
  }

}

Error.propTypes = {
  pageNum: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onClickPage: PropTypes.func.isRequired
};

export default Error;