/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { SAVE_PART } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/parts/Form.view";

function PartFormSave({ onCompleted = () => null, onError = () => null }) {
  
  const [callSave, qSave] = useSave(SAVE_PART, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });
  const error = qSave.error ? "An error has occurred" : null;

  const onSubmit = (values) =>
    callSave(values);

  return <View
    error={error}
    onSubmit={onSubmit}
  />;
}

PartFormSave.propTypes = {
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default PartFormSave;