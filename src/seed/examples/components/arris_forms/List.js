/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/arris_forms/List.view";

function ArrisFormList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqArrisForms = usePagination(`
  {
    arrisFormPagination {
      totalPages
      arrisForms {
        q1
        q2
        activity
        reasonMissing
        solutionMissing
        onedriveStatus
        status
        date
        createdAt
        binnacles { }
        evidences { }
        operator { }
        craneStatus { }
        failures { }
      }
    }
  }`, pageNum, pageSize);

  if (reqArrisForms.loading) return <Loading />;
  if (reqArrisForms.error) return "Error";
  const { arrisForms = [], totalPages = 0 } = reqArrisForms.data.arrisFormPagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    arrisForms={arrisForms}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

ArrisFormList.propTypes = {};

export default ArrisFormList;