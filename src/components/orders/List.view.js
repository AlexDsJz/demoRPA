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
                    order.crane 
                      ? <><b>{order.crane.series}</b>{" / " + order.crane.model + "" + order.crane.number}</> 
                      : <><b>SIN ASIGNAR</b>{" / " + order.modelReference}</> 
                  }
                </div>
                <div className="col-md-3 p-2">
                  {order.clientName} - {order.buildingName}
                </div>
                <div className="col-md-2 p-2">
                  &nbsp;&nbsp;{order.requestingTrader}
                </div>
                <div className="col-md-1 p-2">
                  &nbsp;&nbsp;&nbsp;&nbsp;{(new Date(order.createdAt)).toLocaleDateString()}
                </div>
                <div className="col-md-2 p-2">
                  <div className="d-flex justify-content-center">
                    <div className="text-center">
                      <select 
                        disabled={order.status == "UNASSIGNED"}
                        className="custom-badge-select border-0" 
                        style={mapOrderStatusColor(order.status)}
                        defaultValue={order.status} onChange={
                        (e) => {
                          if(e.target.value == "FINISHED") {
                            let confirm = window.confirm("¿Está seguro de finalizar la orden?")
                            if(!confirm) {
                              e.preventDefault();
                              e.target.value = order.status;
                            }
                            else {
                              onSetStatus(order, e.target.value)
                            }
                          }
                          else {
                            onSetStatus(order, e.target.value)
                          }
                        }
                        }
                      >
                          { order.status == "UNASSIGNED" && <option value="UNASSIGNED">Sin asignar</option> }
                          <option value="CREATED">En carga</option>
                          {/* <option value="CHARGING">En carga</option>
                          <option value="TRAVELING">Carga completa</option>
                          <option value="RECEIVED">Recibida</option> */}
                          <option value="IN_BUILDING">En destino</option>
                          {/* <option value="RETURNED">Retornada</option> */}
                          <option value="FINISHED">Finalizada (en taller)</option>
                      </select>
                      {getTransportMessage(order)}
                    </div>
                  </div>
                </div>
                <div className="col-md-2 p-2">
                  <div className="row">
                    <div className="col">
                      <a onClick={() => {
                          window.location.href = "/binnacles?crane=" + 
                          order.crane.series + " / " + order.crane.model + "" + order.crane.number
                      }} role="button">
                          <i className="fa fa-clipboard text-warning"></i>
                      </a>
                    </div>
                    <div className="col">
                      <Link to={{pathname: `/${order.id}/edit`, 
                        state: {crane: order.crane, configuration: order.configuration, elevations: order.elevations}}}
                      >
                        <i className="fa fa-edit"></i>
                      </Link>
                    </div>
                    <div className="col">
                      <Link to={`/${order.id}/print`}>
                        <i className="fa fa-print text-success"></i>
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