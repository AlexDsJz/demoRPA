import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useDetail } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "components/shippings/Details.view";
import NotFound from "components/helpers/NotFound";

const ShippingDetails = ({ shippingId, onCompleted = () => null, onError = () => null }) => {

  const reqShipping = useDetail(`{
    shipping {
      truckPlate
      transportCompany
      transportPlate
      transportPhone
      transportOtherPhone
      transportCarrierName
      deliveryDate
      createdAt
      status
      order {
        clientName
        buildingName
        buildingStreet
        buildingCity
        buildingState
        contactName
        contactPhone
        contactEmail
        crane {
          craneId
          model
          series
          number
        }
      }
      contents {
        partId
        partName
        items
        quantity
        um
        manual
      }
    }
  }`, shippingId);

  const toPrintRef = useRef();

  if (reqShipping.loading) return <Loading />;
  if (reqShipping.error && reqShipping.error.message.includes("matching query does not exist")) return <NotFound />
  if (reqShipping.error) return "Error";

  const { shipping = {} } = reqShipping.data;

  return <View
    shipping={shipping}
    toPrintRef={toPrintRef}
  />;

}

ShippingDetails.propTypes = {
  shippingId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ShippingDetails;