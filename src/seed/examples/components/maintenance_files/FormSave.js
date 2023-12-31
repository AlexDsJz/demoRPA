/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { SAVE_MAINTENANCE_FILE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/maintenance_files/Form.view";

function MaintenanceFileFormSave({ onCompleted = () => null, onError = () => null }) {
  
  const qUsers = useQuery(`{ users { } }`);
  const qMaintenanceEvidences = useQuery(`{ maintenanceEvidences { } }`);
  const [callSave, qSave] = useSave(SAVE_MAINTENANCE_FILE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });
  const { users = [] } = qUsers.data;
  const { maintenanceEvidences = [] } = qMaintenanceEvidences.data;
  const error = qSave.error ? "An error has occurred" : null;

  const onSubmit = (values) =>
    callSave(values);

  return <View
    users={users}
    maintenanceEvidences={maintenanceEvidences}
    error={error}
    onSubmit={onSubmit}
  />;
}

MaintenanceFileFormSave.propTypes = {
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default MaintenanceFileFormSave;