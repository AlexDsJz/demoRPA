/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { ARRIS_FILE, SET_ARRIS_FILE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/arris_files/Form.view";

function ArrisFileFormSet({ arrisFileId, onCompleted = () => null, onError = () => null  }) {

  const qArrisFile = useDetail(ARRIS_FILE, arrisFileId);
  const qArrisForms = useQuery(`{ arrisForms { } }`);
  const [callSet, qSet] = useSet(SET_ARRIS_FILE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qArrisFile.loading) return <Loading />;

  const { arrisFile = {} } = qArrisFile.data;
  const { arrisForms = [] } = qArrisForms.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = arrisFileId;
    callSet(values);
  };

  return <View
    arrisFile={arrisFile}
    arrisForms={arrisForms}
    error={error}
    onSubmit={onSubmit}
  />;
}

ArrisFileFormSet.propTypes = {
  arrisFileId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ArrisFileFormSet;