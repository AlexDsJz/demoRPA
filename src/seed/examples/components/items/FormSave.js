/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { SAVE_ITEM } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/items/Form.view";

function ItemFormSave({ onCompleted = () => null, onError = () => null }) {
  
  const qParts = useQuery(`{ parts { } }`);
  const [callSave, qSave] = useSave(SAVE_ITEM, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });
  const { parts = [] } = qParts.data;
  const error = qSave.error ? "An error has occurred" : null;

  const onSubmit = (values) =>
    callSave(values);

  return <View
    parts={parts}
    error={error}
    onSubmit={onSubmit}
  />;
}

ItemFormSave.propTypes = {
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ItemFormSave;