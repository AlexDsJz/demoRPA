import React, { useState, useRef } from "react";
import View from "components/binnacle/Binnacle.view";
import { useQuery } from "seed/gql";
import { useHistory } from "react-router";
import { Loading } from "seed/helpers";
import Error from "components/helpers/Error";

const Operations = () => {

  const history = useHistory();
  const params = new URLSearchParams(history.location.search);
  
  const searchRef = useRef(null);
  const [created, setCreated] = useState(false);
  const [craneId, setCraneId] = useState(params.get("crane"));

  const reqCranes = useQuery(`{
    cranes {
      craneId
      model
      number
      series
    }
  }`, "", {orderBy: "crane_id"});

  if(reqCranes.loading) return <Loading />;
  if(reqCranes.error) return <Error />;

  const { cranes = [] } = reqCranes.data;

  return <View 
    searchRef={searchRef}
    cranes={cranes}
    created={created}
    setCreated={setCreated}
    craneId={craneId}
    setCraneId={setCraneId}
  />;

}

Operations.propTypes = {};

export default Operations;