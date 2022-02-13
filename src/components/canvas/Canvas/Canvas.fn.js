import _ from 'lodash'
import { uid } from 'uid'

export const getRowNums = (size, onlyOdd = false) => {
  const nums = []

  if (onlyOdd) {
    for (let j = 1; j < size * 2; j++) {
      if (j % 2 != 0) nums.push(j)
    }
  } else {
    for (let j = 1; j <= size; j++) {
      nums.push(j)
    }
  }

  return nums.reverse()
}

export const mapMatrix = (matrix, fn) => matrix.map((y) => y.map((x) => fn(x)))

export const findMatrix = (matrix, fn) => matrix.flat().find(fn)
export const filterMatrix = (matrix, fn) => matrix.flat().filter(fn)

export const getSubMatrix = (canvas, prop, compare) => {
  const temp = []
  canvas.forEach((y) => temp.push(y.filter((cell) => cell[prop] == compare)))

  const cnvs = temp.filter((el) => Boolean(el.length))
  return cnvs
}

export const reselect = (canvas) =>
  mapMatrix(canvas, (cell) => ({
    ...cell,
    selected: false,
  }))

export const reset = (canvas) => {
  const cnvs = [...canvas]

  cnvs.forEach((y) =>
    y.forEach((x) => {
      x.selected = false
      x.preview.background = null
      x.preview.loop = null
    })
  )

  return cnvs
}

export const select = (canvas, cell) => {
  return canvas.map((y) =>
    y.map((x) => {
      return { ...x, selected: cell.uid == x.uid }
    })
  )
}

export const square = (canvas, cell, start, type = 'both') => {
  const cnvs = [...canvas]

  if (type == 'both') {
    // left bottom
    if (cell.x <= start.x && cell.y >= start.y)
      cnvs.flat().forEach((c) => {
        const { x, y } = c
        c.selected = false

        if (x <= start.x && y >= start.y) {
          return (c.selected =
            x <= start.x && x >= cell.x && y >= start.y && y <= cell.y)
        }
      })

    // right bottom
    if (cell.x >= start.x && cell.y >= start.y)
      cnvs.flat().forEach((c) => {
        const { x, y } = c
        c.selected = false

        if (x >= start.x && y >= start.y) {
          return (c.selected =
            x >= start.x && x <= cell.x && y >= start.y && y <= cell.y)
        }
      })

    // right top
    if (cell.x >= start.x && cell.y <= start.y)
      cnvs.flat().forEach((c) => {
        const { x, y } = c
        c.selected = false

        if (x >= start.x && y <= start.y) {
          return (c.selected =
            x >= start.x && x <= cell.x && y <= start.y && y >= cell.y)
        }
      })

    // left top
    if (cell.x <= start.x && cell.y <= start.y)
      cnvs.flat().forEach((c) => {
        const { x, y } = c
        c.selected = false

        if (x <= start.x && y <= start.y) {
          return (c.selected =
            x <= start.x && x >= cell.x && y <= start.y && y >= cell.y)
        }
      })
  }

  if (type == 'x')
    cnvs.forEach((row) =>
      row.forEach((c) => {
        const { x } = c

        if (x >= start.x) {
          c.selected = start.x <= x && cell.x >= x
        }

        if (x <= start.x) {
          c.selected = x <= start.x && x >= cell.x
        }

        if (x == start.x) c.selected = true
      })
    )

  if (type == 'y')
    cnvs.forEach((row) =>
      row.forEach((c) => {
        const { y } = c

        if (y >= start.y) {
          c.selected = y >= start.y && y <= cell.y
        }

        if (y <= start.y) {
          c.selected = y <= start.y && y >= cell.y
        }

        if (y == start.y) c.selected = true
      })
    )

  return cnvs
}

export const placeGroup = (canvas, group, preview = false) => {
  const cnvs = [...canvas]

  let curRow = 0
  cnvs.forEach((row) => {
    let curCell = 0

    if (row.find((el) => el.selected)) {
      row.forEach((e) => {
        if (e.selected) {
          const c = group.canvas[curRow][curCell]

          if (preview) {
            e.preview.loop = c?.loop
            e.preview.background = c?.background
            e.preview.stretch = c?.stretch
          } else {
            e.loop = c?.loop
            e.background = c?.background
            e.selected = false
            e.stretch = c?.stretch
          }

          curCell++
        }
      })

      curRow++
    }
  })

  return cnvs
}

export const squareGroup = (canvas, cell, group) => {
  const corner = {
    x: cell.x + group.canvas[0].length - 1,
    y: cell.y + group.canvas.length - 1,
  }

  let cnvs = [...canvas]
  cnvs = square(cnvs, corner, cell)

  let temp = mapMatrix(cnvs, (cl) => {
    cl.preview.loop = null
    cl.preview.background = null
    cl.preview.stretch = null
  })

  temp = placeGroup(cnvs, group, true)
  return temp
}

export const lastCellWithProp = (canvas, sub, prop, value) => {
  const cnvs = [...canvas]
  const last = sub[sub.length - 1]

  if (last != null) {
    const { x, y } = last[last.length - 1]

    cnvs[y][x][prop] = value
    return cnvs
  }

  return cnvs
}

export const createReport = (canvas, reports) => {
  const len = reports.length
  const lastReport = len ? reports[len - 1] : null
  const sampleColors = ['#cfd8dc', '#b0bec5', '#90a4ae', '#78909c', '#607d8b']

  let colorIndex = NaN

  len &&
    sampleColors.forEach((color, index) => {
      if (lastReport.color == color) {
        colorIndex = index + 1
      }
    })

  const elements = mapMatrix(canvas, ({ uid }) => uid)

  return {
    uid: uid(),
    color: sampleColors[colorIndex] || sampleColors[0],
    canvas,
    elements,
  }
}

export const getCrossingsReportsUids = (canvas) => {
  const crossings = filterMatrix(canvas, (cell) => cell.report != null)

  return _.uniq(crossings.map(({ report }) => report.uid))
}

export const isOneRowOrCol = (canvas) => ({
  oneCol: canvas[0]?.length == 1,
  oneRow: canvas?.length == 1,
})
