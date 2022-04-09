const t = require('tap')
const YAML = require('yaml')
const stringify = require('../lib/stringify.js')

t.test('emits valid es6', async () => {
  const src = 'foo: bar\nx: 42'
  const doc = YAML.parseDocument(src)
  const res = stringify(doc, { format: 'es6' })
  t.equal(res, 'export default {"foo":"bar","x":42};')
})

t.test('emits valid commonjs', async () => {
  const src = 'foo: bar\nx: 42'
  const doc = YAML.parseDocument(src)
  const res = stringify(doc, { format: 'node' })
  t.equal(res, 'module.exports = {"foo":"bar","x":42};')
})
