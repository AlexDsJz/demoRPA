import React, { useState } from "react";
import PropTypes from "prop-types";
import { useQuery } from "seed/gql";
import View from "components/shippings/Form.view";
import { usePost } from "seed/api";

const ShippingFormSave = ({ onCompleted = () => null, onError = () => null, setCreated, onClose }) => {

  const [step, setStep] = useState(1);
  const [hideModal, setHideModal] = useState(true);
  const [hideEditModal, setHideEditModal] = useState(true);
  const [order, setOrder] = useState(undefined);
  const [content, setContent] = useState(undefined);
  const [selectedParts, setSelectedParts] = useState([]);

  const qOrders = useQuery(`{ 
    orders {
      id
      crane {
        id
        craneId
        model
        number
        series
        number
      }
      clientName
      buildingStreet
      buildingCity
      buildingState
      status
    } 
  }`, "status<>FINISHED");

  const qSuggestions = useQuery(`{
    suggestions {
      order {}
      shipping {}
      quantity
      elevationNumber
      part {
        partId
        name
        um
        images {}
        items {
          name
          description
          comment
          quantity
        }
      }
    }
  }`, "order.id=" + (order ? order.id : ""), {orderBy: "id"});

  const [callPost, qPost] = usePost("/shippings/create_shipping", {
    onCompleted: (data) => {
      setCreated(true);
      setStep(3);
      window.location.href = "/shippings";
    },
    onError: (error) => {
      setCreated(true);
      setStep(3);
    }
  });

  const error = qPost.error || qSuggestions.error ? "An error has occurred" : null;

  const { orders = [] } = qOrders.data;
  const { suggestions = [] } = qSuggestions.data;

  const cleanedOrders = orders.filter(order => order.crane != null);

  const formattedCranes = cleanedOrders.map((order) => 
    order.crane.model + "" + order.crane.number +"/ " + order.crane.series);

  const onSubmit = (values) => {

    if(step === 1) {
      if(!order) alert("Seleccione una orden primero");
      else setStep(2);
      return;
    }
    if(step === 2) {

      if(selectedParts.length === 0) {
        alert("No puede haber un embarque sin contenido");
        return;
      }

      callPost({
        ...values,
        contents: selectedParts,
        order_id: order.id,
      });
      
    }

  };

  const onClickRetry = () => {
    setStep(step - 1);
    setCreated(false);
  };
  
  const onPrev = () => 
    setStep(step - 1);

  const onAddPart = (suggestion) => {
    setSelectedParts([...selectedParts, {
      partId: suggestion.part.partId,
      partName: suggestion.part.name,
      um: suggestion.part.um,
      quantity: suggestion.quantity,
      images: suggestion.part.images,
      manual: false,
      suggestRef: suggestion.id,
      elevationNumber: suggestion.elevationNumber,
      items: suggestion.part.items.map(item =>
        item.quantity + "|" + item.name + "|" + item.description + "|" + item.comment).join(";")
    }]);
  };

  const onRemovePart = (index) =>
    setSelectedParts(selectedParts.filter((_, i) => i !== index));

  const filteredSuggestions = suggestions.length > 0 ? suggestions
    .filter(suggestion => selectedParts
      .every(part => suggestion.part.partId != part.partId || suggestion.elevationNumber != part.elevationNumber))
        .filter(suggestion => suggestion.shipping == null) : [];

  return <View
    orders={cleanedOrders}
    order={order}
    currentParts={selectedParts}
    setCurrentParts={setSelectedParts}
    suggestions={filteredSuggestions}
    selectedParts={selectedParts}
    setSelectedParts={setSelectedParts}
    content={content}
    setContent={setContent}
    hideModal={hideModal}
    setHideModal={setHideModal}
    hideEditModal={hideEditModal}
    setHideEditModal={setHideEditModal}
    onAddPart={onAddPart}
    onRemovePart={onRemovePart}
    setOrder={setOrder}
    cranes={formattedCranes}
    error={error}
    onSubmit={onSubmit}
    onClose={onClose}
    step={step}
    setStep={setStep}
    onClickRetry={onClickRetry}
    onPrev={onPrev}
  />;

}

ShippingFormSave.propTypes = {
  setCreated: PropTypes.func,
  onCompleted: PropTypes.func,
  onError: PropTypes.func,
  onClose: PropTypes.func,
};
  
export default ShippingFormSave;