import { uid } from 'uid'
// import Noty from 'noty'

export const stripHtml = s => s.replace(/(<([^>]+)>)/gi, "")
export const spacesToNbsp = s => s.replace(/ /g, '\u00a0')

export const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1)

export const toCamelCase = s => {
  return s.replace(/([-_][a-z])/ig, $1 => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '')
  })
}

export const toUpperCamelCase = s => capitalize(toCamelCase(s))
export const toSnakeCase = s => s.replace(/[A-Z]/g, char => `_${char.toLowerCase()}`)

export const createCell = (x, y, loop = null) => ({
  x,
  y,
  loop,
  stretch: null,
  uid: uid(),
  background: null,
  selected: false,
  report: null,
  preview: {
    stretch: null,
    background: null,
    loop: null
  }
})

export const cleanCell = cell => ({
  ...cell,
  selected: false,
  confirm: false,
  preview: {
    stretch: null,
    background: null,
    loop: null
  }
})

export const createEmptyRow = (size, y = 0) => {
  const temp = []

  for (let j = 0; j < size; j++) {
    temp.push(createCell(j, y))
  }

  return temp
}

export const createEmptyCanvas = (x = 0, y = 0) => {
  const canvas = []

  for (let j = 0; j < y; j++) {
    canvas.push(createEmptyRow(x, j))
  }

  return canvas
}

export const is = (x, ...args) => {
  const isArray = args[0] instanceof Array
  let bool = false

  const check = y => {
    bool = x == y
  }

  if (isArray) args[0].forEach(check)
  else args.forEach(check)

  return bool
}

export const or = (x, args) => {
  let bool = false

  args.forEach(y => {
    if (x == y) bool = true
  })

  return bool
}

export const formatPlural = (number, text1, text2, text5, returnNumber = true) => {
  let numberAbs = Math.abs(number)
  let mod10 = numberAbs % 10
  let text = text1

  switch (true) {
    case mod10 === 0:
    case mod10 >= 5 && mod10 <= 9:
    case numberAbs >= 11 && numberAbs <= 14:
      text = text5;
      break

    case mod10 === 1:
      text = text1;
      break

    case mod10 >= 2 && mod10 <= 4:
      text = text2;
      break
  }

  if (returnNumber) {
    return number + ' ' + text
  }

  return text
}

export const createCanvasLegend = (loop, legends, hint) => {
  const exists = legends.find(element => element)
  const customHint = hint || exists?.customHint || ''

  return {
    element: loop,
    customHint
  }
}

export const getCanvasDiff = (canvas, resized) => {
  const diff = {
    type: null,
    side: null
  }

  diff.type = canvas[0].length > resized[0].length
    ? 'remove'
    : 'add'


  diff.side = canvas[0][0].uid == resized[0][0].uid
    ? 'right'
    : 'left'

  return diff
}

export const resetSchemeProps = () => {
  return {
    schemeId: '',
    schemeTitle: '',
    schemeCanvas: [],
    schemeLegends: [],
    schemeGroups: [],
    schemeReports: [],
    schemeHistoryStep: '',
    schemeHistory: []
  }
}

export const getSchemeData = state => {
  const {
    schemeId,
    schemeTitle,
    schemeCanvas,
    schemeLegends,
    schemeGroups,
    schemeReports,
    schemeOnlyOddCells,
    schemeCustomCells
  } = state

  return {
    schemeId,
    schemeTitle,
    schemeCanvas,
    schemeLegends,
    schemeGroups,
    schemeReports,
    schemeOnlyOddCells,
    schemeCustomCells
  }
}

export const convertSchemeEntries = obj  => {
  const scheme = {}

  for (const [key, value] of Object.entries(obj)) {
    const v = value === null ? [] : value
    scheme['scheme' + toUpperCamelCase(key)] = v
  }

  return scheme
}

export const convertDataToXHR = obj => {
  const scheme = {}

  for (const [key, value] of Object.entries(obj)) {
    scheme[toSnakeCase(key).replace('scheme_', '')] = value
  }

  return JSON.stringify(scheme)
}

export const getBase64Size = src => Math.ceil(src?.length * (3/4) / 1024)
export const isEmptyString = str => !str.replaceAll(' ', '').length

export const converNumsStrToBoolArr = str => {
  return str.split(',').map(e => Boolean(Number(e)))
}

export const convertBoolArrToNumsStr = arr => {
  return arr.map(e => Number(e)).join(',')
}

export const createCanvasPreview = (schemeCanvas, sizeY = 10, sizeX = 10) => {

  const canvas = JSON.parse(JSON.stringify(schemeCanvas))
  const y = canvas.length < sizeY ? canvas.length : sizeY
  const x = canvas[0].length < sizeX ? canvas[0].length : sizeX

  canvas.length = y

  return canvas.map(e => {
    e.length = x
    return e
  })
}

export const getSchemeWithPreview = scheme => {
  const schemePreview = createCanvasPreview(scheme.schemeCanvas)

  return {
    ...scheme,
    schemePreview
  }
}

export const getAllLoops = loops => {
  const base = []
  const complex = []

  loops.forEach(loop => {
    const itComplexElement = !!loop.complex

    if (!itComplexElement) {
      base.push(loop)
    }

    if (loop.has_children) {
      const target = itComplexElement ? complex : base

      loop.children.forEach(child => target.push({
        ...child,
        complex_child: loop.complex,
        title: itComplexElement ? null : child.title,
        hint: itComplexElement ? null : child.hint,
      }))
    }
  })

  return {
    base,
    complex
  }
}

export const breakStr = (str, spaces = 3) => {
  const strArr = str.split(' ').map((segment, index) => {
    return Number.isInteger((index + 1) / spaces)
      ? `${segment}<br />`
      : segment
  })

  return strArr.join(' ')
}

// export const notyfy = text => new Noty({
//   text,
//   layout: 'custom',
//   timeout: 1500
// }).show()

export const notyfy = () => {}

const createPlaitElement = (src, size, idx, target) => {
  const { id, icon } = src.children[idx]

  if (idx == 0 || idx == 9) {
    for (let j = 1; j <= size; j++) {
      target.push(createCell(0, 0, {
        id, icon
      }))
    }
  }

  target.push(createCell(0, 0, {
    id, icon
  }))
}

export const generatePlaitElements = loops =>  {
  const elements = []
  const str = [0, 3, 4, 9]
  const rev = [9, 5, 6, 0]
  const sizes = [0, 1, 2]

  loops.forEach(complex => {
    sizes.forEach(size => {
      const canvas = []

      str.forEach(idx => createPlaitElement(complex, size, idx, canvas))
      elements.push([canvas])
    })

    sizes.forEach(size => {
      const canvas = []

      rev.forEach(idx => createPlaitElement(complex, size, idx, canvas))
      elements.push([canvas])
    })
  })

  return elements
}
