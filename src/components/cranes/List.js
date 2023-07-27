import React, { useState } from "react";
import PropTypes from "prop-types";
import { usePagination, useDelete, useSet } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "components/cranes/List.view";
import Error from "components/helpers/Error";
import { 
  formatFilters, 
  formatMultipleEnumFilters, 
  formatSearchFilters, 
  countActiveFilters 
} from "components/utils/filters";
import { DELETE_CRANE, SET_CRANE, SET_ORDER } from "seed/gql/queries";

const CraneList = ({ search, orderStatusFilters, statusFilters, ownerFilters, inUseFilters, qCranes }) => {

  const pageSize = 50;
  const [pageNum, setPageNum] = useState(1);

  const queryParam = 
    "(" +

      (inUseFilters["false"] ? 
        (
          "(" + 
              formatFilters([
                formatMultipleEnumFilters([
                  [ownerFilters, "owner"],
                ]),
                formatSearchFilters(search, ["series", "model"])
              ])
              + " AND (inUse=false)"
          + ")"
        ) : "")

      + (
        orderStatusFilters["CREATED"] ? (
          " OR (" + 
              formatFilters([
                formatMultipleEnumFilters([
                  [ownerFilters, "owner"],
                ]),
                formatSearchFilters(search, ["series", "model"])
              ])
              + " AND (orders.status=CREATED)"
          + ")"
        ) : ""
      )

      + (orderStatusFilters["IN_BUILDING"] && countActiveFilters(statusFilters) ? (
        " OR (" +
          formatFilters([
            formatMultipleEnumFilters([
              [ownerFilters, "owner"],
              [statusFilters, "status"],
            ]),
            formatSearchFilters(search, ["series", "model"])
          ])
          + " AND (orders.status=IN_BUILDING)"
        + ")"
      ) : "")

    + ")"
  ;

  const reqCranes = usePagination(
    `{
      cranePagination { 
        totalPages
        cranes {
          craneId
          model
          number
          series
          inUse
          owner
          status
          orders {
            buildingName
            status
            suggestions {
              part {
                partId
                name
              }
            }
            shippings {
              contents {
                partId
                partName
              }
            }
          }
        }
      }
    }`,
    pageNum,
    pageSize,
    queryParam,
    {orderBy: "owner"}
  );

  const [callSetCrane, reqSetCrane] = useSet(SET_CRANE, {
    onCompleted: () => {
      setPageNum(pageNum);
      reqCranes.refetch();
      qCranes.refetch();
    }
  });

  const [callDelete, reqDelete] = useDelete(DELETE_CRANE, {
    onCompleted: () => {
      setPageNum(pageNum);
      reqCranes.refetch();
      qCranes.refetch();
    }
  });

  const [callSetOrder, reqSetOrder] = useSet(SET_ORDER, {
    onCompleted: () => {
      setPageNum(pageNum);
      reqCranes.refetch();
      qCranes.refetch();
    }
  });

  if (reqCranes.loading) return <Loading />;
  if (reqCranes.error) return <Error />;

  const { cranes = [], totalPages = 0 } = reqCranes.data.cranePagination;

  if(totalPages != 0 && pageNum > totalPages) 
    setPageNum(totalPages);

  const onSetStatus = (crane, status) => {

    if(status == "NA") {

      let activeOrders = crane.orders.filter(x => x.status != "FINISHED");

      if(activeOrders.length > 0) {

        let confirm = window.confirm("¿Está seguro de poner la grúa en estado N/A?" + 
          " se finalizará la orden activa");
        if(!confirm) return false;

        // We select activeOrders[0] because we only want to update the first order (the current one)
        if(activeOrders.length > 0) callSetOrder({id: parseInt(activeOrders[0].id), status: "FINISHED"});

      }

      callSetCrane({id: crane.id, inUse: false, status: "NA"});

    }
    else {

      callSetCrane({id: crane.id, status: status});
      return true;
      
    }

    return false;

  };

  const onSetOrderStatus = (crane, prevStatus, status) => {
    
    if(crane.orders.length == 0 && prevStatus == "FINISHED" && status != "FINISHED") {
      alert("No es posible cambiar el estado de una grúa si no tiene órdenes activas");
      return false;
    }

    let activeOrders = crane.orders.filter(x => x.status != "FINISHED");

    if(status == "FINISHED")
      callSetCrane({id: parseInt(crane.id), inUse: false, status: "NA"}); 
    else 
      callSetCrane({id: parseInt(crane.id), inUse: true, status: "CONSTRUCTION"}); 

    // We select activeOrders[0] because we only want to update the first order (the current one)
    callSetOrder({id: parseInt(activeOrders[0].id), status: status});

    return true;
    
  };

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  const onDelete = (order) => {
    let confirm = window.confirm("¿Está seguro de eliminar la grúa? todas las órdenes, empaques, " 
      + "contenidos y evidencias serán eliminados.");
    if (confirm) {
      callDelete({ id: order.id });
    }
  };

  let cleanedCranes = cranes.map(crane => {

    let tempCrane = {...crane};
    let activeOrders = crane.orders.filter(x => x.status != "FINISHED");
    let activeOrder = activeOrders.length > 0 ? activeOrders[0] : null;
    let orderStatus = activeOrder ? activeOrder.status : "FINISHED";

    if(crane.owner != "GROKE") orderStatus = "NA";

    tempCrane.orderStatus = orderStatus;
    tempCrane.activeOrder = activeOrder;

    return tempCrane;

  })

  return <View
    cranes={cleanedCranes}
    onSetOrderStatus={onSetOrderStatus}
    statusFilters={statusFilters}
    ownerFilters={ownerFilters}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
    onDelete={onDelete}
    onSetStatus={onSetStatus}
  />;
  
}

CraneList.propTypes = {
  search: PropTypes.string,
  statusFilters: PropTypes.object,
  ownerFilters: PropTypes.object,
  inUseFilters: PropTypes.object,
  orderStatusFilters: PropTypes.object,
  qCranes: PropTypes.object
};

export default CraneList;