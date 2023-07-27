import React from "react";
import PropTypes from "prop-types";

const StoresView = () =>
<main id="content" role="main" class="main pl-0">
    
<div class="position-fixed top-0 right-0 left-0 bg-img-hero"
  style={ {height: "32rem", backgroundImage: "url(/theme/svg/components/abstract-bg-4.svg)"} }>
  <figure class="position-absolute right-0 bottom-0 left-0">
    <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
      x="0px" y="0px" viewBox="0 0 1921 273">
      <polygon fill="#fff" points="0,273 1921,273 1921,0 "/>
    </svg>
  </figure>
</div>

<div class="container py-5 py-sm-7">
  <a class="d-flex justify-content-center mb-5" href="index.html">
    <img class="z-index-2" src="/theme/img/groke.png" alt="Logo" style={ {width: "12rem"} }/>
  </a>
  <div class="row justify-content-center">
    <div class="col-md-7 col-lg-5">
      <div class="card card-lg mb-5 pt-4 pb-4">
        <div class="card-body text-center">
         
        <a class="btn btn-lg btn-soft-success mb-4" href="https://play.google.com/store/apps/details?id=com.seed.groke_app">Actualizar o instalar app <i class="fab fa-brands fa-android"></i> Android</a>
        <a class="btn btn-lg btn-soft-danger mb-4" href="https://groke.s3.us-west-1.amazonaws.com/groke.apk">Actualizar o instalar app <i class="fab fa-brands fa-android"></i> Huawei</a>
        <a class="btn btn-lg btn-soft-secondary" href="theme/manuals/Misc - Instalación iOS.pdf">Actualizar o instalar app <i class="fab fa-brands fa-apple"></i> iOS</a>
    
        </div>
      </div>

    </div>
  </div>
</div>

</main>;

StoresView.propTypes = {};

export default StoresView;