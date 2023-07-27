import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Loading } from "seed/helpers";
import View from "components/arris/Form.view";
import { usePost } from "seed/api";
import { useQuery } from "seed/gql";

const ArrisForm = ({ onCompleted = () => null, onError = () => null, setCreated }) => {

  const history = useHistory();
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState(null);

  const [callOperator, reqOperator] = usePost("/arris_operators", {
    onCompleted: (data) => {
      setCreated(true);
      setStep(2);
    },
    onError: (error) => {
      setCreated(true);
      setStep(2);
    }
  });

  const reqOperation = useQuery(`{
    orders {
      buildingName
      crane {
        series
        model
        number
      }
      arrisOperators {
        active
      }
    }
  }`);

  const reqUsers = useQuery(`{
      users {
        id
        firstName
        lastName
        rol
      }
    }`,
    `(rol=BUILDING_OPERATOR AND isActive=true)`
  );

  const reqSupervisors = useQuery(`{
      supervisors: users {
        id
        firstName
        lastName
        rol
      }
    }`,
    `((rol=SECURITY OR rol=ADMIN) AND isActive=true)`
  );

  // if (reqOperation.loading || reqUsers.loading) return <Loading />;
  // if (reqOperation.error || reqUsers.error) return <Error />;

  const error = reqOperator.error ? "An error has occurred" : null;

  let { orders = [] } = reqOperation.data;
  let { users = [] } = reqUsers.data;
  let { supervisors = [] } = reqSupervisors.data;

  const onSubmit = (values) => {

    if(orderId == null) {
      alert("No se ha seleccionado una grúa");
      return;
    }

    if(values.operatorFirst == null) {
      alert("No se ha seleccionado un operador en el primer turno");
      return;
    }

    callOperator({
      turn: "FIRST",
      order_id: orderId,
      user_id: values.operatorFirst,
      active: true
    });

    if(values.operatorSecond != undefined && values.operatorSecond != "na")
      callOperator({
        turn: "SECOND",
        order_id: orderId,
        user_id: values.operatorSecond,
        active: true
      });

    if(values.securitySupervisor != undefined)
      callOperator({
        turn: "SECURITY",
        order_id: orderId,
        user_id: values.securitySupervisor,
        active: true
      });

  };

  const onClickRetry = () => {
    setStep(step - 1);
    setCreated(false);
  };

  const onClose = () => {
    window.location.href = "/ariss";
  };

  const filteredOrders = orders.filter((order) => order.crane != null);
  const availableOrders = filteredOrders.filter((operation) => 
    operation.arrisOperators.reduce((acc, curr) => acc || curr.active, false) === false);

  return <View
    error={error}
    step={step}
    onSubmit={onSubmit}
    onComplete={onCompleted}
    onClose={onClose}
    users={users}
    supervisors={supervisors}
    operations={orders}
    onClickRetry={onClickRetry}
    setOrderId={setOrderId}
    availableOrders={availableOrders}
  />;
  
}

ArrisForm.propTypes = {
  setCreated: PropTypes.func,
  onCompleted: PropTypes.func,
  onError: PropTypes.func,
};

export default ArrisForm;
