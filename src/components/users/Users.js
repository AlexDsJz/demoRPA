import React, { useState, useRef } from "react";
import { useHistory } from "react-router";
import View from "components/users/Users.view";
import { useQuery } from "seed/gql";
import { Loading } from "seed/helpers";
import Error from "components/helpers/Error";

const Users = () => {

  const searchRef = useRef(null);
  const history = useHistory();
  const [created, setCreated] = useState(false);
  const [search, setSearch] = useState("");
  const [rolFilters, setRolFilters] = useState({
    "ADMIN": true,
    "QUALITY_CONTROL": true,
    "BUILDING_OPERATOR": true,
    "WORKSHOP_OPERATOR": true,
    "SECURITY": true,
    "MAINTENANCE_WORKER": true,
    "COMMERCIAL": true,
    "MAINTENANCE_SUPERVISOR": true,
  });

  const qUsers = useQuery(`{
    users {
      firstName
      lastName
      email
    }
  }`);

  if(qUsers.loading) return <Loading/>;
  if(qUsers.error) return <Error/>;

  const { users } = qUsers.data;

  const handleChange = (value) => 
    setSearch(value);

  const onClose = () => {    
    setCreated(false);
    history.goBack();
    document.location.href = "/users";
  }

  return <View 
    searchRef={searchRef}
    users={users}
    search={search}
    rolFilters={rolFilters}
    setRolFilters={setRolFilters}
    handleChange={handleChange}
    created={created}
    setCreated={setCreated}
    onClose={onClose}
  />;

}

Users.propTypes = {};

export default Users;