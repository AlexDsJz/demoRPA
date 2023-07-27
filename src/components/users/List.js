import React, { useState } from "react";
import PropTypes from "prop-types";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "components/users/List.view";
import Error from "components/helpers/Error";
import { usePost } from "seed/api";
import { formatEnumFilters, formatFilters, formatSearchFilters } from "components/utils/filters";

const UserList = ({ history, search, rolFilters }) => {

  const pageSize = 30;
  const [pageNum, setPageNum] = useState(1);
  
  const reqUsers = usePagination(`
    {
      userPagination {
        totalPages 
        users {
          firstName
          lastName
          email
          rol
          orderNotification
          shippingNotification
        }
      }
    }`, 
    pageNum, 
    pageSize, 
    "is_active=true AND " + formatFilters([
      formatEnumFilters(rolFilters, "rol"), 
      formatSearchFilters(search, ["email", "firstName", "lastName"])
    ])
  );

  const [callTurnOff, qTurnOff] = usePost("/users/set_inactive_user", {
    onCompleted: (data) => {
      if(sessionStorage.getItem("id") == data.user_id) {
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = "/";
      }
      else {
        window.location.reload();
      }
    },
    onError: (error) => {
      window.location.reload();
    }
  });

  if (reqUsers.loading) return <Loading />;
  if (reqUsers.error || qTurnOff.error) return <Error />;

  const { users = [], totalPages = 0 } = reqUsers.data.userPagination;

  if(totalPages != 0 && pageNum > totalPages) 
    setPageNum(totalPages);

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  const onClickDelete = (user) => {
    let confirm = window.confirm("¿Está seguro de eliminar el usuario?");
    if(confirm) callTurnOff({ user_id: user.id });
  };

  return <View
    users={users}
    rolFilters={rolFilters}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
    onClickDelete={onClickDelete}
  />;
  
}

UserList.propTypes = {
  history: PropTypes.object.isRequired,
  search: PropTypes.string,
  rolFilters: PropTypes.object
};

export default UserList;