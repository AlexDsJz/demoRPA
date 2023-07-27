import React, { useState } from "react";
import { useQuery } from "seed/gql";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import { usePut } from "seed/api";
import View from "components/maintenances/List.view";
import { formatFilters, formatSearchFilters } from "components/utils/filters";
import PropTypes from "prop-types";
import { usePost } from "seed/api";

const MaintenanceList = ({ search, showOnlyActiveMaintenances }) => {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);

  const reqActiveMaintenances = usePagination(`
    {
      maintenancePagination {
        totalPages
        maintenances {
          status
          type
          createdAt
          start
          end
          crane {
            model
            craneId
            series
            number
          }
        }
      }
    }`,
    pageNum,
    pageSize,
    formatFilters([
      "status=ACTIVE",
      formatSearchFilters(search, ["crane.series", "crane.model"])
    ])
  );

  const reqMaintenances = usePagination(`
    {
      maintenancePagination {
        totalPages
        maintenances {
          status
          createdAt
          start
          end
          crane {
            model
            craneId
            series
            number
          }
        }
      }
    }`,
    pageNum,
    pageSize,
    formatFilters([
      formatSearchFilters(search, ["crane.series", "crane.model"])
    ])
  );

  const useGetActiveMaintenancesExist = (craneId) => {

    let qMaintenancesOfCrane = useQuery(`
    {
      maintenances {
        id
      }
    }`, "crane.id=" + craneId + " AND status=ACTIVE")

    let maintenances = qMaintenancesOfCrane.data.maintenances

    if (maintenances != undefined)
      return maintenances.length ?? maintenances.length > 0

  };

  const [callUploadEvidence, qUploadEvidence] = usePost("/maintenances/maintenance_onedrive", {
    onCompleted: () =>
      window.location.replace("/maintenances"),
    onError: () =>
      window.location.replace("/maintenances")
  });

  const [callSet, qSet] = usePut("/maintenances", {
    onCompleted: (data) =>
      callUploadEvidence({ maintenance_id: data["id"] })
  });

  if (reqActiveMaintenances.loading || reqMaintenances.loading) return <Loading />;
  if (reqActiveMaintenances.error || reqMaintenances.error) return "Error";

  const { maintenances = [], totalPages = 0 } = showOnlyActiveMaintenances
    ? reqActiveMaintenances.data.maintenancePagination
    : reqMaintenances.data.maintenancePagination;

  const updateStatus = (maintenanceId, currentStatus) => {

    let newStatus;

    if (currentStatus == "ACTIVE")
      newStatus = "FINISHED"
    else if (currentStatus == "FINISHED")
      newStatus = "ACTIVE"

    let result = {
      id: maintenanceId,
      status: newStatus
    }

    callSet(result);

  }

  const redirectToCategories = (maintenanceId) =>
    window.location.href = "/maintenances/categories/" + maintenanceId;

  const redirectToResponsibles = (maintenanceId) =>
    window.location.href = "/maintenances/responsibles/" + maintenanceId;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    maintenances={maintenances}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
    activeMaintenanceExist={useGetActiveMaintenancesExist}
    updateStatus={updateStatus}
    redirectToCategories={redirectToCategories}
    redirectToResponsibles={redirectToResponsibles}
  />;

}

MaintenanceList.propTypes = {
  search: PropTypes.string,
  showOnlyActiveMaintenances: PropTypes.bool
};

export default MaintenanceList;