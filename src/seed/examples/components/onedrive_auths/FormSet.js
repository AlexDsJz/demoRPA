/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { ONEDRIVE_AUTH, SET_ONEDRIVE_AUTH } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/onedrive_auths/Form.view";

function OnedriveAuthFormSet({ onedriveAuthId, onCompleted = () => null, onError = () => null  }) {

  const qOnedriveAuth = useDetail(ONEDRIVE_AUTH, onedriveAuthId);
  const [callSet, qSet] = useSet(SET_ONEDRIVE_AUTH, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qOnedriveAuth.loading) return <Loading />;

  const { onedriveAuth = {} } = qOnedriveAuth.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = onedriveAuthId;
    callSet(values);
  };

  return <View
    onedriveAuth={onedriveAuth}
    error={error}
    onSubmit={onSubmit}
  />;
}

OnedriveAuthFormSet.propTypes = {
  onedriveAuthId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default OnedriveAuthFormSet;