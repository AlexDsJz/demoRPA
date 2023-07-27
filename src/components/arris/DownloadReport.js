import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { usePost } from "seed/api";
import { Loading } from "seed/helpers";
import View from "components/arris/DownloadReport.view";
import moment from "moment";
import { downloadCSV } from "components/utils/file";

const DownloadReport = ({ onCompleted = () => null, onError = () => null, setCreated }) => {

  const history = useHistory();
  const [step, setStep] = useState(1);

  const [callGenerateReport, qGenerateReport] = usePost("/arris_forms/generate_arris_report", {
    onCompleted: (data) => {
      
      let statusHeaders = data["headers"];
      let headers = ["Fecha, Clave", "Status", "Modelo", "Serie", "Cliente", "Lugar", "Operador", "Turno", "Seguridad", 
        "Estatus", "Justificacion Reportes", "Fallas detectadas", ...statusHeaders];

      let rows = data["data"].map((report) => [
        moment(report.form.created_at).format("DD/MM/YYYY"),
        report.crane.crane_id,
        report.crane.owner,
        report.crane.model,
        report.crane.series,
        report.order.client,
        report.order.building_state + " " + report.order.building_city + " " + report.order.building_street,
        report.operator.first_name + " " + report.operator.last_name,
        function(){
          if(report.operator.turn == "FIRST") return "Primero";
          if(report.operator.turn == "SECOND") return "Segundo";
        }(),
        function(){
          if(report.security == null) return "Sin asignar";
          return report.security.first_name + " " + report.security.last_name;
        }(),
        function () {
          if(report.crane.status == "COMMERCIAL") return "Comercial";
          if(report.crane.status == "CLOSED") return "Clausurada";
          if(report.crane.status == "RELOCATED") return "Reubicación";
          if(report.crane.status == "MOUNTING") return "Montaje";
          if(report.crane.status == "DISASSEMBLY") return "Desmontaje";
          if(report.crane.status == "CONSTRUCTION") return "En obra";
        }(),
        report.form.reason_missing,
        report.form.failures,
        ...function() {

          let data = [];

          for(let i = 0; i < report.binnacle.length; i++) {

            let pushed = false;

            for(let j = 0; j < statusHeaders.length; j++) {
              if(report.binnacle[i].type + " - " + report.binnacle[i].name == statusHeaders[j]) {
                if(report.binnacle[i].status == "OK") data.push("Ok");
                else if(report.binnacle[i].status == "NOT_OK") data.push("Falla");
                else data.push("N/A");
                pushed = true;
                break;
              }
            }

            if(!pushed) data.push("");

          }

          return data;

        }()
      ]);

      downloadCSV([], headers, rows, "Reporte_arris");

    }
  });

  const onSubmit = (values) => {
    
    const startDate = moment(values.start_date).format("YYYY-MM-DD");
    const endDate = moment(values.end_date).format("YYYY-MM-DD");

    if(startDate > endDate) {
      alert("La fecha de inicio no puede ser mayor a la fecha de fin");
      return;
    }

    callGenerateReport(values);
    
  }

  const onClose = () => {
    setCreated(false);
    history.goBack();
  };

  return <View
    step={step}
    onSubmit={onSubmit}
    onComplete={onCompleted}
    onClose={onClose}
  />;

}

DownloadReport.propTypes = {
  setCreated: PropTypes.func,
  onCompleted: PropTypes.func,
  onError: PropTypes.func,
};

export default DownloadReport;