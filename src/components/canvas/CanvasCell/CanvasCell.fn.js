export const getBackgroundStyle = ({ background, preview }) => {
  if (preview?.background) return { background: preview?.background }
  if (background) return { background: background }

  return null
}
