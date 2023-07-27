import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PaginationFooter from "components/helpers/PaginationFooter";
import NotResults from "components/helpers/NotResults";
import { mapOrderStatusColor } from "components/utils/enum_mapper";
import { countActiveFilters } from "components/utils/filters";

const OrderList = ({ 
  orders, 
  statusFilters, 
  pageNum = 1,
  totalPages = 0, 
  onClickPage = () => {}, 
  onDelete = () => {}, 
  onSetStatus,
  getTransportMessage
}) =>
  <>  
    {countActiveFilters(statusFilters) == 0 || orders.length == 0
      ? <NotResults />
      : <>
          <div style={{height: "60vh", overflowY: "auto", overflowX: "hidden"}}>
            {orders.map((order, idx) =>
              <div className="row border mx-1 text-reset" key={order.id} 
                style={{ background: idx % 2 == 0 ? "#fff" : "#f5f5f5" }}
              >
                <div className="col-md-2 p-2">
                  {
                    order.clientName 
                  }
                </div>
                <div className="col-md-3 p-2">
                  {order.crane.series}
                </div>
                <div className="col-md-3 p-2">
                  &nbsp;&nbsp;{order.requestingTrader}
                </div>
                <div className="col-md-2 p-2">
                  {(new Date(order.createdAt)).toLocaleDateString()}
                </div>
                <div className="col-md-2 p-2">
                  <div className="row">
                    <div className="col">
                      <Link to={{pathname: `/${order.id}/edit`, 
                        state: {crane: order.crane, configuration: order.configuration, elevations: order.elevations}}}
                      >
                        <i className="fa fa-edit"></i>
                      </Link>
                    </div>
                    <div className="col">
                      <a className="text-danger" role="button" onClick={() => { onDelete(order) }}>
                        <i className="fa fa-trash"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <PaginationFooter pageNum={pageNum} totalPages={totalPages} onClickPage={onClickPage} />
        </>
    }
  </>;

OrderList.propTypes = {
  orders: PropTypes.array,
  statusFilters: PropTypes.object,
  pageNum: PropTypes.number,
  totalPages: PropTypes.number,
  onClickPage: PropTypes.func,
  onDelete: PropTypes.func,
  onSetStatus: PropTypes.func,
  getTransportMessage: PropTypes.func
};

export default OrderList;