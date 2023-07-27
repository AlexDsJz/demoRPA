/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/maintenance_categories/List.view";

function MaintenanceCategoryList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqMaintenanceCategories = usePagination(`
  {
    maintenanceCategoryPagination {
      totalPages
      maintenanceCategories {
        name
        craneModel
        type
        phase
        createdAt
      }
    }
  }`, pageNum, pageSize);

  if (reqMaintenanceCategories.loading) return <Loading />;
  if (reqMaintenanceCategories.error) return "Error";
  const { maintenanceCategories = [], totalPages = 0 } = reqMaintenanceCategories.data.maintenanceCategoryPagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    maintenanceCategories={maintenanceCategories}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

MaintenanceCategoryList.propTypes = {};

export default MaintenanceCategoryList;