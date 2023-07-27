/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/maintenance_types/List.view";

function MaintenanceTypeList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqMaintenanceTypes = usePagination(`
  {
    maintenanceTypePagination {
      totalPages
      maintenanceTypes {
        name
        inputType
        createdAt
        category { }
      }
    }
  }`, pageNum, pageSize);

  if (reqMaintenanceTypes.loading) return <Loading />;
  if (reqMaintenanceTypes.error) return "Error";
  const { maintenanceTypes = [], totalPages = 0 } = reqMaintenanceTypes.data.maintenanceTypePagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    maintenanceTypes={maintenanceTypes}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

MaintenanceTypeList.propTypes = {};

export default MaintenanceTypeList;