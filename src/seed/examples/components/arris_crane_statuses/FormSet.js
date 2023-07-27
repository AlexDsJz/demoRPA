/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { ARRIS_CRANE_STATUS, SET_ARRIS_CRANE_STATUS } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/arris_crane_statuses/Form.view";

function ArrisCraneStatusFormSet({ arrisCraneStatusId, onCompleted = () => null, onError = () => null  }) {

  const qArrisCraneStatus = useDetail(ARRIS_CRANE_STATUS, arrisCraneStatusId);
  const qArrisForms = useQuery(`{ arrisForms { } }`);
  const [callSet, qSet] = useSet(SET_ARRIS_CRANE_STATUS, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qArrisCraneStatus.loading) return <Loading />;

  const { arrisCraneStatus = {} } = qArrisCraneStatus.data;
  const { arrisForms = [] } = qArrisForms.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = arrisCraneStatusId;
    callSet(values);
  };

  return <View
    arrisCraneStatus={arrisCraneStatus}
    arrisForms={arrisForms}
    error={error}
    onSubmit={onSubmit}
  />;
}

ArrisCraneStatusFormSet.propTypes = {
  arrisCraneStatusId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ArrisCraneStatusFormSet;