/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_MAINTENANCE_FILE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/maintenance_files/Details.view";

function MaintenanceFileDetails({ maintenanceFileId, onCompleted = () => null, onError = () => null }) {

  const reqMaintenanceFile = useDetail(`
  {
    maintenanceFile {
      createdAt
      file { }
      user { }
      maintenanceEvidence { }
    }
  }`, maintenanceFileId);
  
  const [callDelete] = useDelete(DELETE_MAINTENANCE_FILE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqMaintenanceFile.loading) return <Loading />;
  if (reqMaintenanceFile.error) return "Error";
  const { maintenanceFile = {} } = reqMaintenanceFile.data;

  const onClickDelete = () =>
    callDelete({ id: maintenanceFileId });

  return <View
    maintenanceFile={maintenanceFile}
    onClickDelete={onClickDelete}
   />;
}

MaintenanceFileDetails.propTypes = {
  maintenanceFileId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default MaintenanceFileDetails;