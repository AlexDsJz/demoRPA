import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PaginationFooter from "components/helpers/PaginationFooter";
import NotResults from "components/helpers/NotResults";
import { mapShippingStatusColor } from "components/utils/enum_mapper";
import { countActiveFilters } from "components/utils/filters";

const ShipingList = ({ 
  shippings, 
  statusFilters,
  pageNum = 1, 
  totalPages = 0, 
  onClickPage = () => {}, 
  onDelete, 
  onSetStatus 
}) => 
  <>
    {countActiveFilters(statusFilters) == 0 || shippings.length == 0
      ? <NotResults />
      : <>
          <div style={{height: "60vh", overflowY: "auto", overflowX: "hidden"}}>
            {shippings.map((shipping) => 
              <div className="row border mx-1" key={shipping.id}>
                <div className="col-md-2 p-2">
                  <b>{shipping.order.crane.series}</b>
                  {" / " + shipping.order.crane.model + "" + shipping.order.crane.number}
                </div>
                <div className="col-md-1 p-2">
                  {(new Date(shipping.deliveryDate)).toLocaleDateString()}
                </div>
                <div className="col-md-2 p-2">
                  <div>
                    {shipping.type == "TO_BUILDING" ? "Obra" : "Taller"}
                  </div>
                  <h5>
                    {shipping.order.clientName}
                  </h5>
                </div>
                <div className="col-md-2 p-2">
                  {shipping.transportCarrierName} - {shipping.transportPhone} ({shipping.transportPlate})
                </div>
                <div className="col-md-1 p-2">
                  {shipping.transportPlate}
                </div>
                <div className="col-md-2 p-2">
                  <div className="d-flex justify-content-center">
                    <select 
                      className="custom-badge-select border-0" 
                      style={mapShippingStatusColor(shipping.status)}
                      defaultValue={shipping.status} 
                      onChange={(e) => onSetStatus(shipping, e.target.value)}
                    >
                      {
                        function(){

                          if(shipping.status == "SECURITY_REVISION")
                            return <>
                              <option value="SECURITY_REVISION">Revisión de seguridad</option>
                              <option value="SECURITY_COMPLETED">Revisión completada</option>
                            </>

                          if(shipping.status == "IN_PROCESS")
                            return <>
                              <option value="IN_PROCESS">En proceso de carga</option>
                              <option value="COMPLETED">Carga completada</option>
                            </>

                          return <>
                            <option value="CREATED">Creada</option>
                            <option value="SECURITY_COMPLETED">Revisión completada</option>
                            <option value="COMPLETED">Carga completada</option>
                            <option value="FINISHED">En destino</option>
                          </>

                        }()
                      }
                    </select>
                  </div>
                </div>
                <div className="col-md-2 p-2">
                  <div className="row">
                  <div className="col">
                      <a onClick={() => {
                          window.location.href = "/binnacles?crane=" + 
                          shipping.order.crane.series + " / " + shipping.order.crane.model + "" + 
                          shipping.order.crane.number
                      }} role="button">
                          <i className="fa fa-clipboard text-warning"></i>
                      </a>
                    </div>
                    <div className="col">
                      <Link to={{pathname: `/${shipping.id}/edit`, state: { shipping }}}>
                        <i className="fa fa-edit"></i>
                      </Link>
                    </div>
                    <div className="col">
                      <Link to={`/${shipping.id}/print`}>
                        <i className="fa fa-print text-success"></i>
                      </Link>
                    </div>
                    <div className="col">
                      <a className="text-danger" role="button" onClick={() => onDelete(shipping)}>
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

ShipingList.propTypes = {
    shippings: PropTypes.array,
    statusFilters: PropTypes.object,
    pageNum: PropTypes.number,
    totalPages: PropTypes.number,
    onClickPage: PropTypes.func,
    onDelete: PropTypes.func,
    onSetStatus: PropTypes.func
};

export default ShipingList;