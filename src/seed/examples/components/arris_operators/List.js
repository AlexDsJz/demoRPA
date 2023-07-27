/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/arris_operators/List.view";

function ArrisOperatorList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqArrisOperators = usePagination(`
  {
    arrisOperatorPagination {
      totalPages
      arrisOperators {
        active
        turn
        createdAt
        order { }
        user { }
      }
    }
  }`, pageNum, pageSize);

  if (reqArrisOperators.loading) return <Loading />;
  if (reqArrisOperators.error) return "Error";
  const { arrisOperators = [], totalPages = 0 } = reqArrisOperators.data.arrisOperatorPagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    arrisOperators={arrisOperators}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

ArrisOperatorList.propTypes = {};

export default ArrisOperatorList;