/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_MAINTENANCE_CATEGORY } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/maintenance_categories/Details.view";

function MaintenanceCategoryDetails({ maintenanceCategoryId, onCompleted = () => null, onError = () => null }) {

  const reqMaintenanceCategory = useDetail(`
  {
    maintenanceCategory {
      name
      craneModel
      type
      phase
      createdAt
    }
  }`, maintenanceCategoryId);
  
  const [callDelete] = useDelete(DELETE_MAINTENANCE_CATEGORY, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqMaintenanceCategory.loading) return <Loading />;
  if (reqMaintenanceCategory.error) return "Error";
  const { maintenanceCategory = {} } = reqMaintenanceCategory.data;

  const onClickDelete = () =>
    callDelete({ id: maintenanceCategoryId });

  return <View
    maintenanceCategory={maintenanceCategory}
    onClickDelete={onClickDelete}
   />;
}

MaintenanceCategoryDetails.propTypes = {
  maintenanceCategoryId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default MaintenanceCategoryDetails;