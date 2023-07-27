import React from "react";
import PropTypes from "prop-types";
import ReactToPrint from "react-to-print";
import moment from "moment";

const ShippingDetails = ({ shipping, toPrintRef }) =>
  <div class="card">
    <div style={{ border: "none" }} class="m-5" ref={toPrintRef}>

      <div className="mx-0 my-0" style={{ "border-bottom": "2px solid black" }}>
        <div className="row mx-4 my-4">
          <div class="col-md-2">
            <h1 class="mt-2">
              Lista de embarque
            </h1>
          </div>
          <div class="col-md-10 text-right">
            <img src="/theme/img/groke.png" className="logo-header" width="230" alt="Groke" />
          </div>
        </div>
      </div>

      <div className="row m-0 mt-3">
        <div class="col-6 p-0">
          <h3>Datos del transportista</h3>
          <table
            class="table"
            style={{
              "border-bottom": ".0625rem solid rgba(231,234,243,.7)",
              "border-right": ".0625rem solid rgba(231,234,243,.7)",
              "border-left": ".0625rem solid rgba(231,234,243,.7)",
            }}
          >
            <tbody>
              <tr>
                <th scope="row" class="border border-dark" colSpan={2}>
                  Salida Planta
                </th>
                <th scope="row" class="border border-dark" colSpan={2}>
                  {moment(shipping.createdAt).format("DD/MM/YYYY")}
                </th>
              </tr>
              <tr>
                <th scope="row" class="border border-dark" colSpan={2}>
                  Número de transporte
                </th>
                <th scope="row" class="border border-dark" colSpan={2}>
                  {shipping.id}
                </th>
              </tr>
              <tr>
                <th scope="row" class="border border-dark" colSpan={2}>
                  Transportista
                </th>
                <th scope="row" class="border border-dark" colSpan={2}>
                  {shipping.transportCarrierName}
                </th>
              </tr>
              <tr>
                <th scope="row" class="border border-dark" colSpan={2}>
                  Compañía transportista
                </th>
                <th scope="row" class="border border-dark" colSpan={2}>
                  {shipping.transportCompany}
                </th>
              </tr>
              <tr>
                <th scope="row" class="border border-dark">
                  No. de placas tractor
                </th>
                <th scope="row" class="border border-dark">
                  {shipping.transportPlate}
                </th>
                <th scope="row" class="border border-dark">
                  Placas de plana o exceso
                </th>
                <th scope="row" class="border border-dark">
                  {shipping.truckPlate}
                </th>
              </tr>
              <tr height="45px">
                <th class="border border-dark" colSpan={2}>
                  Teléfono de contacto del transportista
                </th>
                <th class="border border-dark" colSpan={2}>
                  {shipping.transportPhone}
                </th>
              </tr>
              <tr>
                <th scope="row" class="border border-dark" colSpan={2}>Entregó</th>
                <th scope="row" class="border border-dark" colSpan={2}></th>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-1 position-relative"></div>
        <div class="col-5 p-0">
          <h3>Datos del proyecto</h3>
          <table
            class="table"
            style={{
              "border-bottom": ".0625rem solid rgba(231,234,243,.7)",
              "border-left": ".0625rem solid rgba(231,234,243,.7)",
              "border-right": ".0625rem solid rgba(231,234,243,.7)",
            }}
          >
            <tbody>
              <tr height="45px">
                <th scope="row" class="border border-dark">Modelo</th>
                <th scope="row" class="border border-dark">
                  {shipping.order.crane.model}{shipping.order.crane.number}
                </th>
                <th scope="row" class="border border-dark">Serie</th>
                <th scope="row" class="border border-dark">
                  {shipping.order.crane.series}
                </th>
              </tr>
              <tr>
                <th scope="row" class="border border-dark" colSpan={1}>Fecha de entrega</th>
                <th scope="row" class="border border-dark" colSpan={3}>
                </th>
              </tr>
              <tr>
                <th scope="row" class="border border-dark" colSpan={1}>Cliente</th>
                <th scope="row" class="border border-dark" colSpan={3}>
                  {shipping.order.clientName} - {shipping.order.buildingName}
                </th>
              </tr>
              <tr>
                <th scope="row" class="border border-dark" colSpan={1}>Proyecto</th>
                <th scope="row" class="border border-dark" colSpan={3}>{shipping.order.buildingName}</th>
              </tr>
              <tr>
                <th scope="row" class="border border-dark" colSpan={1}>Destino</th>
                <th scope="row" class="border border-dark" colSpan={3}>
                  {shipping.order.buildingStreet}, {shipping.order.buildingCity},
                  {shipping.order.buildingState}</th>
              </tr>
              <tr>
                <th scope="row" class="border border-dark" colSpan={1}>Contacto: </th>
                <th scope="row" class="border border-dark" colSpan={3}>
                  {shipping.order.contactName},
                  {shipping.order.contactPhone},
                  {shipping.order.contactEmail}
                </th>
              </tr>
              <tr>
                <th scope="row" class="border border-dark" cplSpan={1}>Cliente</th>
                <th scope="row" class="border border-dark" colSpan={3}></th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="row m-0 mt-5">
        <table class="table" style={{ "text-align": "center" }}>
          <thead>
            <tr>
              <th style={{ width: "60px" }} scope="col" class="border border-dark">
                No.
              </th>
              <th style={{ width: "300px" }} scope="col" class="border border-dark">
                Descripción
              </th>
              <th style={{ width: "60px" }} scope="col" class="border border-dark">
                Cantidad
              </th>
              <th style={{ width: "60px" }} scope="col" class="border border-dark">
                UM
              </th>
              <th scope="col" class="border border-dark">Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {shipping.contents.map((content, index) =>
              <tr key={index}>
                <th scope="row" class="border border-dark">{index + 1}</th>
                <td class="border border-dark">{content.partName + " " + content.partId}</td>
                <td class="border border-dark">{content.quantity}</td>
                <td class="border border-dark">{content.um}</td>
                <td class="text-left border border-dark">
                  {content.items.split(";").map((item, idx) =>
                    <div class="pl-2" key={idx}>
                      {item == "" ? "N/A" : ""}
                      - {item.split("|")[0]} {item.split("|")[1]} <small>{item.split("|")[2]}</small>
                    </div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="row m-0">
        <div class="col-6 p-0">
          <table
            class="table"
            style={{
              "border-bottom": ".0625rem solid rgba(231,234,243,.7)",
              "border-right": ".0625rem solid rgba(231,234,243,.7)",
              "border-left": ".0625rem solid rgba(231,234,243,.7)",
            }}
          >
            <tbody>
              <tr>
                <th scope="row" class="border border-dark">Entregó:</th>
                <th scope="row" class="border border-dark">Planta Groke</th>
              </tr>
              <tr>
                <th scope="row" class="border border-dark">Nombre:</th>
                <th scope="row" class="border border-dark">Miguel Vazquez</th>
              </tr>
              <tr>
                <th scope="row" class="border border-dark">Firma:</th>
                <th scope="row" class="border border-dark"></th>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-2 position-relative"></div>
        <div class="col-4 p-0">
          <table
            class="table"
            style={{
              "border-bottom": ".0625rem solid rgba(231,234,243,.7)",
              "border-left": ".0625rem solid rgba(231,234,243,.7)",
              "border-right": ".0625rem solid rgba(231,234,243,.7)",
            }}
          >
            <tbody>
              <tr>
                <th scope="row" class="border border-dark">Revisó:</th>
                <th scope="row" class="border border-dark">Seguridad y calidad</th>
              </tr>
              <tr>
                <th scope="row" class="border border-dark">Nombre:</th>
                <th scope="row" class="border border-dark"></th>
              </tr>
              <tr>
                <th scope="row" class="border border-dark">Firma:</th>
                <th scope="row" class="border border-dark"></th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <ReactToPrint
      debug={true}
      content={() => toPrintRef.current}
      trigger={() =>
        <button className="btn btn-primary btn-block w-50 mx-auto mt-3 mb-6">
          Imprimir lista de embarque
        </button>
      }
    />

  </div>;

ShippingDetails.propTypes = {
  shipping: PropTypes.object.isRequired,
  toPrintRef: PropTypes.object
}

export default ShippingDetails;