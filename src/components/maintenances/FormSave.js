import React from "react";
import PropTypes from "prop-types";
import { Loading } from "seed/helpers";
import View from "components/maintenances/Form.view";
import { useGet, usePost } from "seed/api";

const MaintenanceFormSave = ({ onCompleted = () => null, onError = () => null }) => {
  const idM = {};
  const qCranes = useGet("/maintenances/get_cranes_without_active_maintenance");

  const [assignUsers, reqAssignUsers] = usePost("/maintenances/assign_users", {
    onCompleted: () => {
      window.location.href = "/maintenances";
    }
  });

  const [createEvidences, reqSave] = usePost("/maintenance_evidences/initialize_maintenance", {
    onCompleted: () => {
      assignUsers({ maintenance_id: sessionStorage.getItem("maintenanceId") })
    }
  });

  const [callSave, qSave] = usePost("/maintenances/create_maintenance", {
    onCompleted: (data) => {
      if(data["maintenance_id"] == -1)
        alert("Error al crear el mantenimiento. Revisa los mantenimientos activos")
      else{
        sessionStorage.setItem("maintenanceId", data["maintenance_id"])
        createEvidences({ maintenance_id: data["maintenance_id"] })
      }
    }
  });

  if(qCranes.loading) return <Loading/>;

  const error = qSave.error ? "An error has occurred" : null;
  const cranes = qCranes.data;

  const onSubmit = (values) => {
    values.status = "ACTIVE";
    values.crane = parseInt(values.crane)

    if (values?.start) {
      values.start = new Date(values.start);
    }
    if (values?.end) {
      values.end = new Date(values.end);
    }

    callSave(values);
  }

  return <View
    cranes={cranes}
    error={error}
    onSubmit={onSubmit}
  />;
  
}

MaintenanceFormSave.propTypes = {
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default MaintenanceFormSave;