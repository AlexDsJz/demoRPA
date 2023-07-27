/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { MAINTENANCE_PERMS, SET_MAINTENANCE_PERMS } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/maintenance_permses/Form.view";

function MaintenancePermsFormSet({ maintenancePermsId, onCompleted = () => null, onError = () => null  }) {

  const qMaintenancePerms = useDetail(MAINTENANCE_PERMS, maintenancePermsId);
  const qMaintenanceCategories = useQuery(`{ maintenanceCategories { } }`);
  const qUsers = useQuery(`{ users { } }`);
  const qMaintenances = useQuery(`{ maintenances { } }`);
  const [callSet, qSet] = useSet(SET_MAINTENANCE_PERMS, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qMaintenancePerms.loading) return <Loading />;

  const { maintenancePerms = {} } = qMaintenancePerms.data;
  const { maintenanceCategories = [] } = qMaintenanceCategories.data;
  const { users = [] } = qUsers.data;
  const { maintenances = [] } = qMaintenances.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = maintenancePermsId;
    callSet(values);
  };

  return <View
    maintenancePerms={maintenancePerms}
    maintenanceCategories={maintenanceCategories}
    users={users}
    maintenances={maintenances}
    error={error}
    onSubmit={onSubmit}
  />;
}

MaintenancePermsFormSet.propTypes = {
  maintenancePermsId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default MaintenancePermsFormSet;