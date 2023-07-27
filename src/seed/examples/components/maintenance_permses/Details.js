/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_MAINTENANCE_PERMS } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/maintenance_permses/Details.view";

function MaintenancePermsDetails({ maintenancePermsId, onCompleted = () => null, onError = () => null }) {

  const reqMaintenancePerms = useDetail(`
  {
    maintenancePerms {
      estimatedTime
      manuallyEnabled
      createdAt
      category { }
      users { }
      maintenance { }
    }
  }`, maintenancePermsId);
  
  const [callDelete] = useDelete(DELETE_MAINTENANCE_PERMS, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqMaintenancePerms.loading) return <Loading />;
  if (reqMaintenancePerms.error) return "Error";
  const { maintenancePerms = {} } = reqMaintenancePerms.data;

  const onClickDelete = () =>
    callDelete({ id: maintenancePermsId });

  return <View
    maintenancePerms={maintenancePerms}
    onClickDelete={onClickDelete}
   />;
}

MaintenancePermsDetails.propTypes = {
  maintenancePermsId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default MaintenancePermsDetails;