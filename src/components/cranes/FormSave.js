import React, { useState } from "react";
import PropTypes from "prop-types";
import { SAVE_CRANE } from "seed/gql/queries";
import View from "components/cranes/Form.view";
import { useCount, useSave } from "seed/gql";
import Error from "components/helpers/Error";
import { Loading } from "seed/helpers";

const CraneFormSave = ({ onCompleted = () => null, onError = () => null, setCreated, onClose }) => {  

  const [step, setStep] = useState(1);
  const reqCount = useCount("crane");

  const [callSave, reqSave] = useSave(SAVE_CRANE, {
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

  const onSubmit = (values) => {
    if(step == 1)
      callSave({
        ...values,
        craneId: values.craneId,
        inUse: false
      });
  };

  const onClickRetry = () => {
    setStep(step - 1);
    setCreated(false);
  };

  if(reqCount.loading) return <Loading />;
  if(reqCount.error) return <Error />;

  const { count } = reqCount.data.craneCount;

  return <View
    error={error}
    step={step}
    count={count}
    onSubmit={onSubmit}
    onComplete={onCompleted}
    onClose={onClose}
    onClickRetry={onClickRetry}
  />;
  
}

CraneFormSave.propTypes = {
  setCreated: PropTypes.func,
  onCompleted: PropTypes.func,
  onError: PropTypes.func,
  onClose: PropTypes.func
};

export default CraneFormSave;