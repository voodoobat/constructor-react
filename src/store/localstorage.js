import { LOCALSTORAGE_KEY } from '@src/config'

export const save = (scheme) => {
  localStorage.setItem(LOCALSTORAGE_KEY, scheme)
}

export const fetch = () => {
  return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
}

export const remove = () => {
  localStorage.removeItem(LOCALSTORAGE_KEY)
}
