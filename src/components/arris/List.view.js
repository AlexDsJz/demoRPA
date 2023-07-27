import React from "react";
import PropTypes from "prop-types";
import PaginationFooter from "components/helpers/PaginationFooter";
import NotResults from "components/helpers/NotResults";
import { Link } from "react-router-dom";
import { groupBy } from "components/utils/filters";
import { mapArrisOperatorTurn, mapArrisOperatorTurnColor } from "components/utils/enum_mapper";

const OperationList = ({
  operationsGrouped = [],
  pageNum = 1,
  totalPages = 0,
  onClickPage = () => { },
  onClickDelete = () => { },
}) =>
  <>
    {operationsGrouped.length == 0
      ? <NotResults />
      : <>
        <div style={{ height: "60vh", overflowY: "auto", overflowX: "hidden" }}>
          {operationsGrouped.map((operations, index) => 
            <div className="border mx-1" key={index}>
              {operations.filter(operation => operation.active).length > 0 
                ? <>   
                    {/* 
                      In order to get the crane information and group operators, 
                      we need to get the first element of the array
                    */}
                  <div className="d-flex align-items-center">
                    <div className="col-md-10">
                      <b>{operations[0].order.crane.series}</b>
                      {" / " + operations[0].order.crane.model + "" + operations[0].order.crane.number}
                    </div>
                    <div className="col-md-1 p-2">
                      <div className="row">
                        <div className="col">
                          <Link to={{
                            pathname: `/edit`,  
                            state: {
                              operators: groupBy(operations.filter(operator => operator.active), 
                                operation => operation.turn)[1],
                              allOperators: operations,
                              order: operations[0].order,
                            }
                          }}>
                            <i className="fa fa-pen text-primary" role="button"/>
                          </Link>
                        </div>
                        <div className="col">
                          <i className="fa fa-trash text-danger" role="button"
                            onClick={() => onClickDelete(operations.map((operation) => operation.id))}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row border">
                    <div className="col-md-12">
                      <div className="mt-0 pt-0">
                        {operations.map((operation) => 
                          operation.active 
                          ? <div className="row mx-1 d-flex align-items-center" key={operation.id}>
                              <div className="col-md-2 p-2"></div>
                              <div className="col-md-3 p-2">
                                {operation.user.firstName + " " + operation.user.lastName}
                              </div>
                              <div className="col-md-2 p-2">{operation.order.buildingName}</div>
                              <div className="col-md-2 p-2">
                                <div 
                                  className="custom-badge"
                                  style={mapArrisOperatorTurnColor(operation.turn)}
                                >
                                  {mapArrisOperatorTurn(operation.turn)}
                                </div>
                              </div>
                              <div className="col-md-2 p-2">
                                <Link 
                                  to={{ pathname: `/` + operation.id + `/binnacle` }} 
                                  className="btn btn-secondary btn-sm"
                                >
                                  Ver registros
                                </Link>
                              </div>
                            </div> 
                          : null
                        )}
                      </div>
                    </div>
                  </div>
                </> 
                : null
              }
            </div>
          )}
        </div>
        <PaginationFooter
          pageNum={pageNum}
          totalPages={totalPages}
          onClickPage={onClickPage}
        />
      </>
    }
  </>;

OperationList.propTypes = {
  operationsGrouped: PropTypes.array,
  pageNum: PropTypes.number,
  totalPages: PropTypes.number,
  onClickPage: PropTypes.func,
  onClickDelete: PropTypes.func,
};

export default OperationList;