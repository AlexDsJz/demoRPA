import React, { useState } from "react";
import PropTypes from "prop-types";
import { usePost } from "seed/api";
import View from "components/users/Form.view";

const OrderFormSave = ({ onCompleted = () => null, onError = () => null, setCreated, onClose }) => {
   
  const [step, setStep] = useState(1);

  const [callPost, reqPost] = usePost("/users/create_user", {
    onCompleted: (data) => {
      setCreated(true);
      setStep(2);
    },
    onError: (error) => {
      setCreated(true);
      setStep(2);
    }
  });

  const error = reqPost.error ? "An error has occurred" : null;

  const onSubmit = (values) => {
    callPost({
      ...values,
      shipping_notification: values.shipping_notification.toString() == "true",
      order_notification: values.order_notification.toString() == "true",
      arris_notification: values.arris_notification.toString() == "true",
    });
  };

  const onClickRetry = () => {
    setStep(step - 1);
    setCreated(false);
  };

  return <View
    error={error}
    step={step}
    onSubmit={onSubmit}
    onComplete={onCompleted}
    onClose={onClose}
    onClickRetry={onClickRetry}
  />;
  
}

OrderFormSave.propTypes = {
  setCreated: PropTypes.func,
  onCompleted: PropTypes.func,
  onError: PropTypes.func,
  onClose: PropTypes.func
};

export default OrderFormSave;