import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getRedirect() {
  return Cookies.get(TokenKey)
}

export function setRedirect(token) {
  return Cookies.set(TokenKey, token)
}

export function removeRedirect() {
  return Cookies.remove(TokenKey)
}
