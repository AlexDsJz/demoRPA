import React from "react";
import PropTypes from "prop-types";
import "styles/css/Advice.css";

const Advice = ({finished, title, subtitle, error, btnTitle, onClick}) =>
  <div className="d-flex justify-content-center align-items-center flex-column">
    <div 
      class={function(){
        if(finished) {
          if(error != null) 
            return "circle-loader load-error";
          else
            return "circle-loader load-complete"
        }   
        else {
          return "circle-loader";
        }
      }()}
    >
      <div class={function(){
        if(finished) {
          if(error != null)
            return "checkmark error";
          else
            return "checkmark draw";
        }
        else {
          return "checkmark draw";
        }    
      }()} style={finished ? {display: "block"} : {display: "none"}}></div>
    </div>
    {title ? <h2 className="mt-3 text-align-center" align="center">{title}</h2> : <></>}
    {subtitle ? <h4 className="mt-1 text-align-center" align="center">{subtitle}</h4> : <></>}
    <button className="btn btn-primary btn-block" onClick={onClick}>
      {btnTitle}
    </button>
  </div>;

Advice.propTypes = {
  onClick: PropTypes.func,
  finished: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  btnTitle: PropTypes.string,
  error: PropTypes.string,
};

export default Advice;