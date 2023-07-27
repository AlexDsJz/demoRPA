/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/cranes/List.view";

function CraneList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqCranes = usePagination(`
  {
    cranePagination {
      totalPages
      cranes {
        craneId
        model
        number
        series
        inUse
        owner
        status
        createdAt
      }
    }
  }`, pageNum, pageSize);

  if (reqCranes.loading) return <Loading />;
  if (reqCranes.error) return "Error";
  const { cranes = [], totalPages = 0 } = reqCranes.data.cranePagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    cranes={cranes}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

CraneList.propTypes = {};

export default CraneList;