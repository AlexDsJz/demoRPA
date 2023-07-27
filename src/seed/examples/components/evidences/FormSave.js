/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { SAVE_EVIDENCE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/evidences/Form.view";

function EvidenceFormSave({ onCompleted = () => null, onError = () => null }) {
  
  const qShippings = useQuery(`{ shippings { } }`);
  const qUsers = useQuery(`{ users { } }`);
  const [callSave, qSave] = useSave(SAVE_EVIDENCE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });
  const { shippings = [] } = qShippings.data;
  const { users = [] } = qUsers.data;
  const error = qSave.error ? "An error has occurred" : null;

  const onSubmit = (values) =>
    callSave(values);

  return <View
    shippings={shippings}
    users={users}
    error={error}
    onSubmit={onSubmit}
  />;
}

EvidenceFormSave.propTypes = {
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default EvidenceFormSave;