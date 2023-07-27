const GQL_ACTION_LOG_ = {
    modelId: 128,
    modelName: "",
    action: "CREATE",
    value: "{}",
}
export const GQL_ACTION_LOG = {
    actionLog: GQL_ACTION_LOG_
}
export const GQL_ACTION_LOGS = {
    actionLogs: [ GQL_ACTION_LOG_ ]
}
export const GQL_ACTION_LOG_PAGINATION = {
    actionLogPagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        actionLogs: [ GQL_ACTION_LOG_ ]
    }
}

export const API_ACTION_LOG = {
    model_id: 128,
    model_name: "",
    action: "CREATE",
    value: "{}",
}
export const API_ACTION_LOGS = [API_ACTION_LOG]

const GQL_APP_INFO_ = {
    version: "",
}
export const GQL_APP_INFO = {
    appInfo: GQL_APP_INFO_
}
export const GQL_APP_INFOS = {
    appInfos: [ GQL_APP_INFO_ ]
}
export const GQL_APP_INFO_PAGINATION = {
    appInfoPagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        appInfos: [ GQL_APP_INFO_ ]
    }
}

export const API_APP_INFO = {
    version: "",
}
export const API_APP_INFOS = [API_APP_INFO]

const GQL_ARRIS_CRANE_STATUS_ = {
    type: "",
    name: "",
    status: "OK",
    arrisForm:  { id: 1},
}
export const GQL_ARRIS_CRANE_STATUS = {
    arrisCraneStatus: GQL_ARRIS_CRANE_STATUS_
}
export const GQL_ARRIS_CRANE_STATUSES = {
    arrisCraneStatuses: [ GQL_ARRIS_CRANE_STATUS_ ]
}
export const GQL_ARRIS_CRANE_STATUS_PAGINATION = {
    arrisCraneStatusPagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        arrisCraneStatuses: [ GQL_ARRIS_CRANE_STATUS_ ]
    }
}

export const API_ARRIS_CRANE_STATUS = {
    type: "",
    name: "",
    status: "OK",
    arris_form_id:  1,
}
export const API_ARRIS_CRANE_STATUSES = [API_ARRIS_CRANE_STATUS]

const GQL_ARRIS_FAILURE_ = {
    description: "",
    solution: "",
    status: "REPORTED",
    reportedSolved:  { id: 1},
    arrisForm:  { id: 1},
    solvedReport: false,
    evidences: [{ url: "" }],
}
export const GQL_ARRIS_FAILURE = {
    arrisFailure: GQL_ARRIS_FAILURE_
}
export const GQL_ARRIS_FAILURES = {
    arrisFailures: [ GQL_ARRIS_FAILURE_ ]
}
export const GQL_ARRIS_FAILURE_PAGINATION = {
    arrisFailurePagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        arrisFailures: [ GQL_ARRIS_FAILURE_ ]
    }
}

export const API_ARRIS_FAILURE = {
    description: "",
    solution: "",
    status: "REPORTED",
    reported_solved_id:  1,
    arris_form_id:  1,
    solved_report: false,
    evidence_ids: [1],
}
export const API_ARRIS_FAILURES = [API_ARRIS_FAILURE]

const GQL_ARRIS_FILE_ = {
    file: { url: "" },
    category: "LIMPIEZA_PIE",
    arrisForm:  { id: 1},
}
export const GQL_ARRIS_FILE = {
    arrisFile: GQL_ARRIS_FILE_
}
export const GQL_ARRIS_FILES = {
    arrisFiles: [ GQL_ARRIS_FILE_ ]
}
export const GQL_ARRIS_FILE_PAGINATION = {
    arrisFilePagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        arrisFiles: [ GQL_ARRIS_FILE_ ]
    }
}

export const API_ARRIS_FILE = {
    file_id: 1,
    category: "LIMPIEZA_PIE",
    arris_form_id:  1,
}
export const API_ARRIS_FILES = [API_ARRIS_FILE]

const GQL_ARRIS_FORM_ = {
    q1: "",
    q2: "",
    activity: "",
    reasonMissing: "",
    solutionMissing: "",
    onedriveStatus: "PENDING",
    status: "SENT",
    binnacles: [{ url: "" }],
    evidences: [ { id: 1} ],
    operator:  { id: 1},
    craneStatus: [ { id: 1} ],
    failures: [ { id: 1} ],
    date: "2020-01-01T12:00:00+00:00",
}
export const GQL_ARRIS_FORM = {
    arrisForm: GQL_ARRIS_FORM_
}
export const GQL_ARRIS_FORMS = {
    arrisForms: [ GQL_ARRIS_FORM_ ]
}
export const GQL_ARRIS_FORM_PAGINATION = {
    arrisFormPagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        arrisForms: [ GQL_ARRIS_FORM_ ]
    }
}

export const API_ARRIS_FORM = {
    q1: "",
    q2: "",
    activity: "",
    reason_missing: "",
    solution_missing: "",
    onedrive_status: "PENDING",
    status: "SENT",
    binnacle_ids: [1],
    evidence_ids: [1],
    operator_id:  1,
    crane_status_ids: [1],
    failure_ids: [1],
    date: "2020-01-01T12:00:00+00:00",
}
export const API_ARRIS_FORMS = [API_ARRIS_FORM]

const GQL_ARRIS_OPERATOR_ = {
    active: false,
    turn: "FIRST",
    order:  { id: 1},
    user:  { id: 1},
}
export const GQL_ARRIS_OPERATOR = {
    arrisOperator: GQL_ARRIS_OPERATOR_
}
export const GQL_ARRIS_OPERATORS = {
    arrisOperators: [ GQL_ARRIS_OPERATOR_ ]
}
export const GQL_ARRIS_OPERATOR_PAGINATION = {
    arrisOperatorPagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        arrisOperators: [ GQL_ARRIS_OPERATOR_ ]
    }
}

export const API_ARRIS_OPERATOR = {
    active: false,
    turn: "FIRST",
    order_id:  1,
    user_id:  1,
}
export const API_ARRIS_OPERATORS = [API_ARRIS_OPERATOR]

const GQL_CONTENT_ = {
    partId: "",
    partName: "",
    items: "",
    quantity: 128,
    um: "",
    manual: false,
    images: [{ url: "" }],
    shipping:  { id: 1},
    operations: [ { id: 1} ],
    suggestRef: 128,
    elevationNumber: 128,
}
export const GQL_CONTENT = {
    content: GQL_CONTENT_
}
export const GQL_CONTENTS = {
    contents: [ GQL_CONTENT_ ]
}
export const GQL_CONTENT_PAGINATION = {
    contentPagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        contents: [ GQL_CONTENT_ ]
    }
}

export const API_CONTENT = {
    part_id: "",
    part_name: "",
    items: "",
    quantity: 128,
    um: "",
    manual: false,
    image_ids: [1],
    shipping_id:  1,
    operation_ids: [1],
    suggest_ref: 128,
    elevation_number: 128,
}
export const API_CONTENTS = [API_CONTENT]

const GQL_CRANE_ = {
    craneId: "",
    model: "",
    number: "",
    series: "",
    inUse: false,
    owner: "GROKE",
    status: "NA",
}
export const GQL_CRANE = {
    crane: GQL_CRANE_
}
export const GQL_CRANES = {
    cranes: [ GQL_CRANE_ ]
}
export const GQL_CRANE_PAGINATION = {
    cranePagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        cranes: [ GQL_CRANE_ ]
    }
}

export const API_CRANE = {
    crane_id: "",
    model: "",
    number: "",
    series: "",
    in_use: false,
    owner: "GROKE",
    status: "NA",
}
export const API_CRANES = [API_CRANE]

const GQL_EVIDENCE_ = {
    evidenceFile: { url: "" },
    shipping:  { id: 1},
    user:  { id: 1},
    flutterPath: "",
}
export const GQL_EVIDENCE = {
    evidence: GQL_EVIDENCE_
}
export const GQL_EVIDENCES = {
    evidences: [ GQL_EVIDENCE_ ]
}
export const GQL_EVIDENCE_PAGINATION = {
    evidencePagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        evidences: [ GQL_EVIDENCE_ ]
    }
}

export const API_EVIDENCE = {
    evidence_file_id: 1,
    shipping_id:  1,
    user_id:  1,
    flutter_path: "",
}
export const API_EVIDENCES = [API_EVIDENCE]

const GQL_ITEM_ = {
    name: "",
    description: "",
    reference: "",
    comment: "",
    number: 128,
    quantity: "",
    manualPage: 128,
    part:  { id: 1},
}
export const GQL_ITEM = {
    item: GQL_ITEM_
}
export const GQL_ITEMS = {
    items: [ GQL_ITEM_ ]
}
export const GQL_ITEM_PAGINATION = {
    itemPagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        items: [ GQL_ITEM_ ]
    }
}

export const API_ITEM = {
    name: "",
    description: "",
    reference: "",
    comment: "",
    number: 128,
    quantity: "",
    manual_page: 128,
    part_id:  1,
}
export const API_ITEMS = [API_ITEM]

const GQL_MAINTENANCE_ = {
    crane:  { id: 1},
    evidences: [ { id: 1} ],
    status: "ACTIVE",
    start: "2020-01-01T12:00:00+00:00",
    end: "2020-01-01T12:00:00+00:00",
    type: "NORMAL",
    phase: 128,
}
export const GQL_MAINTENANCE = {
    maintenance: GQL_MAINTENANCE_
}
export const GQL_MAINTENANCES = {
    maintenances: [ GQL_MAINTENANCE_ ]
}
export const GQL_MAINTENANCE_PAGINATION = {
    maintenancePagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        maintenances: [ GQL_MAINTENANCE_ ]
    }
}

export const API_MAINTENANCE = {
    crane_id:  1,
    evidence_ids: [1],
    status: "ACTIVE",
    start: "2020-01-01T12:00:00+00:00",
    end: "2020-01-01T12:00:00+00:00",
    type: "NORMAL",
    phase: 128,
}
export const API_MAINTENANCES = [API_MAINTENANCE]

const GQL_MAINTENANCE_CATEGORY_ = {
    name: "",
    craneModel: "",
    type: "NORMAL",
    phase: 128,
}
export const GQL_MAINTENANCE_CATEGORY = {
    maintenanceCategory: GQL_MAINTENANCE_CATEGORY_
}
export const GQL_MAINTENANCE_CATEGORIES = {
    maintenanceCategories: [ GQL_MAINTENANCE_CATEGORY_ ]
}
export const GQL_MAINTENANCE_CATEGORY_PAGINATION = {
    maintenanceCategoryPagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        maintenanceCategories: [ GQL_MAINTENANCE_CATEGORY_ ]
    }
}

export const API_MAINTENANCE_CATEGORY = {
    name: "",
    crane_model: "",
    type: "NORMAL",
    phase: 128,
}
export const API_MAINTENANCE_CATEGORIES = [API_MAINTENANCE_CATEGORY]

const GQL_MAINTENANCE_EVIDENCE_ = {
    file: [ { id: 1} ],
    type:  { id: 1},
    maintenance:  { id: 1},
    skipEvidence: false,
    value: "",
}
export const GQL_MAINTENANCE_EVIDENCE = {
    maintenanceEvidence: GQL_MAINTENANCE_EVIDENCE_
}
export const GQL_MAINTENANCE_EVIDENCES = {
    maintenanceEvidences: [ GQL_MAINTENANCE_EVIDENCE_ ]
}
export const GQL_MAINTENANCE_EVIDENCE_PAGINATION = {
    maintenanceEvidencePagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        maintenanceEvidences: [ GQL_MAINTENANCE_EVIDENCE_ ]
    }
}

export const API_MAINTENANCE_EVIDENCE = {
    file_ids: [1],
    type_id:  1,
    maintenance_id:  1,
    skip_evidence: false,
    value: "",
}
export const API_MAINTENANCE_EVIDENCES = [API_MAINTENANCE_EVIDENCE]

const GQL_MAINTENANCE_FILE_ = {
    file: { url: "" },
    user:  { id: 1},
    maintenanceEvidence:  { id: 1},
}
export const GQL_MAINTENANCE_FILE = {
    maintenanceFile: GQL_MAINTENANCE_FILE_
}
export const GQL_MAINTENANCE_FILES = {
    maintenanceFiles: [ GQL_MAINTENANCE_FILE_ ]
}
export const GQL_MAINTENANCE_FILE_PAGINATION = {
    maintenanceFilePagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        maintenanceFiles: [ GQL_MAINTENANCE_FILE_ ]
    }
}

export const API_MAINTENANCE_FILE = {
    file_id: 1,
    user_id:  1,
    maintenance_evidence_id:  1,
}
export const API_MAINTENANCE_FILES = [API_MAINTENANCE_FILE]

const GQL_MAINTENANCE_PERMS_ = {
    category:  { id: 1},
    users: [ { id: 1} ],
    maintenance:  { id: 1},
    estimatedTime: 128.0,
    manuallyEnabled: false,
}
export const GQL_MAINTENANCE_PERMS = {
    maintenancePerms: GQL_MAINTENANCE_PERMS_
}
export const GQL_MAINTENANCE_PERMSES = {
    maintenancePermses: [ GQL_MAINTENANCE_PERMS_ ]
}
export const GQL_MAINTENANCE_PERMS_PAGINATION = {
    maintenancePermsPagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        maintenancePermses: [ GQL_MAINTENANCE_PERMS_ ]
    }
}

export const API_MAINTENANCE_PERMS = {
    category_id:  1,
    user_ids: [1],
    maintenance_id:  1,
    estimated_time: 128.0,
    manually_enabled: false,
}
export const API_MAINTENANCE_PERMSES = [API_MAINTENANCE_PERMS]

const GQL_MAINTENANCE_TYPE_ = {
    name: "",
    category:  { id: 1},
    inputType: "FILE",
}
export const GQL_MAINTENANCE_TYPE = {
    maintenanceType: GQL_MAINTENANCE_TYPE_
}
export const GQL_MAINTENANCE_TYPES = {
    maintenanceTypes: [ GQL_MAINTENANCE_TYPE_ ]
}
export const GQL_MAINTENANCE_TYPE_PAGINATION = {
    maintenanceTypePagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        maintenanceTypes: [ GQL_MAINTENANCE_TYPE_ ]
    }
}

export const API_MAINTENANCE_TYPE = {
    name: "",
    category_id:  1,
    input_type: "FILE",
}
export const API_MAINTENANCE_TYPES = [API_MAINTENANCE_TYPE]

const GQL_ONEDRIVE_AUTH_ = {
    accessToken: "",
    refreshToken: "",
}
export const GQL_ONEDRIVE_AUTH = {
    onedriveAuth: GQL_ONEDRIVE_AUTH_
}
export const GQL_ONEDRIVE_AUTHS = {
    onedriveAuths: [ GQL_ONEDRIVE_AUTH_ ]
}
export const GQL_ONEDRIVE_AUTH_PAGINATION = {
    onedriveAuthPagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        onedriveAuths: [ GQL_ONEDRIVE_AUTH_ ]
    }
}

export const API_ONEDRIVE_AUTH = {
    access_token: "",
    refresh_token: "",
}
export const API_ONEDRIVE_AUTHS = [API_ONEDRIVE_AUTH]

const GQL_OPERATION_ = {
    checked: false,
    type: "CHECK",
    itemChecked: "",
    comment: "",
    content:  { id: 1},
    user:  { id: 1},
}
export const GQL_OPERATION = {
    operation: GQL_OPERATION_
}
export const GQL_OPERATIONS = {
    operations: [ GQL_OPERATION_ ]
}
export const GQL_OPERATION_PAGINATION = {
    operationPagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        operations: [ GQL_OPERATION_ ]
    }
}

export const API_OPERATION = {
    checked: false,
    type: "CHECK",
    item_checked: "",
    comment: "",
    content_id:  1,
    user_id:  1,
}
export const API_OPERATIONS = [API_OPERATION]

const GQL_ORDER_ = {
    clientName: "",
    buildingName: "",
    buildingStreet: "",
    buildingCity: "",
    buildingState: "",
    buildingAddress: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    feetModel: "",
    diceSize: "",
    requestingTrader: "",
    applicant:  { id: 1},
    comments: "",
    modelReference: "",
    craneVersion: "",
    orderVersion: "",
    configuration: "",
    elevations: "",
    mountingDate: "2020-01-01T12:00:00+00:00",
    rentPeriod: 128,
    elevationsNumber: 128,
    transportNumber: 128,
    hasPowerLift: false,
    hasCabin: false,
    hasRadioControl: false,
    hasCageMounting: false,
    hasRemoteControl: false,
    boomLength: 128.0,
    towerHeight: 128.0,
    finalHeight: 128.0,
    insuranceResponsable: "CLIENT",
    forwardingSystem: "SIMPLE",
    status: "CREATED",
    feetType: "REUSABLE",
    baseType: "LINKED",
    shipping: [ { id: 1} ],
    crane:  { id: 1},
}
export const GQL_ORDER = {
    order: GQL_ORDER_
}
export const GQL_ORDERS = {
    orders: [ GQL_ORDER_ ]
}
export const GQL_ORDER_PAGINATION = {
    orderPagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        orders: [ GQL_ORDER_ ]
    }
}

export const API_ORDER = {
    client_name: "",
    building_name: "",
    building_street: "",
    building_city: "",
    building_state: "",
    building_address: "",
    contact_name: "",
    contact_phone: "",
    contact_email: "",
    feet_model: "",
    dice_size: "",
    requesting_trader: "",
    applicant_id:  1,
    comments: "",
    model_reference: "",
    crane_version: "",
    order_version: "",
    configuration: "",
    elevations: "",
    mounting_date: "2020-01-01T12:00:00+00:00",
    rent_period: 128,
    elevations_number: 128,
    transport_number: 128,
    has_power_lift: false,
    has_cabin: false,
    has_radio_control: false,
    has_cage_mounting: false,
    has_remote_control: false,
    boom_length: 128.0,
    tower_height: 128.0,
    final_height: 128.0,
    insurance_responsable: "CLIENT",
    forwarding_system: "SIMPLE",
    status: "CREATED",
    feet_type: "REUSABLE",
    base_type: "LINKED",
    shipping_ids: [1],
    crane_id:  1,
}
export const API_ORDERS = [API_ORDER]

const GQL_PART_ = {
    craneModel: "",
    partId: "",
    name: "",
    images: [{ url: "" }],
    items: [ { id: 1} ],
    um: "JUEGO",
}
export const GQL_PART = {
    part: GQL_PART_
}
export const GQL_PARTS = {
    parts: [ GQL_PART_ ]
}
export const GQL_PART_PAGINATION = {
    partPagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        parts: [ GQL_PART_ ]
    }
}

export const API_PART = {
    crane_model: "",
    part_id: "",
    name: "",
    image_ids: [1],
    item_ids: [1],
    um: "JUEGO",
}
export const API_PARTS = [API_PART]

const GQL_SECURITY_CATEGORY_ = {
    name: "",
    partId: "",
    craneModel: "",
    isDeviation: false,
    isInitial: false,
}
export const GQL_SECURITY_CATEGORY = {
    securityCategory: GQL_SECURITY_CATEGORY_
}
export const GQL_SECURITY_CATEGORIES = {
    securityCategories: [ GQL_SECURITY_CATEGORY_ ]
}
export const GQL_SECURITY_CATEGORY_PAGINATION = {
    securityCategoryPagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        securityCategories: [ GQL_SECURITY_CATEGORY_ ]
    }
}

export const API_SECURITY_CATEGORY = {
    name: "",
    part_id: "",
    crane_model: "",
    is_deviation: false,
    is_initial: false,
}
export const API_SECURITY_CATEGORIES = [API_SECURITY_CATEGORY]

const GQL_SECURITY_CHECK_ = {
    value: "",
    files: [{ url: "" }],
    securityCheckType:  { id: 1},
    securityRevision:  { id: 1},
    user:  { id: 1},
    isDeviation: false,
    deviationValue: "TRUE",
    findings: "",
    corrections: "",
    date: "2020-01-01T12:00:00+00:00",
    scpLiberation: "",
}
export const GQL_SECURITY_CHECK = {
    securityCheck: GQL_SECURITY_CHECK_
}
export const GQL_SECURITY_CHECKS = {
    securityChecks: [ GQL_SECURITY_CHECK_ ]
}
export const GQL_SECURITY_CHECK_PAGINATION = {
    securityCheckPagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        securityChecks: [ GQL_SECURITY_CHECK_ ]
    }
}

export const API_SECURITY_CHECK = {
    value: "",
    file_ids: [1],
    security_check_type_id:  1,
    security_revision_id:  1,
    user_id:  1,
    is_deviation: false,
    deviation_value: "TRUE",
    findings: "",
    corrections: "",
    date: "2020-01-01T12:00:00+00:00",
    scp_liberation: "",
}
export const API_SECURITY_CHECKS = [API_SECURITY_CHECK]

const GQL_SECURITY_CHECK_TYPE_ = {
    number: 128.0,
    name: "",
    securityCategory:  { id: 1},
}
export const GQL_SECURITY_CHECK_TYPE = {
    securityCheckType: GQL_SECURITY_CHECK_TYPE_
}
export const GQL_SECURITY_CHECK_TYPES = {
    securityCheckTypes: [ GQL_SECURITY_CHECK_TYPE_ ]
}
export const GQL_SECURITY_CHECK_TYPE_PAGINATION = {
    securityCheckTypePagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        securityCheckTypes: [ GQL_SECURITY_CHECK_TYPE_ ]
    }
}

export const API_SECURITY_CHECK_TYPE = {
    number: 128.0,
    name: "",
    security_category_id:  1,
}
export const API_SECURITY_CHECK_TYPES = [API_SECURITY_CHECK_TYPE]

const GQL_SECURITY_REVISION_ = {
    craneModel: "",
    active: false,
    order:  { id: 1},
    type: "INITIAL",
    status: "CREATED",
    initDate: "2020-01-01T12:00:00+00:00",
    endDate: "2020-01-01T12:00:00+00:00",
}
export const GQL_SECURITY_REVISION = {
    securityRevision: GQL_SECURITY_REVISION_
}
export const GQL_SECURITY_REVISIONS = {
    securityRevisions: [ GQL_SECURITY_REVISION_ ]
}
export const GQL_SECURITY_REVISION_PAGINATION = {
    securityRevisionPagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        securityRevisions: [ GQL_SECURITY_REVISION_ ]
    }
}

export const API_SECURITY_REVISION = {
    crane_model: "",
    active: false,
    order_id:  1,
    type: "INITIAL",
    status: "CREATED",
    init_date: "2020-01-01T12:00:00+00:00",
    end_date: "2020-01-01T12:00:00+00:00",
}
export const API_SECURITY_REVISIONS = [API_SECURITY_REVISION]

const GQL_SHIPPING_ = {
    truckPlate: "",
    transportPlate: "",
    transportPhone: "",
    transportOtherPhone: "",
    transportCarrierName: "",
    transportCompany: "",
    deliveryDate: "2020-01-01T12:00:00+00:00",
    status: "CREATED",
    type: "TO_BUILDING",
    order:  { id: 1},
    contents: [ { id: 1} ],
    evidences: [ { id: 1} ],
}
export const GQL_SHIPPING = {
    shipping: GQL_SHIPPING_
}
export const GQL_SHIPPINGS = {
    shippings: [ GQL_SHIPPING_ ]
}
export const GQL_SHIPPING_PAGINATION = {
    shippingPagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        shippings: [ GQL_SHIPPING_ ]
    }
}

export const API_SHIPPING = {
    truck_plate: "",
    transport_plate: "",
    transport_phone: "",
    transport_other_phone: "",
    transport_carrier_name: "",
    transport_company: "",
    delivery_date: "2020-01-01T12:00:00+00:00",
    status: "CREATED",
    type: "TO_BUILDING",
    order_id:  1,
    content_ids: [1],
    evidence_ids: [1],
}
export const API_SHIPPINGS = [API_SHIPPING]

const GQL_SUGGESTION_ = {
    quantity: 128,
    shipping:  { id: 1},
    part:  { id: 1},
    order:  { id: 1},
    elevationNumber: 128,
}
export const GQL_SUGGESTION = {
    suggestion: GQL_SUGGESTION_
}
export const GQL_SUGGESTIONS = {
    suggestions: [ GQL_SUGGESTION_ ]
}
export const GQL_SUGGESTION_PAGINATION = {
    suggestionPagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        suggestions: [ GQL_SUGGESTION_ ]
    }
}

export const API_SUGGESTION = {
    quantity: 128,
    shipping_id:  1,
    part_id:  1,
    order_id:  1,
    elevation_number: 128,
}
export const API_SUGGESTIONS = [API_SUGGESTION]

const GQL_USER_ = {
    username: "email@test.com",
    firstName: "FirstName",
    lastName: "LastName",
    email: "email@test.com",
    password: "pbkdf2_sha256$150000$jMOqkdOUpor5$kU/QofjBsopM+CdCnU2+pROhtnxd5CZc7NhUiXNTMc0=",
    isActive: true,
    rol: "ADMIN",
    phone: "",
    shippingNotification: false,
    orderNotification: false,
    arrisNotification: false,
}
export const GQL_USER = {
    user: GQL_USER_
}
export const GQL_USERS = {
    users: [ GQL_USER_ ]
}
export const GQL_USER_PAGINATION = {
    userPagination: {
        pageNum: 1,
        pageSize: 1,
        totalPages: 1,
        totalCount: 1,
        users: [ GQL_USER_ ]
    }
}

export const API_USER = {
    username: "email_1@test.com",
    first_name: "FirstName",
    last_name: "LastName",
    email: "email_1@test.com",
    password: "pbkdf2_sha256$150000$jMOqkdOUpor5$kU/QofjBsopM+CdCnU2+pROhtnxd5CZc7NhUiXNTMc0=",
    is_active: false,
    rol: "ADMIN",
    phone: "",
    shipping_notification: false,
    order_notification: false,
    arris_notification: false,
}
export const API_USERS = [API_USER]