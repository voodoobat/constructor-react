import { LOCALSTORAGE_KEY } from '@src/config'

export const save = scheme => {
  const data = JSON.stringify(scheme)
  localStorage.setItem(LOCALSTORAGE_KEY, data)
}

export const fetch = () => {
  return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
}

export const remove = () => {
  localStorage.removeItem(LOCALSTORAGE_KEY)
}
