import axios from 'axios'

/**
 * Cliente HTTP para la API serverless (Google Apps Script).
 * VITE_API_URL permite reemplazar la URL pública predeterminada del Web App.
 *
 * Nota: Google Apps Script Web Apps no soportan preflight CORS estándar,
 * por eso los POST se envían como "text/plain" (evita el preflight OPTIONS)
 * y el propio `doPost` del backend se encarga de parsear el JSON recibido.
 */
const DEFAULT_API_URL = 'https://script.google.com/macros/s/AKfycbybTLGdzr5BHfK-tDG6-M8wf5g7zywWctZABoLwH0EAQTS_xsku9ciOopaiJiWe5aP4/exec'
const configuredApiUrl = import.meta.env.VITE_API_URL?.trim()
const API_URL = configuredApiUrl && !configuredApiUrl.includes('TU_SCRIPT_ID') ? configuredApiUrl : DEFAULT_API_URL

const client = axios.create({
  timeout: 15000,
})

async function postAction(action, payload = {}) {
  assertApiConfigured()
  const { data } = await client.post(
    API_URL,
    JSON.stringify({ action, ...payload }),
    { headers: { 'Content-Type': 'text/plain;charset=utf-8' } }
  )
  if (data?.success === false) throw new Error(data.error || data.message || 'No se pudo completar la solicitud.')
  return data
}

async function getAction(action, params = {}) {
  assertApiConfigured()
  const { data } = await client.get(API_URL, {
    params: { action, ...params },
  })
  if (data?.success === false) throw new Error(data.error || data.message || 'No se pudo completar la solicitud.')
  if (!data || typeof data !== 'object') throw new Error('La API devolvió una respuesta inválida. Comprueba el acceso público del Web App.')
  return data
}

function assertApiConfigured() {
  if (!API_URL || API_URL.includes('TU_SCRIPT_ID')) {
    throw new Error('La URL de la API no está configurada para este entorno.')
  }
}

/** Envía un mensaje del formulario de contacto (Hoja BD). */
export function sendContact({ name, email, message }) {
  return postAction('contact', {
    name,
    email,
    message,
    date: new Date().toISOString(),
  })
}

/** Valida credenciales de administrador contra la Hoja Usuarios. */
export function login(username, password) {
  return postAction('login', { username, password })
}

/** Crea un post de blog de texto enriquecido. */
export function createPost({ title, content }) {
  return postAction('create_post', { title, content })
}

/** Obtiene el listado de posts del blog (Hoja Blog), más recientes primero. */
export function getPosts() {
  let voterId
  try { voterId = getVoterId() } catch { /* Reading remains available without browser storage. */ }
  return getAction('get_posts', { voterId })
}

export function getVoterId() {
  const key = 'emigab-voter-id'
  let id = localStorage.getItem(key)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(key, id)
  }
  return id
}

export function reactToPost(postId, reaction) {
  let voterId
  try { voterId = getVoterId() } catch { throw new Error('Permite el almacenamiento del navegador para guardar tu reacción.') }
  return postAction('react_post', { postId, reaction, voterId })
}

export default { sendContact, login, createPost, getPosts }
