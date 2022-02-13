import { uniq } from 'lodash'
import { or } from '@src/util'

export const getSchemeLegends = (legends, canvas, onlyVisible = false) => {
  const uniqLoops = uniq(
    canvas
      .flat()
      .filter(({ loop }) => loop)
      .map(({ loop }) => loop.id)
  )
  const used = legends.filter((legend) => {
    if (or(legend.id, uniqLoops)) {
      return legend
    }
  })

  return onlyVisible ? used.filter(({ isHidden }) => !isHidden) : used
}
