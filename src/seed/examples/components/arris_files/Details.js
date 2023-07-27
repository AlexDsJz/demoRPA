/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_ARRIS_FILE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/arris_files/Details.view";

function ArrisFileDetails({ arrisFileId, onCompleted = () => null, onError = () => null }) {

  const reqArrisFile = useDetail(`
  {
    arrisFile {
      category
      createdAt
      file { }
      arrisForm { }
    }
  }`, arrisFileId);
  
  const [callDelete] = useDelete(DELETE_ARRIS_FILE, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqArrisFile.loading) return <Loading />;
  if (reqArrisFile.error) return "Error";
  const { arrisFile = {} } = reqArrisFile.data;

  const onClickDelete = () =>
    callDelete({ id: arrisFileId });

  return <View
    arrisFile={arrisFile}
    onClickDelete={onClickDelete}
   />;
}

ArrisFileDetails.propTypes = {
  arrisFileId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ArrisFileDetails;