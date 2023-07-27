import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PaginationFooter from "components/helpers/PaginationFooter";
import NotResults from "components/helpers/NotResults";
import { mapUserRol, mapUserRolColor } from "components/utils/enum_mapper";
import { countActiveFilters } from "components/utils/filters";

const ShipingList = ({ 
  users, 
  rolFilters, 
  pageNum = 1, 
  totalPages = 0, 
  onClickPage = () => {}, 
  onClickDelete
}) =>
  <>
    {countActiveFilters(rolFilters) == 0 || users.length == 0
        ? <NotResults />
        : <>
            <div style={{height: "55vh", overflowY: "auto", overflowX: "hidden"}}>
              {users.map((user) => 
                <div className="row border mx-1" key={user.id}>
                  <div className="col-md-4 p-2">
                    {user.firstName + " " + user.lastName}
                  </div>
                  <div className="col-md-3 p-2">
                    {user.email}
                  </div>
                  <div className="col-md-3 p-2">
                    <div 
                      className="custom-badge"
                      style={mapUserRolColor(user.rol)}>
                        {mapUserRol(user.rol)}
                    </div>
                  </div>
                  <div className="col-md-1 p-2" align="center">
                    <Link to={`/${user.id}/edit`}>
                      <i className="fa fa-edit"></i>
                    </Link>
                  </div>
                  <div className="col-md-1 p-2" align="center">
                    <i className="fa fa-trash text-danger" role="button" onClick={() => onClickDelete(user)}></i>
                  </div>
                </div>
              )}
            </div>
            <PaginationFooter pageNum={pageNum} totalPages={totalPages} onClickPage={onClickPage} />
          </>
    }
  </>;

ShipingList.propTypes = {
  users: PropTypes.array,
  rolFilters: PropTypes.object,
  pageNum: PropTypes.number,
  totalPages: PropTypes.number,
  onClickPage: PropTypes.func,
  onClickDelete: PropTypes.func
};

export default ShipingList;