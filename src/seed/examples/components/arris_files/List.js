/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/arris_files/List.view";

function ArrisFileList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqArrisFiles = usePagination(`
  {
    arrisFilePagination {
      totalPages
      arrisFiles {
        category
        createdAt
        file { }
        arrisForm { }
      }
    }
  }`, pageNum, pageSize);

  if (reqArrisFiles.loading) return <Loading />;
  if (reqArrisFiles.error) return "Error";
  const { arrisFiles = [], totalPages = 0 } = reqArrisFiles.data.arrisFilePagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    arrisFiles={arrisFiles}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

ArrisFileList.propTypes = {};

export default ArrisFileList;