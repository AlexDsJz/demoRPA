import React from "react";
import PropTypes from "prop-types";
import View from "components/information/Manuals.view";

function Manuals() {

  const data = [
    {
      category: "LC",
      files: [
        { name: "CT-12-Comansa-LC-2070", file: "CT-12-Comansa-LC-2070.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/LC" },
        { name: "LC-1044_ECOMAF1054", file: "LC-1044_ECOMAF1054.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/LC" },
        { name: "LC-1060_ECOMAF1082", file: "LC-1060_ECOMAF1082.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/LC" },
        { name: "LC2074_12t_EEA3-60-30-04", file: "LC2074_12t_EEA3-60-30-04.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/LC" },
        { name: "LC5211_ES3-18-12_COM0200011_A_ES", file: "LC5211_ES3-18-12_COM0200011_A_ES.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/LC" },
        { name: "LCL 200 - GER", file: "LCL 200 - GER.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/LC" },
        { name: "LCL 250 12T SERIE 13.500", file: "LCL 250 12T SERIE 13.500.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/LC" },
        { name: "LCL500_EFU4L-110-60_COM0700007_A_ES", file: "LCL500_EFU4L-110-60_COM0700007_A_ES.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/LC" }
      ]
    },
    {
      category: "5LC",
      files: [
        { name: "5LC3510_5t_ EFU2-18-12", file: "5LC3510_5t_ EFU2-18-12.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/5LC" },
        { name: "5LC4510_5t_ EFU2-11-12", file: "5LC4510_5t_ EFU2-11-12.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/5LC" },
        { name: "5LC5010_5t_ES3-18-12", file: "5LC5010_5t_ES3-18-12.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/5LC" }
      ]
    },
    {
      category: "10LC",
      files: [
        { name: "10LC110 8T", file: "10LC110 8T.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/10LC" },
        { name: "10LC140 8T", file: "10LC140 8T.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/10LC" }
      ]
    },
    {
      category: "11LC",
      files: [
        { name: "11 LC 132 6T EFU2-37-15", file: "11 LC 132 6T EFU2-37-15.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/11LC" },
        { name: "11LC160_EFU4-24-20_SI_COM0800036_A_ES", file: "11LC160_EFU4-24-20_SI_COM0800036_A_ES.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/11LC" }
      ]
    },
    {
      category: "21LC",
      files: [
        { name: "21 LC 170 12T", file: "21 LC 170 12T.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/21LC" },
        { name: "21 LC 210 18T", file: "21 LC 210 18T.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/21LC" },
        { name: "21 LC 400 18T", file: "21 LC 400 18T.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/21LC" },
        { name: "21LC290 18T", file: "21LC290 18T.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/21LC" },
        { name: "21LC450 20T", file: "21LC450 20T.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/21LC" },
        { name: "21LC550 18T", file: "21LC550 18T.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/21LC" },
        { name: "21LC660 36T", file: "21LC660 36T.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/21LC" },
        { name: "21LC750 36T", file: "21LC750 36T.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/21LC" },
        { name: "21LLC750 50T", file: "21LLC750 50T.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/21LC" }
      ]
    },
    {
      category: "BL2000",
      files: [
        { name: "Instrucciones de montaje HM1", file: "INSTRUCCIONES DE MONTAJE HMI.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/BL2000" },
        { name: "Instrucciones de montaje", file: "INSTRUCCIONES DE MONTAJE.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/BL2000" },
        { name: "Mantenimiento", file: "MANTENIMIENTO.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/BL2000" },
        { name: "Manual de operación HMI", file: "MANUAL DE OPERACION HMI.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/BL2000" },
        { name: "Operación y montaje freno", file: "OPERACION Y MONTAJE FRENO.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/BL2000" }
      ]
    },
    {
      category: "EDC",
      files: [
        { name: "Manual EDC", file: "MANUAL EDC.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/EDC" }
      ]
    },    
    {
      category: "SBL2000",
      files: [
        { name: "Manual de freno de emergencia", file: "Manual de freno de emergencia.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/SBL2000" },
        { name: "Manual de instrucciones del panel", file: "Manual de instrucciones del panel.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/SBL2000" },
        { name: "Manual de Mantenimiento SBL2000", file: "Manual de Mantenimiento SBL2000.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/SBL2000" },
        { name: "Manual de montaje SBL2000", file: "Manual de montaje SBL2000.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/SBL2000" },
        { name: "Manual de operación SBL2000", file: "Manual de operación SBL2000.pdf", type: "PDF", path: "https://groke.s3.us-west-1.amazonaws.com/Manuales/SBL2000" }
      ]
    },
  ]

  return <View data={data} />;
}

Manuals.propTypes = {};

export default Manuals;