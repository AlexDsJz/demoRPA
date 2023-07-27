/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_ARRIS_FAILURE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/arris_failures/Details.view";

function ArrisFailureDetails({ arrisFailureId, onCompleted = () => null, onError = () => null }) {

  const reqArrisFailure = useDetail(`
  {
    arrisFailure {
      description
      solution
      status
      solvedReport
      createdAt
      reportedSolved { }
      arrisForm { }
      evidences { }
    }
  }`, arrisFailureId);
  
  const [callDelete] = useDelete(DELETE_ARRIS_FAILURE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqArrisFailure.loading) return <Loading />;
  if (reqArrisFailure.error) return "Error";
  const { arrisFailure = {} } = reqArrisFailure.data;

  const onClickDelete = () =>
    callDelete({ id: arrisFailureId });

  return <View
    arrisFailure={arrisFailure}
    onClickDelete={onClickDelete}
   />;
}

ArrisFailureDetails.propTypes = {
  arrisFailureId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ArrisFailureDetails;