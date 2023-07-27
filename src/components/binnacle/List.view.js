import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import NotResults from "components/helpers/NotResults";
import moment from "moment";
import "styles/css/Timeline.css";

const OperationList = ({ orders, error }) => <>
  {orders.length == 0 
    ? <NotResults /> 
    : <>
        <div class="timeline" style={{overflow: "auto", height: "65vh"}}>
          <ul>
            {orders.map((order, index) => <li key={index} className="mb-4">
              <div className="d-flex" style={{height: "2em"}}>
                <span className="px-2">{moment(order.createdAt).format("MMMM DD")}</span>
                <h3 className={`mb-2 ml-3 ${order.status != "FINISHED" ? "valid" : "invalid"}`}>{order.clientName}
                <small className="ml-2">
                  {order.crane.series + " / " + order.crane.model + "" + order.crane.number}
                </small>
                </h3>  
              </div>
              <div class="content">
                <p className="mb-0">

                  <label class="mb-1">Embarques:</label>
                  {order.shippings.map((shipping, idx) => 
                    <div key={idx}>
                      <Link to={`/${shipping.id}`}>
                        <b>{moment(shipping.deliveryDate).format("DD/MM/YYYY")}</b><br/>
                        <blockquote class="pl-3">
                          <label>
                            Conductor: {shipping.transportCarrierName} ({shipping.transportPlate})
                          </label>
                          <br/>
                          <label>Último estatus: {function(){
                              if(shipping.status == "CREATED") return "Creada"
                              if(shipping.status == "IN_PROCESS") return "En proceso de carga"
                              if(shipping.status == "COMPLETED") return "Carga completada"
                              if(shipping.status == "IN_REVIEW") return "En revisión"
                              if(shipping.status == "TRAVELING") return "Por enviar"
                              if(shipping.status == "ARRIVED") return "En destino"
                              if(shipping.status == "FINISHED") return "Completado (En taller)"
                              if(shipping.status == "SECURITY_REVISION") return "Revisión de seguridad"
                            }()}
                          </label>
                        </blockquote>
                      </Link>
                    </div>
                  )}

                  {order.shippings.length == 0 ? <div className="font-italic">No hay envíos registrados</div> : ""}

                </p>
              </div>
            </li>)}
          </ul>
        </div>
      </>
  }
</>

OperationList.propTypes = {
  craneId: PropTypes.string,
  orders: PropTypes.array,
  error: PropTypes.object
};

export default OperationList;