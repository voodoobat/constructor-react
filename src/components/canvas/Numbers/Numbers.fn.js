export const getCellNums = (size, onlyOdd = false) => {
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
