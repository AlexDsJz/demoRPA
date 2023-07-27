import React from "react";
import PropTypes from "prop-types";

const VerifyView = ({verifyData=""}) =>
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

            <textarea  class="form-control w-100" rows={5}>
            {verifyData}
            </textarea>
             
          
            </div>
          </div>
    
        </div>
      </div>
    </div>
    
    </main>;

VerifyView.propTypes = {};

export default VerifyView;