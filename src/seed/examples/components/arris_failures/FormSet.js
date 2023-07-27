/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { ARRIS_FAILURE, SET_ARRIS_FAILURE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/arris_failures/Form.view";

function ArrisFailureFormSet({ arrisFailureId, onCompleted = () => null, onError = () => null  }) {

  const qArrisFailure = useDetail(ARRIS_FAILURE, arrisFailureId);
  const qArrisOperators = useQuery(`{ arrisOperators { } }`);
  const qArrisForms = useQuery(`{ arrisForms { } }`);
  const [callSet, qSet] = useSet(SET_ARRIS_FAILURE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qArrisFailure.loading) return <Loading />;

  const { arrisFailure = {} } = qArrisFailure.data;
  const { arrisOperators = [] } = qArrisOperators.data;
  const { arrisForms = [] } = qArrisForms.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = arrisFailureId;
    callSet(values);
  };

  return <View
    arrisFailure={arrisFailure}
    arrisOperators={arrisOperators}
    arrisForms={arrisForms}
    error={error}
    onSubmit={onSubmit}
  />;
}

ArrisFailureFormSet.propTypes = {
  arrisFailureId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ArrisFailureFormSet;