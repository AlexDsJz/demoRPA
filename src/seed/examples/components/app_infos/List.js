/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/app_infos/List.view";

function AppInfoList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqAppInfos = usePagination(`
  {
    appInfoPagination {
      totalPages
      appInfos {
        version
        createdAt
      }
    }
  }`, pageNum, pageSize);

  if (reqAppInfos.loading) return <Loading />;
  if (reqAppInfos.error) return "Error";
  const { appInfos = [], totalPages = 0 } = reqAppInfos.data.appInfoPagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    appInfos={appInfos}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

AppInfoList.propTypes = {};

export default AppInfoList;