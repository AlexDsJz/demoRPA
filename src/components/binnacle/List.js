import React from "react";
import PropTypes from "prop-types";
import { Loading } from "seed/helpers";
import View from "components/binnacle/List.view";
import { useQuery } from "seed/gql";

const OperationList = ({ craneId }) => {

  const craneParts = craneId ? craneId.split("/") : [];
  const craneSeries = craneParts.length > 0 ? craneParts[0].trim() : "";

  const reqOrders = useQuery(`{
    orders {
      status
      clientName
      createdAt
      crane {
        craneId
        model
        number
        series
      }
      shippings {
        transportCarrierName
        transportPlate
        deliveryDate
        status
        contents { }
      }
    }
  }`, craneSeries != "" ? "crane.series=" + craneSeries : "", {orderBy: "-created_at"});

  if(reqOrders.loading) return <Loading />;

  const error = reqOrders.error;
  let { orders = [] } = reqOrders.data;

  if(craneSeries == "")
    orders = [...orders].filter(v => v.shippings.length > 0)

  return <View
    orders={orders}
    error={error}
  />;

}

OperationList.propTypes = {
  craneId: PropTypes.string,
};

export default OperationList;