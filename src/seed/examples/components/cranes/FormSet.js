/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { CRANE, SET_CRANE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/cranes/Form.view";

function CraneFormSet({ craneId, onCompleted = () => null, onError = () => null  }) {

  const qCrane = useDetail(CRANE, craneId);
  const [callSet, qSet] = useSet(SET_CRANE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qCrane.loading) return <Loading />;

  const { crane = {} } = qCrane.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = craneId;
    callSet(values);
  };

  return <View
    crane={crane}
    error={error}
    onSubmit={onSubmit}
  />;
}

CraneFormSet.propTypes = {
  craneId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default CraneFormSet;