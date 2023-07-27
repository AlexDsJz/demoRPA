/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { SAVE_MAINTENANCE_TYPE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/maintenance_types/Form.view";

function MaintenanceTypeFormSave({ onCompleted = () => null, onError = () => null }) {
  
  const qMaintenanceCategories = useQuery(`{ maintenanceCategories { } }`);
  const [callSave, qSave] = useSave(SAVE_MAINTENANCE_TYPE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });
  const { maintenanceCategories = [] } = qMaintenanceCategories.data;
  const error = qSave.error ? "An error has occurred" : null;

  const onSubmit = (values) =>
    callSave(values);

  return <View
    maintenanceCategories={maintenanceCategories}
    error={error}
    onSubmit={onSubmit}
  />;
}

MaintenanceTypeFormSave.propTypes = {
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default MaintenanceTypeFormSave;