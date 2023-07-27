/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { MAINTENANCE_CATEGORY, SET_MAINTENANCE_CATEGORY } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/maintenance_categories/Form.view";

function MaintenanceCategoryFormSet({ maintenanceCategoryId, onCompleted = () => null, onError = () => null  }) {

  const qMaintenanceCategory = useDetail(MAINTENANCE_CATEGORY, maintenanceCategoryId);
  const [callSet, qSet] = useSet(SET_MAINTENANCE_CATEGORY, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qMaintenanceCategory.loading) return <Loading />;

  const { maintenanceCategory = {} } = qMaintenanceCategory.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = maintenanceCategoryId;
    callSet(values);
  };

  return <View
    maintenanceCategory={maintenanceCategory}
    error={error}
    onSubmit={onSubmit}
  />;
}

MaintenanceCategoryFormSet.propTypes = {
  maintenanceCategoryId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default MaintenanceCategoryFormSet;