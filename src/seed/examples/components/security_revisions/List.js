/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/security_revisions/List.view";

function SecurityRevisionList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqSecurityRevisions = usePagination(`
  {
    securityRevisionPagination {
      totalPages
      securityRevisions {
        craneModel
        active
        type
        status
        initDate
        endDate
        createdAt
        order { }
      }
    }
  }`, pageNum, pageSize);

  if (reqSecurityRevisions.loading) return <Loading />;
  if (reqSecurityRevisions.error) return "Error";
  const { securityRevisions = [], totalPages = 0 } = reqSecurityRevisions.data.securityRevisionPagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    securityRevisions={securityRevisions}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

SecurityRevisionList.propTypes = {};

export default SecurityRevisionList;