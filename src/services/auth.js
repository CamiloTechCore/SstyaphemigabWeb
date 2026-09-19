import { login as apiLogin } from './api'

const TOKEN_KEY = 'emigab_admin_token'
const USER_KEY = 'emigab_admin_user'

/** Intenta autenticar y persiste la sesión de admin en localStorage. */
export async function loginAdmin(username, password) {
  const res = await apiLogin(username, password)
  if (res && res.success) {
    localStorage.setItem(TOKEN_KEY, res.token || 'admin_auth_token_emigab')
    localStorage.setItem(USER_KEY, username)
  }
  return res
}

export function logoutAdmin() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem(TOKEN_KEY))
}

export function getAdminUser() {
  return localStorage.getItem(USER_KEY)
}

export default { loginAdmin, logoutAdmin, isAuthenticated, getAdminUser }
