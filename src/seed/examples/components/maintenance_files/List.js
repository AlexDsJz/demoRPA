/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/maintenance_files/List.view";

function MaintenanceFileList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqMaintenanceFiles = usePagination(`
  {
    maintenanceFilePagination {
      totalPages
      maintenanceFiles {
        createdAt
        file { }
        user { }
        maintenanceEvidence { }
      }
    }
  }`, pageNum, pageSize);

  if (reqMaintenanceFiles.loading) return <Loading />;
  if (reqMaintenanceFiles.error) return "Error";
  const { maintenanceFiles = [], totalPages = 0 } = reqMaintenanceFiles.data.maintenanceFilePagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    maintenanceFiles={maintenanceFiles}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

MaintenanceFileList.propTypes = {};

export default MaintenanceFileList;