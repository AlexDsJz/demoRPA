/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { SUGGESTION, SET_SUGGESTION } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/suggestions/Form.view";

function SuggestionFormSet({ suggestionId, onCompleted = () => null, onError = () => null  }) {

  const qSuggestion = useDetail(SUGGESTION, suggestionId);
  const qShippings = useQuery(`{ shippings { } }`);
  const qParts = useQuery(`{ parts { } }`);
  const qOrders = useQuery(`{ orders { } }`);
  const [callSet, qSet] = useSet(SET_SUGGESTION, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qSuggestion.loading) return <Loading />;

  const { suggestion = {} } = qSuggestion.data;
  const { shippings = [] } = qShippings.data;
  const { parts = [] } = qParts.data;
  const { orders = [] } = qOrders.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = suggestionId;
    callSet(values);
  };

  return <View
    suggestion={suggestion}
    shippings={shippings}
    parts={parts}
    orders={orders}
    error={error}
    onSubmit={onSubmit}
  />;
}

SuggestionFormSet.propTypes = {
  suggestionId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default SuggestionFormSet;