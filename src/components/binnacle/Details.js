import React from "react";
import PropTypes from "prop-types";
import { useDetail } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "components/binnacle/Details.view";

const OperationDetails = ({ shippingId, onCompleted = () => null, onError = () => null }) => {

  const [selectedEvidences, setSelectedEvidences] = React.useState(null);

  const reqOperation = useDetail(`{
    shipping {
      deliveryDate
      transportPlate
      transportCarrierName
      order {
        clientName
        buildingStreet
        buildingCity
        buildingState
        securityRevisions {
          securityChecks {
            deviationValue
            value
            isDeviation
            files {
              id
              name
              url
            }
            securityCheckType {
              number
              name
              securityCategory {
                name
                partId
              }
            }
          }
        }
      }
      evidences {
        createdAt
        evidenceFile {
          url
        }
        user {
          firstName
          lastName
          rol
          email
        }
      }
    }
  }`, shippingId, {orderBy: "-created_at"});

  if (reqOperation.loading) return <Loading />;
  if (reqOperation.error) return "Error";

  const { shipping = {} } = reqOperation.data;

  const groupRevisions = () => {
    if (!shipping || !shipping.order || !shipping.order.securityRevisions) 
      return null;

    const revisions = shipping?.order?.securityRevisions?.map((revision) => {
  
      const categoryGroupsObject = {};
      const categoryGroups = [];
  
      revision.securityChecks.forEach((check) => {
        if (!check.securityCheckType || !check.securityCheckType.securityCategory) return;
  
        const id = check.securityCheckType.securityCategory.id;
        if (categoryGroupsObject[id] === undefined) {
          categoryGroupsObject[id] = {
            name: check.securityCheckType.securityCategory.name,
            partId: check.securityCheckType.securityCategory.partId,
            checks: [],
          };
        }
  
        categoryGroupsObject[id].checks.push(check);
      });
  
      Object.keys(categoryGroupsObject).forEach((key) => {
        categoryGroupsObject[key].checks.sort((a, b) => a.securityCheckType.number - b.securityCheckType.number);
        categoryGroups.push(categoryGroupsObject[key]);
      });
  
      return categoryGroups;
    });
    console.log(revisions)
    return revisions;
  };

  const groupEvidences = () => {

    let grouped = {
      "QUALITY_CONTROL": {},
      "ADMIN": {},
      "BUILDING_OPERATOR": {},
      "WORKSHOP_OPERATOR": {}
    };

    shipping.evidences.forEach(evidence => {
      if(grouped[evidence.user.rol][evidence.user.email] == undefined)
        grouped[evidence.user.rol][evidence.user.email] = [];
      grouped[evidence.user.rol][evidence.user.email].push(evidence);
    });

    return grouped;

  }

  return <View
    shipping={shipping}
    groupEvidences={groupEvidences}
    groupRevisions={groupRevisions}
    selectedEvidences={selectedEvidences}
    setSelectedEvidences={setSelectedEvidences}
  />;

}

OperationDetails.propTypes = {
  shippingId: PropTypes.string.isRequired,
  operationId: PropTypes.number.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default OperationDetails;