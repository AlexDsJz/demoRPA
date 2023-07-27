import React from "react";
import PropTypes from "prop-types";

class PaginationFooter extends React.Component {

  render() {

    const { pageNum, totalPages, onClickPage } = this.props;
    
    return <>
      <hr/>
      <nav class="mt-3 float-right">
        <ul class="pagination">
          <li onClick={() => onClickPage(pageNum - 1)} class="page-item" 
            style={{ visibility: pageNum > 1 ? "visible" : "hidden" }}>
            <a class="page-link" aria-label="Prev">
              <span aria-hidden="true">«</span><span class="sr-only">Prev</span>
            </a>
          </li>
          {
            Array(totalPages).fill(0).map((ignore, idx) =>
              <li onClick={() => onClickPage(idx + 1)} key={idx} 
                class={"page-item " + (idx == pageNum - 1 ? "page-active" : "")}>
                <a class="bnt btn-primary px-3 py-2" role="button">{idx + 1}</a>
              </li>
            )
          }
          <li onClick={() => onClickPage(pageNum + 1)} class="page-item" 
            style={{ visibility: pageNum <= totalPages - 1 ? "visible" : "hidden" }}>
            <a class="page-link" aria-label="Sig">
              <span aria-hidden="true">»</span><span class="sr-only">Sig</span>
            </a>
          </li>
        </ul>
      </nav>
    </>;

  }

}

PaginationFooter.propTypes = {
  pageNum: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onClickPage: PropTypes.func.isRequired
};

export default PaginationFooter;