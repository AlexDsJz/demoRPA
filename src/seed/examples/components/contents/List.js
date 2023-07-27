/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/contents/List.view";

function ContentList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqContents = usePagination(`
  {
    contentPagination {
      totalPages
      contents {
        partId
        partName
        items
        quantity
        um
        manual
        suggestRef
        elevationNumber
        createdAt
        images { }
        shipping { }
        operations { }
      }
    }
  }`, pageNum, pageSize);

  if (reqContents.loading) return <Loading />;
  if (reqContents.error) return "Error";
  const { contents = [], totalPages = 0 } = reqContents.data.contentPagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    contents={contents}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

ContentList.propTypes = {};

export default ContentList;