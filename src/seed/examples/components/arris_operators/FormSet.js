/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { ARRIS_OPERATOR, SET_ARRIS_OPERATOR } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/arris_operators/Form.view";

function ArrisOperatorFormSet({ arrisOperatorId, onCompleted = () => null, onError = () => null  }) {

  const qArrisOperator = useDetail(ARRIS_OPERATOR, arrisOperatorId);
  const qOrders = useQuery(`{ orders { } }`);
  const qUsers = useQuery(`{ users { } }`);
  const [callSet, qSet] = useSet(SET_ARRIS_OPERATOR, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qArrisOperator.loading) return <Loading />;

  const { arrisOperator = {} } = qArrisOperator.data;
  const { orders = [] } = qOrders.data;
  const { users = [] } = qUsers.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = arrisOperatorId;
    callSet(values);
  };

  return <View
    arrisOperator={arrisOperator}
    orders={orders}
    users={users}
    error={error}
    onSubmit={onSubmit}
  />;
}

ArrisOperatorFormSet.propTypes = {
  arrisOperatorId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ArrisOperatorFormSet;