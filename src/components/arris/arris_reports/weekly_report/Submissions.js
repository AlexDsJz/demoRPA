import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import View from "components/arris/arris_reports/weekly_report/Submissions.view";



const Submissions = ({ selectedReport, setSelectedReport }) => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    let idx = 1;
    let newFiles = [];
    
    selectedReport.evidences.forEach((evidence) => {

      const index = newFiles.findIndex((item) => item.name == evidence.category);

      if (index == -1) {
        newFiles.push({
          id: idx,
          name: evidence.category,
          evidences: [evidence] 
        })

        idx += 1;
      } else {
        newFiles[index].evidences.push(evidence)
      }
    })
    setCategories(newFiles);

  }, [])

  return <View
    categories={categories}
    selectedReport={selectedReport}
    setSelectedReport={setSelectedReport}
  />;
}

Submissions.propTypes = {
  selectedReport: PropTypes.object,
  setSelectedReport: PropTypes.func
};

export default Submissions;