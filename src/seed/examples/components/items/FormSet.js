/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { ITEM, SET_ITEM } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/items/Form.view";

function ItemFormSet({ itemId, onCompleted = () => null, onError = () => null  }) {

  const qItem = useDetail(ITEM, itemId);
  const qParts = useQuery(`{ parts { } }`);
  const [callSet, qSet] = useSet(SET_ITEM, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qItem.loading) return <Loading />;

  const { item = {} } = qItem.data;
  const { parts = [] } = qParts.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = itemId;
    callSet(values);
  };

  return <View
    item={item}
    parts={parts}
    error={error}
    onSubmit={onSubmit}
  />;
}

ItemFormSet.propTypes = {
  itemId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ItemFormSet;