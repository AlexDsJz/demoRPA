/*
__Seed builder__
  AUTO_GENERATED (Read only)
  Modify via builder
*/

export const ACTION_LOG = `
{
  actionLog {
    id
    modelId
    modelName
    action
    value
  }
}
`;

export const SET_ACTION_LOG = `
mutation Set(
  $id: Int!,
  $modelId: Int,
  $modelName: String,
  $action: String,
  $value: GenericScalar,
)
{
  setActionLog(
    id: $id,
    modelId: $modelId,
    modelName: $modelName,
    action: $action,
    value: $value,
  ) {
    actionLog {
      id
      modelId
      modelName
      action
      value
    }
  }
}
`;

export const SAVE_ACTION_LOG = `
mutation Save(
  $modelId: Int!,
  $modelName: String!,
  $action: String!,
  $value: GenericScalar!,
)
{
  saveActionLog(
    modelId: $modelId,
    modelName: $modelName,
    action: $action,
    value: $value,
  ) {
    actionLog {
      id
    }
  }
}
`;

export const DELETE_ACTION_LOG = `
mutation Delete($id: Int!)
{
  deleteActionLog(id: $id)
  {
    id
  }
}
`;

export const APP_INFO = `
{
  appInfo {
    id
    version
  }
}
`;

export const SET_APP_INFO = `
mutation Set(
  $id: Int!,
  $version: String,
)
{
  setAppInfo(
    id: $id,
    version: $version,
  ) {
    appInfo {
      id
      version
    }
  }
}
`;

export const SAVE_APP_INFO = `
mutation Save(
  $version: String!,
)
{
  saveAppInfo(
    version: $version,
  ) {
    appInfo {
      id
    }
  }
}
`;

export const DELETE_APP_INFO = `
mutation Delete($id: Int!)
{
  deleteAppInfo(id: $id)
  {
    id
  }
}
`;

export const ARRIS_CRANE_STATUS = `
{
  arrisCraneStatus {
    id
    type
    name
    status
    arrisForm {
      id
    }
  }
}
`;

export const SET_ARRIS_CRANE_STATUS = `
mutation Set(
  $id: Int!,
  $type: String,
  $name: String,
  $status: String,
  $arrisForm: Int,
)
{
  setArrisCraneStatus(
    id: $id,
    type: $type,
    name: $name,
    status: $status,
    arrisForm: $arrisForm,
  ) {
    arrisCraneStatus {
      id
      type
      name
      status
      arrisForm {
        id
      }
    }
  }
}
`;

export const SAVE_ARRIS_CRANE_STATUS = `
mutation Save(
  $type: String!,
  $name: String!,
  $status: String!,
  $arrisForm: Int!,
)
{
  saveArrisCraneStatus(
    type: $type,
    name: $name,
    status: $status,
    arrisForm: $arrisForm,
  ) {
    arrisCraneStatus {
      id
    }
  }
}
`;

export const DELETE_ARRIS_CRANE_STATUS = `
mutation Delete($id: Int!)
{
  deleteArrisCraneStatus(id: $id)
  {
    id
  }
}
`;

export const ARRIS_FAILURE = `
{
  arrisFailure {
    id
    description
    solution
    status
    solvedReport
    reportedSolved {
      id
    }
    arrisForm {
      id
    }
  }
}
`;

export const SET_ARRIS_FAILURE = `
mutation Set(
  $id: Int!,
  $description: String,
  $solution: String,
  $status: String,
  $solvedReport: Boolean,
  $reportedSolved: Int,
  $arrisForm: Int,
)
{
  setArrisFailure(
    id: $id,
    description: $description,
    solution: $solution,
    status: $status,
    reportedSolved: $reportedSolved,
    arrisForm: $arrisForm,
    solvedReport: $solvedReport,
  ) {
    arrisFailure {
      id
      description
      solution
      status
      solvedReport
      reportedSolved {
        id
      }
      arrisForm {
        id
      }
    }
  }
}
`;

export const SAVE_ARRIS_FAILURE = `
mutation Save(
  $description: String!,
  $solution: String!,
  $status: String!,
  $solvedReport: Boolean!,
  $reportedSolved: Int,
  $arrisForm: Int!,
)
{
  saveArrisFailure(
    description: $description,
    solution: $solution,
    status: $status,
    reportedSolved: $reportedSolved,
    arrisForm: $arrisForm,
    solvedReport: $solvedReport,
  ) {
    arrisFailure {
      id
    }
  }
}
`;

export const DELETE_ARRIS_FAILURE = `
mutation Delete($id: Int!)
{
  deleteArrisFailure(id: $id)
  {
    id
  }
}
`;

export const ARRIS_FILE = `
{
  arrisFile {
    id
    category
    file {
      id
    }
    arrisForm {
      id
    }
  }
}
`;

export const SET_ARRIS_FILE = `
mutation Set(
  $id: Int!,
  $file: Int,
  $category: String,
  $arrisForm: Int,
)
{
  setArrisFile(
    id: $id,
    file: $file,
    category: $category,
    arrisForm: $arrisForm,
  ) {
    arrisFile {
      id
      category
      file {
        id
      }
      arrisForm {
        id
      }
    }
  }
}
`;

export const SAVE_ARRIS_FILE = `
mutation Save(
  $file: Int!,
  $category: String!,
  $arrisForm: Int,
)
{
  saveArrisFile(
    file: $file,
    category: $category,
    arrisForm: $arrisForm,
  ) {
    arrisFile {
      id
    }
  }
}
`;

export const DELETE_ARRIS_FILE = `
mutation Delete($id: Int!)
{
  deleteArrisFile(id: $id)
  {
    id
  }
}
`;

export const ARRIS_FORM = `
{
  arrisForm {
    id
    q1
    q2
    activity
    reasonMissing
    solutionMissing
    onedriveStatus
    status
    date
    operator {
      id
    }
  }
}
`;

export const SET_ARRIS_FORM = `
mutation Set(
  $id: Int!,
  $q1: String,
  $q2: String,
  $activity: String,
  $reasonMissing: String,
  $solutionMissing: String,
  $onedriveStatus: String,
  $status: String,
  $date: DateTime,
  $operator: Int,
)
{
  setArrisForm(
    id: $id,
    q1: $q1,
    q2: $q2,
    activity: $activity,
    reasonMissing: $reasonMissing,
    solutionMissing: $solutionMissing,
    onedriveStatus: $onedriveStatus,
    status: $status,
    operator: $operator,
    date: $date,
  ) {
    arrisForm {
      id
      q1
      q2
      activity
      reasonMissing
      solutionMissing
      onedriveStatus
      status
      date
      operator {
        id
      }
    }
  }
}
`;

export const SAVE_ARRIS_FORM = `
mutation Save(
  $q1: String!,
  $q2: String!,
  $activity: String!,
  $reasonMissing: String!,
  $solutionMissing: String!,
  $onedriveStatus: String!,
  $status: String!,
  $date: DateTime!,
  $operator: Int!,
)
{
  saveArrisForm(
    q1: $q1,
    q2: $q2,
    activity: $activity,
    reasonMissing: $reasonMissing,
    solutionMissing: $solutionMissing,
    onedriveStatus: $onedriveStatus,
    status: $status,
    operator: $operator,
    date: $date,
  ) {
    arrisForm {
      id
    }
  }
}
`;

export const DELETE_ARRIS_FORM = `
mutation Delete($id: Int!)
{
  deleteArrisForm(id: $id)
  {
    id
  }
}
`;

export const ARRIS_OPERATOR = `
{
  arrisOperator {
    id
    active
    turn
    order {
      id
    }
    user {
      id
    }
  }
}
`;

export const SET_ARRIS_OPERATOR = `
mutation Set(
  $id: Int!,
  $active: Boolean,
  $turn: String,
  $order: Int,
  $user: Int,
)
{
  setArrisOperator(
    id: $id,
    active: $active,
    turn: $turn,
    order: $order,
    user: $user,
  ) {
    arrisOperator {
      id
      active
      turn
      order {
        id
      }
      user {
        id
      }
    }
  }
}
`;

export const SAVE_ARRIS_OPERATOR = `
mutation Save(
  $active: Boolean!,
  $turn: String!,
  $order: Int!,
  $user: Int!,
)
{
  saveArrisOperator(
    active: $active,
    turn: $turn,
    order: $order,
    user: $user,
  ) {
    arrisOperator {
      id
    }
  }
}
`;

export const DELETE_ARRIS_OPERATOR = `
mutation Delete($id: Int!)
{
  deleteArrisOperator(id: $id)
  {
    id
  }
}
`;

export const CONTENT = `
{
  content {
    id
    partId
    partName
    items
    quantity
    um
    manual
    suggestRef
    elevationNumber
    shipping {
      id
    }
  }
}
`;

export const SET_CONTENT = `
mutation Set(
  $id: Int!,
  $partId: String,
  $partName: String,
  $items: String,
  $quantity: Int,
  $um: String,
  $manual: Boolean,
  $suggestRef: Int,
  $elevationNumber: Int,
  $shipping: Int,
)
{
  setContent(
    id: $id,
    partId: $partId,
    partName: $partName,
    items: $items,
    quantity: $quantity,
    um: $um,
    manual: $manual,
    shipping: $shipping,
    suggestRef: $suggestRef,
    elevationNumber: $elevationNumber,
  ) {
    content {
      id
      partId
      partName
      items
      quantity
      um
      manual
      suggestRef
      elevationNumber
      shipping {
        id
      }
    }
  }
}
`;

export const SAVE_CONTENT = `
mutation Save(
  $partId: String!,
  $partName: String!,
  $items: String!,
  $quantity: Int!,
  $um: String!,
  $manual: Boolean!,
  $suggestRef: Int,
  $elevationNumber: Int!,
  $shipping: Int!,
)
{
  saveContent(
    partId: $partId,
    partName: $partName,
    items: $items,
    quantity: $quantity,
    um: $um,
    manual: $manual,
    shipping: $shipping,
    suggestRef: $suggestRef,
    elevationNumber: $elevationNumber,
  ) {
    content {
      id
    }
  }
}
`;

export const DELETE_CONTENT = `
mutation Delete($id: Int!)
{
  deleteContent(id: $id)
  {
    id
  }
}
`;

export const CRANE = `
{
  crane {
    id
    craneId
    model
    number
    series
    inUse
    owner
    status
  }
}
`;

export const SET_CRANE = `
mutation Set(
  $id: Int!,
  $craneId: String,
  $model: String,
  $number: String,
  $series: String,
  $inUse: Boolean,
  $owner: String,
  $status: String,
)
{
  setCrane(
    id: $id,
    craneId: $craneId,
    model: $model,
    number: $number,
    series: $series,
    inUse: $inUse,
    owner: $owner,
    status: $status,
  ) {
    crane {
      id
      craneId
      model
      number
      series
      inUse
      owner
      status
    }
  }
}
`;

export const SAVE_CRANE = `
mutation Save(
  $craneId: String!,
  $model: String!,
  $number: String!,
  $series: String!,
  $inUse: Boolean!,
  $owner: String!,
  $status: String!,
)
{
  saveCrane(
    craneId: $craneId,
    model: $model,
    number: $number,
    series: $series,
    inUse: $inUse,
    owner: $owner,
    status: $status,
  ) {
    crane {
      id
    }
  }
}
`;

export const DELETE_CRANE = `
mutation Delete($id: Int!)
{
  deleteCrane(id: $id)
  {
    id
  }
}
`;

export const EVIDENCE = `
{
  evidence {
    id
    flutterPath
    evidenceFile {
      id
    }
    shipping {
      id
    }
    user {
      id
    }
  }
}
`;

export const SET_EVIDENCE = `
mutation Set(
  $id: Int!,
  $evidenceFile: Int,
  $flutterPath: String,
  $shipping: Int,
  $user: Int,
)
{
  setEvidence(
    id: $id,
    evidenceFile: $evidenceFile,
    shipping: $shipping,
    user: $user,
    flutterPath: $flutterPath,
  ) {
    evidence {
      id
      flutterPath
      evidenceFile {
        id
      }
      shipping {
        id
      }
      user {
        id
      }
    }
  }
}
`;

export const SAVE_EVIDENCE = `
mutation Save(
  $evidenceFile: Int!,
  $flutterPath: String!,
  $shipping: Int!,
  $user: Int!,
)
{
  saveEvidence(
    evidenceFile: $evidenceFile,
    shipping: $shipping,
    user: $user,
    flutterPath: $flutterPath,
  ) {
    evidence {
      id
    }
  }
}
`;

export const DELETE_EVIDENCE = `
mutation Delete($id: Int!)
{
  deleteEvidence(id: $id)
  {
    id
  }
}
`;

export const ITEM = `
{
  item {
    id
    name
    description
    reference
    comment
    number
    quantity
    manualPage
    part {
      id
    }
  }
}
`;

export const SET_ITEM = `
mutation Set(
  $id: Int!,
  $name: String,
  $description: String,
  $reference: String,
  $comment: String,
  $number: Int,
  $quantity: String,
  $manualPage: Int,
  $part: Int,
)
{
  setItem(
    id: $id,
    name: $name,
    description: $description,
    reference: $reference,
    comment: $comment,
    number: $number,
    quantity: $quantity,
    manualPage: $manualPage,
    part: $part,
  ) {
    item {
      id
      name
      description
      reference
      comment
      number
      quantity
      manualPage
      part {
        id
      }
    }
  }
}
`;

export const SAVE_ITEM = `
mutation Save(
  $name: String!,
  $description: String!,
  $reference: String,
  $comment: String,
  $number: Int!,
  $quantity: String!,
  $manualPage: Int,
  $part: Int!,
)
{
  saveItem(
    name: $name,
    description: $description,
    reference: $reference,
    comment: $comment,
    number: $number,
    quantity: $quantity,
    manualPage: $manualPage,
    part: $part,
  ) {
    item {
      id
    }
  }
}
`;

export const DELETE_ITEM = `
mutation Delete($id: Int!)
{
  deleteItem(id: $id)
  {
    id
  }
}
`;

export const MAINTENANCE = `
{
  maintenance {
    id
    status
    start
    end
    type
    phase
    crane {
      id
    }
  }
}
`;

export const SET_MAINTENANCE = `
mutation Set(
  $id: Int!,
  $status: String,
  $start: DateTime,
  $end: DateTime,
  $type: String,
  $phase: Int,
  $crane: Int,
)
{
  setMaintenance(
    id: $id,
    crane: $crane,
    status: $status,
    start: $start,
    end: $end,
    type: $type,
    phase: $phase,
  ) {
    maintenance {
      id
      status
      start
      end
      type
      phase
      crane {
        id
      }
    }
  }
}
`;

export const SAVE_MAINTENANCE = `
mutation Save(
  $status: String!,
  $start: DateTime,
  $end: DateTime,
  $type: String!,
  $phase: Int!,
  $crane: Int!,
)
{
  saveMaintenance(
    crane: $crane,
    status: $status,
    start: $start,
    end: $end,
    type: $type,
    phase: $phase,
  ) {
    maintenance {
      id
    }
  }
}
`;

export const DELETE_MAINTENANCE = `
mutation Delete($id: Int!)
{
  deleteMaintenance(id: $id)
  {
    id
  }
}
`;

export const MAINTENANCE_CATEGORY = `
{
  maintenanceCategory {
    id
    name
    craneModel
    type
    phase
  }
}
`;

export const SET_MAINTENANCE_CATEGORY = `
mutation Set(
  $id: Int!,
  $name: String,
  $craneModel: String,
  $type: String,
  $phase: Int,
)
{
  setMaintenanceCategory(
    id: $id,
    name: $name,
    craneModel: $craneModel,
    type: $type,
    phase: $phase,
  ) {
    maintenanceCategory {
      id
      name
      craneModel
      type
      phase
    }
  }
}
`;

export const SAVE_MAINTENANCE_CATEGORY = `
mutation Save(
  $name: String!,
  $craneModel: String!,
  $type: String!,
  $phase: Int!,
)
{
  saveMaintenanceCategory(
    name: $name,
    craneModel: $craneModel,
    type: $type,
    phase: $phase,
  ) {
    maintenanceCategory {
      id
    }
  }
}
`;

export const DELETE_MAINTENANCE_CATEGORY = `
mutation Delete($id: Int!)
{
  deleteMaintenanceCategory(id: $id)
  {
    id
  }
}
`;

export const MAINTENANCE_EVIDENCE = `
{
  maintenanceEvidence {
    id
    skipEvidence
    value
    type {
      id
    }
    maintenance {
      id
    }
  }
}
`;

export const SET_MAINTENANCE_EVIDENCE = `
mutation Set(
  $id: Int!,
  $skipEvidence: Boolean,
  $value: String,
  $type: Int,
  $maintenance: Int,
)
{
  setMaintenanceEvidence(
    id: $id,
    type: $type,
    maintenance: $maintenance,
    skipEvidence: $skipEvidence,
    value: $value,
  ) {
    maintenanceEvidence {
      id
      skipEvidence
      value
      type {
        id
      }
      maintenance {
        id
      }
    }
  }
}
`;

export const SAVE_MAINTENANCE_EVIDENCE = `
mutation Save(
  $skipEvidence: Boolean!,
  $value: String,
  $type: Int!,
  $maintenance: Int!,
)
{
  saveMaintenanceEvidence(
    type: $type,
    maintenance: $maintenance,
    skipEvidence: $skipEvidence,
    value: $value,
  ) {
    maintenanceEvidence {
      id
    }
  }
}
`;

export const DELETE_MAINTENANCE_EVIDENCE = `
mutation Delete($id: Int!)
{
  deleteMaintenanceEvidence(id: $id)
  {
    id
  }
}
`;

export const MAINTENANCE_FILE = `
{
  maintenanceFile {
    id
    file {
      id
    }
    user {
      id
    }
    maintenanceEvidence {
      id
    }
  }
}
`;

export const SET_MAINTENANCE_FILE = `
mutation Set(
  $id: Int!,
  $file: Int,
  $user: Int,
  $maintenanceEvidence: Int,
)
{
  setMaintenanceFile(
    id: $id,
    file: $file,
    user: $user,
    maintenanceEvidence: $maintenanceEvidence,
  ) {
    maintenanceFile {
      id
      file {
        id
      }
      user {
        id
      }
      maintenanceEvidence {
        id
      }
    }
  }
}
`;

export const SAVE_MAINTENANCE_FILE = `
mutation Save(
  $file: Int!,
  $user: Int!,
  $maintenanceEvidence: Int!,
)
{
  saveMaintenanceFile(
    file: $file,
    user: $user,
    maintenanceEvidence: $maintenanceEvidence,
  ) {
    maintenanceFile {
      id
    }
  }
}
`;

export const DELETE_MAINTENANCE_FILE = `
mutation Delete($id: Int!)
{
  deleteMaintenanceFile(id: $id)
  {
    id
  }
}
`;

export const MAINTENANCE_PERMS = `
{
  maintenancePerms {
    id
    estimatedTime
    manuallyEnabled
    category {
      id
    }
    users {
      id
    }
    maintenance {
      id
    }
  }
}
`;

export const SET_MAINTENANCE_PERMS = `
mutation Set(
  $id: Int!,
  $estimatedTime: Float,
  $manuallyEnabled: Boolean,
  $category: Int,
  $users: [Int],
  $maintenance: Int,
)
{
  setMaintenancePerms(
    id: $id,
    category: $category,
    users: $users,
    maintenance: $maintenance,
    estimatedTime: $estimatedTime,
    manuallyEnabled: $manuallyEnabled,
  ) {
    maintenancePerms {
      id
      estimatedTime
      manuallyEnabled
      category {
        id
      }
      users {
        id
      }
      maintenance {
        id
      }
    }
  }
}
`;

export const SAVE_MAINTENANCE_PERMS = `
mutation Save(
  $estimatedTime: Float!,
  $manuallyEnabled: Boolean!,
  $category: Int!,
  $users: [Int],
  $maintenance: Int!,
)
{
  saveMaintenancePerms(
    category: $category,
    users: $users,
    maintenance: $maintenance,
    estimatedTime: $estimatedTime,
    manuallyEnabled: $manuallyEnabled,
  ) {
    maintenancePerms {
      id
    }
  }
}
`;

export const DELETE_MAINTENANCE_PERMS = `
mutation Delete($id: Int!)
{
  deleteMaintenancePerms(id: $id)
  {
    id
  }
}
`;

export const MAINTENANCE_TYPE = `
{
  maintenanceType {
    id
    name
    inputType
    category {
      id
    }
  }
}
`;

export const SET_MAINTENANCE_TYPE = `
mutation Set(
  $id: Int!,
  $name: String,
  $inputType: String,
  $category: Int,
)
{
  setMaintenanceType(
    id: $id,
    name: $name,
    category: $category,
    inputType: $inputType,
  ) {
    maintenanceType {
      id
      name
      inputType
      category {
        id
      }
    }
  }
}
`;

export const SAVE_MAINTENANCE_TYPE = `
mutation Save(
  $name: String!,
  $inputType: String!,
  $category: Int!,
)
{
  saveMaintenanceType(
    name: $name,
    category: $category,
    inputType: $inputType,
  ) {
    maintenanceType {
      id
    }
  }
}
`;

export const DELETE_MAINTENANCE_TYPE = `
mutation Delete($id: Int!)
{
  deleteMaintenanceType(id: $id)
  {
    id
  }
}
`;

export const ONEDRIVE_AUTH = `
{
  onedriveAuth {
    id
    accessToken
    refreshToken
  }
}
`;

export const SET_ONEDRIVE_AUTH = `
mutation Set(
  $id: Int!,
  $accessToken: String,
  $refreshToken: String,
)
{
  setOnedriveAuth(
    id: $id,
    accessToken: $accessToken,
    refreshToken: $refreshToken,
  ) {
    onedriveAuth {
      id
      accessToken
      refreshToken
    }
  }
}
`;

export const SAVE_ONEDRIVE_AUTH = `
mutation Save(
  $accessToken: String!,
  $refreshToken: String!,
)
{
  saveOnedriveAuth(
    accessToken: $accessToken,
    refreshToken: $refreshToken,
  ) {
    onedriveAuth {
      id
    }
  }
}
`;

export const DELETE_ONEDRIVE_AUTH = `
mutation Delete($id: Int!)
{
  deleteOnedriveAuth(id: $id)
  {
    id
  }
}
`;

export const OPERATION = `
{
  operation {
    id
    checked
    type
    itemChecked
    comment
    content {
      id
    }
    user {
      id
    }
  }
}
`;

export const SET_OPERATION = `
mutation Set(
  $id: Int!,
  $checked: Boolean,
  $type: String,
  $itemChecked: String,
  $comment: String,
  $content: Int,
  $user: Int,
)
{
  setOperation(
    id: $id,
    checked: $checked,
    type: $type,
    itemChecked: $itemChecked,
    comment: $comment,
    content: $content,
    user: $user,
  ) {
    operation {
      id
      checked
      type
      itemChecked
      comment
      content {
        id
      }
      user {
        id
      }
    }
  }
}
`;

export const SAVE_OPERATION = `
mutation Save(
  $checked: Boolean!,
  $type: String!,
  $itemChecked: String!,
  $comment: String!,
  $content: Int!,
  $user: Int!,
)
{
  saveOperation(
    checked: $checked,
    type: $type,
    itemChecked: $itemChecked,
    comment: $comment,
    content: $content,
    user: $user,
  ) {
    operation {
      id
    }
  }
}
`;

export const DELETE_OPERATION = `
mutation Delete($id: Int!)
{
  deleteOperation(id: $id)
  {
    id
  }
}
`;

export const ORDER = `
{
  order {
    id
    clientName
    buildingName
    buildingStreet
    buildingCity
    buildingState
    buildingAddress
    contactName
    contactPhone
    contactEmail
    feetModel
    diceSize
    requestingTrader
    comments
    modelReference
    craneVersion
    orderVersion
    configuration
    elevations
    mountingDate
    rentPeriod
    elevationsNumber
    transportNumber
    hasPowerLift
    hasCabin
    hasRadioControl
    hasCageMounting
    hasRemoteControl
    boomLength
    towerHeight
    finalHeight
    insuranceResponsable
    forwardingSystem
    status
    feetType
    baseType
    applicant {
      id
    }
    crane {
      id
    }
  }
}
`;

export const SET_ORDER = `
mutation Set(
  $id: Int!,
  $clientName: String,
  $buildingName: String,
  $buildingStreet: String,
  $buildingCity: String,
  $buildingState: String,
  $buildingAddress: String,
  $contactName: String,
  $contactPhone: String,
  $contactEmail: String,
  $feetModel: String,
  $diceSize: String,
  $requestingTrader: String,
  $comments: String,
  $modelReference: String,
  $craneVersion: String,
  $orderVersion: String,
  $configuration: String,
  $elevations: String,
  $mountingDate: DateTime,
  $rentPeriod: Int,
  $elevationsNumber: Int,
  $transportNumber: Int,
  $hasPowerLift: Boolean,
  $hasCabin: Boolean,
  $hasRadioControl: Boolean,
  $hasCageMounting: Boolean,
  $hasRemoteControl: Boolean,
  $boomLength: Float,
  $towerHeight: Float,
  $finalHeight: Float,
  $insuranceResponsable: String,
  $forwardingSystem: String,
  $status: String,
  $feetType: String,
  $baseType: String,
  $applicant: Int,
  $crane: Int,
)
{
  setOrder(
    id: $id,
    clientName: $clientName,
    buildingName: $buildingName,
    buildingStreet: $buildingStreet,
    buildingCity: $buildingCity,
    buildingState: $buildingState,
    buildingAddress: $buildingAddress,
    contactName: $contactName,
    contactPhone: $contactPhone,
    contactEmail: $contactEmail,
    feetModel: $feetModel,
    diceSize: $diceSize,
    requestingTrader: $requestingTrader,
    applicant: $applicant,
    comments: $comments,
    modelReference: $modelReference,
    craneVersion: $craneVersion,
    orderVersion: $orderVersion,
    configuration: $configuration,
    elevations: $elevations,
    mountingDate: $mountingDate,
    rentPeriod: $rentPeriod,
    elevationsNumber: $elevationsNumber,
    transportNumber: $transportNumber,
    hasPowerLift: $hasPowerLift,
    hasCabin: $hasCabin,
    hasRadioControl: $hasRadioControl,
    hasCageMounting: $hasCageMounting,
    hasRemoteControl: $hasRemoteControl,
    boomLength: $boomLength,
    towerHeight: $towerHeight,
    finalHeight: $finalHeight,
    insuranceResponsable: $insuranceResponsable,
    forwardingSystem: $forwardingSystem,
    status: $status,
    feetType: $feetType,
    baseType: $baseType,
    crane: $crane,
  ) {
    order {
      id
      clientName
      buildingName
      buildingStreet
      buildingCity
      buildingState
      buildingAddress
      contactName
      contactPhone
      contactEmail
      feetModel
      diceSize
      requestingTrader
      comments
      modelReference
      craneVersion
      orderVersion
      configuration
      elevations
      mountingDate
      rentPeriod
      elevationsNumber
      transportNumber
      hasPowerLift
      hasCabin
      hasRadioControl
      hasCageMounting
      hasRemoteControl
      boomLength
      towerHeight
      finalHeight
      insuranceResponsable
      forwardingSystem
      status
      feetType
      baseType
      applicant {
        id
      }
      crane {
        id
      }
    }
  }
}
`;

export const SAVE_ORDER = `
mutation Save(
  $clientName: String!,
  $buildingName: String!,
  $buildingStreet: String,
  $buildingCity: String,
  $buildingState: String,
  $buildingAddress: String!,
  $contactName: String!,
  $contactPhone: String!,
  $contactEmail: String!,
  $feetModel: String!,
  $diceSize: String!,
  $requestingTrader: String,
  $comments: String!,
  $modelReference: String!,
  $craneVersion: String!,
  $orderVersion: String!,
  $configuration: String!,
  $elevations: String!,
  $mountingDate: DateTime!,
  $rentPeriod: Int!,
  $elevationsNumber: Int!,
  $transportNumber: Int!,
  $hasPowerLift: Boolean!,
  $hasCabin: Boolean!,
  $hasRadioControl: Boolean!,
  $hasCageMounting: Boolean!,
  $hasRemoteControl: Boolean!,
  $boomLength: Float!,
  $towerHeight: Float!,
  $finalHeight: Float!,
  $insuranceResponsable: String!,
  $forwardingSystem: String!,
  $status: String!,
  $feetType: String!,
  $baseType: String!,
  $applicant: Int,
  $crane: Int,
)
{
  saveOrder(
    clientName: $clientName,
    buildingName: $buildingName,
    buildingStreet: $buildingStreet,
    buildingCity: $buildingCity,
    buildingState: $buildingState,
    buildingAddress: $buildingAddress,
    contactName: $contactName,
    contactPhone: $contactPhone,
    contactEmail: $contactEmail,
    feetModel: $feetModel,
    diceSize: $diceSize,
    requestingTrader: $requestingTrader,
    applicant: $applicant,
    comments: $comments,
    modelReference: $modelReference,
    craneVersion: $craneVersion,
    orderVersion: $orderVersion,
    configuration: $configuration,
    elevations: $elevations,
    mountingDate: $mountingDate,
    rentPeriod: $rentPeriod,
    elevationsNumber: $elevationsNumber,
    transportNumber: $transportNumber,
    hasPowerLift: $hasPowerLift,
    hasCabin: $hasCabin,
    hasRadioControl: $hasRadioControl,
    hasCageMounting: $hasCageMounting,
    hasRemoteControl: $hasRemoteControl,
    boomLength: $boomLength,
    towerHeight: $towerHeight,
    finalHeight: $finalHeight,
    insuranceResponsable: $insuranceResponsable,
    forwardingSystem: $forwardingSystem,
    status: $status,
    feetType: $feetType,
    baseType: $baseType,
    crane: $crane,
  ) {
    order {
      id
    }
  }
}
`;

export const DELETE_ORDER = `
mutation Delete($id: Int!)
{
  deleteOrder(id: $id)
  {
    id
  }
}
`;

export const PART = `
{
  part {
    id
    craneModel
    partId
    name
    um
  }
}
`;

export const SET_PART = `
mutation Set(
  $id: Int!,
  $craneModel: String,
  $partId: String,
  $name: String,
  $um: String,
)
{
  setPart(
    id: $id,
    craneModel: $craneModel,
    partId: $partId,
    name: $name,
    um: $um,
  ) {
    part {
      id
      craneModel
      partId
      name
      um
    }
  }
}
`;

export const SAVE_PART = `
mutation Save(
  $craneModel: String!,
  $partId: String!,
  $name: String!,
  $um: String,
)
{
  savePart(
    craneModel: $craneModel,
    partId: $partId,
    name: $name,
    um: $um,
  ) {
    part {
      id
    }
  }
}
`;

export const DELETE_PART = `
mutation Delete($id: Int!)
{
  deletePart(id: $id)
  {
    id
  }
}
`;

export const SECURITY_CATEGORY = `
{
  securityCategory {
    id
    name
    partId
    craneModel
    isDeviation
    isInitial
  }
}
`;

export const SET_SECURITY_CATEGORY = `
mutation Set(
  $id: Int!,
  $name: String,
  $partId: String,
  $craneModel: String,
  $isDeviation: Boolean,
  $isInitial: Boolean,
)
{
  setSecurityCategory(
    id: $id,
    name: $name,
    partId: $partId,
    craneModel: $craneModel,
    isDeviation: $isDeviation,
    isInitial: $isInitial,
  ) {
    securityCategory {
      id
      name
      partId
      craneModel
      isDeviation
      isInitial
    }
  }
}
`;

export const SAVE_SECURITY_CATEGORY = `
mutation Save(
  $name: String!,
  $partId: String!,
  $craneModel: String!,
  $isDeviation: Boolean!,
  $isInitial: Boolean!,
)
{
  saveSecurityCategory(
    name: $name,
    partId: $partId,
    craneModel: $craneModel,
    isDeviation: $isDeviation,
    isInitial: $isInitial,
  ) {
    securityCategory {
      id
    }
  }
}
`;

export const DELETE_SECURITY_CATEGORY = `
mutation Delete($id: Int!)
{
  deleteSecurityCategory(id: $id)
  {
    id
  }
}
`;

export const SECURITY_CHECK = `
{
  securityCheck {
    id
    value
    isDeviation
    deviationValue
    findings
    corrections
    date
    scpLiberation
    securityCheckType {
      id
    }
    securityRevision {
      id
    }
    user {
      id
    }
  }
}
`;

export const SET_SECURITY_CHECK = `
mutation Set(
  $id: Int!,
  $value: String,
  $isDeviation: Boolean,
  $deviationValue: String,
  $findings: String,
  $corrections: String,
  $date: DateTime,
  $scpLiberation: String,
  $securityCheckType: Int,
  $securityRevision: Int,
  $user: Int,
)
{
  setSecurityCheck(
    id: $id,
    value: $value,
    securityCheckType: $securityCheckType,
    securityRevision: $securityRevision,
    user: $user,
    isDeviation: $isDeviation,
    deviationValue: $deviationValue,
    findings: $findings,
    corrections: $corrections,
    date: $date,
    scpLiberation: $scpLiberation,
  ) {
    securityCheck {
      id
      value
      isDeviation
      deviationValue
      findings
      corrections
      date
      scpLiberation
      securityCheckType {
        id
      }
      securityRevision {
        id
      }
      user {
        id
      }
    }
  }
}
`;

export const SAVE_SECURITY_CHECK = `
mutation Save(
  $value: String!,
  $isDeviation: Boolean!,
  $deviationValue: String!,
  $findings: String!,
  $corrections: String!,
  $date: DateTime,
  $scpLiberation: String!,
  $securityCheckType: Int!,
  $securityRevision: Int!,
  $user: Int,
)
{
  saveSecurityCheck(
    value: $value,
    securityCheckType: $securityCheckType,
    securityRevision: $securityRevision,
    user: $user,
    isDeviation: $isDeviation,
    deviationValue: $deviationValue,
    findings: $findings,
    corrections: $corrections,
    date: $date,
    scpLiberation: $scpLiberation,
  ) {
    securityCheck {
      id
    }
  }
}
`;

export const DELETE_SECURITY_CHECK = `
mutation Delete($id: Int!)
{
  deleteSecurityCheck(id: $id)
  {
    id
  }
}
`;

export const SECURITY_CHECK_TYPE = `
{
  securityCheckType {
    id
    number
    name
    securityCategory {
      id
    }
  }
}
`;

export const SET_SECURITY_CHECK_TYPE = `
mutation Set(
  $id: Int!,
  $number: Float,
  $name: String,
  $securityCategory: Int,
)
{
  setSecurityCheckType(
    id: $id,
    number: $number,
    name: $name,
    securityCategory: $securityCategory,
  ) {
    securityCheckType {
      id
      number
      name
      securityCategory {
        id
      }
    }
  }
}
`;

export const SAVE_SECURITY_CHECK_TYPE = `
mutation Save(
  $number: Float!,
  $name: String!,
  $securityCategory: Int!,
)
{
  saveSecurityCheckType(
    number: $number,
    name: $name,
    securityCategory: $securityCategory,
  ) {
    securityCheckType {
      id
    }
  }
}
`;

export const DELETE_SECURITY_CHECK_TYPE = `
mutation Delete($id: Int!)
{
  deleteSecurityCheckType(id: $id)
  {
    id
  }
}
`;

export const SECURITY_REVISION = `
{
  securityRevision {
    id
    craneModel
    active
    type
    status
    initDate
    endDate
    order {
      id
    }
  }
}
`;

export const SET_SECURITY_REVISION = `
mutation Set(
  $id: Int!,
  $craneModel: String,
  $active: Boolean,
  $type: String,
  $status: String,
  $initDate: DateTime,
  $endDate: DateTime,
  $order: Int,
)
{
  setSecurityRevision(
    id: $id,
    craneModel: $craneModel,
    active: $active,
    order: $order,
    type: $type,
    status: $status,
    initDate: $initDate,
    endDate: $endDate,
  ) {
    securityRevision {
      id
      craneModel
      active
      type
      status
      initDate
      endDate
      order {
        id
      }
    }
  }
}
`;

export const SAVE_SECURITY_REVISION = `
mutation Save(
  $craneModel: String!,
  $active: Boolean!,
  $type: String!,
  $status: String!,
  $initDate: DateTime,
  $endDate: DateTime,
  $order: Int,
)
{
  saveSecurityRevision(
    craneModel: $craneModel,
    active: $active,
    order: $order,
    type: $type,
    status: $status,
    initDate: $initDate,
    endDate: $endDate,
  ) {
    securityRevision {
      id
    }
  }
}
`;

export const DELETE_SECURITY_REVISION = `
mutation Delete($id: Int!)
{
  deleteSecurityRevision(id: $id)
  {
    id
  }
}
`;

export const SHIPPING = `
{
  shipping {
    id
    truckPlate
    transportPlate
    transportPhone
    transportOtherPhone
    transportCarrierName
    transportCompany
    deliveryDate
    status
    type
    order {
      id
    }
  }
}
`;

export const SET_SHIPPING = `
mutation Set(
  $id: Int!,
  $truckPlate: String,
  $transportPlate: String,
  $transportPhone: String,
  $transportOtherPhone: String,
  $transportCarrierName: String,
  $transportCompany: String,
  $deliveryDate: DateTime,
  $status: String,
  $type: String,
  $order: Int,
)
{
  setShipping(
    id: $id,
    truckPlate: $truckPlate,
    transportPlate: $transportPlate,
    transportPhone: $transportPhone,
    transportOtherPhone: $transportOtherPhone,
    transportCarrierName: $transportCarrierName,
    transportCompany: $transportCompany,
    deliveryDate: $deliveryDate,
    status: $status,
    type: $type,
    order: $order,
  ) {
    shipping {
      id
      truckPlate
      transportPlate
      transportPhone
      transportOtherPhone
      transportCarrierName
      transportCompany
      deliveryDate
      status
      type
      order {
        id
      }
    }
  }
}
`;

export const SAVE_SHIPPING = `
mutation Save(
  $truckPlate: String,
  $transportPlate: String!,
  $transportPhone: String!,
  $transportOtherPhone: String!,
  $transportCarrierName: String,
  $transportCompany: String,
  $deliveryDate: DateTime!,
  $status: String!,
  $type: String!,
  $order: Int!,
)
{
  saveShipping(
    truckPlate: $truckPlate,
    transportPlate: $transportPlate,
    transportPhone: $transportPhone,
    transportOtherPhone: $transportOtherPhone,
    transportCarrierName: $transportCarrierName,
    transportCompany: $transportCompany,
    deliveryDate: $deliveryDate,
    status: $status,
    type: $type,
    order: $order,
  ) {
    shipping {
      id
    }
  }
}
`;

export const DELETE_SHIPPING = `
mutation Delete($id: Int!)
{
  deleteShipping(id: $id)
  {
    id
  }
}
`;

export const SUGGESTION = `
{
  suggestion {
    id
    quantity
    elevationNumber
    shipping {
      id
    }
    part {
      id
    }
    order {
      id
    }
  }
}
`;

export const SET_SUGGESTION = `
mutation Set(
  $id: Int!,
  $quantity: Int,
  $elevationNumber: Int,
  $shipping: Int,
  $part: Int,
  $order: Int,
)
{
  setSuggestion(
    id: $id,
    quantity: $quantity,
    shipping: $shipping,
    part: $part,
    order: $order,
    elevationNumber: $elevationNumber,
  ) {
    suggestion {
      id
      quantity
      elevationNumber
      shipping {
        id
      }
      part {
        id
      }
      order {
        id
      }
    }
  }
}
`;

export const SAVE_SUGGESTION = `
mutation Save(
  $quantity: Int!,
  $elevationNumber: Int!,
  $shipping: Int,
  $part: Int!,
  $order: Int!,
)
{
  saveSuggestion(
    quantity: $quantity,
    shipping: $shipping,
    part: $part,
    order: $order,
    elevationNumber: $elevationNumber,
  ) {
    suggestion {
      id
    }
  }
}
`;

export const DELETE_SUGGESTION = `
mutation Delete($id: Int!)
{
  deleteSuggestion(id: $id)
  {
    id
  }
}
`;

export const USER = `
{
  user {
    id
    username
    firstName
    lastName
    email
    isActive
    rol
    phone
    shippingNotification
    orderNotification
    arrisNotification
  }
}
`;

export const SET_USER = `
mutation Set(
  $id: Int!,
  $username: String,
  $firstName: String,
  $lastName: String,
  $email: String,
  $isActive: Boolean,
  $password: String,
  $rol: String,
  $phone: String,
  $shippingNotification: Boolean,
  $orderNotification: Boolean,
  $arrisNotification: Boolean,
)
{
  setUser(
    id: $id,
    username: $username,
    firstName: $firstName,
    lastName: $lastName,
    email: $email,
    isActive: $isActive,
    password: $password,
    rol: $rol,
    phone: $phone,
    shippingNotification: $shippingNotification,
    orderNotification: $orderNotification,
    arrisNotification: $arrisNotification,
  ) {
    user {
      id
      username
      firstName
      lastName
      email
      isActive
      rol
      phone
      shippingNotification
      orderNotification
      arrisNotification
    }
  }
}
`;

export const SAVE_USER = `
mutation Save(
  $username: String!,
  $firstName: String!,
  $lastName: String!,
  $email: String!,
  $isActive: Boolean!,
  $password: String!,
  $rol: String!,
  $phone: String!,
  $shippingNotification: Boolean!,
  $orderNotification: Boolean!,
  $arrisNotification: Boolean!,
)
{
  saveUser(
    username: $username,
    firstName: $firstName,
    lastName: $lastName,
    email: $email,
    isActive: $isActive,
    password: $password,
    rol: $rol,
    phone: $phone,
    shippingNotification: $shippingNotification,
    orderNotification: $orderNotification,
    arrisNotification: $arrisNotification,
  ) {
    user {
      id
    }
  }
}
`;

export const DELETE_USER = `
mutation Delete($id: Int!)
{
  deleteUser(id: $id)
  {
    id
  }
}
`;