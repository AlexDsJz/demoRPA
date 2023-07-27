/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { MAINTENANCE_TYPE, SET_MAINTENANCE_TYPE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/maintenance_types/Form.view";

function MaintenanceTypeFormSet({ maintenanceTypeId, onCompleted = () => null, onError = () => null  }) {

  const qMaintenanceType = useDetail(MAINTENANCE_TYPE, maintenanceTypeId);
  const qMaintenanceCategories = useQuery(`{ maintenanceCategories { } }`);
  const [callSet, qSet] = useSet(SET_MAINTENANCE_TYPE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qMaintenanceType.loading) return <Loading />;

  const { maintenanceType = {} } = qMaintenanceType.data;
  const { maintenanceCategories = [] } = qMaintenanceCategories.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = maintenanceTypeId;
    callSet(values);
  };

  return <View
    maintenanceType={maintenanceType}
    maintenanceCategories={maintenanceCategories}
    error={error}
    onSubmit={onSubmit}
  />;
}

MaintenanceTypeFormSet.propTypes = {
  maintenanceTypeId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default MaintenanceTypeFormSet;