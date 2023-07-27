/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { SAVE_MAINTENANCE_EVIDENCE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/maintenance_evidences/Form.view";

function MaintenanceEvidenceFormSave({ onCompleted = () => null, onError = () => null }) {
  
  const qMaintenanceTypes = useQuery(`{ maintenanceTypes { } }`);
  const qMaintenances = useQuery(`{ maintenances { } }`);
  const [callSave, qSave] = useSave(SAVE_MAINTENANCE_EVIDENCE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });
  const { maintenanceTypes = [] } = qMaintenanceTypes.data;
  const { maintenances = [] } = qMaintenances.data;
  const error = qSave.error ? "An error has occurred" : null;

  const onSubmit = (values) =>
    callSave(values);

  return <View
    maintenanceTypes={maintenanceTypes}
    maintenances={maintenances}
    error={error}
    onSubmit={onSubmit}
  />;
}

MaintenanceEvidenceFormSave.propTypes = {
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default MaintenanceEvidenceFormSave;