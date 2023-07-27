/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { MAINTENANCE_FILE, SET_MAINTENANCE_FILE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/maintenance_files/Form.view";

function MaintenanceFileFormSet({ maintenanceFileId, onCompleted = () => null, onError = () => null  }) {

  const qMaintenanceFile = useDetail(MAINTENANCE_FILE, maintenanceFileId);
  const qUsers = useQuery(`{ users { } }`);
  const qMaintenanceEvidences = useQuery(`{ maintenanceEvidences { } }`);
  const [callSet, qSet] = useSet(SET_MAINTENANCE_FILE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qMaintenanceFile.loading) return <Loading />;

  const { maintenanceFile = {} } = qMaintenanceFile.data;
  const { users = [] } = qUsers.data;
  const { maintenanceEvidences = [] } = qMaintenanceEvidences.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = maintenanceFileId;
    callSet(values);
  };

  return <View
    maintenanceFile={maintenanceFile}
    users={users}
    maintenanceEvidences={maintenanceEvidences}
    error={error}
    onSubmit={onSubmit}
  />;
}

MaintenanceFileFormSet.propTypes = {
  maintenanceFileId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default MaintenanceFileFormSet;