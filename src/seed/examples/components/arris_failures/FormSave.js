/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { SAVE_ARRIS_FAILURE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/arris_failures/Form.view";

function ArrisFailureFormSave({ onCompleted = () => null, onError = () => null }) {
  
  const qArrisOperators = useQuery(`{ arrisOperators { } }`);
  const qArrisForms = useQuery(`{ arrisForms { } }`);
  const [callSave, qSave] = useSave(SAVE_ARRIS_FAILURE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });
  const { arrisOperators = [] } = qArrisOperators.data;
  const { arrisForms = [] } = qArrisForms.data;
  const error = qSave.error ? "An error has occurred" : null;

  const onSubmit = (values) =>
    callSave(values);

  return <View
    arrisOperators={arrisOperators}
    arrisForms={arrisForms}
    error={error}
    onSubmit={onSubmit}
  />;
}

ArrisFailureFormSave.propTypes = {
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ArrisFailureFormSave;