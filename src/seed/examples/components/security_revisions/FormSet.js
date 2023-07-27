/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { SECURITY_REVISION, SET_SECURITY_REVISION } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/security_revisions/Form.view";

function SecurityRevisionFormSet({ securityRevisionId, onCompleted = () => null, onError = () => null  }) {

  const qSecurityRevision = useDetail(SECURITY_REVISION, securityRevisionId);
  const qOrders = useQuery(`{ orders { } }`);
  const [callSet, qSet] = useSet(SET_SECURITY_REVISION, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qSecurityRevision.loading) return <Loading />;

  const { securityRevision = {} } = qSecurityRevision.data;
  const { orders = [] } = qOrders.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = securityRevisionId;
    callSet(values);
  };

  return <View
    securityRevision={securityRevision}
    orders={orders}
    error={error}
    onSubmit={onSubmit}
  />;
}

SecurityRevisionFormSet.propTypes = {
  securityRevisionId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default SecurityRevisionFormSet;