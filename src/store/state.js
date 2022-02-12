import { SWATCHES } from '@src/config'

export const CONFIG_STATE = {
  config: null,
  loops: [],
  isAuth: false,
  redirect: null,
  swatches: SWATCHES,
  plaits: [],
  activeLoader: false,
  schemesList: [],
  activeReportType: null,
  activeColor: null,
  downloadOptions: {
    schemeTitle: true,
    schemeReports: true,
    schemeLegends: true
  },

  tools: [
    { type: 'Move' },
    { type: 'Eraze' },
    { type: 'ReportRow' },
    { type: 'ReportLoop' },
    { type: 'Color' },
    { type: 'Group' },
    { type: 'Size' },
  ],
}

export const DEFAULT_TOOLS_STATE = {
  activeTool: '',
  activeLoop: NaN,
  activeLoopIcon: '',
  activeGroup: null,
}

export const EMPTY_SCHEME = {
  schemeId: '',
  schemeTitle: '',
  schemeCanvas: [],
  schemePreview: [],
  schemeLegends: [],
  schemeGroups: [],
  schemeReports: [],
  schemeHistoryStep: 'zero-step',
  schemeHistory: [],
  schemeOnlyOddCells: false,
  schemeIsRound: false,
  schemeCustomCells: []
}

export const INITIAL_STATE = {
  ...CONFIG_STATE,
  ...DEFAULT_TOOLS_STATE,
  ...EMPTY_SCHEME
}
