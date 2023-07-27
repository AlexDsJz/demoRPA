/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/orders/List.view";

function OrderList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqOrders = usePagination(`
  {
    orderPagination {
      totalPages
      orders {
        clientName
        buildingName
        buildingStreet
        buildingCity
        buildingState
        buildingAddress
        contactName
        contactPhone
        contactEmail
        feetModel
        diceSize
        requestingTrader
        comments
        modelReference
        craneVersion
        orderVersion
        configuration
        elevations
        mountingDate
        rentPeriod
        elevationsNumber
        transportNumber
        hasPowerLift
        hasCabin
        hasRadioControl
        hasCageMounting
        hasRemoteControl
        boomLength
        towerHeight
        finalHeight
        insuranceResponsable
        forwardingSystem
        status
        feetType
        baseType
        createdAt
        applicant { }
        shipping { }
        crane { }
      }
    }
  }`, pageNum, pageSize);

  if (reqOrders.loading) return <Loading />;
  if (reqOrders.error) return "Error";
  const { orders = [], totalPages = 0 } = reqOrders.data.orderPagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    orders={orders}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

OrderList.propTypes = {};

export default OrderList;