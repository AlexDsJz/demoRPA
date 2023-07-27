/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_ACTION_LOG } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/action_logs/Details.view";

function ActionLogDetails({ actionLogId, onCompleted = () => null, onError = () => null }) {

  const reqActionLog = useDetail(`
  {
    actionLog {
      modelId
      modelName
      action
      value
      createdAt
    }
  }`, actionLogId);
  
  const [callDelete] = useDelete(DELETE_ACTION_LOG, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqActionLog.loading) return <Loading />;
  if (reqActionLog.error) return "Error";
  const { actionLog = {} } = reqActionLog.data;

  const onClickDelete = () =>
    callDelete({ id: actionLogId });

  return <View
    actionLog={actionLog}
    onClickDelete={onClickDelete}
   />;
}

ActionLogDetails.propTypes = {
  actionLogId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ActionLogDetails;