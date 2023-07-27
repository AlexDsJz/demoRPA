/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/maintenances/List.view";

function MaintenanceList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqMaintenances = usePagination(`
  {
    maintenancePagination {
      totalPages
      maintenances {
        status
        start
        end
        type
        phase
        createdAt
        crane { }
        evidences { }
      }
    }
  }`, pageNum, pageSize);

  if (reqMaintenances.loading) return <Loading />;
  if (reqMaintenances.error) return "Error";
  const { maintenances = [], totalPages = 0 } = reqMaintenances.data.maintenancePagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    maintenances={maintenances}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

MaintenanceList.propTypes = {};

export default MaintenanceList;