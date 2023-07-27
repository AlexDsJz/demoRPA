/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/security_categories/List.view";

function SecurityCategoryList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqSecurityCategories = usePagination(`
  {
    securityCategoryPagination {
      totalPages
      securityCategories {
        name
        partId
        craneModel
        isDeviation
        isInitial
        createdAt
      }
    }
  }`, pageNum, pageSize);

  if (reqSecurityCategories.loading) return <Loading />;
  if (reqSecurityCategories.error) return "Error";
  const { securityCategories = [], totalPages = 0 } = reqSecurityCategories.data.securityCategoryPagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    securityCategories={securityCategories}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

SecurityCategoryList.propTypes = {};

export default SecurityCategoryList;