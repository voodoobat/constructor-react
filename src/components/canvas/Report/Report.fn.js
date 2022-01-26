import { CANVAS_CELL_HEIGHT } from '@src/config'

export const getCellByUid = (canvas, uid) => {
  return canvas.flat().find(cell => {
    return cell.uid == uid
  })
}

export const getLastCellUid = canvas => {
  const lastRow = canvas[canvas.length - 1]
  return lastRow[lastRow.length - 1].uid
}

export const calcOffset = index => {
  return CANVAS_CELL_HEIGHT * 3 + CANVAS_CELL_HEIGHT * index;
}

export const calcOnlyOddReportSize = (canvas, schemeCanvas) => {
  return schemeCanvas.length == canvas.length
    ? canvas.length * 2 - 1
    : canvas.length * 2
}
