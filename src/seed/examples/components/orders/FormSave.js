/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { SAVE_ORDER } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/orders/Form.view";

function OrderFormSave({ onCompleted = () => null, onError = () => null }) {
  
  const qUsers = useQuery(`{ users { } }`);
  const qCranes = useQuery(`{ cranes { } }`);
  const [callSave, qSave] = useSave(SAVE_ORDER, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });
  const { users = [] } = qUsers.data;
  const { cranes = [] } = qCranes.data;
  const error = qSave.error ? "An error has occurred" : null;

  const onSubmit = (values) =>
    callSave(values);

  return <View
    users={users}
    cranes={cranes}
    error={error}
    onSubmit={onSubmit}
  />;
}

OrderFormSave.propTypes = {
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default OrderFormSave;