import React from "react";
import PropTypes from "prop-types";
import View from "components/shippings/FormItem.view";

const FormItemSet = ({content, setHideModal, selectedParts, setSelectedParts }) => {

  const onSubmit = (values) => {
    let parts = selectedParts
      .map((part, index) => index != content.index 
        ? part 
        : {
          ...values,
          images: values.images??[],
          suggestRef: values.suggestRef??-1,
          manual: true,
          elevationNumber: part.elevationNumber??0,
      });
    setSelectedParts(parts);
    setHideModal(true);
  }

  return <View 
    content={content}
    setHideModal={setHideModal}
    onSubmit={onSubmit}
  />;    
  
}

FormItemSet.propTypes = {
  content: PropTypes.object,
  setHideModal: PropTypes.func,
  selectedParts: PropTypes.array,
  setSelectedParts: PropTypes.func
}
    
export default FormItemSet;