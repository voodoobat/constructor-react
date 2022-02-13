export const getStep = (history, stepUid) => {
  const index = history.findIndex(({ uid }) => uid == stepUid)

  return {
    prev: history[index - 1],
    next: history[index + 1],
  }
}
