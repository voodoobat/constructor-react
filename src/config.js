export const IS_TOUCH = 'ontouchstart' in window

export const LOCALSTORAGE_KEY = 'scheme'
export const AUTOSAVE_DELAY = 5000

export const CANVAS_CELL_WIDTH = 28
export const CANVAS_CELL_HEIGHT = 22

export const CANVAS_ELEMENT_ID = 'canvas'
export const LEGENDS_ELEMENT_ID = 'legends'

export const DEFAULT_COLOR = '#FFFFFF'

export const DEFAULT_SCHEME_ID = 'MYSCHEME'

export const MIN_CANVAS_SIZE = 2
export const MAX_CANVAS_SIZE = 75

export const MAX_STRETCH_LEN = 7

export const MIN_SCHEME_NAME_LEN = 1
export const MAX_SCHEME_NAME_LEN = 50

export const DEFAULT_TITLE = 'Конструктор схем'

export const ROUTE_LIST = '/schemes'
export const ROUTE_CREATE = '/create/'
export const ROUTE_SCHEME = '/scheme/'

export const SWATCHES = [
  '#ffffff', '#7986cb',
  '#64b5f6', '#4dd0e1',
  '#ba68c8', '#4db6ac',
  '#81c784', '#dce775',
  '#9575cd', '#a1887f',
  '#ffb74d', '#f06292'
]

export const XHR_COMMON_DATA = {
  credentials: 'include',
  mode: 'cors',
  cache: 'no-cache',
  redirect: 'error',
  headers: {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
}
