import React from "react";
import PropTypes from "prop-types";
import View from "components/arris/verify/Verify.view";
import CryptoJS from 'crypto-js';

function Verify() {
  const searchParams = new URLSearchParams(document.location.search)
  var info = searchParams.get('info')
  var verifyData = ""
  try {
    // "donjulio70......................" to hex
    var keyHex = CryptoJS.enc.Hex.parse("646f6e6a756c696f37302e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e")

    var bytes = CryptoJS.AES.decrypt(info, keyHex, {
      mode: CryptoJS.mode.ECB
    });
    console.log(bytes.toString())
    verifyData = bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.log("ERROR");
    console.log(error);
    verifyData = "INFORMACIÓN INVÁLIDA";
  }

  return <View
    verifyData={verifyData}
  />;
}

Verify.propTypes = {};

export default Verify;