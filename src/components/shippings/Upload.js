import React, { useState } from "react";
import PropTypes from "prop-types";
import UploadView from "components/shippings/Upload.view";
import { useQuery } from "seed/gql";
import { usePost } from "seed/api";
import { useHistory } from "react-router";

const Upload = () => {

  const history = useHistory();
  const [step, setStep] = useState(1);
  const [logs, setLogs] = useState([]);
  const [order, setOrder] = useState(null);
  const [statusUpload, setStatusUpload] = useState(200);
  const [shippingType, setShippingType] = useState("");

  const qOrder = useQuery(`{
    orders {
      clientName
      crane {
        series
        number
        model
      }
    }
  }`, "status<>FINISHED");

  const loadFile = (order) => {
    
    if(order == null) {
      alert("Seleccione una orden");
      return;
    }
  
    if(shippingType == "") {
      alert("Seleccione un tipo de embarque");
      return;
    }
  
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".csv");
    input.click();
    input.onchange = () => {
      let file = input.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        let data = e.target.result;
        callUpload({
          type: shippingType,
          shippings: data,
          order_id: order.id
        })
      }
      reader.readAsBinaryString(file);
    }
  }
  
  const saveFile = (filename, data) => {
    const blob = new Blob([data], {type: 'text/csv'});
    if(window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, filename);
    }
    else{
      const elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = filename;        
      document.body.appendChild(elem);
      elem.click();        
      document.body.removeChild(elem);
    }
  }
  
  const [callDownload, reqCallDownload] = usePost("/shippings/download_shippings", {
    onCompleted: (data) => {
      saveFile(`${order.crane.model + "_" + order.clientName}.csv`, data.data);
    },
    onError: (error) => {}
  });
  
  const [callUpload, reqCallUpload] = usePost("/shippings/upload_shippings", {
    onCompleted: (data) => {
      setLogs(data.logs);
      setStep(2);
    },
    onError: (error) => {
      if(error.status == 400)
        setStatusUpload(400);
      setStep(3);
    }
  });

  const onClickRetry = () =>
    setStep(1);

  const onClose = () => {    
    history.goBack();
    document.location.href = "/shippings";
  }

  const { orders } = qOrder.data;

  return <UploadView 
    statusUpload={statusUpload}
    logs={logs}
    step={step}
    onClose={onClose}
    onClickRetry={onClickRetry}
    callUpload={callUpload}
    callDownload={callDownload}
    setOrder={setOrder}
    orders={orders} 
    order={order} 
    loadFile={loadFile}
    setShippingType={setShippingType}
  />;
  
}

Upload.propTypes = {};

export default Upload;