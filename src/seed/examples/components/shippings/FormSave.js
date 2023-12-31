/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { SAVE_SHIPPING } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/shippings/Form.view";

function ShippingFormSave({ onCompleted = () => null, onError = () => null }) {
  
  const qOrders = useQuery(`{ orders { } }`);
  const [callSave, qSave] = useSave(SAVE_SHIPPING, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });
  const { orders = [] } = qOrders.data;
  const error = qSave.error ? "An error has occurred" : null;

  const onSubmit = (values) =>
    callSave(values);

  return <View
    orders={orders}
    error={error}
    onSubmit={onSubmit}
  />;
}

ShippingFormSave.propTypes = {
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ShippingFormSave;