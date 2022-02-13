export const setConfig = (config) => ({
  type: 'SET_CONFIG',
  payload: { config },
})

export const setLoops = (loops) => ({
  type: 'SET_LOOPS',
  payload: { loops },
})

export const setScheme = (scheme) => ({
  type: 'SET_SCHEME',
  payload: { ...scheme },
})

export const setRedirect = (redirect) => ({
  type: 'SET_REDIRECT',
  payload: { redirect },
})

export const setTool = (toolState) => ({
  type: 'SET_TOOLS',
  payload: { ...toolState },
})

export const setActiveLoop = (activeLoop) => ({
  type: 'SET_ACTIVE_LOOP',
  payload: { activeLoop },
})

export const setActiveLoopIcon = (activeLoopIcon) => ({
  type: 'SET_ACTIVE_LOOP',
  payload: { activeLoopIcon },
})

export const setActiveTool = (activeTool) => ({
  type: 'SET_ACTIVE_TOOL',
  payload: { activeTool },
})

export const setPlaits = (plaits) => ({
  type: 'SET_PLAITS',
  payload: { plaits },
})

export const setActiveGroup = (activeGroup) => ({
  type: 'SET_ACTIVE_GROUP',
  payload: { activeGroup },
})

export const setActiveColor = (activeColor) => ({
  type: 'SET_ACTIVE_COLOR',
  payload: { activeColor },
})

export const setSwatches = (swatches) => ({
  type: 'SET_SWATCHES',
  payload: { swatches },
})

export const setCustomCursor = (customCursor) => ({
  type: 'SET_CUSTOM_CURSOR',
  payload: { customCursor },
})

export const setConfirm = (isConfirm) => ({
  type: 'SET_REPORT',
  payload: { isConfirm },
})

export const setSchemeId = (schemeId) => ({
  type: 'SET_SCHEME_UID',
  payload: { schemeId },
})

export const setSchemeTitle = (schemeTitle) => ({
  type: 'SET_SCHEME_NAME',
  payload: { schemeTitle },
})

export const setSchemeCanvas = (schemeCanvas) => ({
  type: 'SET_CANVAS',
  payload: { schemeCanvas },
})

export const setSchemeGroups = (schemeGroups) => ({
  type: 'SET_GROUPS',
  payload: { schemeGroups },
})

export const setCanvasLegend = (schemeLegends) => ({
  type: 'SET_CANVAS_LEGENDS',
  payload: { schemeLegends },
})

export const setSchemeReports = (schemeReports) => ({
  type: 'SET_REPORT',
  payload: { schemeReports },
})

export const setSchemeHistory = (schemeHistory) => ({
  type: 'SET_HISTORY',
  payload: { schemeHistory },
})

export const setSchemeHistorytStep = (schemeHistoryStep) => ({
  type: 'SET_CURRENT_STEP',
  payload: { schemeHistoryStep },
})

export const setSchemeOnlyOddCells = (schemeOnlyOddCells) => ({
  type: 'SET_SCHEME_ONLY_ODD_ROWS',
  payload: { schemeOnlyOddCells },
})

export const setSchemeIsRound = (schemeIsRound) => ({
  type: 'SET_SCHEME_ONLY_ODD_ROWS',
  payload: { schemeIsRound },
})

export const setSchemeCustomCells = (schemeCustomCells) => ({
  type: 'SET_SCHEME_CUSTOM_CELLS',
  payload: { schemeCustomCells },
})

export const setActiveLoader = (activeLoader) => ({
  type: 'SET_ACTIVE_LOADER',
  payload: { activeLoader },
})

export const setSchemesList = (schemesList) => ({
  type: 'SET_SCHEMES_LIST',
  payload: { schemesList },
})

export const setActiveReportType = (activeReportType) => ({
  type: 'SET_ACTIVE_REPORT_TYPE',
  payload: { activeReportType },
})

export const setIsAuth = (isAuth) => ({
  type: 'SET_IS_AUTH',
  payload: { isAuth },
})

export const setDownloadOptions = (downloadOptions) => ({
  type: 'SET_IS_AUTH',
  payload: { downloadOptions },
})
