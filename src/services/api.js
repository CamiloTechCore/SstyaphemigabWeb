import axios from 'axios'

/**
 * Cliente HTTP para la API serverless (Google Apps Script).
 * La URL se define en `.env` como VITE_API_URL (Web App URL del script publicado).
 *
 * Nota: Google Apps Script Web Apps no soportan preflight CORS estándar,
 * por eso los POST se envían como "text/plain" (evita el preflight OPTIONS)
 * y el propio `doPost` del backend se encarga de parsear el JSON recibido.
 */
const API_URL = import.meta.env.VITE_API_URL || 'https://script.google.com/macros/s/TU_SCRIPT_ID/exec'

const client = axios.create({
  timeout: 15000,
})

async function postAction(action, payload = {}) {
  const { data } = await client.post(
    API_URL,
    JSON.stringify({ action, ...payload }),
    { headers: { 'Content-Type': 'text/plain;charset=utf-8' } }
  )
  return data
}

async function getAction(action, params = {}) {
  const { data } = await client.get(API_URL, {
    params: { action, ...params },
  })
  return data
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
  return getAction('get_posts')
}

export default { sendContact, login, createPost, getPosts }
