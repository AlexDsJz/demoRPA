import React, { useState } from "react";
import PropTypes from "prop-types";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import { usePost } from "seed/api";
import View from "components/shippings/List.view";
import Error from "components/helpers/Error";
import { formatEnumFilters, formatFilters, formatSearchFilters } from "components/utils/filters";

const ShippingList = ({ search, statusFilters, orderDate }) => {

  const pageSize = 50;
  const [pageNum, setPageNum] = useState(1);
  const reqShippings = usePagination(`
  {
    shippingPagination {
      totalPages 
      shippings {
        type
        truckPlate
        transportCompany
        contents {
          suggestRef
          partId
          partName
          quantity
          images {
            id
          }
          items
          um
          manual
          elevationNumber
        }
        order {
          suggestions {
            elevationNumber
            shipping {
              id
            }
            quantity
            part {
              partId
              name
              um
              images {
                id
              }
              items {
                name
                description
                comment
                quantity
              }
            }
          }
          crane {
            id
            craneId
            model
            number
            series
          }
          clientName
          buildingStreet
          buildingCity
          buildingState
        }
        transportPlate
        transportCarrierName
        transportPhone
        transportOtherPhone
        deliveryDate
        createdAt
        status
      }
    }
  }`, 
  pageNum, 
  pageSize,
  formatFilters([
    formatEnumFilters(statusFilters, "status"),
    formatSearchFilters(search, ["order.crane.series", "order.crane.model"])
  ]),
  {orderBy: orderDate + "created_at"});

  const [callPost, qPost] = usePost("/shippings/delete_shipping", {
    onCompleted: (data) => {
      window.location.reload();  
    }
  });

  const [callSetStatusShipping, reqSetStatusShipping] = usePost("/shippings/update_status", {
    onCompleted: () => {
      setPageNum(pageNum)
      reqShippings.refetch();
    }
  });

  if(reqShippings.loading) return <Loading />;
  if(reqShippings.error || reqSetStatusShipping.error) return <Error />;

  const { shippings = [], totalPages = 0 } = reqShippings.data.shippingPagination;

  if(totalPages != 0 && pageNum > totalPages) 
    setPageNum(totalPages);

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  const onDelete = (shippings) => {

    let confirm = window.confirm("¿Está seguro de eliminar el empaque? todos los contenidos" 
      + " y evidencias serán eliminados.");

    if(confirm)
      callPost({shipping_id: shippings.id});

  };

  const onSetStatus = (shipping, status) =>
    callSetStatusShipping({shipping_id: shipping.id, status: status});

  return <View
    shippings={shippings}
    statusFilters={statusFilters}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
    onDelete={onDelete}
    onSetStatus={onSetStatus}
  />;
  
}

ShippingList.propTypes = {
  search: PropTypes.string,
  statusFilters: PropTypes.string,
  orderDate: PropTypes.string
};

export default ShippingList;