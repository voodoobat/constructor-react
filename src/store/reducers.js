import { or } from '@src/util'
import { INITIAL_STATE } from '@store/state'

export default function reducers (state = INITIAL_STATE, { type, payload }) {
  return or(type, [
    'SET_CONFIG',
    'SET_LOOPS',
    'SET_REDIRECT',
    'SET_TOOLS',
    'SET_CANVAS',
    'SET_HISTORY',
    'SET_CURRENT_STEP',
    'SET_ACTIVE_LOOP',
    'SET_ACTIVE_LOOP_ICON',
    'SET_GROUPS',
    'SET_PLAITS',
    'SET_ACTIVE_GROUP',
    'SET_ACTIVE_TOOL',
    'SET_ACTIVE_REPORT_TYPE',
    'SET_ACTIVE_COLOR',
    'SET_SWATCHES',
    'SET_CANVAS_LEGENDS',
    'SET_CUSTOM_CURSOR',
    'SET_REPORT',
    'SET_IS_CONFIRM',
    'SET_SCHEME',
    'SET_SCHEME_NAME',
    'SET_SCHEME_UID',
    'SET_SCHEME_ONLY_ODD_ROWS',
    'SET_SCHEME_CUSTOM_CELLS',
    'SET_SCHEMES_LIST',
    'SET_ACTIVE_LOADER',
    'SET_DOWNLOAD_OPTIONS',
    'SET_IS_AUTH'
  ]) ? { ...state, ...payload } : state
}
