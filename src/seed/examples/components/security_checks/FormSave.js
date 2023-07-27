/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { SAVE_SECURITY_CHECK } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/security_checks/Form.view";

function SecurityCheckFormSave({ onCompleted = () => null, onError = () => null }) {
  
  const qSecurityCheckTypes = useQuery(`{ securityCheckTypes { } }`);
  const qSecurityRevisions = useQuery(`{ securityRevisions { } }`);
  const qUsers = useQuery(`{ users { } }`);
  const [callSave, qSave] = useSave(SAVE_SECURITY_CHECK, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });
  const { securityCheckTypes = [] } = qSecurityCheckTypes.data;
  const { securityRevisions = [] } = qSecurityRevisions.data;
  const { users = [] } = qUsers.data;
  const error = qSave.error ? "An error has occurred" : null;

  const onSubmit = (values) =>
    callSave(values);

  return <View
    securityCheckTypes={securityCheckTypes}
    securityRevisions={securityRevisions}
    users={users}
    error={error}
    onSubmit={onSubmit}
  />;
}

SecurityCheckFormSave.propTypes = {
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default SecurityCheckFormSave;