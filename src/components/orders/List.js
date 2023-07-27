import React, { useState } from "react";
import PropTypes from "prop-types";
import { usePagination, useDelete, useSet } from "seed/gql";
import { DELETE_ORDER, SET_CRANE } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "components/orders/List.view";
import Error from "components/helpers/Error";
import { formatEnumFilters, formatFilters, formatSearchFilters } from "components/utils/filters";
import { usePost } from "seed/api";

const OrderList = ({ search, statusFilters, orderDate }) => {

  const rol = sessionStorage.getItem("rol");
  const id = sessionStorage.getItem("id");
  const pageSize = 50;
  const [pageNum, setPageNum] = useState(1);

  let filters = formatFilters([
    formatEnumFilters(statusFilters, "status"),
    formatSearchFilters(search, ["crane.series", "crane.model", "modelReference"])
  ])

  if (rol == "COMMERCIAL") {
    filters = "(" + filters + " AND applicant.id= " + id + ")";
  }

  const reqOrders = usePagination(`{
    orderPagination {
      totalPages
      orders {
        crane {
          craneId
          model
          number
          series
        }
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
        requestingTrader
        clientName
        buildingName
        modelReference
        buildingAddress
        configuration
        elevations
        createdAt
        updatedAt
        status
      }
    }
  }`,
    pageNum,
    pageSize,
    filters,
    { orderBy: orderDate + "created_at" });

  const [callDelete, reqDelete] = useDelete(DELETE_ORDER, {
    onCompleted: () => {
      setPageNum(pageNum);
      reqOrders.refetch();
    }
  });

  const [callSetCrane, reqSet] = useSet(SET_CRANE, {
    onCompleted: () => {
      setPageNum(pageNum);
      reqOrders.refetch();
    }
  });

  const [callSetStatusOrder, reqSetStatusOrder] = usePost("/orders/update_status", {
    onCompleted: () => {
      setPageNum(pageNum);
      reqOrders.refetch();
    }
  });

  if (reqOrders.loading) return <Loading />;
  if (reqOrders.error || reqDelete.error || reqSet.error || reqSetStatusOrder.error) return <Error />;

  const { totalPages, orders } = reqOrders.data.orderPagination;

  if (totalPages != 0 && pageNum > totalPages)
    setPageNum(totalPages);

  const onDelete = (order) => {
    console.log("order", order);
    let confirm = window.confirm("¿Está seguro de eliminar la orden? todos los empaques, "
      + "contenidos y evidencias serán eliminados.");
    if (confirm) {
      console.log("SIUU");
      callSetCrane({ id: order.crane.id, inUse: false });
      callDelete({ id: order.id });
    }
  };

  const onSetStatus = (order, status) => {

    if (status == "FINISHED")
      callSetCrane({ id: order.crane.id, inUse: false, status: "NA" });
    else
      callSetCrane({ id: order.crane.id, inUse: true });

    callSetStatusOrder({ order: order.id, status: status });

  };

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  const getTransportMessage = (order) => {

    if (order.status != "CHARGING" && order.status != "RETURNED")
      return <></>;

    let transportMessage = <></>;

    let suggestedParts = order.suggestions.map(suggestion => suggestion.part)
      .filter(part => part.name.includes("TRAMO"));
    let chargedParts = order.shippings.map(shipping => shipping.contents)
      .map(content => content.filter(part => part.partName.includes("TRAMO")));

    if (chargedParts.length != 0 || suggestedParts.length != 0)
      transportMessage = <div className="mt-1">
        <div className="text-dark">Tramos cargados: {chargedParts.length}</div>
        <div>Tramos por cargar: {suggestedParts.length - chargedParts.length}</div>
      </div>;

    return transportMessage;

  }

  return <View
    orders={orders}
    statusFilters={statusFilters}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
    onDelete={onDelete}
    onSetStatus={onSetStatus}
    getTransportMessage={getTransportMessage}
  />;

}

OrderList.propTypes = {
  search: PropTypes.string,
  statusFilters: PropTypes.object,
  orderDate: PropTypes.string
};

export default OrderList;