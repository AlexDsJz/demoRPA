/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { SAVE_CONTENT } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/contents/Form.view";

function ContentFormSave({ onCompleted = () => null, onError = () => null }) {
  
  const qShippings = useQuery(`{ shippings { } }`);
  const [callSave, qSave] = useSave(SAVE_CONTENT, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });
  const { shippings = [] } = qShippings.data;
  const error = qSave.error ? "An error has occurred" : null;

  const onSubmit = (values) =>
    callSave(values);

  return <View
    shippings={shippings}
    error={error}
    onSubmit={onSubmit}
  />;
}

ContentFormSave.propTypes = {
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ContentFormSave;