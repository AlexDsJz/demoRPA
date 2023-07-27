/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { SECURITY_CHECK, SET_SECURITY_CHECK } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/security_checks/Form.view";

function SecurityCheckFormSet({ securityCheckId, onCompleted = () => null, onError = () => null  }) {

  const qSecurityCheck = useDetail(SECURITY_CHECK, securityCheckId);
  const qSecurityCheckTypes = useQuery(`{ securityCheckTypes { } }`);
  const qSecurityRevisions = useQuery(`{ securityRevisions { } }`);
  const qUsers = useQuery(`{ users { } }`);
  const [callSet, qSet] = useSet(SET_SECURITY_CHECK, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qSecurityCheck.loading) return <Loading />;

  const { securityCheck = {} } = qSecurityCheck.data;
  const { securityCheckTypes = [] } = qSecurityCheckTypes.data;
  const { securityRevisions = [] } = qSecurityRevisions.data;
  const { users = [] } = qUsers.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = securityCheckId;
    callSet(values);
  };

  return <View
    securityCheck={securityCheck}
    securityCheckTypes={securityCheckTypes}
    securityRevisions={securityRevisions}
    users={users}
    error={error}
    onSubmit={onSubmit}
  />;
}

SecurityCheckFormSet.propTypes = {
  securityCheckId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default SecurityCheckFormSet;