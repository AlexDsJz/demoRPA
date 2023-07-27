import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Modal from "components/helpers/Modal";

const CheckEvidencesView = ({ evidences, setSelectedEvidences }) => {
  return <Modal 
    width={800}
    height={500}
    onClose={() => setSelectedEvidences(null)}
    component={() => <div class="card card-body shadow-none">
      <h3 className="mb-3 text-center">Evidencias</h3>
      <div className="d-flex align-items-center w-100 mb-2 justify-content-center" style={{ overflowX: "auto" }}>
        {
          evidences.map((evidence, index) => (
            <div key={index} className="d-flex flex-column align-items-center mr-3">
              <a href={evidence.url} target="_blank" rel="noopener noreferrer">
                {function () {
                  if (evidence.url.includes(".mp4"))
                    return <video
                      style={{ height: "12em" }}
                      controls={true} 
                    >
                      <source src={evidence.url} type="video/mp4" />
                    </video>
                  else
                    return <img
                      style={{ maxHeight: "12em" }}
                      className="img-fluid mx-0"
                      src={evidence.url}
                      alt={"Evidencia " + index}
                    />
                }()}
              </a>
              <b className="mt-1">
                {moment.utc(evidence.createdAt).local().format("DD/MM/YYYY HH:mm")}
              </b>
            </div>
          ))
        }
        {
          evidences.length === 0 &&
          <div>
            No hay evidencias
          </div>
        }
      </div>
    </div>
  }/>;
};

CheckEvidencesView.propTypes = {
    evidences: PropTypes.array,
    setSelectedEvidences: PropTypes.func
};

export default CheckEvidencesView;