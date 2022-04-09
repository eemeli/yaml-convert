const t = require('tap')
const YAML = require('yaml')
const stringify = require('../lib/stringify.js')

t.test('emits valid json', async () => {
  const src = 'foo: bar\nx: 42'
  const doc = YAML.parseDocument(src)
  const res = stringify(doc, { format: 'json' })
  t.equal(res, '{"foo":"bar","x":42}')
})

t.test('emits pretty json', async () => {
  const src = 'foo: bar\nx: 42'
  const doc = YAML.parseDocument(src)
  const res = stringify(doc, { format: 'json', pretty: true })
  t.equal(
    res,
    `\
{
  "foo": "bar",
  "x": 42
}`
  )
})

t.test('complains about circular references', async () => {
  const src = '&a\nfoo: bar\nx: *a'
  const doc = YAML.parseDocument(src)
  t.throws(
    () => stringify(doc, { format: 'json' }),
    /^Converting circular structure to JSON/
  )
})
