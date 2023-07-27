import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDetail } from "seed/gql";
import { useGet } from "seed/api";
import { Loading } from "seed/helpers";
import Error from "components/helpers/Error"
import View from "components/maintenances/MaintenanceReport.view";

function MaintenanceReport({ maintenanceId }) {

  const toPrintRef = useRef();

  const reqMaintenance = useDetail(`{    
    maintenance {
      createdAt
      updatedAt
      start
      end
      crane {
        model
        craneId
        number
        series
      }
    } 
  }`, maintenanceId)

  const reqMaintenanceCategories = useGet("/maintenance_files/get_files_of_maintenance",
    { "maintenance_id": maintenanceId }, {
    onCompleted: (data) => { }
  })

  if (reqMaintenance.loading || reqMaintenanceCategories.loading) return <Loading />;
  if (reqMaintenance.error || reqMaintenanceCategories.error) return <Error />;

  const { maintenance = {} } = reqMaintenance.data;
  const maintenanceCategories = reqMaintenanceCategories.data.maintenanceCategories;

  return <View 
            toPrintRef={toPrintRef} 
            maintenance={maintenance} 
            maintenanceCategories={maintenanceCategories}
          />;
}

MaintenanceReport.propTypes = {};

export default MaintenanceReport;