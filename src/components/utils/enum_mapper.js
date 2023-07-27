const mapCraneStatus = (status) => {
    if(status == "COMMERCIAL") return "Comercial";
    if(status == "CLOSED") return "Clausurada";
    if(status == "RELOCATED") return "Reubicación";
    if(status == "MOUNTING") return "Montaje";
    if(status == "DISASSEMBLY") return "Desmontaje";
    if(status == "CONSTRUCTION") return "En obra";
    return "Desconocido";
}

const mapCraneStatusColor = (status) => {
    if(status == "NA") return {"backgroundColor": "#3899FF"};
    if(status == "COMMERCIAL") return {"backgroundColor": "#FFA823"};
    if(status == "CLOSED") return {"backgroundColor": "#F56856"};
    if(status == "RELOCATED") return {"backgroundColor": "#6E53F5"};
    if(status == "MOUNTING") return {"backgroundColor": "#54B8F4"};
    if(status == "DISASSEMBLY") return {"backgroundColor": "#F486EE"};
    if(status == "CONSTRUCTION") return {"backgroundColor": "#4277F5"};
    return {"backgroundColor": "#000000"}
}

const mapCraneInUseColor = (inUse) => {
    if(inUse) return { "backgroundColor": "#f07060" };
    else return { "backgroundColor": "#3899FF" };
}

const mapCraneInUse = (inUse) => {
    if(inUse) return "Ocupada";
    else return "Disponible";
}

const mapCraneOwner = (owner) => {
    if(owner == "GROKE") return "Groke";
    else if(owner == "RENTED") return "Rentada";
    else if(owner == "SOLD") return "Vendida";
}

const mapOrderStatusColor = (status) => {
    if(status == "CREATED") return {"backgroundColor": "#00A3BF"};
    else if(status == "CHARGING") return {"backgroundColor": "#0090A9"};
    else if(status == "TRAVELING") return {"backgroundColor": "#00798f"};
    else if(status == "RECEIVED") return {"backgroundColor": "#eb6859"};
    else if(status == "IN_BUILDING") return {"backgroundColor": "#38538C"};
    else if(status == "FINISHED") return {"backgroundColor": "#6A7073"};
    else if(status == "RETURNED") return {"backgroundColor": "#6165C7"};
    else if(status == "UNASSIGNED") return {"backgroundColor": "#6165C7"};
}

const mapOrderStatus = (status) => {
    if(status == "CREATED") return "Creada";
    else if(status == "CHARGING") return "En carga";
    else if(status == "TRAVELING") return "Carga completa";
    else if(status == "RECEIVED") return "Recibida";
    else if(status == "IN_BUILDING") return "En lugar";
    else if(status == "FINISHED") return "Finalizada";
}

const mapShippingStatusColor = (status) => {
    if(status == "CREATED") return {"backgroundColor": "#00A3BF"};
    else if(status == "IN_PROCESS") return {"backgroundColor": "#38538C"};
    else if(status == "COMPLETED") return {"backgroundColor": "#6165c7"};
    else if(status == "IN_REVIEW") return {"backgroundColor": "#FFA823"};
    else if(status == "TRAVELING") return {"backgroundColor": "#00798f"};
    else if(status == "ARRIVED") return {"backgroundColor": "#eb6859"};
    else if(status == "SECURITY_COMPLETED") return {"backgroundColor": "#F486EE"};
    else if(status == "SECURITY_REVISION") return {"backgroundColor": "#4277F5"};
    else if(status == "FINISHED") return {"backgroundColor": "#6A7073"};
}

const mapUserRol = (rol) => {
    if(rol == "ADMIN") return "Administrador";
    else if(rol == "BUILDING_OPERATOR") return "Operador de obra";
    else if(rol == "WORKSHOP_OPERATOR") return "Trabajador taller";
    else if(rol == "QUALITY_CONTROL") return "Control de calidad";
    else if(rol == "SECURITY") return "Supervisor de seguridad";
    else if(rol == "MAINTENANCE_WORKER") return "Mantenimiento";
    else if(rol == "COMMERCIAL") return "Comercial";
    else if(rol == "MAINTENANCE_SUPERVISOR") return "Supervisor de Mantenimiento";
}

const mapUserRolColor = (rol) => {
    if(rol == "ADMIN") return {"backgroundColor": "#00A3BF"};
    else if(rol == "BUILDING_OPERATOR") return {"backgroundColor": "#eb6859"};
    else if(rol == "WORKSHOP_OPERATOR") return {"backgroundColor": "#38538C"};
    else if(rol == "QUALITY_CONTROL") return {"backgroundColor": "#6a7073"};
    else if(rol == "SECURITY") return {"backgroundColor": "#6165c7"};
    else if(rol == "MAINTENANCE_WORKER") return {"backgroundColor": "#3899FF"};
    else if(rol == "COMMERCIAL") return {"backgroundColor": "#F486EE"};
    else if(rol == "MAINTENANCE_SUPERVISOR") return {"backgroundColor": "#4277F5"};
}

const mapArrisOperatorTurn = (turn) => {
    if(turn == "FIRST") return "Primer turno";
    else if(turn == "SECOND") return "Segundo turno";
    else if(turn == "SECURITY") return "Supervisor de seguridad";
}

const mapArrisOperatorTurnColor = (turn) => {
    if(turn == "FIRST") return {"backgroundColor": "#00A3BF"};
    else if(turn == "SECOND") return {"backgroundColor": "#eb6859"};
    else if(turn == "SECURITY") return {"backgroundColor": "#38538C"};
}

const mapArrisCraneStatus = (status) => {
    if(status == "OK") return "Correcto";
    else if(status == "NOT_OK") return "Incorrecto";
    else if(status == "NA") return "N/A";
}

const mapArrisFailureStatus = (status) => {
    if(status == "REPORTED") return "Reportada";
    else if(status == "ASSIGNED") return "Asignada";
    else if(status == "SOLVED") return "Resuelta";
}

const mapArrisFailureStatusColor = (status) => {
    if(status == "REPORTED") return "#eb6859";
    else if(status == "ASSIGNED") return "#38538C";
    else if(status == "SOLVED") return "#00A3BF";
}

export { 
    mapCraneStatus, mapCraneStatusColor, mapCraneInUseColor, mapCraneInUse, mapCraneOwner, 
    mapOrderStatusColor, mapOrderStatus, 
    mapShippingStatusColor, 
    mapUserRol, mapUserRolColor, 
    mapArrisOperatorTurn, mapArrisOperatorTurnColor,
    mapArrisCraneStatus,
    mapArrisFailureStatus, mapArrisFailureStatusColor
};