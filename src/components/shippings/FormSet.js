import React, { useState } from "react";
import PropTypes from "prop-types";
import { useQuery } from "seed/gql";
import View from "components/shippings/Form.view";
import { usePost } from "seed/api";
import NotFound from "components/helpers/NotFound";

const ShippingFormSet = ({ onCompleted = () => null, onError = () => null, onClose, setCreated, location, }) => {

  const [step, setStep] = useState(1);
  const [hideModal, setHideModal] = useState(true);
  const [hideEditModal, setHideEditModal] = useState(true);
  const [order, setOrder] = useState(location.state.shipping.order);
  const [content, setContent] = useState(undefined);
  const [selectedParts, setSelectedParts] = useState(location.state.shipping.contents);

  const qOrders = useQuery(`{
    orders {
      id
      suggestions {
        id
        elevationNumber
        shipping {
          id
          type
          truckPlate
          transportCompany
          contents {
            partId
            partName
            quantity
            items
            um
            images {
              id
            }
          }
        }
        quantity
        part {
          partId
          name
          um
          images {
            id
          }
          items {
            name
            description
            quantity
          }
        }
      }
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
    }
  }`);

  const [callPost, qPost] = usePost("/shippings/update_shipping", {
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

  if(!location.state || !location.state.shipping) {
    return <NotFound/>
  }

  const error = qPost.error ? "An error has occurred" : null;
  const { orders = [] } = qOrders.data;

  const onSubmit = (values) => {

    if(step === 1) {
      setStep(2);
      return;
    }

    if(step === 2)
      callPost({
        ...values,
        contents: selectedParts,
        order_id: order.id,
        shipping_id: location.state.shipping.id
      })

  };
  
  const onClickRetry = () => {
    setStep(step - 1);
    setCreated(false);
  };

  const onPrev = () => 
    setStep(step - 1);

  const onAddPart = (suggestion) => {
    setSelectedParts([...selectedParts, {
      partId: parseInt(suggestion.part.partId),
      partName: suggestion.part.name,
      um: suggestion.part.um,
      quantity: suggestion.quantity,
      images: suggestion.part.images,
      suggestRef: parseInt(suggestion.id),
      elevationNumber: suggestion.elevationNumber,
      manual: false,
      items: suggestion.part.items.map(item => 
        item.quantity + "|" + item.name + "|" + item.description + "|" + item.comment).join(";")
    }]);
  };

  const onRemovePart = (index) =>
    setSelectedParts(selectedParts.filter((_, i) => i !== index));

  const filteredSuggestions = order ? order.suggestions
    .filter(suggestion => selectedParts.every(part => suggestion.part.partId !== part.partId))
      .filter(suggestion => suggestion.shipping == null) : [];

  const cleanedOrders = orders.filter(order => order.crane != null);

  const formattedCranes = cleanedOrders.map((order) => 
    order.crane.model + "" + order.crane.number +"/ " + order.crane.series);

  return <View
    orders={cleanedOrders}
    order={order}
    shipping={location.state.shipping}
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
    onPrev={onPrev}/>;

}

ShippingFormSet.propTypes = {
  setCreated: PropTypes.func,
  onCompleted: PropTypes.func,
  onError: PropTypes.func,
  location: PropTypes.object,
  onClose: PropTypes.func,
};
  
export default ShippingFormSet;