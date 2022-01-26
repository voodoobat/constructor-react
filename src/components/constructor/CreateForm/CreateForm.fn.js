import store from '@src/store'
import { getAllLoops, createEmptyCanvas } from '@src/util'

import { EMPTY_SCHEME } from '@store/state'

export const generateScheme = ({
  name,
  rows,
  cols,
  onlyOdd,
  customCells,
  isRound
}) => {

  const { loops } = store.getState()
  const canvas = createEmptyCanvas(cols, onlyOdd ? rows / 2 : rows)
  const schemeCustomCells = []

  const processLegends = loops => {
    const withHint = getAllLoops(loops).base.filter(({ hint }) => !!hint)

    return withHint.map(({ id, hint, icon }) => ({
      id, hint, icon, isHidden: false
    }))
  }

  if (customCells) {
    for (let j = 0; j < cols; j++) {
      schemeCustomCells.push(NaN)
    }
  }

  const scheme = {
    ...EMPTY_SCHEME,
    schemeTitle: name,
    schemeCanvas: canvas,
    schemeOnlyOddCells: onlyOdd,
    schemeLegends: processLegends(loops),
    schemeIsRound: isRound,
    schemeCustomCells
  }

  return scheme
}
