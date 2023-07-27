/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_MAINTENANCE_TYPE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/maintenance_types/Details.view";

function MaintenanceTypeDetails({ maintenanceTypeId, onCompleted = () => null, onError = () => null }) {

  const reqMaintenanceType = useDetail(`
  {
    maintenanceType {
      name
      inputType
      createdAt
      category { }
    }
  }`, maintenanceTypeId);
  
  const [callDelete] = useDelete(DELETE_MAINTENANCE_TYPE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqMaintenanceType.loading) return <Loading />;
  if (reqMaintenanceType.error) return "Error";
  const { maintenanceType = {} } = reqMaintenanceType.data;

  const onClickDelete = () =>
    callDelete({ id: maintenanceTypeId });

  return <View
    maintenanceType={maintenanceType}
    onClickDelete={onClickDelete}
   />;
}

MaintenanceTypeDetails.propTypes = {
  maintenanceTypeId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default MaintenanceTypeDetails;