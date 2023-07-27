/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { PART, SET_PART } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/parts/Form.view";

function PartFormSet({ partId, onCompleted = () => null, onError = () => null  }) {

  const qPart = useDetail(PART, partId);
  const [callSet, qSet] = useSet(SET_PART, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qPart.loading) return <Loading />;

  const { part = {} } = qPart.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = partId;
    callSet(values);
  };

  return <View
    part={part}
    error={error}
    onSubmit={onSubmit}
  />;
}

PartFormSet.propTypes = {
  partId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default PartFormSet;