/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/security_check_types/List.view";

function SecurityCheckTypeList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqSecurityCheckTypes = usePagination(`
  {
    securityCheckTypePagination {
      totalPages
      securityCheckTypes {
        number
        name
        createdAt
        securityCategory { }
      }
    }
  }`, pageNum, pageSize);

  if (reqSecurityCheckTypes.loading) return <Loading />;
  if (reqSecurityCheckTypes.error) return "Error";
  const { securityCheckTypes = [], totalPages = 0 } = reqSecurityCheckTypes.data.securityCheckTypePagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    securityCheckTypes={securityCheckTypes}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

SecurityCheckTypeList.propTypes = {};

export default SecurityCheckTypeList;