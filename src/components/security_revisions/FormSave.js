import React from "react";
import PropTypes from "prop-types";
import { useSave } from "seed/gql";
import { SAVE_SECURITY_REVISION } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "components/security_revisions/Form.view";
import { useGet, usePost } from "seed/api";

const SecurityRevisionFormSave = ({ onCompleted = () => null, onError = () => null }) => {
  
  const qOrders = useGet("/orders/orders_without_sec_revision");

  const [callResetRevisionDates, reqCallResetRevisionDates] = usePost("/security_revisions/reset_revision_dates", {
    onCompleted: (data) => {
      window.location.replace("/security_revisions");
    },
    onError: (error) => {}
  });

  const [callSave, qSave] = useSave(SAVE_SECURITY_REVISION, {
    onCompleted: (data) => {
      callResetRevisionDates({"revision_id": data.saveSecurityRevision.securityRevision.id});
    }
  });

  if(qOrders.loading) return <Loading/>;

  const error = qSave.error ? "An error has occurred" : null;
  const orders = qOrders.data??[];

  const onSubmit = (values) => {
    values.status = "CREATED";
    values.active = true;
    values.order = parseInt(values.order);
    
    if (isNaN(values.order) || !values.type) {
      alert("Primero debes llenar todos los campos");
      return;
    }
  
    callSave(values);
  }

  const filteredOrders = orders.filter(order => order.crane !== null);

  return <View
    orders={filteredOrders}
    error={error}
    onSubmit={onSubmit}
  />;
  
}

SecurityRevisionFormSave.propTypes = {
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default SecurityRevisionFormSave;