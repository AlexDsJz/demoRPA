/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_ORDER } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/orders/Details.view";

function OrderDetails({ orderId, onCompleted = () => null, onError = () => null }) {

  const reqOrder = useDetail(`
  {
    order {
      clientName
      buildingName
      buildingStreet
      buildingCity
      buildingState
      buildingAddress
      contactName
      contactPhone
      contactEmail
      feetModel
      diceSize
      requestingTrader
      comments
      modelReference
      craneVersion
      orderVersion
      configuration
      elevations
      mountingDate
      rentPeriod
      elevationsNumber
      transportNumber
      hasPowerLift
      hasCabin
      hasRadioControl
      hasCageMounting
      hasRemoteControl
      boomLength
      towerHeight
      finalHeight
      insuranceResponsable
      forwardingSystem
      status
      feetType
      baseType
      createdAt
      applicant { }
      shipping { }
      crane { }
    }
  }`, orderId);
  
  const [callDelete] = useDelete(DELETE_ORDER, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqOrder.loading) return <Loading />;
  if (reqOrder.error) return "Error";
  const { order = {} } = reqOrder.data;

  const onClickDelete = () =>
    callDelete({ id: orderId });

  return <View
    order={order}
    onClickDelete={onClickDelete}
   />;
}

OrderDetails.propTypes = {
  orderId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default OrderDetails;