import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { MAINTENANCE, SET_MAINTENANCE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "components/maintenances/Form.view";

const MaintenanceFormSet = ({ maintenanceId, onCompleted = () => null, onError = () => null }) => {

  const qMaintenance = useDetail(MAINTENANCE, maintenanceId);
  const qCranes = useQuery(`{ cranes { } }`);
  const [callSet, qSet] = useSet(SET_MAINTENANCE, {
    onCompleted: () =>
      onCompleted()
  });

  if (qMaintenance.loading) return <Loading />;

  const { maintenance = {} } = qMaintenance.data;
  const { cranes = [] } = qCranes.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = parseInt(maintenanceId);
    if (values?.start) {
      values.start = new Date(values.start);
    }
    if (values?.end) {
      values.end = new Date(values.end);
    }
    callSet(values);
  };

  return <View
    maintenance={maintenance}
    cranes={cranes}
    error={error}
    edit={true}
    onSubmit={onSubmit}
  />;
}

MaintenanceFormSet.propTypes = {
  maintenanceId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default MaintenanceFormSet;