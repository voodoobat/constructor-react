import { get } from 'axios'
import { uid } from 'uid'

import * as util from '@src/util'
import * as local from '@store/localstorage'
import * as act from '@src/store/actions'

import { xhr, xhrGetRes } from '@src/store/xhr'

import { DEFAULT_SCHEME_ID } from '@src/config'
import {
  CONFIG_STATE,
  EMPTY_SCHEME,
  DEFAULT_TOOLS_STATE,
} from '@store/state'

export function setStaticData (onComplete = () => {}) {
  return async dispatch => {
    const config = await fetch(import.meta.env.VITE_API_CONFIG_URL, {
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
      cache: 'no-cache',
      redirect: 'error'
    })
    const loops = await fetch(import.meta.env.VITE_API_ELEMENTS_URL, {
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
      cache: 'no-cache',
      redirect: 'error'
    })

    if (config.status == 200 &&
        loops.status == 200) {

      const configData = await config.json()
      const { elements } = await loops.json()

      dispatch(act.setConfig(configData))
      dispatch(act.setLoops(elements))

      console.log(configData)

      const plaitsCnvs = util.generatePlaitElements(
        elements.filter(({ complex }) => complex)
      )

      dispatch(act.setPlaits([ ...plaitsCnvs.map(canvas => ({
        uid: uid(),
        active: false,
        canvas
      }))]))

      onComplete()
    }
  }
}

export function createScheme (scheme) {
  return async (dispatch, getState) => {
    const { isAuth } = getState()
    let _scheme

    if (isAuth) {
      const schemeDataWithPreview = util.getSchemeWithPreview(scheme)
      const response = await xhr('post', 'store', util.convertDataToXHR(schemeDataWithPreview))

      _scheme = xhrGetRes(response, 'model')
    }

    else {
      _scheme = util.convertDataToXHR({ ...scheme, id: DEFAULT_SCHEME_ID })
      local.save(_scheme)
    }

    dispatch(act.setRedirect(`/scheme/${_scheme.id}`))
    util.notyfy(`Схема «${_scheme.title}» создана`)
  }
}

export function saveScheme (onSave = () => {}) {
  return async (dispatch, getState) => {
    const state = getState()
    const schemeData = util.getSchemeData(state)

    if (state.isAuth) {
      const schemeDataWithPreview = util.getSchemeWithPreview(schemeData)
      const scheme = util.convertDataToXHR(schemeDataWithPreview)

      await xhr('post', 'update', scheme, [
        'scheme_id', state.schemeId
      ])
    }

    else {
      const scheme = util.convertDataToXHR(schemeData)
      local.save(scheme)
    }

    const { schemeTitle } = schemeData

    onSave(schemeData)

    util.notyfy(`Схема «${schemeTitle}» сохранена`)
  }
}


export function deleteScheme () {
  return async (dispatch, getState) => {
    const { isAuth, schemeId, schemeTitle, activeColor } = getState()
    let redirect

    if (isAuth) {
      await xhr('post', 'delete', null, ['scheme_id', schemeId])
      redirect = '/schemes'
    }

    else {
      local.remove()
      redirect = '/'
    }

    dispatch(act.setTool({ ...DEFAULT_TOOLS_STATE, activeTool: 'Move' }))
    dispatch(act.setActiveColor(activeColor))
    dispatch(act.setScheme(EMPTY_SCHEME))
    dispatch(act.setRedirect(redirect))
    util.notyfy(`Схема «${schemeTitle}» удалена`)
  }
}

export function setSchemeByUid (schemeId) {
  return async (dispatch, getState) => {
    if (!schemeId) return

    let schemeData
    const { isAuth } = getState()

    if (isAuth) {
      const response = await xhr('get', 'show', {}, ['scheme_id', schemeId])
      schemeData = xhrGetRes(response, 'model')
    }

    else {
      schemeData = local.fetch()
    }

    const scheme = util.convertSchemeEntries(schemeData)
    const schemeHistory = [{
      uid: 'zero-step',
      canvas: [ ...scheme.schemeCanvas ]
    }]

    dispatch(act.setActiveTool('Move'))
    dispatch(act.setScheme({ ...EMPTY_SCHEME, ...scheme, schemeHistory }))
  }
}

export function setSchemesList () {
  return async dispatch => {
    const response = await xhr('get', 'list')
    const schemes = xhrGetRes(response, 'items').map(util.convertSchemeEntries)

    dispatch(act.setSchemesList(schemes))
    dispatch(act.setActiveTool({ activeTool: 'Move' }))
  }
}

export function resetScheme () {
  return dispatch => {
    const { activeColor } =  CONFIG_STATE

    dispatch(act.setTool({ ...DEFAULT_TOOLS_STATE, activeTool: 'Move' }))
    dispatch(act.setActiveColor(activeColor))
    dispatch(act.setScheme(EMPTY_SCHEME))
  }
}

export function setSchemeOptions ({ onlyOdd, isRound }) {
  return dispatch => {
    dispatch(act.setSchemeOnlyOddCells(onlyOdd))
    dispatch(act.setSchemeIsRound(isRound))
  }
}

export function resetTools () {
  return dispatch => {
    const { activeColor } = CONFIG_STATE

    dispatch(act.setTool({ ...DEFAULT_TOOLS_STATE, activeTool: 'Move' }))
    dispatch(act.setActiveColor(activeColor))
  }
}

export function setSchemeTitle (name) {
  return dispatch => {
    dispatch(act.setSchemeTitle(name))
  }
}

export function setSchemeHistorytStep (uid) {
  return dispatch => {
    dispatch(act.setSchemeHistorytStep(uid))
  }
}

export function setSchemeCustomCells (cells) {
  return dispatch => {
    dispatch(act.setSchemeCustomCells(cells))
  }
}

export function commitCanvas (canvas, save = true) {
  return (dispatch, getState) => {
    const {
      schemeCanvas,
      schemeHistory,
      schemeHistoryStep,
      schemeCustomCells,
    } = getState()

    dispatch(act.setSchemeCanvas(canvas))

    if (schemeCustomCells?.length &&
        schemeCanvas[0].length != canvas[0].length) {

      let temp = [...schemeCustomCells]
      const diff = util.getCanvasDiff(schemeCanvas, canvas)

      if (diff.side == 'right') {
        if (diff.type == 'remove') temp.pop()
        if (diff.type == 'add') temp.push(NaN)
      }

      if (diff.side == 'left') {
        if (diff.type == 'add') temp = [NaN, ...schemeCustomCells]
        if (diff.type == 'remove') temp.shift()
      }

      dispatch(act.setSchemeCustomCells(temp))
    }

    if (save) {
      const stepUid = uid()
      const index = schemeHistory.length ? schemeHistory.findIndex(({ uid }) => uid == schemeHistoryStep) : 0
      const temp = schemeHistory.length ? [...schemeHistory] : []

      if (index > -1) {
        temp.length = index + 1
      }

      dispatch(act.setSchemeHistory([...temp, { uid: stepUid, canvas }]))
      dispatch(act.setSchemeHistorytStep(stepUid))
    }
  }
}

export function setReport (report) {
  return (dispatch, getState) => {
    const { schemeReports } = getState()

    dispatch(act.setSchemeReports([...schemeReports, report]))
  }
}

export function setSchemeLegends(legends) {
  return dispatch => {
    dispatch(act.setCanvasLegend(legends))
  }
}

export function setCanvasLegendCustomHint (loop, value) {
  return (dispatch, getState) => {
    const legends = [ ...getState().schemeLegends ]
    const index = legends.findIndex(el => el.element.loop == loop)

    legends[index].customHint = value
    dispatch(act.setCanvasLegend(legends))
  }
}

export function removeReport ({ uid }) {
  return (dispatch, getState) => {
    const { schemeReports, schemeCanvas } = getState()

    dispatch(act.setSchemeReports(schemeReports.filter(report => report.uid != uid)))
    dispatch(act.setSchemeCanvas(schemeCanvas.map(y => y.map(cell => {
      return cell.report?.uid == uid
        ? { ...cell, report: null }
        : { ...cell }
    }))))
  }
}

export function setActiveGroup (group) {
  return (dispatch, getState) => {
    const { schemeGroups, plaits } = getState()

    const setActive = array => array.map(g => {
      return g.uid == group.uid
        ? { ...g, active: true }
        : { ...g, active: false }
    })

    dispatch(act.setTool(DEFAULT_TOOLS_STATE))
    dispatch(act.setActiveGroup(group))

    dispatch(act.setPlaits(setActive(plaits)))
    return dispatch(act.setSchemeGroups(setActive(schemeGroups)))
  }
}

export function commitNewGroup (canvas) {
  return (dispatch, getState) => {
    const { schemeGroups } = getState()
    dispatch(act.setSchemeGroups([ ...schemeGroups, {
      uid: uid(),
      active: false,
      canvas
    }]))
  }
}

export function removeGroup ({ uid }) {
  return (dispatch, getState) => {
    const { schemeGroups } = getState()

    dispatch(act.setSchemeGroups(schemeGroups.filter(g => g.uid != uid)))
    dispatch(act.setActiveGroup(null))
  }
}

export function setActiveTool (activeTool) {
  return (dispatch, getState) => {
    const { schemeGroups } = getState()

    dispatch(act.setTool({ ...DEFAULT_TOOLS_STATE, activeTool }))
    dispatch(act.setActiveLoopIcon(''))
    dispatch(act.setActiveGroup(null))
    dispatch(act.setSchemeGroups(schemeGroups.map(g => ({
      ...g, active: false
    }))))
  }
}

export function setActiveColor (activeColor) {
  return dispatch => {
    dispatch(act.setActiveColor(activeColor))
  }
}

export function setActiveLoop (activeLoop, icon = '') {
  return (dispatch, getState) => {
    const { schemeGroups } = getState()

    dispatch(act.setTool({ ...DEFAULT_TOOLS_STATE, activeLoop }))
    dispatch(act.setActiveLoopIcon(icon))

    dispatch(act.setSchemeGroups(schemeGroups.map(g => ({
      ...g, active: false
    }))))
  }
}

export function setCustomCursor (cursor) {
  return dispatch => {
    dispatch(act.setCustomCursor(cursor))
  }
}

export function setConfirm (isConfirm) {
  return dispatch => {
    dispatch(act.setConfirm(isConfirm))
  }
}

export function setSetActiveLoader (activeLoader) {
  return dispatch => {
    dispatch(act.setActiveLoader(activeLoader))
  }
}

export function setActiveReportType (activeReportType) {
  return dispatch => {
    dispatch(act.setActiveReportType(activeReportType))
  }
}

export function setActiveDownload (activeDownload) {
  return dispatch => {
    dispatch(act.setActiveDownload(activeDownload))
  }
}

export function setDownloadOptions (downloadOptions) {
  return dispatch => {
    dispatch(act.setDownloadOptions(downloadOptions))
  }
}

export function setRedirect (redirect) {
  return dispatch => {
    dispatch(act.setRedirect(redirect))
  }
}
