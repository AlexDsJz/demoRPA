/*
__Seed builder__
  (Read_only) Example component
  Be careful copying content
*/

import React, { useState } from "react";
import { usePagination } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "seed/examples/components/items/List.view";

function ItemList() {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqItems = usePagination(`
  {
    itemPagination {
      totalPages
      items {
        name
        description
        reference
        comment
        number
        quantity
        manualPage
        createdAt
        part { }
      }
    }
  }`, pageNum, pageSize);

  if (reqItems.loading) return <Loading />;
  if (reqItems.error) return "Error";
  const { items = [], totalPages = 0 } = reqItems.data.itemPagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    items={items}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

ItemList.propTypes = {};

export default ItemList;