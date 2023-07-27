import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Loading } from "seed/helpers";
import View from "components/arris/Form.view";
import { useQuery, useSet, useSave, useDelete } from "seed/gql";
import { SAVE_ARRIS_OPERATOR, SET_ARRIS_OPERATOR } from "seed/gql/queries";

const callSetOperators = (callOperator, callSetOperator, orderId, values, allOperators) => {

  if(values.operatorFirst != undefined) {

    let obj = null;
    for(let i = 0; i < allOperators.length; i++) {
      if(allOperators[i].user.id == values.operatorFirst 
        && allOperators[i].turn == "FIRST" && allOperators[i].order.id == orderId) {
          obj = allOperators[i];
          break;
      }
    }

    if(obj == null)
      callOperator({
        turn: "FIRST",
        order: orderId,
        user: values.operatorFirst,
        active: true
      });
    else
      callSetOperator({
        id: obj.id,
        active: true
      });

  }

  if(values.operatorSecond != undefined) {

    let obj = null;
    for(let i = 0; i < allOperators.length; i++) {
      if(allOperators[i].user.id == values.operatorSecond 
          && allOperators[i].turn == "SECOND" && allOperators[i].order.id == orderId) { 
            obj = allOperators[i];
            break;
      }
    }

    if(obj == null && values.operatorSecond != "na")
      callOperator({
        turn: "SECOND",
        order: orderId,
        user: values.operatorSecond,
        active: true
      });
    else
      callSetOperator({
        id: obj.id,
        active: true
      });
      
  }

  if(values.securitySupervisor != undefined) {

    let obj = null;
    for(let i = 0; i < allOperators.length; i++) {
      if(allOperators[i].user.id == values.securitySupervisor 
          && allOperators[i].turn == "SECOND" && allOperators[i].order.id == orderId) {
            obj = allOperators[i];
            break;
      }
    }

    if(obj == null)
      callOperator({
        turn: "SECURITY",
        order: orderId,
        user: values.securitySupervisor,
        active: true
      });
    else
      callSetOperator({
        id: obj.id,
        active: true
      });
      
  }

}

const ArrisFormSet = ({ onCompleted = () => null, onError = () => null, setCreated, location }) => {
  
  const allOperators = location.state.allOperators;
  const operators = location.state.operators;
  const order = location.state.order;
  const formatedOperators = {
    operatorFirst: operators.FIRST ? operators.FIRST[0].user.id : undefined,
    operatorSecond: operators.SECOND ? operators.SECOND[0].user.id : undefined,
    securitySupervisor: operators.SECURITY ? operators.SECURITY[0].user.id : undefined
  };

  const history = useHistory();
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState(order ? order.id: null);  

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

  const [callSetOperator, qRemoveOperator] = useSet(SET_ARRIS_OPERATOR, {
    onCompleted: (data) => {
      setCreated(true);
    }
  });

  const [callOperator, reqOperator] = useSave(SAVE_ARRIS_OPERATOR, {
    onCompleted: (data) => {
      setCreated(true);
      setStep(2);
    },
    onError: (error) => {
      setCreated(true);
      setStep(2);
    }
  });

  // if (reqOperation.loading || reqUsers.loading) return <Loading />;
  // if (reqOperation.error || reqUsers.error) return <Error />;

  const error = reqOperator.error ? "An error has occurred" : null;

  let { orders = [] } = reqOperation.data;
  let { users = [] } = reqUsers.data;
  let { supervisors = [] } = reqSupervisors.data;

  const onSubmit = (values) => {

    values.operatorFirst = values.operatorFirst ? parseInt(values.operatorFirst) : undefined;
    values.operatorSecond = values.operatorSecond ? parseInt(values.operatorSecond) : undefined;
    values.securitySupervisor = values.securitySupervisor ? parseInt(values.securitySupervisor) : undefined;
    
    if(orderId == null) {
      alert("No se ha seleccionado una grúa");
      return;
    }

    if(values.operatorFirst == null) {
      alert("No se ha seleccionado un operador en el primer turno");
      return;
    }

    if(orderId == order.id) {

      if(values.operatorFirst != formatedOperators.operatorFirst) {
        if(formatedOperators.operatorFirst != undefined)
          callSetOperator({
            id: operators.FIRST[0].id,
            active: false
          });
      }
      else {
        delete values.operatorFirst;
      }
    
      if(values.operatorSecond != formatedOperators.operatorSecond) {
        if(formatedOperators.operatorSecond != undefined)
          callSetOperator({
            id: operators.SECOND[0].id,
            active: false
          });
      }
      else {
        delete values.operatorSecond;
      }
      
      if(values.securitySupervisor != formatedOperators.securitySupervisor) {
        if(formatedOperators.securitySupervisor != undefined)
          callSetOperator({
            id: operators.SECURITY[0].id,
            active: false
          });
      }
      else {
        delete values.securitySupervisor;
      }

    }
    else {

      if(formatedOperators.operatorFirst != undefined)
        callSetOperator({
          id: operators.FIRST[0].id,
          active: false
        });

      if(formatedOperators.operatorSecond != undefined)
        callSetOperator({
          id: operators.SECOND[0].id,
          active: false
        });

      if(formatedOperators.securitySupervisor != undefined)
        callSetOperator({
          id: operators.SECURITY[0].id,
          active: false
        });
      
    }

    callSetOperators(callOperator, callSetOperator, orderId, values, allOperators);

  };

  const onClickRetry = () => {
    setStep(step - 1);
    setCreated(false);
  };

  const onClose = () => {
    window.location.href = "/ariss";
  };

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
    operators={formatedOperators}
    order={order}
    availableOrders={orders.filter((order) => 
      order.arrisOperators.reduce((acc, curr) => acc || curr.active, false) === false)}
  />;

}

ArrisFormSet.propTypes = {
  setCreated: PropTypes.func,
  onCompleted: PropTypes.func,
  onError: PropTypes.func,
  location: PropTypes.object
};

export default ArrisFormSet;