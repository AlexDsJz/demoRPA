import React, { useState, useRef } from "react";
import View from "components/arris/Arris.view";
import { useQuery } from "seed/gql";
import { Loading } from "seed/helpers";
import Error from "components/helpers/Error";

const Arris = () => {

  const searchRef = useRef(null);
  const [search, setSearch] = useState("");
  const [created, setCreated] = useState(false);

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

  const handleChange = (value) => 
    setSearch(value);

  return (
    <View
      searchRef={searchRef}
      cranes={cranes}
      search={search}
      handleChange={handleChange}
      setCreated={setCreated}
      created={created}
    />
  );

}

Arris.propTypes = {};

export default Arris;
