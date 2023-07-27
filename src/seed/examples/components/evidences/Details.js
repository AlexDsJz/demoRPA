/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_EVIDENCE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/evidences/Details.view";

function EvidenceDetails({ evidenceId, onCompleted = () => null, onError = () => null }) {

  const reqEvidence = useDetail(`
  {
    evidence {
      flutterPath
      createdAt
      evidenceFile { }
      shipping { }
      user { }
    }
  }`, evidenceId);
  
  const [callDelete] = useDelete(DELETE_EVIDENCE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqEvidence.loading) return <Loading />;
  if (reqEvidence.error) return "Error";
  const { evidence = {} } = reqEvidence.data;

  const onClickDelete = () =>
    callDelete({ id: evidenceId });

  return <View
    evidence={evidence}
    onClickDelete={onClickDelete}
   />;
}

EvidenceDetails.propTypes = {
  evidenceId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default EvidenceDetails;