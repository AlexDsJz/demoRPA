/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_MAINTENANCE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/maintenances/Details.view";

function MaintenanceDetails({ maintenanceId, onCompleted = () => null, onError = () => null }) {

  const reqMaintenance = useDetail(`
  {
    maintenance {
      status
      start
      end
      type
      phase
      createdAt
      crane { }
      evidences { }
    }
  }`, maintenanceId);
  
  const [callDelete] = useDelete(DELETE_MAINTENANCE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqMaintenance.loading) return <Loading />;
  if (reqMaintenance.error) return "Error";
  const { maintenance = {} } = reqMaintenance.data;

  const onClickDelete = () =>
    callDelete({ id: maintenanceId });

  return <View
    maintenance={maintenance}
    onClickDelete={onClickDelete}
   />;
}

MaintenanceDetails.propTypes = {
  maintenanceId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default MaintenanceDetails;