/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_SHIPPING } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/shippings/Details.view";

function ShippingDetails({ shippingId, onCompleted = () => null, onError = () => null }) {

  const reqShipping = useDetail(`
  {
    shipping {
      truckPlate
      transportPlate
      transportPhone
      transportOtherPhone
      transportCarrierName
      transportCompany
      deliveryDate
      status
      type
      createdAt
      order { }
      contents { }
      evidences { }
    }
  }`, shippingId);
  
  const [callDelete] = useDelete(DELETE_SHIPPING, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqShipping.loading) return <Loading />;
  if (reqShipping.error) return "Error";
  const { shipping = {} } = reqShipping.data;

  const onClickDelete = () =>
    callDelete({ id: shippingId });

  return <View
    shipping={shipping}
    onClickDelete={onClickDelete}
   />;
}

ShippingDetails.propTypes = {
  shippingId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ShippingDetails;