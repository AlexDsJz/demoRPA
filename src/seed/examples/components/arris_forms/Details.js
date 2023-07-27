/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_ARRIS_FORM } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/arris_forms/Details.view";

function ArrisFormDetails({ arrisFormId, onCompleted = () => null, onError = () => null }) {

  const reqArrisForm = useDetail(`
  {
    arrisForm {
      q1
      q2
      activity
      reasonMissing
      solutionMissing
      onedriveStatus
      status
      date
      createdAt
      binnacles { }
      evidences { }
      operator { }
      craneStatus { }
      failures { }
    }
  }`, arrisFormId);
  
  const [callDelete] = useDelete(DELETE_ARRIS_FORM, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqArrisForm.loading) return <Loading />;
  if (reqArrisForm.error) return "Error";
  const { arrisForm = {} } = reqArrisForm.data;

  const onClickDelete = () =>
    callDelete({ id: arrisFormId });

  return <View
    arrisForm={arrisForm}
    onClickDelete={onClickDelete}
   />;
}

ArrisFormDetails.propTypes = {
  arrisFormId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ArrisFormDetails;