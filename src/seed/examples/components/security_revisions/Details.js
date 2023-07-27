/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_SECURITY_REVISION } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/security_revisions/Details.view";

function SecurityRevisionDetails({ securityRevisionId, onCompleted = () => null, onError = () => null }) {

  const reqSecurityRevision = useDetail(`
  {
    securityRevision {
      craneModel
      active
      type
      status
      initDate
      endDate
      createdAt
      order { }
    }
  }`, securityRevisionId);
  
  const [callDelete] = useDelete(DELETE_SECURITY_REVISION, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqSecurityRevision.loading) return <Loading />;
  if (reqSecurityRevision.error) return "Error";
  const { securityRevision = {} } = reqSecurityRevision.data;

  const onClickDelete = () =>
    callDelete({ id: securityRevisionId });

  return <View
    securityRevision={securityRevision}
    onClickDelete={onClickDelete}
   />;
}

SecurityRevisionDetails.propTypes = {
  securityRevisionId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default SecurityRevisionDetails;