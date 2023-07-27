/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { EVIDENCE, SET_EVIDENCE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/evidences/Form.view";

function EvidenceFormSet({ evidenceId, onCompleted = () => null, onError = () => null  }) {

  const qEvidence = useDetail(EVIDENCE, evidenceId);
  const qShippings = useQuery(`{ shippings { } }`);
  const qUsers = useQuery(`{ users { } }`);
  const [callSet, qSet] = useSet(SET_EVIDENCE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qEvidence.loading) return <Loading />;

  const { evidence = {} } = qEvidence.data;
  const { shippings = [] } = qShippings.data;
  const { users = [] } = qUsers.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = evidenceId;
    callSet(values);
  };

  return <View
    evidence={evidence}
    shippings={shippings}
    users={users}
    error={error}
    onSubmit={onSubmit}
  />;
}

EvidenceFormSet.propTypes = {
  evidenceId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default EvidenceFormSet;