import React, { useState } from "react";
import PropTypes from "prop-types";
import { SET_CRANE } from "seed/gql/queries";
import View from "components/cranes/Form.view";
import { useSave, useDetail } from "seed/gql";
import Error from "components/helpers/Error";
import { Loading } from "seed/helpers";
import NotFound from "components/helpers/NotFound";

const CraneFormSet = ({ craneId, onCompleted = () => null, onError = () => null, setCreated, onClose }) => {

  const [step, setStep] = useState(1);
  
  const qCrane = useDetail(`{
    crane {
      craneId
      model
      number
      series
      owner
      status
    }
  }`, craneId);

  const [callSet, reqSave] = useSave(SET_CRANE, {
    onCompleted: (data) => {
      setCreated(true);
      setStep(2);
    },
    onError: (error) => {
      setCreated(true);
      setStep(2);
    }
  });

  const error = reqSave.error ? "An error has occurred" : null;

  if(qCrane.loading) return <Loading />;
  if(qCrane.error && qCrane.error.message.includes("matching query does not exist")) return <NotFound/>
  if(qCrane.error) return <Error />;

  const { crane } = qCrane.data;

  const onSubmit = (values) => {
    if(step == 1)
      callSet({
        ...values,
        id: parseInt(craneId)
      });
  }; 

  const onClickRetry = () => {
    setStep(step - 1);
    setCreated(false);
  };

  return <View
    craneId={craneId}
    error={error}
    step={step}
    crane={crane}
    onSubmit={onSubmit}
    onComplete={onCompleted}
    onClose={onClose}
    onClickRetry={onClickRetry}
  />;
  
}

CraneFormSet.propTypes = {
  craneId: PropTypes.string,
  setCreated: PropTypes.func,
  onCompleted: PropTypes.func,
  onError: PropTypes.func,
  onClose: PropTypes.func
};

export default CraneFormSet;