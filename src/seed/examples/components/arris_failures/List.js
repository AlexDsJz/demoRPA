/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/arris_failures/List.view";

function ArrisFailureList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqArrisFailures = usePagination(`
  {
    arrisFailurePagination {
      totalPages
      arrisFailures {
        description
        solution
        status
        solvedReport
        createdAt
        reportedSolved { }
        arrisForm { }
        evidences { }
      }
    }
  }`, pageNum, pageSize);

  if (reqArrisFailures.loading) return <Loading />;
  if (reqArrisFailures.error) return "Error";
  const { arrisFailures = [], totalPages = 0 } = reqArrisFailures.data.arrisFailurePagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    arrisFailures={arrisFailures}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

ArrisFailureList.propTypes = {};

export default ArrisFailureList;