/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_SECURITY_CHECK_TYPE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/security_check_types/Details.view";

function SecurityCheckTypeDetails({ securityCheckTypeId, onCompleted = () => null, onError = () => null }) {

  const reqSecurityCheckType = useDetail(`
  {
    securityCheckType {
      number
      name
      createdAt
      securityCategory { }
    }
  }`, securityCheckTypeId);
  
  const [callDelete] = useDelete(DELETE_SECURITY_CHECK_TYPE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqSecurityCheckType.loading) return <Loading />;
  if (reqSecurityCheckType.error) return "Error";
  const { securityCheckType = {} } = reqSecurityCheckType.data;

  const onClickDelete = () =>
    callDelete({ id: securityCheckTypeId });

  return <View
    securityCheckType={securityCheckType}
    onClickDelete={onClickDelete}
   />;
}

SecurityCheckTypeDetails.propTypes = {
  securityCheckTypeId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default SecurityCheckTypeDetails;