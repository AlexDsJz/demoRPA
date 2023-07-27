/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { SAVE_ARRIS_FORM } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/arris_forms/Form.view";

function ArrisFormFormSave({ onCompleted = () => null, onError = () => null }) {
  
  const qArrisOperators = useQuery(`{ arrisOperators { } }`);
  const [callSave, qSave] = useSave(SAVE_ARRIS_FORM, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });
  const { arrisOperators = [] } = qArrisOperators.data;
  const error = qSave.error ? "An error has occurred" : null;

  const onSubmit = (values) =>
    callSave(values);

  return <View
    arrisOperators={arrisOperators}
    error={error}
    onSubmit={onSubmit}
  />;
}

ArrisFormFormSave.propTypes = {
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ArrisFormFormSave;