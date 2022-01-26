export const getX = canvas => {
  const x1 = canvas[0].find(cell => cell.selected).x
  const x2 = canvas[1].find(cell => cell.selected).x
  const x3 = canvas[2].find(cell => cell.selected).x

  if (x1 == x2) return x1
  if (x2 == x3) return x2
}

export const getY = canvas => {
  const { y } = canvas.filter(row => {
    return row[row.length - 1].selected && row[0].selected
  })[0][0]

  return y
}
