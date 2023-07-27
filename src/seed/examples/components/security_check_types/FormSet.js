/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { SECURITY_CHECK_TYPE, SET_SECURITY_CHECK_TYPE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/security_check_types/Form.view";

function SecurityCheckTypeFormSet({ securityCheckTypeId, onCompleted = () => null, onError = () => null  }) {

  const qSecurityCheckType = useDetail(SECURITY_CHECK_TYPE, securityCheckTypeId);
  const qSecurityCategories = useQuery(`{ securityCategories { } }`);
  const [callSet, qSet] = useSet(SET_SECURITY_CHECK_TYPE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qSecurityCheckType.loading) return <Loading />;

  const { securityCheckType = {} } = qSecurityCheckType.data;
  const { securityCategories = [] } = qSecurityCategories.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = securityCheckTypeId;
    callSet(values);
  };

  return <View
    securityCheckType={securityCheckType}
    securityCategories={securityCategories}
    error={error}
    onSubmit={onSubmit}
  />;
}

SecurityCheckTypeFormSet.propTypes = {
  securityCheckTypeId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default SecurityCheckTypeFormSet;