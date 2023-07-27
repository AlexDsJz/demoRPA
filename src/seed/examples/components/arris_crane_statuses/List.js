/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/arris_crane_statuses/List.view";

function ArrisCraneStatusList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqArrisCraneStatuses = usePagination(`
  {
    arrisCraneStatusPagination {
      totalPages
      arrisCraneStatuses {
        type
        name
        status
        createdAt
        arrisForm { }
      }
    }
  }`, pageNum, pageSize);

  if (reqArrisCraneStatuses.loading) return <Loading />;
  if (reqArrisCraneStatuses.error) return "Error";
  const { arrisCraneStatuses = [], totalPages = 0 } = reqArrisCraneStatuses.data.arrisCraneStatusPagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    arrisCraneStatuses={arrisCraneStatuses}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

ArrisCraneStatusList.propTypes = {};

export default ArrisCraneStatusList;