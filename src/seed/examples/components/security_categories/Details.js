/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_SECURITY_CATEGORY } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/security_categories/Details.view";

function SecurityCategoryDetails({ securityCategoryId, onCompleted = () => null, onError = () => null }) {

  const reqSecurityCategory = useDetail(`
  {
    securityCategory {
      name
      partId
      craneModel
      isDeviation
      isInitial
      createdAt
    }
  }`, securityCategoryId);
  
  const [callDelete] = useDelete(DELETE_SECURITY_CATEGORY, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqSecurityCategory.loading) return <Loading />;
  if (reqSecurityCategory.error) return "Error";
  const { securityCategory = {} } = reqSecurityCategory.data;

  const onClickDelete = () =>
    callDelete({ id: securityCategoryId });

  return <View
    securityCategory={securityCategory}
    onClickDelete={onClickDelete}
   />;
}

SecurityCategoryDetails.propTypes = {
  securityCategoryId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default SecurityCategoryDetails;