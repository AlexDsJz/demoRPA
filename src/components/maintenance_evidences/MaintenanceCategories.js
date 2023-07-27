import React, { useState } from "react";
import PropTypes from "prop-types";
import View from "components/maintenance_evidences/MaintenanceCategories.view";
import { useGet } from "seed/api";
import { Loading } from "seed/helpers";
import Error from "components/helpers/Error";
import { useDetail, useQuery } from "seed/gql";

const MaintenanceCategories = ({ match }) => {

  const maintenanceId = match.params.maintenanceId;

  let categoryDataArray = [];
  let minPhase = 9999;
  const [maintenancePerms, setMaintenancePerms] = useState([]);

  const [noOfElementsWithEvidences, setNoOfElementsWithEvidences] = useState(0);
  const [noOfMaintenanceTypes, setNoOfMaintenanceTypes] = useState(0);

  const reqMaintenancePerms = useQuery(`{
    maintenancePermses {
      id
      estimatedTime
      manuallyEnabled
      category {
        id
        name
        phase
      }
      users {
        id
        firstName
        lastName
        rol
      }
    }
  }`, "maintenance.id=" + maintenanceId, {
    orderBy: "category_id",
    onCompleted: (data) => {
      setMaintenancePerms(data.maintenancePermses);
    },
  });

  const reqMaintenance = useDetail(`
  {
    maintenance {
      status
      createdAt
      crane {
        model
        craneId
        series
        number
      }
    }
  }`, maintenanceId)

  const reqMaintenanceCategories = useGet("/maintenance_files/get_files_of_maintenance",
    { 
      "maintenance_id": maintenanceId
    }, {
    onCompleted: (data) => {

      setNoOfMaintenanceTypes(data.typesCount);
      setNoOfElementsWithEvidences(data.elementsWithEvidence);
    }
  })

  if (reqMaintenance.loading || reqMaintenanceCategories.loading) return <Loading />;
  if (reqMaintenance.error || reqMaintenanceCategories.loading) return <Error />;

  const maintenance = reqMaintenance?.data?.maintenance;
  const maintenanceCategories = reqMaintenanceCategories?.data?.maintenanceCategories;

  for(let i = 0; i < maintenanceCategories.length; i++) {

    let phase = 0;
    let matchingPerm = maintenancePerms.find(perm => perm.category.name === maintenanceCategories[i].name);
    let evidenceComplete;

    if(matchingPerm) {
      phase = matchingPerm.category.phase;
    }

    if(maintenanceCategories[i].typesWithEvidence == maintenanceCategories[i].noOfTypes)
      evidenceComplete = true;
    else
      evidenceComplete = false;

    if (!evidenceComplete && phase < minPhase) {
      minPhase = phase;
    }

    let categoryData = [];
    categoryData = {
      "name": maintenanceCategories[i].name,
      "complete": evidenceComplete,
      "phase": phase,	
    }

    categoryDataArray.push(categoryData);
  }

  return <View
    maintenanceCategories={maintenanceCategories}
    maintenanceId={maintenanceId}
    maintenance={maintenance}
    noOfElementsWithEvidences={noOfElementsWithEvidences}
    noOfMaintenanceTypes={noOfMaintenanceTypes}
    categoryDataArray={categoryDataArray}
    minPhase={minPhase}
    maintenancePerms={maintenancePerms}
  />;

}

MaintenanceCategories.propTypes = {
  match: PropTypes.object
};

export default MaintenanceCategories;