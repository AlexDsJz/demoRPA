import React from "react";
import PropTypes from "prop-types";
import View from "components/binnacle/CheckEvidences.view";

const CheckEvidences = ({ evidences, setSelectedEvidences }) => {
    return <View
        evidences={evidences}
        setSelectedEvidences={setSelectedEvidences}
    />;
}

CheckEvidences.propTypes = {
    evidences: PropTypes.array,
    setSelectedEvidences: PropTypes.func
};

export default CheckEvidences;