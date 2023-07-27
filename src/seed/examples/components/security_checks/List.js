/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/security_checks/List.view";

function SecurityCheckList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqSecurityChecks = usePagination(`
  {
    securityCheckPagination {
      totalPages
      securityChecks {
        value
        isDeviation
        deviationValue
        findings
        corrections
        date
        scpLiberation
        createdAt
        files { }
        securityCheckType { }
        securityRevision { }
        user { }
      }
    }
  }`, pageNum, pageSize);

  if (reqSecurityChecks.loading) return <Loading />;
  if (reqSecurityChecks.error) return "Error";
  const { securityChecks = [], totalPages = 0 } = reqSecurityChecks.data.securityCheckPagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    securityChecks={securityChecks}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

SecurityCheckList.propTypes = {};

export default SecurityCheckList;