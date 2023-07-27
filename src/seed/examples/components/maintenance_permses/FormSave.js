/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { SAVE_MAINTENANCE_PERMS } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/maintenance_permses/Form.view";

function MaintenancePermsFormSave({ onCompleted = () => null, onError = () => null }) {
  
  const qMaintenanceCategories = useQuery(`{ maintenanceCategories { } }`);
  const qUsers = useQuery(`{ users { } }`);
  const qMaintenances = useQuery(`{ maintenances { } }`);
  const [callSave, qSave] = useSave(SAVE_MAINTENANCE_PERMS, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });
  const { maintenanceCategories = [] } = qMaintenanceCategories.data;
  const { users = [] } = qUsers.data;
  const { maintenances = [] } = qMaintenances.data;
  const error = qSave.error ? "An error has occurred" : null;

  const onSubmit = (values) =>
    callSave(values);

  return <View
    maintenanceCategories={maintenanceCategories}
    users={users}
    maintenances={maintenances}
    error={error}
    onSubmit={onSubmit}
  />;
}

MaintenancePermsFormSave.propTypes = {
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default MaintenancePermsFormSave;