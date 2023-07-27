/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_SECURITY_CHECK } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/security_checks/Details.view";

function SecurityCheckDetails({ securityCheckId, onCompleted = () => null, onError = () => null }) {

  const reqSecurityCheck = useDetail(`
  {
    securityCheck {
      value
      isDeviation
      deviationValue
      findings
      corrections
      date
      scpLiberation
      createdAt
      files { }
      securityCheckType { }
      securityRevision { }
      user { }
    }
  }`, securityCheckId);
  
  const [callDelete] = useDelete(DELETE_SECURITY_CHECK, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqSecurityCheck.loading) return <Loading />;
  if (reqSecurityCheck.error) return "Error";
  const { securityCheck = {} } = reqSecurityCheck.data;

  const onClickDelete = () =>
    callDelete({ id: securityCheckId });

  return <View
    securityCheck={securityCheck}
    onClickDelete={onClickDelete}
   />;
}

SecurityCheckDetails.propTypes = {
  securityCheckId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default SecurityCheckDetails;