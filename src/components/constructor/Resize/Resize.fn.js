import { createCell, createEmptyRow } from '@src/util'

export const addTopRow = (canvas) => [
  createEmptyRow(canvas[0].length),
  ...canvas.map((row, y) =>
    row.map((cell) => ({
      ...cell,
      y: y + 1,
    }))
  ),
]

export const removeTopRow = (canvas) => {
  canvas.shift()

  return canvas.map((row, y) =>
    row.map((cell) => ({
      ...cell,
      y,
    }))
  )
}

export const addRowBottom = (canvas) => [
  ...canvas,
  createEmptyRow(canvas[0].length, canvas.length),
]

export const removeRowBottom = (canvas) => {
  canvas.pop()

  return canvas
}

export const addCellRight = (canvas) => {
  return canvas.map((row, index) => [...row, createCell(row.length, index)])
}

// TODO rewrite this shit
export const removeCellRight = (canvas) => {
  const cnvs = []

  canvas.forEach((row) => {
    const temp = []

    row.forEach((cell) => {
      if (cell.x < canvas[0].length - 1) {
        temp.push(cell)
      }
    })

    cnvs.push(temp)
  })

  return cnvs
}

export const addCellLeft = (canvas) => {
  return canvas.map((row, rowIndex) => {
    const temp = [createCell(0, 0), ...row]

    return temp.map((cell, cellIndex) => ({
      ...cell,
      x: cellIndex,
      y: rowIndex,
    }))
  })
}

export const removeCellLeft = (canvas) => {
  const cnvs = []

  canvas.forEach((row) => {
    const temp = []

    row.forEach((cell) => {
      if (cell.x > 0) {
        temp.push({ ...cell, x: cell.x - 1 })
      }
    })

    cnvs.push(temp)
  })

  return cnvs
}

export const setCanvasType = (canvas, onlyOdd) => {
  const cnvs = []
  const size = canvas[0].length

  if (onlyOdd) {
    canvas.forEach((row, j) => j % 2 != 0 && cnvs.push(row))
  } else {
    canvas.forEach((row) => {
      cnvs.push(createEmptyRow(size))
      cnvs.push(row)
    })
  }

  return cnvs.map((row, y) =>
    row.map((cell) => ({
      ...cell,
      y,
    }))
  )
}
