/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_CRANE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/cranes/Details.view";

function CraneDetails({ craneId, onCompleted = () => null, onError = () => null }) {

  const reqCrane = useDetail(`
  {
    crane {
      craneId
      model
      number
      series
      inUse
      owner
      status
      createdAt
    }
  }`, craneId);
  
  const [callDelete] = useDelete(DELETE_CRANE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqCrane.loading) return <Loading />;
  if (reqCrane.error) return "Error";
  const { crane = {} } = reqCrane.data;

  const onClickDelete = () =>
    callDelete({ id: craneId });

  return <View
    crane={crane}
    onClickDelete={onClickDelete}
   />;
}

CraneDetails.propTypes = {
  craneId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default CraneDetails;