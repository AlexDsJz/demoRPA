import React, { useState } from "react";
import PropTypes from "prop-types";
import View from "components/arris/arris_reports/weekly_report/ReasonForm.view";
import { usePost } from "seed/api";
import { useHistory } from "react-router";

const ReasonForm = ({ updateQuery, location }) => {

  const history = useHistory();
  const report = location.state.report;

  const [callSave, qSave] = usePost("/arris_operators/justify_missing", {
    onCompleted: (data) => {
      updateQuery();
      history.goBack();
    }
  });

  const onSubmit = (values) =>
    callSave(values);

  return <View 
    report={report}
    onSubmit={onSubmit} 
  />;

}

ReasonForm.propTypes = {
  location: PropTypes.object,
  updateQuery: PropTypes.func
};

export default ReasonForm;