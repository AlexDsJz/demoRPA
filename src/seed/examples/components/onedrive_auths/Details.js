/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_ONEDRIVE_AUTH } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/onedrive_auths/Details.view";

function OnedriveAuthDetails({ onedriveAuthId, onCompleted = () => null, onError = () => null }) {

  const reqOnedriveAuth = useDetail(`
  {
    onedriveAuth {
      accessToken
      refreshToken
      createdAt
    }
  }`, onedriveAuthId);
  
  const [callDelete] = useDelete(DELETE_ONEDRIVE_AUTH, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqOnedriveAuth.loading) return <Loading />;
  if (reqOnedriveAuth.error) return "Error";
  const { onedriveAuth = {} } = reqOnedriveAuth.data;

  const onClickDelete = () =>
    callDelete({ id: onedriveAuthId });

  return <View
    onedriveAuth={onedriveAuth}
    onClickDelete={onClickDelete}
   />;
}

OnedriveAuthDetails.propTypes = {
  onedriveAuthId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default OnedriveAuthDetails;