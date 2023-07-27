/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { SAVE_SUGGESTION } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/suggestions/Form.view";

function SuggestionFormSave({ onCompleted = () => null, onError = () => null }) {
  
  const qShippings = useQuery(`{ shippings { } }`);
  const qParts = useQuery(`{ parts { } }`);
  const qOrders = useQuery(`{ orders { } }`);
  const [callSave, qSave] = useSave(SAVE_SUGGESTION, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });
  const { shippings = [] } = qShippings.data;
  const { parts = [] } = qParts.data;
  const { orders = [] } = qOrders.data;
  const error = qSave.error ? "An error has occurred" : null;

  const onSubmit = (values) =>
    callSave(values);

  return <View
    shippings={shippings}
    parts={parts}
    orders={orders}
    error={error}
    onSubmit={onSubmit}
  />;
}

SuggestionFormSave.propTypes = {
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default SuggestionFormSave;