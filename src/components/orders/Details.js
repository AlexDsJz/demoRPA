import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useDetail } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "components/orders/Details.view";
import NotFound from "components/helpers/NotFound";

const OrderDetails = ({ orderId, onCompleted = () => null, onError = () => null }) => {

  const reqOrder = useDetail(`{
    order {
      clientName
      buildingName
      buildingStreet
      buildingCity
      buildingState
      contactName
      contactPhone
      contactEmail
      requestingTrader
      orderVersion
      mountingDate
      rentPeriod
      hasPowerLift
      hasCabin
      hasRadioControl
      boomLength
      towerHeight
      finalHeight
      insuranceResponsable
      forwardingSystem
      status
      craneVersion
      transportNumber
      configuration
      elevationsNumber
      feetType
      feetModel
      baseType
      diceSize
      comments
      createdAt
      modelReference
      applicant {
        firstName
      }
      crane {
        model
        number
      }
      shippings {
        id
      }
    }
  }`, orderId);

  const toPrintRef = useRef();

  if(reqOrder.loading) return <Loading />;

  if(reqOrder.error && reqOrder.error.message.includes("matching query does not exist")) return <NotFound/>
  if(reqOrder.error) return "Error";
  const { order = {} } = reqOrder.data;

  return <View
    order={order}
    toPrintRef={toPrintRef}
  />;

}

OrderDetails.propTypes = {
  orderId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default OrderDetails;
