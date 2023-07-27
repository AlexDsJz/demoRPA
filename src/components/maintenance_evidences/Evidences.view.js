import React from "react";
import PropTypes from "prop-types";

const EvidencesView = ({ maintenanceFiles, displayFile }) =>
  <div class="card" style={{backgroundColor:"#DDE6E6"}}>
    <div class="row justify-content-center">
      <div class="col-lg-6 text-center">
      </div>
    </div>
    <div class="row ml-5">
      <div class="">
        {
          maintenanceFiles.length >= 1 
            ? maintenanceFiles.map((maintenanceFile, index) =>
                <div key={maintenanceFile.id}>
                  {displayFile(maintenanceFile.file.url, maintenanceFile.file.name, index + 1)}
                </div>
              )
            : <div class="row justify-content-center" style={{height:"500px"}}>
                <div class="col text-center align-self-center px-4">
                  <h3>No se han agregado evidencias de mantenimiento para esta categoría</h3>
                </div>
              </div>
        }
      </div>
    </div>
  </div>;

EvidencesView.propTypes = {
  maintenanceFiles: PropTypes.array.isRequired,
  displayFile: PropTypes.func.isRequired
};

export default EvidencesView;