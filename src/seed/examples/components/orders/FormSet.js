/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { ORDER, SET_ORDER } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/orders/Form.view";

function OrderFormSet({ orderId, onCompleted = () => null, onError = () => null  }) {

  const qOrder = useDetail(ORDER, orderId);
  const qUsers = useQuery(`{ users { } }`);
  const qCranes = useQuery(`{ cranes { } }`);
  const [callSet, qSet] = useSet(SET_ORDER, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qOrder.loading) return <Loading />;

  const { order = {} } = qOrder.data;
  const { users = [] } = qUsers.data;
  const { cranes = [] } = qCranes.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = orderId;
    callSet(values);
  };

  return <View
    order={order}
    users={users}
    cranes={cranes}
    error={error}
    onSubmit={onSubmit}
  />;
}

OrderFormSet.propTypes = {
  orderId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default OrderFormSet;