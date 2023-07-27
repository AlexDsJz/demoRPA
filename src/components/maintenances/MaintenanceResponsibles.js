import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import View from "components/maintenances/MaintenanceResponsibles.view";
import { useDetail, useQuery } from "seed/gql";
import { Loading } from "seed/helpers";
import { useGet } from "seed/api";
import Error from "components/helpers/Error";
import { usePost } from "seed/api";

const MaintenanceResponsibles = ({match}) => {

  const maintenanceId = match.params.maintenanceId;
  const [displayedUsers, setDisplayedUsers] = useState(-1);
  const [maintenancePerms, setMaintenancePerms] = useState([]);
  let categoryDataArray = [];
  let minPhase = 9999;

  const reqMaintenanceCategories = useGet(
    "/maintenance_files/get_files_of_maintenance",
    { maintenance_id: maintenanceId }
  );

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
  }`, maintenanceId);

  const reqMaintenanceWorkers = useQuery(`{
    users {
      id
      firstName
      lastName
      rol
      email
    }
  }`, "(rol=MAINTENANCE_WORKER AND isActive=true)");
  
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

  const [modifyPermses, reqModifyPermses] = usePost("/maintenance_permses/modify_perm_users", {
    onCompleted: (data) => {
      reqMaintenancePerms.refetch();
    }
  });

  const [manuallyEnabled, reqManuallyEnabled] = usePost("/maintenance_permses/enabled_category", {
    onCompleted: (data) => {
      reqMaintenancePerms.refetch();
    }
  });

  const onChangePermses = (user, categoryId, estimatedTime, newValue, maintenancePermIndex) => {
    modifyPermses({
      "maintenance_id": maintenanceId,
      "category_id": categoryId,
      "user_id": user.id,
      "new_value": newValue,
      "estimated_time": estimatedTime
    });

    let tmpMaintenancePerms = JSON.parse(JSON.stringify(maintenancePerms));

    if(newValue)
      tmpMaintenancePerms[maintenancePermIndex]["users"].push(user);
    else
      tmpMaintenancePerms[maintenancePermIndex]["users"] = tmpMaintenancePerms[maintenancePermIndex]["users"]
        .filter((c_user) => c_user.id !== user.id);
    
    setMaintenancePerms(tmpMaintenancePerms);
    
  }

  const changeDisplayedUsers = (permsId) =>
    setDisplayedUsers(permsId);

  const userInPerms = (userId, usersList) => {

    setMaintenancePerms(maintenancePerms);

    for(let i = 0; i < usersList.length; i++) {
      const cUser = usersList[i];
      if (cUser.id == userId)
        return true      
    }

    return false

  }

  const enabledManuallyPerms = (maintenancePermsId, categoryId) => {
    manuallyEnabled({
      "maintenance_id": maintenanceId,
      "category_id": categoryId,
      "perm_id": maintenancePermsId,
      "low_phase": minPhase
    });
  }

  if (reqMaintenance.loading || reqMaintenanceWorkers.loading || 
      reqMaintenancePerms.loading || reqMaintenanceCategories.loading) return <Loading />;
  if (reqMaintenance.error || reqMaintenanceWorkers.error || 
      reqMaintenancePerms.loading || reqMaintenanceCategories.loading) return <Error />;

  const maintenanceWorkers = reqMaintenanceWorkers.data.users;
  const maintenance = reqMaintenance.data.maintenance;
  const maintenanceCategories = reqMaintenanceCategories.data.maintenanceCategories;


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
    maintenanceId={maintenanceId}
    maintenance={maintenance}
    maintenanceWorkers={maintenanceWorkers}
    maintenancePerms={maintenancePerms}
    displayedUsers={displayedUsers}
    changeDisplayedUsers={changeDisplayedUsers}
    userInPerms={userInPerms}
    onChangePermses={onChangePermses}
    categoryDataArray={categoryDataArray}
    minPhase={minPhase}
    enabledManuallyPerms={enabledManuallyPerms}
  />;

}

MaintenanceResponsibles.propTypes = {
  match: PropTypes.object,
};

export default MaintenanceResponsibles;