import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import View from "components/information/Support.view";
import { usePost } from "seed/api";

function Support() {

  const formikRef = useRef();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const [callSendEmail, reqSendEmail] = usePost("/users/send_support_email", {
    onCompleted: (data) => {
      setMessage(data.message);
      formikRef.current.resetForm();
    },
    onError: (error) => {
      setError(error.message);
    }
  });

  const onSubmit = (values) => {
    setError(null);
    setMessage(null);
    callSendEmail(values);
    console.log(values)
  }

  return <View 
    formikRef={formikRef}
    error={error}
    message={message}
    onSubmit={onSubmit}
  />;

}

Support.propTypes = {};

export default Support;