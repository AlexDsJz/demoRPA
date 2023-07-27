/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_ARRIS_CRANE_STATUS } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/arris_crane_statuses/Details.view";

function ArrisCraneStatusDetails({ arrisCraneStatusId, onCompleted = () => null, onError = () => null }) {

  const reqArrisCraneStatus = useDetail(`
  {
    arrisCraneStatus {
      type
      name
      status
      createdAt
      arrisForm { }
    }
  }`, arrisCraneStatusId);
  
  const [callDelete] = useDelete(DELETE_ARRIS_CRANE_STATUS, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqArrisCraneStatus.loading) return <Loading />;
  if (reqArrisCraneStatus.error) return "Error";
  const { arrisCraneStatus = {} } = reqArrisCraneStatus.data;

  const onClickDelete = () =>
    callDelete({ id: arrisCraneStatusId });

  return <View
    arrisCraneStatus={arrisCraneStatus}
    onClickDelete={onClickDelete}
   />;
}

ArrisCraneStatusDetails.propTypes = {
  arrisCraneStatusId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ArrisCraneStatusDetails;