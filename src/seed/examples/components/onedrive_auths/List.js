/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/onedrive_auths/List.view";

function OnedriveAuthList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqOnedriveAuths = usePagination(`
  {
    onedriveAuthPagination {
      totalPages
      onedriveAuths {
        accessToken
        refreshToken
        createdAt
      }
    }
  }`, pageNum, pageSize);

  if (reqOnedriveAuths.loading) return <Loading />;
  if (reqOnedriveAuths.error) return "Error";
  const { onedriveAuths = [], totalPages = 0 } = reqOnedriveAuths.data.onedriveAuthPagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    onedriveAuths={onedriveAuths}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

OnedriveAuthList.propTypes = {};

export default OnedriveAuthList;