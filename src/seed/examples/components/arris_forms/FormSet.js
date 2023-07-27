/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { ARRIS_FORM, SET_ARRIS_FORM } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/arris_forms/Form.view";

function ArrisFormFormSet({ arrisFormId, onCompleted = () => null, onError = () => null  }) {

  const qArrisForm = useDetail(ARRIS_FORM, arrisFormId);
  const qArrisOperators = useQuery(`{ arrisOperators { } }`);
  const [callSet, qSet] = useSet(SET_ARRIS_FORM, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qArrisForm.loading) return <Loading />;

  const { arrisForm = {} } = qArrisForm.data;
  const { arrisOperators = [] } = qArrisOperators.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = arrisFormId;
    callSet(values);
  };

  return <View
    arrisForm={arrisForm}
    arrisOperators={arrisOperators}
    error={error}
    onSubmit={onSubmit}
  />;
}

ArrisFormFormSet.propTypes = {
  arrisFormId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ArrisFormFormSet;