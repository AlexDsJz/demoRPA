/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/parts/List.view";

function PartList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqParts = usePagination(`
  {
    partPagination {
      totalPages
      parts {
        craneModel
        partId
        name
        um
        createdAt
        images { }
        items { }
      }
    }
  }`, pageNum, pageSize);

  if (reqParts.loading) return <Loading />;
  if (reqParts.error) return "Error";
  const { parts = [], totalPages = 0 } = reqParts.data.partPagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    parts={parts}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

PartList.propTypes = {};

export default PartList;