const t = require('tap')
const YAML = require('yaml')
const stringify = require('../lib/stringify.js')

t.test('emits valid yaml', async () => {
  const src = 'foo: bar\nx: 42\n'
  const doc = YAML.parseDocument(src)
  const res = stringify(doc, { format: 'yaml' })
  t.equal(res, src)
})

t.test('is fine with circular references', async () => {
  const src = '&a\nfoo: bar\nx: *a\n'
  const doc = YAML.parseDocument(src)
  const res = stringify(doc, { format: 'yaml' })
  t.equal(res, src)
})
