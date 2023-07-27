import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useQuery, useDetail, useSet } from "seed/gql";
import { usePost } from "seed/api";
import { SET_CRANE, SET_ORDER } from "seed/gql/queries";
import { Loading } from "seed/helpers";
import View from "components/orders/Form.view";
import Error from "components/helpers/Error";
import NotFound from "components/helpers/NotFound";

const OrderFormSet = ({
  orderId,
  onCompleted = () => null,
  onError = () => null,
  onClose,
  setCreated,
  location
}) => {

  if (!location.state)
    location.state = {
      crane: null,
      configuration: "N/A"
    };

  const rol = sessionStorage.getItem("rol");
  const id = sessionStorage.getItem("id");
  const typeaheadRef = useRef();
  const [loaded, setLoaded] = useState(false);
  const [step, setStep] = useState(1);
  const [hideModal, setHideModal] = useState(true);
  const [model, setModel] = useState("");
  const [craneSelected, setCraneSelected] = useState(location.state.crane ?? {});
  const [prevCraneSelected, _] = useState(location.state.crane ?? {});

  const [startHeight, setStartHeight] = useState(0);
  const [endHeight, setEndHeight] = useState(0);
  const [elevations, setElevations] = useState(0);
  const [elevationParts, setElevationParts] = useState(null);
  const [elevationEdit, setElevationEdit] = useState(0);

  if (elevationParts == null) {

    let configuration = (location.state.configuration) != "N/A"
      ? location.state.configuration.split(",").map(conf => ({
        part: conf.split(" ")[0],
        quantity: parseInt(conf.split(" ")[1].replace("(", "").replace(")", ""))
      }))
      : [];

    let elevations = location.state.elevations != "" ? location.state.elevations.split(";").map(elevation =>
      elevation.split(",").map(e => ({
        part: e.split(" ")[0],
        quantity: parseInt(e.split(" ")[1].split("[")[0].replace("(", "").replace(")", "")),
        generated: e.split(" ").length > 2 ? e.split(" ")[2].replace("[", "").replace("]", "") == "true" : false
      }))
    ) : [];

    setElevations(elevations.length);
    setElevationParts([configuration, ...elevations]);

  }

  const [callUpdate, qUpdate] = usePost(`/orders/update_order`, {
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
      if (data) {

        let newElevationParts = [...elevationParts];

        for (let i = 0; i < data.length; i++) {

          // Remove generated elevations
          if (newElevationParts[i + 1] && newElevationParts[i + 1].length > 0)
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
    onError: (error) => { }
  });

  const [callGetSuggestions, qCallGetSuggestions] = usePost("/suggestions/get_suggestions", {
    onCompleted: (data) => {

      // Elevation number 0 is for configuration

      let csvData = [
        [
          "Parte",
          "ID Parte",
          "Cantidad",
          "U.M.",
          "Items"
        ],
        ...data.suggestions.map(suggestion => [
          (suggestion.elevation_number == 0 ? "" : "[ELEVACION " + suggestion.elevation_number + "] ") +
          suggestion.part,
          suggestion.part_id,
          suggestion.quantity,
          suggestion.um,
          suggestion.items
        ])
      ];
      let csv = csvData.map(e => e.join(",")).join("\n");
      let blob = new Blob([csv], { type: "text/csv" });

      let url = URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = `Sugerencias_${data.client_name}.csv`;
      document.body.appendChild(a);
      a.click();

    }
  });

  const [callSetCrane, qSetCrane] = useSet(SET_CRANE, {
    onCompleted: () => {
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
      id
      craneId
      model
      number
      series
      inUse
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
      um
    }
  }`, `((craneModel LIKE ${model}) AND (name ILIKE pie))`);

  const qOrder = useDetail(`{
    order {
      client_name: clientName
      building_name: buildingName
      building_street: buildingStreet
      building_city: buildingCity
      building_state: buildingState
      building_address: buildingAddress
      contact_name: contactName
      contact_phone: contactPhone
      contact_email: contactEmail
      requesting_trader: requestingTrader
      order_version: orderVersion
      mounting_date: mountingDate
      rent_period: rentPeriod
      has_power_lift: hasPowerLift
      has_cabin: hasCabin
      has_radio_control: hasRadioControl
      has_remote_control: hasRemoteControl
      has_cage_mounting: hasCageMounting
      boom_length: boomLength
      tower_height: towerHeight
      final_height: finalHeight
      insurance_responsable: insuranceResponsable
      forwarding_system: forwardingSystem
      elevations_number: elevationsNumber
      transport_number: transportNumber
      model_reference: modelReference
      configuration
      elevations
      crane_version: craneVersion
      feet_type: feetType
      feet_model: feetModel
      base_type: baseType
      dice_size: diceSize
      comments
      status
      crane {
          id
          craneId
          model
          number
      }
      applicant {  }
    }
  }`, orderId);

  const qUsers = useQuery(`{
    users {
      firstName
      lastName
      email
      username
    }
  }`, rol == "COMMERCIAL" ? `id=${id}` : "rol=COMMERCIAL OR rol=ADMIN", { orderBy: "first_name" });

  let { order = {} } = qOrder.data;
  let { feets = [] } = qFeets.data;
  let { towers = [] } = qTower.data;
  let { cranes = [] } = qCranes.data;
  let { users = [] } = qUsers.data;

  cranes = [...cranes].sort((a, b) => a.model.localeCompare(b.model));

  let new_cranes = cranes.map(crane => crane);
  if (order.crane && order.crane.id) new_cranes.push(order.crane);

  if (!loaded && order && order.id) {
    setStartHeight(order.tower_height);
    setEndHeight(order.final_height);
    setLoaded(true);
  }

  const onSubmit = (values) => {

    if (step < 3) {

      if (step == 2 && (!model || model == "")) {
        alert("Seleccione un modelo o una grúa");
        return;
      }

      setStep(step + 1);
      return;

    }

    if (values.craneIndex == -1)
      return;

    let data = {
      ...values,
      order_id: parseInt(orderId),
      rent_period: parseInt(values.rent_period),
      boom_length: parseFloat(values.boom_length),
      tower_height: parseFloat(values.tower_height),
      mounting_date: new Date(values.mounting_date),
      has_power_lift: values.has_power_lift === "true",
      has_cabin: values.has_cabin === "true",
      has_radio_control: values.has_radio_control === "true",
      crane: craneSelected,
      prev_crane: prevCraneSelected,
      insurance_responsable: values.insurance_responsable,
      forwarding_system: values.forwarding_system,
      status: "CREATED",
      model_reference: model,
      configuration: elevationParts[0].length == 0
        ? "N/A"
        : elevationParts[0].map(part => `${part.part} (${part.quantity})`).join(","),
      crane_version: values.crane_version,
      elevations_number: parseInt(values.elevations_number),
      transport_number: parseInt(values.transport_number),
      has_remote_control: values.has_remote_control === "true",
      has_cage_mounting: values.has_cage_mounting === "true",
      comments: values.comments ?? "",
      dice_size: values.dice_size ?? "",
      feet_model: values.feet_model ?? "",
      elevations: elevationParts.filter((_, idx) => idx > 0)
        .map(elevation => elevation.map(part => `${part.part} (${part.quantity}) [${part.generated}]`)
          .join(",")).join(";"),
    };

    delete data.id;
    callUpdate(data);

  };

  const onChangeElevations = (e) => {

    if (e.target.value == "") return;

    let numElevations = parseInt(e.target.value);

    if (numElevations < elevations)
      setElevationParts([...elevationParts].slice(0, numElevations + 1));
    else
      setElevationParts([...elevationParts, ...Array(numElevations - elevations).fill([])]);

    setElevations(numElevations);

  };

  const onClickRetry = () => {
    setStep(step - 1);
    setCreated(false);
  };

  const onClickGoShippings = () => {
    // setCreated(false);
    document.location.href = "/shippings";
  };

  const onPrev = () => setStep(step - 1);

  const validateStatus = (selected) => {

    if (typeof selected === "string") {
      setCraneSelected({});
      return;
    }

    if (selected.length > 0 && prevCraneSelected.id != selected[0].id) {

      if (selected[0].inUse == true) {

        let warning = window.confirm("La grúa seleccionada está en uso,"
          + "¿desea liberarla?. Esto finalizará las órdenes activas de la grúa.");

        if (warning === false) {
          typeaheadRef.current.clear();
        }
        else {

          let activeCranes = [...cranes].filter(crane => crane.id == selected[0].id);
          if (activeCranes.length > 0) {
            let activeOrders = activeCranes[0].orders ?? [{}].filter(order => order.status != "FINISHED");
            if (activeOrders.length > 0) callSetOrder({ id: parseInt(activeOrders[0].id), status: "FINISHED" });
          }

          callSetCrane({ id: selected[0].id, inUse: false, status: "NA" });

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

  const handleChangeModel = (selected) => {
    if (selected.length > 0) setModel(selected[0]);
  }

  useEffect(() => {
    if (order && order.id) {
      setModel(order.model_reference);
    }
  }, [order]);

  useEffect(() => {
    callGenElevations({
      model: craneSelected.model,
      start_height: parseFloat(startHeight),
      end_height: parseFloat(endHeight),
      elevations: parseInt(elevations),
    });
  }, [craneSelected, startHeight, endHeight, elevations]);

  if (qOrder.loading) return <Loading />;
  if (qOrder.error && qOrder.error.message.includes("matching query does not exist")) return <NotFound />
  if (qOrder.error) return <Error />;

  const error = qUpdate.error ? "An error has occurred" : null;

  let models = [...cranes].map(crane => crane.model);
  models = [...new Set(models)];

  return <View
    users={users}
    order={order}
    hideModal={hideModal}
    setHideModal={setHideModal}
    craneSelected={craneSelected}
    setCraneSelected={setCraneSelected}
    cranes={model != "" ? new_cranes.filter(crane => crane.model == model) : new_cranes}
    feets={feets.map(feet => feet.partId)}
    towers={towers.map(tower => tower.partId)}
    craneIds={new_cranes.map(c => c.craneId)}
    error={error}
    onSubmit={onSubmit}
    onClose={onClose}
    step={step}
    setStep={setStep}
    onPrev={onPrev}
    onClickGoShippings={onClickGoShippings}
    onClickRetry={onClickRetry}
    callGetSuggestions={callGetSuggestions}
    elevationParts={elevationParts}
    onChangeElevations={onChangeElevations}
    elevationEdit={elevationEdit}
    setElevationEdit={setElevationEdit}
    setElevationParts={setElevationParts}
    setStartHeight={setStartHeight}
    setEndHeight={setEndHeight}
    elevations={elevations}
    validateStatus={validateStatus}
    handleChangeModel={handleChangeModel}
    typeaheadRef={typeaheadRef}
    model={model}
    models={models}
  />;

}

OrderFormSet.propTypes = {
  setCreated: PropTypes.func,
  onCompleted: PropTypes.func,
  onError: PropTypes.func,
  location: PropTypes.object,
  orderId: PropTypes.string,
  onClose: PropTypes.func
};

export default OrderFormSet;