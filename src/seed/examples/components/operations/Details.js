/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_OPERATION } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/operations/Details.view";

function OperationDetails({ operationId, onCompleted = () => null, onError = () => null }) {

  const reqOperation = useDetail(`
  {
    operation {
      checked
      type
      itemChecked
      comment
      createdAt
      content { }
      user { }
    }
  }`, operationId);
  
  const [callDelete] = useDelete(DELETE_OPERATION, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqOperation.loading) return <Loading />;
  if (reqOperation.error) return "Error";
  const { operation = {} } = reqOperation.data;

  const onClickDelete = () =>
    callDelete({ id: operationId });

  return <View
    operation={operation}
    onClickDelete={onClickDelete}
   />;
}

OperationDetails.propTypes = {
  operationId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default OperationDetails;