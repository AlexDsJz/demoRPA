import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useQuery, useSet } from "seed/gql";
import { SET_CRANE, SET_ORDER } from "seed/gql/queries";
import { usePost } from "seed/api";
import View from "components/orders/Form.view";
import { 
  formatFilters, 
  formatMultipleEnumFilters, 
  formatSearchFilters, 
  countActiveFilters 
} from "components/utils/filters";
import { mode } from "crypto-js";

const OrderFormSave = ({ onCompleted = () => null, onError = () => null, setCreated, onClose }) => {

  // In order to avoid a complex logic, use elevationParts to storage tower config & elevations
  // tower config -> elevationParts[0]
  // elevations -> elevationParts[1:n]

  const rol = sessionStorage.getItem("rol");
  const id = sessionStorage.getItem("id");
  const history = useHistory();
  const typeaheadRef = useRef();
  const [step, setStep] = useState(1);
  const [hideModal, setHideModal] = useState(true);
  const [model, setModel] = useState("");
  const [craneSelected, setCraneSelected] = useState({});
  const [elevations, setElevations] = useState(0);
  const [startHeight, setStartHeight] = useState(0);
  const [endHeight, setEndHeight] = useState(0);
  const [elevationParts, setElevationParts] = useState([[]]);
  const [elevationEdit, setElevationEdit] = useState(0);

  const [callPost, qPost] = usePost("/orders/create_order", {
    onCompleted: (data) => {
      setCreated(true);
      setStep(4);
    },
    onError: (error) => {
      alert('Ha ocurrido un error, revisa la configuración enviada')
    }
  });

  const [callGenElevations, qGenElevations] = usePost("/orders/generate_elevations", {
    onCompleted: (data) => {
      if(data) {

        let newElevationParts = [...elevationParts];

        for(let i = 0; i < data.length; i++) {

          // Remove generated elevations
          if(newElevationParts[i + 1] && newElevationParts[i + 1].length > 0)
            newElevationParts[i + 1] = newElevationParts[i + 1].filter(part => !part.generated);

          // Append new elevations
          newElevationParts[i + 1] = [
            ...(newElevationParts[i + 1] ?? []),
            {
              part: data[i].part,
              quantity: data[i].quantity,
              generated: true
            }
          ];

        }

        setElevationParts(newElevationParts);

      }
    },
    onError: (error) => {}
  });

  const [callSetCrane, qSetCrane] = useSet(SET_CRANE, {
    onCompleted:() => {
      qCranes.refetch();
    },
  });

  const [callSetOrder, reqSetOrder] = useSet(SET_ORDER, {
    onCompleted: () => {
      qCranes.refetch();
    }
  });

  const qCranes = useQuery(`{ 
    cranes {
      craneId
      model
      number
      series
      inUse
      owner
      status
      orders {
        buildingName
        status
        suggestions {
          part {
            partId
            name
          }
        }
        shippings {
          contents {
            partId
            partName
          }
        }
      }
    }
  }`, "owner=GROKE");

  const qTower = useQuery(`{
    towers: parts {
      id
      name
      partId
      craneModel
    }
  }`, `((craneModel LIKE ${model}) AND (name ILIKE torre))`);

  const qFeets = useQuery(`{
    feets: parts {
      id
      name
      partId
      craneModel
    }
  }`, `((craneModel LIKE ${model}) AND (name ILIKE pie))`);

  const qUsers = useQuery(`{
    users {
      firstName
      lastName
      email
      username
    }
  }`, rol == "COMMERCIAL" ? `id=${id}` : "rol=COMMERCIAL OR rol=ADMIN", {orderBy: "first_name"});

  const error = qPost.error ? "An error has occurred" : null;

  let { cranes = [] } = qCranes.data;
  let { feets = [] } = qFeets.data;
  let { towers = [] } = qTower.data;
  let { users = [] } = qUsers.data;
  
  cranes = [...cranes].sort((a, b) => a.model.localeCompare(b.model));

  const onClickRetry = () => {
    setStep(step - 1);
    setCreated(false);
  };
  
  const onClickGoShippings = () =>
    document.location.href = "/shippings";

  const onPrev = () => setStep(step - 1);
    
  const handleChangeModel = (selected) => {
    if(selected.length > 0) setModel(selected[0]);
  }

  const validateStatus = (selected) => {

    if(typeof selected === "string") {
      setCraneSelected({});
      return;
    }

    if(selected.length > 0) {

      if(selected[0].inUse == true) {

        let warning = window.confirm("La grúa seleccionada está en uso," 
                                      +"¿desea liberarla?. Esto finalizará las órdenes activas de la grúa.");

        if(warning === false) {
          typeaheadRef.current.clear();
        }
        else{

          let activeCranes = [...cranes].filter(crane => crane.id == selected[0].id);
          if(activeCranes.length > 0) {
            let activeOrders = activeCranes[0].orders??[{}].filter(order => order.status != "FINISHED");
            if(activeOrders.length > 0) callSetOrder({id:parseInt(activeOrders[0].id), status:"FINISHED"});
          }
          
          callSetCrane({id: selected[0].id, inUse: false, status: "NA"});

        }

      } 
      else {
        setCraneSelected(selected[0]);
      }

      setModel(selected[0].model);

    }
    else {
      setCraneSelected({});
    }

  }

  const onChangeElevations = (e) => {

    if(e.target.value == "") return;

    let numElevations = parseInt(e.target.value);
    
    if(numElevations < elevations)
      setElevationParts([...elevationParts].slice(0, numElevations + 1));
    else
      setElevationParts([...elevationParts, ...Array(numElevations - elevations).fill([])]);
    
    setElevations(numElevations);
    
  }

  const onSubmit = (values) => {

    if(step == 2 && (!model || model == "")) {
      alert("Seleccione un modelo o una grúa");
      return;
    }
    
    if(step < 3) {
      setStep(step + 1);
      return;
    }

    if(values.craneIndex == -1) 
      return;

    if(step == 3)
      callPost({
        ...values,
        rent_period: parseInt(values.rent_period),
        boom_length: parseFloat(values.boom_length),
        tower_height: parseFloat(values.tower_height),
        mounting_date: new Date(values.mounting_date),
        has_power_lift: values.has_power_lift === "true",
        has_cabin: values.has_cabin === "true",
        has_radio_control: values.has_radio_control === "true",
        model_reference: model,
        crane: craneSelected,
        insurance_responsable: values.insurance_responsable,
        forwarding_system: values.forwarding_system,
        status: "CREATED",
        configuration: elevationParts[0].length == 0 
          ? "N/A" 
          : elevationParts[0].map(part => `${part.part} (${part.quantity})`).join(","),
        crane_version: values.crane_version,
        elevations_number: parseInt(values.elevations_number),
        transport_number: parseInt(values.transport_number),
        has_remote_control: values.has_remote_control === "true",
        has_cage_mounting: values.has_cage_mounting === "true",
        comments: values.comments??"",
        dice_size: values.dice_size??"",
        feet_model: values.feet_model??"",
        elevations: elevationParts.filter((_, idx) => idx > 0)
          .map(elevation => elevation.map(part => `${part.part} (${part.quantity}) [${part.generated}]`)
            .join(",")).join(";"),
      });  

  }

  useEffect(() => {
    callGenElevations({
      model: model,
      start_height: parseFloat(startHeight),
      end_height: parseFloat(endHeight),
      elevations: parseInt(elevations),
    });
  }, [model, startHeight, endHeight, elevations]);

  let models = [...cranes].map(crane => crane.model);
  models = [...new Set(models)];

  return <View
    users={users}
    handleChangeModel={handleChangeModel}
    typeaheadRef={typeaheadRef}
    validateStatus={validateStatus}
    onClickGoShippings={onClickGoShippings}
    hideModal={hideModal}
    setHideModal={setHideModal}
    craneSelected={craneSelected}
    setCraneSelected={setCraneSelected}
    cranes={model != "" ? cranes.filter(crane => crane.model == model) : cranes}
    feets={feets.map(feet => feet.partId)}
    towers={towers.map(tower => tower.partId)}
    craneIds={cranes.map(c => c.craneId)}
    error={error}
    onClickRetry={onClickRetry}
    onSubmit={onSubmit}
    onClose={onClose}
    step={step}
    setStep={setStep}
    onPrev={onPrev}
    elevationParts={elevationParts}
    onChangeElevations={onChangeElevations}
    elevationEdit={elevationEdit}
    setElevationEdit={setElevationEdit}
    setElevationParts={setElevationParts}
    setStartHeight={setStartHeight}
    setEndHeight={setEndHeight}
    elevations={elevations}
    model={model}
    models={models}
  />;
  
}

OrderFormSave.propTypes = {
  setCreated: PropTypes.func,
  onCompleted: PropTypes.func,
  onError: PropTypes.func,
  onClose: PropTypes.func
};

export default OrderFormSave;