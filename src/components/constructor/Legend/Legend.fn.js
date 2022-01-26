export const mergeLegends = (legends, changed) => {
  const index = legends.findIndex(({ id }) => id == changed.id)
  const temp = [...legends]

  temp[index] = changed
  return temp
}
