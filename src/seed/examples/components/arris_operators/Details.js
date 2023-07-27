/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_ARRIS_OPERATOR } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/arris_operators/Details.view";

function ArrisOperatorDetails({ arrisOperatorId, onCompleted = () => null, onError = () => null }) {

  const reqArrisOperator = useDetail(`
  {
    arrisOperator {
      active
      turn
      createdAt
      order { }
      user { }
    }
  }`, arrisOperatorId);
  
  const [callDelete] = useDelete(DELETE_ARRIS_OPERATOR, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqArrisOperator.loading) return <Loading />;
  if (reqArrisOperator.error) return "Error";
  const { arrisOperator = {} } = reqArrisOperator.data;

  const onClickDelete = () =>
    callDelete({ id: arrisOperatorId });

  return <View
    arrisOperator={arrisOperator}
    onClickDelete={onClickDelete}
   />;
}

ArrisOperatorDetails.propTypes = {
  arrisOperatorId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ArrisOperatorDetails;