import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "seed/gql";
import { Loading } from "seed/helpers";
import View from "components/arris/arris_reports/EvidencesFailure.view";

function EvidencesFailure(props) {
  const { failure_id } = props;

  const qEvidences = useQuery(
    `{
        arrisFailures {
            description
            solution
            status
            evidences {
                url
            }
        }
    }`,
    "id=" + failure_id
  );

  if (qEvidences.loading) return <Loading />;
  if (qEvidences.error) return "Error";

  const { arrisFailures = [] } = qEvidences.data;

  if (arrisFailures.length == 0) window.location.href = "/ariss/failures_report";

  return <View arrisFailures={arrisFailures} />;
}

EvidencesFailure.propTypes = {
  failure_id: PropTypes.number,
  arrisFailures: PropTypes.array
};

export default EvidencesFailure;
