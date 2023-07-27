/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { ACTION_LOG, SET_ACTION_LOG } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/action_logs/Form.view";

function ActionLogFormSet({ actionLogId, onCompleted = () => null, onError = () => null  }) {

  const qActionLog = useDetail(ACTION_LOG, actionLogId);
  const [callSet, qSet] = useSet(SET_ACTION_LOG, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qActionLog.loading) return <Loading />;

  const { actionLog = {} } = qActionLog.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = actionLogId;
    callSet(values);
  };

  return <View
    actionLog={actionLog}
    error={error}
    onSubmit={onSubmit}
  />;
}

ActionLogFormSet.propTypes = {
  actionLogId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ActionLogFormSet;