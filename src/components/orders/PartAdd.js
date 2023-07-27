import React, { useState } from "react";
import PropTypes from 'prop-types';
import View from "components/orders/PartAdd.view";

const PartAdd = ({
  setHideModal, 
  allParts, 
  elevationParts,
  setElevationParts,
  elevationEdit
}) => {

  const [repaint, setRepaint] = useState(false);

  const handleAdd = (event) => {
    
    event.preventDefault();
    
    let newParts = elevationParts;
    newParts[elevationEdit] = [...newParts[elevationEdit], { part: "", quantity: 1 }];

    setElevationParts(newParts);
    setRepaint(!repaint);

  }

  const handleRemove = (index) => {

    let newParts = elevationParts; 
    newParts[elevationEdit].splice(index, 1);

    setElevationParts(newParts);
    setRepaint(!repaint);

  }

  const handleChangeQuantity = (index, event) => {

    event.preventDefault();

    let newParts = elevationParts;
    newParts[elevationEdit][index].quantity = event.target.value;

    setElevationParts(newParts);
    setRepaint(!repaint);

  }

  const onClose = () => {
    
    if(elevationParts[elevationEdit].filter(part => part.part == "").length > 0)
      alert("Algunas partes aún no se han agregado");
    else if(elevationParts[elevationEdit].filter(part => !part.quantity || part.quantity == 0).length > 0)
      alert("Algunas partes aún no tienen cantidad");
    else
      setHideModal(true); 
      
  }

  return <View 
    elevationEdit={elevationEdit}
    onClose={onClose}
    setHideModal={setHideModal} 
    elevationParts={elevationParts}
    setElevationParts={setElevationParts}
    allParts={allParts.filter(part => elevationParts[elevationEdit].every(currentPart => currentPart.part != part))}
    handleChangeQuantity={handleChangeQuantity}
    handleRemove={handleRemove}
    handleAdd={handleAdd}
  />;
  
}

PartAdd.propTypes = {
  setHideModal: PropTypes.func,
  allParts: PropTypes.array,
  elevationParts: PropTypes.array,
  setElevationParts: PropTypes.func,
  elevationEdit: PropTypes.number
};
  
export default PartAdd;