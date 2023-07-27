/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useDetail, useDelete } from "seed/gql";
import { DELETE_ITEM } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/items/Details.view";

function ItemDetails({ itemId, onCompleted = () => null, onError = () => null }) {

  const reqItem = useDetail(`
  {
    item {
      name
      description
      reference
      comment
      number
      quantity
      manualPage
      createdAt
      part { }
    }
  }`, itemId);
  
  const [callDelete] = useDelete(DELETE_ITEM, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (reqItem.loading) return <Loading />;
  if (reqItem.error) return "Error";
  const { item = {} } = reqItem.data;

  const onClickDelete = () =>
    callDelete({ id: itemId });

  return <View
    item={item}
    onClickDelete={onClickDelete}
   />;
}

ItemDetails.propTypes = {
  itemId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ItemDetails;