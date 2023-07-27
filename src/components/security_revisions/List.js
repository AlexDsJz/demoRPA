import React, { useState } from "react";
import { useQuery } from "seed/gql";
import { usePagination, useDelete } from "seed/gql";
import { Loading } from "seed/helpers";
import { usePut } from "seed/api";
import { DELETE_SECURITY_REVISION } from "seed/gql/queries";
import View from "components/security_revisions/List.view";
import { formatFilters, formatSearchFilters } from "components/utils/filters";
import PropTypes from "prop-types";

const SecurityRevisionList = ({ search, showOnlyActiveSecurityRevisions }) => {

  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);

  const securityRevisionQuery =`
  {
    securityRevisionPagination {
      totalPages
      securityRevisions {
        type
        createdAt
        status
        order {
          buildingName
          crane {
            model
            craneId
            series
            number
          }
        }
      }
    }
  }
  `;

  const reqActiveSecurityRevisions = usePagination(securityRevisionQuery,
    pageNum,
    pageSize,
    formatFilters([
      "active=true",
      formatSearchFilters(search, ["order.crane.series", "order.crane.model"])
    ]),
    {"orderBy": "-id"}
  );

  const reqSecurityRevisions = usePagination(securityRevisionQuery,
    pageNum,
    pageSize,
    formatFilters([
      formatSearchFilters(search, ["order.crane.series", "order.crane.model"])
    ]),
    {"orderBy": "-id"}
  );

  const [ callDelete, reqDelete ] = useDelete(DELETE_SECURITY_REVISION, {
    onCompleted: () => {}
  });

  const useGetActiveSecurityRevisionsExist = (orderId) => {

    const qSecurityRevisionsOfOrder = useQuery(`
    {
      securityRevisions {
        id
      }
    }`, "order.id=" + orderId + " AND active=true")

    const securityRevisions = qSecurityRevisionsOfOrder.data.securityRevisions

    if (securityRevisions != undefined)
      return securityRevisions.length ?? securityRevisions.length > 0

  };

  const [callSet, qSet] = usePut("/security_revisions", {
    onCompleted: () =>
      window.location.href = "/security_revisions"
  });

  if (reqActiveSecurityRevisions.loading || reqSecurityRevisions.loading) return <Loading />;
  if (reqActiveSecurityRevisions.error || reqSecurityRevisions.error) return "Error";

  const { securityRevisions = [], totalPages = 0 } = showOnlyActiveSecurityRevisions
    ? reqActiveSecurityRevisions.data.securityRevisionPagination
    : reqSecurityRevisions.data.securityRevisionPagination;

  const updateStatus = (maintenanceId, currentStatus) => {

    let newStatus;

    if (currentStatus == "ACTIVE")
      newStatus = "FINISHED"
    else if (currentStatus == "FINISHED")
      newStatus = "ACTIVE"

    let result = {
      id: maintenanceId,
      status: newStatus
    }

    callSet(result);

  }

  const redirectToCategories = (maintenanceId) =>
    window.location.href = "/maintenances/categories/" + maintenanceId;

  const redirectToResponsibles = (maintenanceId) =>
    window.location.href  = "/maintenances/responsibles/" + maintenanceId;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  const deleteSecurityRevision = (securityId) => {
    let confirm = window.confirm("¿Está seguro de eliminar la revisión? Se eliminarán los, " 
      + "contenidos y evidencias que pertenezcan a esta revisión.");
    if(confirm)
      callDelete({ id: securityId });
  } 


  return <View
    securityRevisions={securityRevisions}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
    deleteSecurityRevision={deleteSecurityRevision}
    activeSecurityRevisionExist={useGetActiveSecurityRevisionsExist}
    updateStatus={updateStatus}
    redirectToCategories={redirectToCategories}
    redirectToResponsibles={redirectToResponsibles}
  />;

}

SecurityRevisionList.propTypes = {
  search: PropTypes.string,
  showOnlyActiveSecurityRevisions: PropTypes.bool
};

export default SecurityRevisionList;