/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { MAINTENANCE, SET_MAINTENANCE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/maintenances/Form.view";

function MaintenanceFormSet({ maintenanceId, onCompleted = () => null, onError = () => null  }) {

  const qMaintenance = useDetail(MAINTENANCE, maintenanceId);
  const qCranes = useQuery(`{ cranes { } }`);
  const [callSet, qSet] = useSet(SET_MAINTENANCE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qMaintenance.loading) return <Loading />;

  const { maintenance = {} } = qMaintenance.data;
  const { cranes = [] } = qCranes.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = maintenanceId;
    callSet(values);
  };

  return <View
    maintenance={maintenance}
    cranes={cranes}
    error={error}
    onSubmit={onSubmit}
  />;
}

MaintenanceFormSet.propTypes = {
  maintenanceId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default MaintenanceFormSet;