/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { MAINTENANCE_EVIDENCE, SET_MAINTENANCE_EVIDENCE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/maintenance_evidences/Form.view";

function MaintenanceEvidenceFormSet({ maintenanceEvidenceId, onCompleted = () => null, onError = () => null  }) {

  const qMaintenanceEvidence = useDetail(MAINTENANCE_EVIDENCE, maintenanceEvidenceId);
  const qMaintenanceTypes = useQuery(`{ maintenanceTypes { } }`);
  const qMaintenances = useQuery(`{ maintenances { } }`);
  const [callSet, qSet] = useSet(SET_MAINTENANCE_EVIDENCE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qMaintenanceEvidence.loading) return <Loading />;

  const { maintenanceEvidence = {} } = qMaintenanceEvidence.data;
  const { maintenanceTypes = [] } = qMaintenanceTypes.data;
  const { maintenances = [] } = qMaintenances.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = maintenanceEvidenceId;
    callSet(values);
  };

  return <View
    maintenanceEvidence={maintenanceEvidence}
    maintenanceTypes={maintenanceTypes}
    maintenances={maintenances}
    error={error}
    onSubmit={onSubmit}
  />;
}

MaintenanceEvidenceFormSet.propTypes = {
  maintenanceEvidenceId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default MaintenanceEvidenceFormSet;