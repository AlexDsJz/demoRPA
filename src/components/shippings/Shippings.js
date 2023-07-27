import React, { useState, useRef } from "react";
import { useHistory } from "react-router";
import View from "components/shippings/Shippings.view";
import { useQuery } from "seed/gql";
import { Loading } from "seed/helpers";
import Error from "components/helpers/Error";
import { usePost } from "seed/api";

const Shippings = () => {

  const searchRef = useRef(null);
  const history = useHistory();
  const [created, setCreated] = useState(false);
  const [search, setSearch] = useState("");
  const [orderDate, setOrderDate] = useState("-");
  const [statusFilters, setStatusFilters] = useState({
    "CREATED": true,
    "IN_PROCESS": true,
    "COMPLETED": true,
    "IN_REVIEW": true,
    "TRAVELING": true,
    "ARRIVED": true,
    "SECURITY_COMPLETED": true,
    "SECURITY_REVISION": true,
    "FINISHED": false,
  });

  const qCranes = useQuery(`{
    cranes {
      series
      number
      model
    }
  }`, "in_use=true");

  const [callUploadShipppings, qUploadShippings] = usePost("/shippings/upload_shippings", {
    onCompleted: () => {
      alert("Carga de embarques exitosa");
      document.location.href = "/shippings";
    },
    onError: async (data) => {
      alert("Ha ocurrido un error al cargar los embarques, la plantilla debe ser Parte, ID Parte," + 
        " Cantidad, UM, Items, Serie Grúa, Cliente, Transportista, Placas, Teléfono");
    }
  })

  const handleChange = (value) => 
    setSearch(value);

  const onClose = () => {    
    setCreated(false);
    history.goBack();
    document.location.href = "/shippings";
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
    callUploadShipppings={callUploadShipppings}
    orderDate={orderDate}
    setOrderDate={setOrderDate}
    handleChange={handleChange}
    created={created}
    setCreated={setCreated}
    onClose={onClose}
  />;
  
}

Shippings.propTypes = {};

export default Shippings;