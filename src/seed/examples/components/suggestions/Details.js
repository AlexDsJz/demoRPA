/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_SUGGESTION } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/suggestions/Details.view";

function SuggestionDetails({ suggestionId, onCompleted = () => null, onError = () => null }) {

  const reqSuggestion = useDetail(`
  {
    suggestion {
      quantity
      elevationNumber
      createdAt
      shipping { }
      part { }
      order { }
    }
  }`, suggestionId);
  
  const [callDelete] = useDelete(DELETE_SUGGESTION, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqSuggestion.loading) return <Loading />;
  if (reqSuggestion.error) return "Error";
  const { suggestion = {} } = reqSuggestion.data;

  const onClickDelete = () =>
    callDelete({ id: suggestionId });

  return <View
    suggestion={suggestion}
    onClickDelete={onClickDelete}
   />;
}

SuggestionDetails.propTypes = {
  suggestionId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default SuggestionDetails;