import React from "react";
import PropTypes from "prop-types";

const ManualsView = ({ data }) => (

  <div class="content container-fluid p-7" style={{ height: "95vh", overflowY: "auto" }}>

    {/* Header */}
    <div class="page-header pt-4">
      <div class="row align-items-end">
        <div class="col-sm">
          <h1 class="page-header-title">Manuales de grúas</h1>
        </div>
      </div>
    </div>

    {
      data.sort((a, b) => {
        const categoryA = a.category.toUpperCase();
        const categoryB = b.category.toUpperCase();
        if (categoryA < categoryB) return -1;
        if (categoryA > categoryB) return 1;
        return 0;
      }).map((item) => (
        <>
          <div className="my-5 mx-1">
            <div className="row">
              <div className="col-md-6">
                <h4>{item.category}</h4>
              </div>
            </div>
          </div>

          <ul class="list-group">

            {
              item.files.sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
              }).map((file, idx) => (
                <li class="list-group-item" key={idx}>

                  <div class="row align-items-center">
                    <div class="col-auto">
                      {
                        function () {
                          const type = file.type;
                          if (type == "PDF") {
                            return <img class="avatar avatar-xs avatar-4x3" src="theme/svg/logos/pdf-icon.svg" alt="PDF icon" />;
                          } else {
                            return <></>
                          }
                        }()
                      }
                    </div>
                    <div class="col">
                      <h5 class="mb-0">
                        <a class="text-dark" href={file.path + "/" + file.file.replace(" ", "+")} target="_blank" rel="noreferrer">{file.name}</a>
                      </h5>
                    </div>
                    <div class="col-auto">
                      <a class="btn btn-primary btn-sm" href={file.path + "/" + file.file.replace(" ", "+")} target="_blank" rel="noreferrer">Descargar</a>
                    </div>
                  </div>

                </li>
              ))
            }

          </ul>

        </>
      ))
    }

  </div>

);


ManualsView.propTypes = {};

export default ManualsView;