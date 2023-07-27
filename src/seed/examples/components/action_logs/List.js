/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/action_logs/List.view";

function ActionLogList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqActionLogs = usePagination(`
  {
    actionLogPagination {
      totalPages
      actionLogs {
        modelId
        modelName
        action
        value
        createdAt
      }
    }
  }`, pageNum, pageSize);

  if (reqActionLogs.loading) return <Loading />;
  if (reqActionLogs.error) return "Error";
  const { actionLogs = [], totalPages = 0 } = reqActionLogs.data.actionLogPagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    actionLogs={actionLogs}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

ActionLogList.propTypes = {};

export default ActionLogList;