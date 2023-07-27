import React from "react";
import PropTypes from "prop-types";
import View from "components/maintenance_evidences/Evidences.view";
import { useGet, usePost } from "seed/api";
import { Loading } from "seed/helpers";
import Error from "components/helpers/Error";

const Evidences = ({maintenanceTypeId, props}) => {
  
  if(props == undefined || !("maintenanceId" in props))
    window.location.replace("/maintenances")

  const qMaintenanceEvidences = useGet("/maintenance_evidences/get_maintenance_evidences", 
    {"maintenance_id": props.maintenanceId, "maintenance_type_id": maintenanceTypeId});

  if (qMaintenanceEvidences.loading) return <Loading />;
  if (qMaintenanceEvidences.error) return <Error />;
  
  const maintenanceFiles = qMaintenanceEvidences.data;

  const displayFile = (fileUrl, fileName, noOfElement) => {

    const imageExtensions = ["jpeg", "jpg", "png", "heic"]

    let splittedPath = fileUrl.split(".")

    let fileExtension = splittedPath[splittedPath.length - 1].toLowerCase()

    if(imageExtensions.includes(fileExtension)) {
      return <div class="row justify-content-center my-2">
        <div class="col-6">
          <div class="row">
            <div class="col">
              <h4>Imagen {noOfElement + "." + fileExtension}</h4>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col text-center">
              <img src={fileUrl} alt={fileName} height="400px"/>
            </div>
          </div>
        </div>
      </div>
    } 
    else {
      return <div class="row justify-content-center my-2">
        <div class="col-6">
          <div class="row">
            <div class="col">
              <h4>Video {noOfElement + "." + fileExtension}</h4>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-6 text-center">
              <video height="400px" controls style={{objectFit: "fill"}} >
                <source src={fileUrl} type={"video/" + fileExtension}/>
              </video>
            </div>
          </div>
        </div>
      </div>
    }

  }

  return <View 
    maintenanceFiles={maintenanceFiles}
    displayFile={displayFile}
  />;

}

Evidences.propTypes = {
  maintenanceTypeId: PropTypes.string.isRequired,
  props: PropTypes.object.isRequired,
  maintenanceId: PropTypes.number.isRequired
};

export default Evidences;