import React, { useState } from "react";
import PropTypes from "prop-types";
import View from "components/shippings/FormItem.view";

const FormItemSave = ({ setHideModal, selectedParts, setSelectedParts }) => {

  const onSubmit = (values) => {
    setSelectedParts([...selectedParts, {
      ...values,
      images: [],
      suggestionId: -1,
      manual: true,
      elevationNumber: 0,
    }]);
    setHideModal(true);
  }

  return <View 
    setHideModal={setHideModal}
    onSubmit={onSubmit}
  />;    
  
}

FormItemSave.propTypes = {
  setHideModal: PropTypes.func.isRequired,
  selectedParts: PropTypes.array.isRequired,
  setSelectedParts: PropTypes.func.isRequired
}
    
export default FormItemSave;