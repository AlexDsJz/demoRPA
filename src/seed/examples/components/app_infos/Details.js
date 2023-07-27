/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_APP_INFO } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/app_infos/Details.view";

function AppInfoDetails({ appInfoId, onCompleted = () => null, onError = () => null }) {

  const reqAppInfo = useDetail(`
  {
    appInfo {
      version
      createdAt
    }
  }`, appInfoId);
  
  const [callDelete] = useDelete(DELETE_APP_INFO, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqAppInfo.loading) return <Loading />;
  if (reqAppInfo.error) return "Error";
  const { appInfo = {} } = reqAppInfo.data;

  const onClickDelete = () =>
    callDelete({ id: appInfoId });

  return <View
    appInfo={appInfo}
    onClickDelete={onClickDelete}
   />;
}

AppInfoDetails.propTypes = {
  appInfoId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default AppInfoDetails;