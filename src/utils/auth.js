import Cookies from 'js-cookie'

const TokenKey = 'token'
const RedirectKey = 'redirect'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, 'Bearer ' + token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getRedirect() {
  return localStorage.getItem(RedirectKey)
}

export function setRedirect(redirect) {
  return localStorage.setItem(RedirectKey, redirect)
}

export function removeRedirect() {
  return localStorage.removeItem(RedirectKey)
}
