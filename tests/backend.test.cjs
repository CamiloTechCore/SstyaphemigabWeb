const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')

function setup(acquire = true) {
  class Sheet {
    constructor(rows = []) { this.rows = rows }
    getLastRow() { return this.rows.length }
    getLastColumn() { return Math.max(0, ...this.rows.map(row => row.length)) }
    appendRow(row) { this.rows.push([...row]) }
    getDataRange() { return { getValues: () => this.rows.map(row => [...row]) } }
    getRange(r, c, h = 1, w = 1) {
      const write = values => values.forEach((row, i) => row.forEach((value, j) => { (this.rows[r - 1 + i] ||= [])[c - 1 + j] = value }))
      return { getValues: () => Array.from({ length: h }, (_, i) => Array.from({ length: w }, (_, j) => this.rows[r - 1 + i]?.[c - 1 + j] || '')), setValue: value => write([[value]]), setValues: write }
    }
  }
  const sheets = { Blog: new Sheet([['Fecha', 'Título', 'Contenido', 'URL Archivo', 'Tipo Archivo'], ['2026-01-01', 'Primero', 'Texto'], ['2026-01-02', 'Segundo', 'Texto']]) }
  const ss = { getSheetByName: name => sheets[name], insertSheet: name => (sheets[name] = new Sheet()) }
  let uuid = 0
  let locked = false
  const context = vm.createContext({
    SpreadsheetApp: { openById: () => ss, flush() {} },
    Utilities: { getUuid: () => `post-${++uuid}` },
    LockService: { getScriptLock: () => ({ tryLock: () => (locked = acquire), hasLock: () => locked, releaseLock: () => { locked = false } }) },
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: value => ({ setMimeType: () => JSON.parse(value) }) },
  })
  vm.runInContext(fs.readFileSync('codigo.gs', 'utf8'), context)
  const get = () => context.doGet({ parameter: { action: 'get_posts' } })
  const vote = (reaction, voterId = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', postId = 'post-1') => context.doPost({ postData: { contents: JSON.stringify({ action: 'react_post', reaction, voterId, postId }) } })
  const create = () => context.doPost({ postData: { contents: JSON.stringify({ action: 'create_post', title: 'Nuevo', content: 'Contenido nuevo' }) } })
  return { sheets, get, vote, create }
}

test('migration preserves content and stable IDs across reads and row reorder', () => {
  const { get, sheets } = setup()
  assert.equal(get().data[1].id, 'post-1')
  const first = [...sheets.Blog.rows[1]]
  ;[sheets.Blog.rows[1], sheets.Blog.rows[2]] = [sheets.Blog.rows[2], sheets.Blog.rows[1]]
  assert.equal(get().data[0].id, 'post-1')
  assert.deepEqual([...sheets.Blog.rows[2]], first)
})
test('retries are idempotent, changes replace vote, totals are per post', () => {
  const { vote, sheets } = setup()
  assert.equal(vote('like').data.reactions.like, 1)
  assert.equal(vote('like').data.reactions.like, 1)
  assert.equal(vote('love').data.reactions.like, 0)
  assert.equal(vote('love').data.reactions.love, 1)
  assert.equal(vote('love', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb').data.reactions.love, 2)
  assert.equal(vote('dislike', undefined, 'post-2').data.reactions.love, 0)
  assert.equal(sheets.Reacciones.rows.length, 4)
})
test('invalid requests and missing posts do not write votes', () => {
  const { vote, sheets } = setup()
  assert.equal(vote('invalid').success, false)
  assert.equal(vote('like', 'bad').success, false)
  assert.equal(vote('like', undefined, 'missing').success, false)
  assert.equal(sheets.Reacciones.rows.length, 1)
})
test('lock timeout rejects reads and writes without touching Sheets', () => {
  const { get, vote, sheets } = setup(false)
  assert.equal(get().success, false)
  assert.equal(vote('like').success, false)
  assert.equal(sheets.Reacciones, undefined)
  assert.equal(sheets.Blog.rows[0].length, 5)
})

test('new posts receive persistent IDs without overwriting existing posts', () => {
  const { create, get, sheets } = setup()
  sheets.Blog.rows[1][0] = ''
  const result = create()
  assert.equal(result.success, true)
  assert.equal(result.id, 'post-3')
  assert.equal(sheets.Blog.rows[1][1], 'Primero')
  assert.equal(get().data[0].id, result.id)
})
