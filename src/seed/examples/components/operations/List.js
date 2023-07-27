/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/operations/List.view";

function OperationList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqOperations = usePagination(`
  {
    operationPagination {
      totalPages
      operations {
        checked
        type
        itemChecked
        comment
        createdAt
        content { }
        user { }
      }
    }
  }`, pageNum, pageSize);

  if (reqOperations.loading) return <Loading />;
  if (reqOperations.error) return "Error";
  const { operations = [], totalPages = 0 } = reqOperations.data.operationPagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    operations={operations}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

OperationList.propTypes = {};

export default OperationList;