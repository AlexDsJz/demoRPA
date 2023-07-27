/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { OPERATION, SET_OPERATION } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/operations/Form.view";

function OperationFormSet({ operationId, onCompleted = () => null, onError = () => null  }) {

  const qOperation = useDetail(OPERATION, operationId);
  const qContents = useQuery(`{ contents { } }`);
  const qUsers = useQuery(`{ users { } }`);
  const [callSet, qSet] = useSet(SET_OPERATION, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qOperation.loading) return <Loading />;

  const { operation = {} } = qOperation.data;
  const { contents = [] } = qContents.data;
  const { users = [] } = qUsers.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = operationId;
    callSet(values);
  };

  return <View
    operation={operation}
    contents={contents}
    users={users}
    error={error}
    onSubmit={onSubmit}
  />;
}

OperationFormSet.propTypes = {
  operationId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default OperationFormSet;