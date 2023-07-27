/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_MAINTENANCE_EVIDENCE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/maintenance_evidences/Details.view";

function MaintenanceEvidenceDetails({ maintenanceEvidenceId, onCompleted = () => null, onError = () => null }) {

  const reqMaintenanceEvidence = useDetail(`
  {
    maintenanceEvidence {
      skipEvidence
      value
      createdAt
      file { }
      type { }
      maintenance { }
    }
  }`, maintenanceEvidenceId);
  
  const [callDelete] = useDelete(DELETE_MAINTENANCE_EVIDENCE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqMaintenanceEvidence.loading) return <Loading />;
  if (reqMaintenanceEvidence.error) return "Error";
  const { maintenanceEvidence = {} } = reqMaintenanceEvidence.data;

  const onClickDelete = () =>
    callDelete({ id: maintenanceEvidenceId });

  return <View
    maintenanceEvidence={maintenanceEvidence}
    onClickDelete={onClickDelete}
   />;
}

MaintenanceEvidenceDetails.propTypes = {
  maintenanceEvidenceId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default MaintenanceEvidenceDetails;