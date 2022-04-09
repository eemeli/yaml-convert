/**
 * @typedef {object} Options
 * @prop {boolean} pretty When outputting JS or JSON, make it pretty
 * @prop {"es6" | "yaml" | "node" | "json"} format
 *
 * @param {require('yaml').Document} doc
 * @param {Options} options
 * @returns {string}
 */
module.exports = function stringify(doc, { format, pretty }) {
  if (format === 'yaml') return String(doc)

  const json = pretty
    ? JSON.stringify(doc.toJSON(), null, '  ')
    : JSON.stringify(doc.toJSON())
  switch (format) {
    case 'es6':
      return `export default ${json};`
    case 'node':
      return `module.exports = ${json};`
    default:
      return json
  }
}
