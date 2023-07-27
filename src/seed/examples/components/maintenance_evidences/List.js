/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/maintenance_evidences/List.view";

function MaintenanceEvidenceList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqMaintenanceEvidences = usePagination(`
  {
    maintenanceEvidencePagination {
      totalPages
      maintenanceEvidences {
        skipEvidence
        value
        createdAt
        file { }
        type { }
        maintenance { }
      }
    }
  }`, pageNum, pageSize);

  if (reqMaintenanceEvidences.loading) return <Loading />;
  if (reqMaintenanceEvidences.error) return "Error";
  const { maintenanceEvidences = [], totalPages = 0 } = reqMaintenanceEvidences.data.maintenanceEvidencePagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    maintenanceEvidences={maintenanceEvidences}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

MaintenanceEvidenceList.propTypes = {};

export default MaintenanceEvidenceList;