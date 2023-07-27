import React, { useState } from "react";
import PropTypes from "prop-types";
import { usePagination, useDelete } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "components/arris/List.view";
import { SET_ARRIS_OPERATOR } from "seed/gql/queries";
import Error from "components/helpers/Error";
import { formatFilters, formatSearchFilters } from "components/utils/filters";
import { groupBy } from "components/utils/filters";

const OperationList = ({ search }) => {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);

  const reqOperations = usePagination(
    `{
      arrisOperatorPagination {
        totalPages 
        arrisOperators {
          active
          turn
          user{
            firstName
            lastName
            rol
          }
          order {
            crane{
              craneId
              model
              number
              series
            }
            buildingName
          }
          createdAt
        }
      }
    }`,
    pageNum,
    pageSize,
    formatFilters([formatSearchFilters(search, ["order.crane.series", "order.crane.model"]), "active = true"]),
    { orderBy: "-created_at" }
  );

  const [callDelete, reqDelete] = useDelete(SET_ARRIS_OPERATOR, {
    onCompleted: () => setPageNum(pageNum),
  });

  if (reqOperations.loading) return <Loading />;
  if (reqOperations.error || reqDelete.error) return <Error />;

  const { arrisOperators = [], totalPages = 0 } = reqOperations.data.arrisOperatorPagination;

  const onClickPage = (pageNum) => 
    setPageNum(pageNum);

  const onClickDelete = (ids) => {
    for(let i = 0; i < ids.length; i++)
      callDelete({ id: ids[i], active: false });
  };

  const [operatorsGrouped, groups] = groupBy(
    arrisOperators, 
    arrisOperator => arrisOperator.order.crane.craneId
  );

  return <View
    operationsGrouped={operatorsGrouped}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
    onClickDelete={onClickDelete}
  />;

}

OperationList.propTypes = {
  search: PropTypes.string,
  location: PropTypes.object,
};

export default OperationList;