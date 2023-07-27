/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { SAVE_SECURITY_CHECK_TYPE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/security_check_types/Form.view";

function SecurityCheckTypeFormSave({ onCompleted = () => null, onError = () => null }) {
  
  const qSecurityCategories = useQuery(`{ securityCategories { } }`);
  const [callSave, qSave] = useSave(SAVE_SECURITY_CHECK_TYPE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });
  const { securityCategories = [] } = qSecurityCategories.data;
  const error = qSave.error ? "An error has occurred" : null;

  const onSubmit = (values) =>
    callSave(values);

  return <View
    securityCategories={securityCategories}
    error={error}
    onSubmit={onSubmit}
  />;
}

SecurityCheckTypeFormSave.propTypes = {
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default SecurityCheckTypeFormSave;