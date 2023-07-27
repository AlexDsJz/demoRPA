/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { SECURITY_CATEGORY, SET_SECURITY_CATEGORY } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/security_categories/Form.view";

function SecurityCategoryFormSet({ securityCategoryId, onCompleted = () => null, onError = () => null  }) {

  const qSecurityCategory = useDetail(SECURITY_CATEGORY, securityCategoryId);
  const [callSet, qSet] = useSet(SET_SECURITY_CATEGORY, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qSecurityCategory.loading) return <Loading />;

  const { securityCategory = {} } = qSecurityCategory.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = securityCategoryId;
    callSet(values);
  };

  return <View
    securityCategory={securityCategory}
    error={error}
    onSubmit={onSubmit}
  />;
}

SecurityCategoryFormSet.propTypes = {
  securityCategoryId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default SecurityCategoryFormSet;