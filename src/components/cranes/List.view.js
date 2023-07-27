import React from "react";
import PropTypes from "prop-types";
import PaginationFooter from "components/helpers/PaginationFooter";
import NotResults from "components/helpers/NotResults";
import { Link } from "react-router-dom";
import { countActiveFilters } from "components/utils/filters";
import { 
  mapCraneStatusColor, 
  mapCraneStatus, 
  mapOrderStatus,
  mapCraneInUseColor, 
  mapCraneInUse, 
  mapCraneOwner, 
  mapOrderStatusColor
} from "components/utils/enum_mapper";

const CraneList = ({ 
  cranes, 
  statusFilters, 
  ownerFilters, 
  pageNum = 1, 
  totalPages = 0,
  onClickPage = () => { }, 
  onDelete, 
  onSetStatus, 
  onSetOrderStatus
  
}) =>
    <>
      {
        countActiveFilters(ownerFilters) == 0 || cranes.length == 0
          ? <NotResults />
          : <>
              <div style={{ height: "60vh", overflowY: "auto", overflowX: "hidden" }}>
                {cranes.map((crane, idx) =>
                  <div 
                    key={crane.id}
                    className="row border mx-1" 
                    style={{ background: idx % 2 == 0 ? "#fff" : "#f5f5f5" }}
                  >
                    <div className="col-md-2 p-2">
                      <b>{crane.series}</b>{" / " + crane.model + "" + crane.number}
                    </div>
                    <div className="col-md-2 p-2">
                      {/* We select orders[0] because want the current one */}
                      {crane.orders.length == 0 ? "N/A" : crane.orders[0].buildingName}
                    </div>
                    <div className="col-md-2 p-2 text-center">
                      {mapCraneOwner(crane.owner)}
                    </div>
                    <div className="col-md-2 p-2 d-flex justify-content-center">
                      <div className="text-center">
                        <select
                          className="custom-badge-select border-0" 
                          style={function(){
                            if(crane.owner != "GROKE") 
                              return {"backgroundColor": "#6A7073"};
                            else if(crane.orderStatus == "FINISHED") 
                              return {"backgroundColor": "#3899FF"};
                            else if(crane.orderStatus == "CREATED") 
                              return {"backgroundColor": "#3899AA"};
                            else 
                              return {"backgroundColor": "#eb6859"};
                          }()}
                          disabled={crane.owner != "GROKE"}
                          defaultValue={crane.orderStatus} 
                          onChange={(e) => { 
                            if(crane.orderStatus == "FINISHED") {

                              if(e.target.value == "CREATED") 
                                alert("Para marcar la grúa como 'Por enviar' debe crear una orden primero.")

                              e.preventDefault();
                              e.target.value = crane.orderStatus;

                            }
                            else if(crane.orderStatus != "FINISHED" && e.target.value == "FINISHED") {
                              let confirm = window.confirm("¿Está seguro de finalizar la orden?")
                              if(!confirm) {
                                e.preventDefault();
                                e.target.value = crane.orderStatus;
                              }
                              else {
                                onSetOrderStatus(crane, crane.orderStatus, e.target.value)
                              }
                            }
                            else {
                              let updated = onSetOrderStatus(crane, crane.orderStatus, e.target.value)
                              if(!updated) {
                                e.preventDefault();
                                e.target.value = crane.orderStatus;
                              }
                            }
                          }}
                        >
                          {function(){
                            if(crane.orderStatus != "NA") {
                              return <>
                                <option value="FINISHED">Disponible</option>
                                <option value="CREATED">En carga</option>
                                {/* <option value="CHARGING">En carga</option> */}
                                {/* <option value="TRAVELING">Carga completa</option> */}
                                {/* <option value="RECEIVED">Recibida</option> */}
                                <option value="IN_BUILDING">En destino</option>
                                {/* <option value="RETURNED">Retornada</option> */}
                              </>;
                            }
                            else {
                              return <>
                                <option value="NA">N / A</option>
                              </>;
                            }
                          }()}
                        </select>
                        {
                          crane.activeOrder && crane.activeOrder.status == "CREATED" 
                            ? function(){
                              let suggestedParts = crane.activeOrder.suggestions.map(suggestion => suggestion.part)
                                .filter(part => part.name.includes("TRAMO"));
                              let chargedParts = crane.activeOrder.shippings.map(shipping => shipping.contents)
                                .map(content => content.filter(part => part.partName.includes("TRAMO")));

                              if(chargedParts.length != 0 || suggestedParts.length != 0)
                                return <div className="mt-1">
                                  <div className="text-dark">Tramos cargados: {chargedParts.length}</div>
                                  <div>Tramos por cargar: {suggestedParts.length - chargedParts.length}</div>
                                </div>;
                            }()
                            : <></>
                          }
                      </div>
                    </div>
                    <div className="col-md-2 p-2 text-center">
                      <div className="d-flex justify-content-center">
                        {function () {
                          if(crane.orderStatus != "IN_BUILDING") return <></>
                          return <select 
                            className="custom-badge-select border-0" 
                            style={mapCraneStatusColor(crane.status)}
                            defaultValue={crane.status} onChange={
                            (e) => onSetStatus(crane, e.target.value)
                            }>
                              {/* <option value="NA">Disponible</option> */}
                              <option value="COMMERCIAL">Comercial</option>
                              <option value="CLOSED">Clausurada</option>
                              <option value="RELOCATED">Reubicación</option>
                              <option value="MOUNTING">Montaje</option>
                              <option value="DISASSEMBLY">Desmontaje</option>
                              <option value="CONSTRUCTION">En obra</option>
                          </select>;
                        }()}
                      </div>
                    </div>
                    <div className="col-md-2 p-2">
                      <div className="row">
                        <div className="col">
                          <a onClick={() => {
                            window.location.href = "/binnacles?crane=" + 
                            crane.series + " / " + crane.model + "" + crane.number
                          }} role="button">
                              <i className="fa fa-clipboard text-warning"></i>
                          </a>
                        </div>
                        <div className="col">
                          <Link to={{pathname: `/${crane.id}/edit`}}>
                            <i className="fa fa-edit"></i>
                          </Link>
                        </div>
                        <div className="col">
                          <a className="text-danger" role="button" onClick={() => {
                            onDelete(crane)
                          }}>
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

CraneList.propTypes = {
  cranes: PropTypes.array,
  statusFilters: PropTypes.object,
  ownerFilters: PropTypes.object,
  pageNum: PropTypes.number,
  totalPages: PropTypes.number,
  onClickPage: PropTypes.func,
  onClickBinnacles: PropTypes.func,
  onDelete: PropTypes.func,
  onSetStatus: PropTypes.func,
  onSetOrderStatus: PropTypes.func
};

export default CraneList;