import React from "react";
import PropTypes from "prop-types";
import { useDetail } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "components/security_revisions/Details.view";

const SecurityRevisionDetails = ({ securityRevisionId, onCompleted = () => null, onError = () => null }) => {

  const [selectedEvidences, setSelectedEvidences] = React.useState(null);
  const contDesv = [];

  const reqSecurityRevision = useDetail(`{
    securityRevision {
      securityChecks {
        deviationValue
        value
        isDeviation
        findings
        corrections
        scpLiberation
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
  }`, securityRevisionId);

  if (reqSecurityRevision.loading) return <Loading />;
  if (reqSecurityRevision.error) return "Error";
  
  const revision = reqSecurityRevision.data.securityRevision;
  console.log(revision);
  for(let i = 0; i < revision.securityChecks.length; i++){
    var value = revision.securityChecks[i].value
    var subStrings = value.split("|")
    for(let j = 0; j < subStrings.length; j++){  
      var subValue = subStrings[j].trim();
      try{
        var parcedValue = JSON.parse(subValue);
        contDesv.push(parcedValue);
      } 
      catch(e){
        console.log("")
      }
    }
  }

  let categoryGroupsObject = {};
  let categoryGroups = [];

  revision.securityChecks.forEach(check => {
    
    let id = check.securityCheckType.securityCategory.id;
    if(categoryGroupsObject[id] == undefined)
    categoryGroupsObject[id] = {
        name: check.securityCheckType.securityCategory.name,
        partId: check.securityCheckType.securityCategory.partId,
        checks: []
      };

      categoryGroupsObject[id].checks.push(check);

  });

  Object.keys(categoryGroupsObject).forEach(key => {
    categoryGroupsObject[key].checks.sort((a, b) => a.securityCheckType.number - b.securityCheckType.number);
    categoryGroups.push(categoryGroupsObject[key]);
  });


  return <View
    revision={categoryGroups}
    contDesv={contDesv}
    selectedEvidences={selectedEvidences}
    setSelectedEvidences={setSelectedEvidences}
  />;

}

SecurityRevisionDetails.propTypes = {
  securityRevisionId: PropTypes.string.isRequired,
  onCompleted: PropTypes.func,
  onError: PropTypes.func
};

export default SecurityRevisionDetails;