import React, { useState, useRef } from "react";
import { useQuery } from "seed/gql";
import { Loading } from "seed/helpers";
import Error from "components/helpers/Error";

import View from "components/maintenances/Maintenances.view";

const Maintenances = () => {

  const searchRef = useRef(null);
  const [search, setSearch] = useState("");
  const [showOnlyActiveMaintenances, setShowOnlyActiveMaintenances] = useState(true);
  const handleChange = (value) => setSearch(value);

  const qCranes = useQuery(`{
    cranes {
      series
      number
      model
    }
  }`, "in_use=true");

  if(qCranes.loading) return <Loading/>;
  if(qCranes.error) return <Error/>;

  const { cranes } = qCranes.data;

  return <View 
    cranes={cranes}
    searchRef={searchRef}
    search={search}
    handleChange={handleChange}
    showOnlyActiveMaintenances={showOnlyActiveMaintenances}
    setShowOnlyActiveMaintenances={setShowOnlyActiveMaintenances}
  />;
}

Maintenances.propTypes = {};

export default Maintenances;