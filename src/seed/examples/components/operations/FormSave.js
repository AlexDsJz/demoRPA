/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { SAVE_OPERATION } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/operations/Form.view";

function OperationFormSave({ onCompleted = () => null, onError = () => null }) {
  
  const qContents = useQuery(`{ contents { } }`);
  const qUsers = useQuery(`{ users { } }`);
  const [callSave, qSave] = useSave(SAVE_OPERATION, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });
  const { contents = [] } = qContents.data;
  const { users = [] } = qUsers.data;
  const error = qSave.error ? "An error has occurred" : null;

  const onSubmit = (values) =>
    callSave(values);

  return <View
    contents={contents}
    users={users}
    error={error}
    onSubmit={onSubmit}
  />;
}

OperationFormSave.propTypes = {
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default OperationFormSave;