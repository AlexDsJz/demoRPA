import React from "react";
import PropTypes from "prop-types";

const InformationView = () => (
  <div class="content container-fluid p-7">

    {/* Header */}
    <div class="page-header pt-4">
      <div class="row align-items-end">
        <div class="col-sm">
          <h1 class="page-header-title">Materiales de apoyo</h1>
        </div>
      </div>
    </div>

    <div className="mb-3 mx-1">
      <div className="row">
        <div className="col-md-6">
          <h4>Ejecutable para android (Huawei)</h4>
        </div>
      </div>
    </div>

    <ul class="list-group">

      <li class="list-group-item">
        <div class="row align-items-center">
          <div class="col-auto">
            <img class="avatar avatar-xs avatar-4x3" src="theme/svg/logos/huawei.gif" alt="Huawei icon" />
          </div>
          <div class="col">
            <h5 class="mb-0">
              <a class="text-dark" href="https://groke.s3.us-west-1.amazonaws.com/groke.apk" target="_blank" rel="noreferrer">Archivo ejecutable (.apk)</a>
            </h5>
          </div>
          <div class="col-auto">
            <a class="btn btn-primary btn-sm" href="https://groke.s3.us-west-1.amazonaws.com/groke.apk" target="_blank" rel="noreferrer">Descargar</a>
          </div>
        </div>
      </li>

    </ul>


    <div className="mt-7 mb-3 mx-1">
      <div className="row">
        <div className="col-md-6">
          <h4>Manuales de operación del sistema</h4>
        </div>
      </div>
    </div>

    <ul class="list-group">

      <li class="list-group-item">
        <div class="row align-items-center">
          <div class="col-auto">
            <img class="avatar avatar-xs avatar-4x3" src="theme/svg/logos/pdf-icon.svg" alt="PDF icon" />
          </div>
          <div class="col">
            <h5 class="mb-0">
              <a class="text-dark" href="theme/manuals/ARISS -Manual Administrador.pdf" target="_blank" rel="noreferrer">
                Manual de Administrador
              </a>
            </h5>
          </div>
          <div class="col-auto">
            <a class="btn btn-primary btn-sm" href="theme/manuals/ARISS -Manual Administrador.pdf" target="_blank" rel="noreferrer">
              Descargar
            </a>
          </div>
        </div>
      </li>

      <li class="list-group-item">
        <div class="row align-items-center">
          <div class="col-auto">
            <img class="avatar avatar-xs avatar-4x3" src="theme/svg/logos/pdf-icon.svg" alt="PDF icon" />
          </div>
          <div class="col">
            <h5 class="mb-0">
              <a class="text-dark" href="theme/manuals/ARISS -Manual Operador.pdf" target="_blank" rel="noreferrer">
                Manual de operador
              </a>
            </h5>
          </div>
          <div class="col-auto">
            <a class="btn btn-primary btn-sm" href="theme/manuals/ARISS -Manual Operador.pdf" target="_blank" rel="noreferrer">
              Descargar 
            </a>
          </div>
        </div>
      </li>

      <li class="list-group-item">
        <div class="row align-items-center">
          <div class="col-auto">
            <img class="avatar avatar-xs avatar-4x3" src="theme/svg/logos/pdf-icon.svg" alt="PDF icon" />
          </div>
          <div class="col">
            <h5 class="mb-0">
              <a class="text-dark" href="theme/manuals/Misc - Instalación iOS.pdf" target="_blank" rel="noreferrer">
                Instalación en iOS
              </a>
            </h5>
          </div>
          <div class="col-auto">
            <a class="btn btn-primary btn-sm" href="theme/manuals/Misc - Instalación iOS.pdf" target="_blank" rel="noreferrer">
              Descargar
            </a>
          </div>
        </div>
      </li>

      <li class="list-group-item">
        <div class="row align-items-center">
          <div class="col-auto">
            <img class="avatar avatar-xs avatar-4x3" src="theme/svg/logos/video-icon.svg" alt="PDF icon" />
          </div>
          <div class="col">
            <h5 class="mb-0">
              <a class="text-dark" href="theme/manuals/ARISS - Video Admin.mp4" target="_blank" rel="noreferrer">
                Video demo administrador
              </a>
            </h5>
          </div>
          <div class="col-auto">
            <a class="btn btn-primary btn-sm" href="theme/manuals/ARISS - Video Admin.mp4" target="_blank" rel="noreferrer">Descargar</a>
          </div>
        </div>
      </li>

      <li class="list-group-item">
        <div class="row align-items-center">
          <div class="col-auto">
            <img class="avatar avatar-xs avatar-4x3" src="theme/svg/logos/video-icon.svg" alt="PDF icon" />
          </div>
          <div class="col">
            <h5 class="mb-0">
              <a class="text-dark" href="theme/manuals/ARISS - Video Operador.mp4" target="_blank" rel="noreferrer">
                Video demo operador
              </a>
            </h5>
          </div>
          <div class="col-auto">
            <a class="btn btn-primary btn-sm" href="theme/manuals/ARISS - Video Operador.mp4" target="_blank" rel="noreferrer">
              Descargar
            </a>
          </div>
        </div>
      </li>

    </ul>

  </div>
);

InformationView.propTypes = {};

export default InformationView;