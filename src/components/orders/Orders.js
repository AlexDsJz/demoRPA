import React, { useState, useRef } from "react";
import { useHistory } from "react-router";
import View from "components/orders/Orders.view";
import { useQuery } from "seed/gql";
import { Loading } from "seed/helpers";
import Error from "components/helpers/Error";

const Orders = () => {

  const rol = sessionStorage.getItem("rol")
  if(rol != "ADMIN" && rol != "COMMERCIAL") window.location.replace("/login");

  const searchRef = useRef(null);
  const history = useHistory();
  const [created, setCreated] = useState(false);
  const [search, setSearch] = useState("");
  const [orderDate, setOrderDate] = useState("-");
  const [statusFilters, setStatusFilters] = useState({
    "CREATED": true,
    // "CHARGING": true,
    // "TRAVELING": true,
    // "RECEIVED": true,
    "IN_BUILDING": true,
    // "RETURNED": true,
    "FINISHED": false,
    "UNASSIGNED": true,
  });

  const qCranes = useQuery(`{
    cranes {
      series
      number
      model
    }
  }`, "in_use=true");

  const handleChange = (value) => 
    setSearch(value);

  const onClose = () => {    
    setCreated(false);
    history.goBack();
    document.location.href = "/orders";
  }

  if(qCranes.loading) return <Loading/>;
  if(qCranes.error) return <Error/>;

  const { cranes } = qCranes.data;

  return <View 
    searchRef={searchRef}
    cranes={cranes}
    search={search}
    statusFilters={statusFilters}
    setStatusFilters={setStatusFilters}
    orderDate={orderDate}
    setOrderDate={setOrderDate}
    handleChange={handleChange}
    created={created}
    onClose={onClose}
    setCreated={setCreated}
  />;
  
}

Orders.propTypes = {};

export default Orders;