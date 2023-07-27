import React from "react";
import PropTypes from "prop-types";
import ReactToPrint from "react-to-print";

const dividerClass = "row section mx-3 my-3 p-2 text-white rounded";

const innerRow = "row mb-3 mx-2";
const firstCol = "col-4 my-auto font-weight-bold text-dark";
const secondCol = "col-8 my-auto text-dark";

const lastRow = "row mx-2";

const getRow = (title, text) => {
  return <div className={innerRow}>
    <div className={firstCol}>{title}</div>
    <div className={secondCol}>{text}</div>
  </div>
}

const OrderDetails = ({ order, toPrintRef }) =>
  <div class="card">
    <div ref={toPrintRef} class="p-2">

      <div className="row mx-4 my-4">
        <img src="/theme/img/groke.png" className="logo-header" width="230" alt="Groke"/>
      </div>

      <div className={dividerClass}>Orden de grúa - Montaje (OG)</div>

      {getRow("Fecha de solicitud", new Date(order.createdAt).toLocaleDateString())}
      {getRow("Versión de la orden", order.orderVersion)}
      {getRow("Comerciante solicitante", order.applicant ? order.applicant.firstName : "")}

      <div className={dividerClass}>Datos del cliente</div>

      {getRow("Nombre del cliente", order.clientName)}
      {getRow("Nombre de la obra", order.buildingName)}
      {getRow("Dirección de la obra", order.buildingStreet + ", " + order.buildingCity + ", " + order.buildingState)}
      {getRow("Contacto del cliente", order.contactName)}
      {getRow("Teléfono celular del contacto", order.contactPhone)}
      {getRow("Correo del contacto", order.contactEmail)}

      <div className={dividerClass}>Datos de la grúa</div>

      {getRow("Modelo de grúa", order.crane ? order.crane.model : order.modelReference)}
      {getRow("Número de grúa", order.crane ? order.crane.number : "Sin Asignar")}
      {getRow("Versión a montar", order.craneVersion)}
      {getRow("Periodo aproximado de renta en meses", order.rentPeriod)}
      {getRow("Fecha tentativa de montaje", new Date(order.mountingDate).toLocaleDateString())}
      {getRow("Responsable de seguros", function(){
        if(order.insuranceResponsable == "CLIENT") return "Cliente";
        if(order.insuranceResponsable == "OWNER") return "Propietario";
        if(order.insuranceResponsable == "BOTH") return "Ambos";
      }())}
      {getRow("Transportes esperados y vendidos (ida y vuelta)", order.transportNumber)}
      {getRow("Longitud de pluma", order.boomLength)}
      {getRow("Torre inicial en metros", order.towerHeight)}
      {getRow("Configuración tramo por tramo de torre", order.configuration.split(",").join(" + "))}
      {getRow("Sistema de reenvíos", function(){
        if(order.forwardingSystem == "SIMPLE") return "Simple reenvío";
        if(order.forwardingSystem == "DOUBLE") return "Doble reenvío";
      }())}
      {getRow("Power Lift", order.hasPowerLift ? "Si" : "No")}
      {getRow("Número de elevaciones", order.elevationsNumber)}
      {getRow("Torre final en metros", order.towerHeight)}

      <div className="pagebreak"></div>
      <hr className="page-divider mt-8"></hr>

      <div className="row mx-4 mb-4">
        <img src="/theme/img/groke.png" className="logo-header mt-5" width="230" alt="Groke"/>
      </div>

      {getRow("Cabina", order.hasCabin ? "Si" : "No")}
      {getRow("Radio control", order.hasRadioControl ? "Si" : "No")}
      {getRow("Telemando", order.hasRemoteControl ? "Si" : "No")}
      {getRow("Montaje con jaula", order.hasCageMounting ? "Si" : "No")}

      <div className={dividerClass}>Datos del base</div>

      {getRow("Tipo de pies", function(){
        if(order.baseType == "CONVENTIONALS") return "Convencionales";
        if(order.baseType == "REUSABLE") return "Reutilizables";
      }())}
      {getRow("Modelo de pies", order.feetModel)}
      {getRow("Tipo de base", function(){
        if(order.baseType == "LINKED") return "Ligada";
        if(order.baseType == "CONVENTIONAL") return "Convencional";
      }())}
      {getRow("Tamaño del dado si es base convencional", order.diceSize)}
      {getRow("Comentarios adicionales para ubicación de pies y/o montaje", order.comments)}

      <div className={innerRow}>
        <div className={firstCol}>Interfiere en algo</div>
        <div className={secondCol}>
          <div className="border p-5">
            &nbsp;
          </div>
        </div>
      </div>

      {getRow("Correo del comercial", "")}

      <ReactToPrint
        debug={true}
        content={() => toPrintRef.current}
        trigger={() => (
          <button className="btn btn-primary btn-block w-50 mx-auto mt-3 mb-6">
            Imprimir orden
          </button>
        )}
      />

    </div>
  </div>;

OrderDetails.propTypes = {
  order: PropTypes.object.isRequired,
  toPrintRef: PropTypes.object,
};

export default OrderDetails;