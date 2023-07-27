/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React from "react";
import PropTypes from "prop-types";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import { CONTENT, SET_CONTENT } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/contents/Form.view";

function ContentFormSet({ contentId, onCompleted = () => null, onError = () => null  }) {

  const qContent = useDetail(CONTENT, contentId);
  const qShippings = useQuery(`{ shippings { } }`);
  const [callSet, qSet] = useSet(SET_CONTENT, {
    onCompleted: () =>
      onCompleted()
      //Note: When the component is wrap in a ModalRoute it bind the event 'closeModal()'
  });

  if (qContent.loading) return <Loading />;

  const { content = {} } = qContent.data;
  const { shippings = [] } = qShippings.data;
  const error = qSet.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    values.id = contentId;
    callSet(values);
  };

  return <View
    content={content}
    shippings={shippings}
    error={error}
    onSubmit={onSubmit}
  />;
}

ContentFormSet.propTypes = {
  contentId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default ContentFormSet;