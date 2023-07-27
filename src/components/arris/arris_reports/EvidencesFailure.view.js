import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { mapArrisFailureStatus, mapArrisFailureStatusColor } from "components/utils/enum_mapper";

const EvidencesFailure = ({ arrisFailures = [] }) => (
    <div className="card">
        <div className="card-header">
            <h4>Información enviada</h4>
        </div>
        <div className="card-body">
            <div className="row d-flex mt-3">
                <div className="col-md-2 mt-1">
                    Detalles de la falla
                </div>
                <div className="col-md-10">
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col" className="w-30 text-center">Falla</th>
                            <th scope="col" className="w-30 text-center">Solución</th>
                            <th scope="col" className="w-30 text-center">Estado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {arrisFailures.map((failure, index) =>
                            <tr key={index} className="text-center">
                                <td>{failure.description}</td>
                                <td>{failure.solution.length > 0 ? failure.solution : "Sin solución"}</td>
                                <td style={{ color: mapArrisFailureStatusColor(failure.status) }}>
                                    {mapArrisFailureStatus(failure.status)}
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-2 mt-1">
                    Evidencias de fallas
                </div>
                <div className="col-md-10">
                    <div class="list-group">
                        {arrisFailures.map((failure, idx) => (
                        <div
                            class="list-group-item flex-column align-items-start"
                            key={idx}
                        >
                            {failure.evidences.length > 0 ? (
                            <>
                                <div
                                class="d-flex w-100 justify-content-between"
                                data-toggle="collapse"
                                href={`#details-failures`}
                                role="button"
                                aria-expanded="false"
                                aria-controls={`details-failures`}
                                >
                                <span
                                    class="badge badge-primary badge-pill"
                                    style={{ fontSize: "14px" }}
                                >
                                    {failure.evidences.length}
                                </span>
                                </div>
                                <div class="collapse my-3" id={`details-failures`}>
                                <div
                                    class="card card-body shadow-none"
                                    style={{ overflowX: "auto" }}
                                >
                                    <div className="d-flex mb-2" style={{ maxWidth: "auto" }}>
                                    <>
                                        {failure.evidences.map((evidence, index) => (
                                        <div
                                            className="d-flex flex-column align-items-center mr-3"
                                            key={index}
                                            style={{ maxHeight: "auto" }}
                                        >
                                            <div className="ml-2">
                                            <a
                                                href={evidence.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {(function () {
                                                if (evidence.url.includes(".mp4"))
                                                    return (
                                                    <video
                                                        style={{ height: "12em" }}
                                                        controls={true}
                                                    >
                                                        <source
                                                        src={evidence.url}
                                                        type="video/mp4"
                                                        />
                                                    </video>
                                                    );
                                                else
                                                    return (
                                                    <img
                                                        style={{ maxHeight: "12em" }}
                                                        className="img-fluid mx-0"
                                                        src={evidence.url}
                                                        alt={"Evidencia " + index}
                                                    />
                                                    );
                                                })()}
                                            </a>
                                            <b className="mt-1">
                                                {moment
                                                .utc(evidence.createdAt)
                                                .local()
                                                .format("DD/MM/YYYY HH:mm")}
                                            </b>
                                            </div>
                                        </div>
                                        ))}
                                    </>
                                    </div>
                                </div>
                                </div>
                            </>
                            ) : (
                                <div className="d-flex w-100 text-center">
                                    No hay evidencias para esta falla
                                </div>
                            )}
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

EvidencesFailure.propTypes = {
  arrisFailures: PropTypes.array,
};

export default EvidencesFailure;
