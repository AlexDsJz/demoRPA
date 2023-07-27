/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_PART } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/parts/Details.view";

function PartDetails({ partId, onCompleted = () => null, onError = () => null }) {

  const reqPart = useDetail(`
  {
    part {
      craneModel
      partId
      name
      um
      createdAt
      images { }
      items { }
    }
  }`, partId);
  
  const [callDelete] = useDelete(DELETE_PART, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqPart.loading) return <Loading />;
  if (reqPart.error) return "Error";
  const { part = {} } = reqPart.data;

  const onClickDelete = () =>
    callDelete({ id: partId });

  return <View
    part={part}
    onClickDelete={onClickDelete}
   />;
}

PartDetails.propTypes = {
  partId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default PartDetails;