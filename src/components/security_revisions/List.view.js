import React from "react";
import PropTypes from "prop-types";
import { PaginationFooter } from "seed/helpers"
import { Typeahead } from "react-bootstrap-typeahead";
import { Link } from "react-router-dom";


const SecurityRevisionListView = ({
  cranes = [],
  searchRef,
  search,
  handleChange,
  securityRevisions,
  pageNum = 1,
  totalPages = 0,
  onClickPage = () => { },
  activeSecurityRevisionExist,
  updateStatus,
  setShowOnlyActiveMaintenances,
  showOnlyActiveMaintenances,
  redirectToCategories,
  redirectToResponsibles,
  deleteSecurityRevision,
}) =>
  <div>

    <div style={{ height: "65vh", overflowY: "auto", overflowX: "hidden" }}>
      {securityRevisions.map((securityRevision, idx) =>
        <>
          {
            securityRevision.order &&
            <div className="row border mx-1 text-reset" key={securityRevision.id}
              style={{ background: idx % 2 == 0 ? "#fff" : "#f5f5f5" }}>

              <div className="col-md-2 p-2 text-center">
                {securityRevision.order.crane.series + " / " + securityRevision.order.crane.model + securityRevision.order.crane.number}
              </div>

              <div className="col-md-3 p-2 text-center">
                {securityRevision.order.buildingName}
              </div>

              <div className="col-md-2 p-2 text-center">
                <div
                  className="custom-badge"
                  style={function () {
                    if (securityRevision.status == "CREATED") return { "backgroundColor": "#38538C" }
                    if (securityRevision.status == "IN_PROCESS") return { "backgroundColor": "#00A3BF" }
                    if (securityRevision.status == "COMPLETED") return { "backgroundColor": "#eb6859" }
                  }()}
                >
                  {function () {
                    if (securityRevision.status == "CREATED")
                      return "Creado";
                    if (securityRevision.status == "IN_PROCESS")
                      return "En proceso";
                    else if (securityRevision.status == "COMPLETED")
                      return "Completado";
                  }()}
                </div>
              </div>
              <div className="col-md-2 p-2 text-center">
                {securityRevision.type == "INITIAL" ? "Inicial" : "Final"}
              </div>
              <div className="col-md-2 p-2 ml-6">
                <div className="row">
                  <Link to={`/${securityRevision.id}`}>
                    <button className="btn-secondary px-3 py-1 ml-2" >
                      Ver evidencias
                    </button>
                  </Link>
                  <div className="col mt-1 ml-4">
                    <a className="text-danger" role="button" 
                      onClick = {() => {deleteSecurityRevision(securityRevision.id)}}>
                      <i className="fa fa-trash"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          }
        </>
      )}
    </div>

    <PaginationFooter pageNum={pageNum} totalPages={totalPages} onClickPage={onClickPage} />

  </div>;

SecurityRevisionListView.propTypes = {
  securityRevisions: PropTypes.array.isRequired,
  pageNum: PropTypes.number,
  totalPages: PropTypes.number,
  onClickPage: PropTypes.func,
  activeSecurityRevisionExist: PropTypes.func,
  updateStatus: PropTypes.func,
  setShowOnlyActiveMaintenances: PropTypes.func,
  showOnlyActiveMaintenances: PropTypes.bool,
  redirectToCategories: PropTypes.func,
  redirectToResponsibles: PropTypes.func,
  cranes: PropTypes.array,
  searchRef: PropTypes.object,
  search: PropTypes.string,
  handleChange: PropTypes.func,
  deleteSecurityRevision: PropTypes.func,
};

export default SecurityRevisionListView;