/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/maintenance_permses/List.view";

function MaintenancePermsList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqMaintenancePermses = usePagination(`
  {
    maintenancePermsPagination {
      totalPages
      maintenancePermses {
        estimatedTime
        manuallyEnabled
        createdAt
        category { }
        users { }
        maintenance { }
      }
    }
  }`, pageNum, pageSize);

  if (reqMaintenancePermses.loading) return <Loading />;
  if (reqMaintenancePermses.error) return "Error";
  const { maintenancePermses = [], totalPages = 0 } = reqMaintenancePermses.data.maintenancePermsPagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    maintenancePermses={maintenancePermses}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

MaintenancePermsList.propTypes = {};

export default MaintenancePermsList;