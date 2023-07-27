import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDetail } from "seed/gql";
import { USER } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "components/users/Form.view";
import Error from "components/helpers/Error";
import { usePost } from "seed/api";
import NotFound from "components/helpers/NotFound";

const UserFormSet = ({ userId, onCompleted = () => null, onError = () => null, setCreated, onClose }) => {

  const [step, setStep] = useState(1);
  const qUser = useDetail(USER, userId);

  const [callSet, qSet] = usePost("/users/update_user", {
    onCompleted: () => {
        setCreated(true);
        setStep(2);
    },
    onError: (error) => {
      setCreated(true);
      setStep(2);
    }
  });

  if(qUser.loading) return <Loading />;
  if(qUser.error && qUser.error.message.includes("matching query does not exist")) return <NotFound/>
  if(qUser.error) return <Error />;
  
  const error = qSet.error ? "An error has occurred" : null;

  const { user = {} } = qUser.data;

  const onSubmit = (values) => {

    values.username = values.email;

    if(values.password == null || values.password.length == 0)
      delete values.password;

    delete values.id;

    callSet({
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
    user={{
      ...user,
      firstName: user.firstName + " " + user.lastName,
      lastName: ""
    }}
    onSubmit={onSubmit}
    onClose={onClose}
    onClickRetry={onClickRetry}
  />;

}

UserFormSet.propTypes = {
  userId: PropTypes.number.isRequired,
  setCreated: PropTypes.func,
  onCompleted: PropTypes.func,
  onError: PropTypes.func,
  onClose: PropTypes.func
};

export default UserFormSet;