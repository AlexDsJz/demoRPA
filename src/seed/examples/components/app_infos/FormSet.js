/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { APP_INFO, SET_APP_INFO } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/app_infos/Form.view";

function AppInfoFormSet({ appInfoId, onCompleted = () => null, onError = () => null  }) {

  const qAppInfo = useDetail(APP_INFO, appInfoId);
  const [callSet, qSet] = useSet(SET_APP_INFO, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qAppInfo.loading) return <Loading />;

  const { appInfo = {} } = qAppInfo.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = appInfoId;
    callSet(values);
  };

  return <View
    appInfo={appInfo}
    error={error}
    onSubmit={onSubmit}
  />;
}

AppInfoFormSet.propTypes = {
  appInfoId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default AppInfoFormSet;