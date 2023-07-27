/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_CONTENT } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/contents/Details.view";

function ContentDetails({ contentId, onCompleted = () => null, onError = () => null }) {

  const reqContent = useDetail(`
  {
    content {
      partId
      partName
      items
      quantity
      um
      manual
      suggestRef
      elevationNumber
      createdAt
      images { }
      shipping { }
      operations { }
    }
  }`, contentId);
  
  const [callDelete] = useDelete(DELETE_CONTENT, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqContent.loading) return <Loading />;
  if (reqContent.error) return "Error";
  const { content = {} } = reqContent.data;

  const onClickDelete = () =>
    callDelete({ id: contentId });

  return <View
    content={content}
    onClickDelete={onClickDelete}
   />;
}

ContentDetails.propTypes = {
  contentId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ContentDetails;