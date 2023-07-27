/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { SAVE_ARRIS_OPERATOR } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/arris_operators/Form.view";

function ArrisOperatorFormSave({ onCompleted = () => null, onError = () => null }) {
  
  const qOrders = useQuery(`{ orders { } }`);
  const qUsers = useQuery(`{ users { } }`);
  const [callSave, qSave] = useSave(SAVE_ARRIS_OPERATOR, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });
  const { orders = [] } = qOrders.data;
  const { users = [] } = qUsers.data;
  const error = qSave.error ? "An error has occurred" : null;

  const onSubmit = (values) =>
    callSave(values);

  return <View
    orders={orders}
    users={users}
    error={error}
    onSubmit={onSubmit}
  />;
}

ArrisOperatorFormSave.propTypes = {
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ArrisOperatorFormSave;