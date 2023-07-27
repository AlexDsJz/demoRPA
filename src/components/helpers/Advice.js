import React, { useState } from "react";
import PropTypes from "prop-types";
import View from "components/helpers/Advice.view";

const Advice = ({ onClose, title, subtitle, btnTitle, onClick, error }) => {

  const [finished, setFinished] = useState(false);

  setTimeout(() => {
    setFinished(true);
  }, 200)

  return <View 
    finished={finished}
    title={title}
    subtitle={subtitle}
    btnTitle={btnTitle}
    onClick={onClick??onClose}
    error={error}
  />;

}

Advice.propTypes = {
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  btnTitle: PropTypes.string,
  error: PropTypes.string
};

export default Advice;