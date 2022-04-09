#!/usr/bin/env node

const fs = require('fs')
const YAML = require('yaml')
const stringify = require('./stringify.js')

const formats = {
  es6: {
    alias: 'e',
    conflicts: ['node', 'yaml'],
    describe: 'Convert to an ECMAScript module',
    group: 'Output format:',
    type: 'boolean'
  },
  json: {
    alias: 'j',
    default: true,
    describe: 'Convert to JSON',
    group: 'Output format:',
    type: 'boolean'
  },
  node: {
    alias: 'n',
    conflicts: ['es6', 'yaml'],
    describe: 'Convert to a Node.js module',
    group: 'Output format:',
    type: 'boolean'
  },
  yaml: {
    alias: 'y',
    conflicts: ['es6', 'node'],
    describe: 'Convert to YAML',
    group: 'Output format:',
    type: 'boolean'
  }
}

const options = {
  input: {
    alias: 'i',
    default: '-',
    describe: 'Input file; use - for stdin',
    type: 'string'
  },
  keep: {
    alias: 'k',
    describe: 'When outputting YAML, keep original styling',
    type: 'boolean'
  },
  output: {
    alias: 'o',
    default: '-',
    describe: 'Output file; use - for stdout',
    type: 'string'
  },
  pretty: {
    alias: 'p',
    describe: 'When outputting JS or JSON, make it pretty',
    type: 'boolean'
  },
  quiet: {
    alias: 'q',
    describe: 'Silence warnings and errors; always try to produce output',
    type: 'boolean'
  }
}

const yargs = require('yargs')
  .command(
    '$0 [input]',
    'Convert between YAML and JSON, optionally wrapping output as a JS module'
  )
  .options(formats)
  .options(options)
  .help()

function main({ input, output, keep, pretty, quiet, es6, node, yaml }) {
  if (input === '-' && process.stdin.isTTY) {
    yargs.showHelp()
    process.exit(1)
  }

  const inputStr = fs.readFileSync(input === '-' ? 0 : input, 'utf8')
  const doc = YAML.parseDocument(inputStr, { keepNodeTypes: keep })
  if (quiet) {
    doc.errors = []
  } else {
    for (const warn of doc.warnings) {
      console.warn(`${warn.name}: ${warn.message}`)
    }
    if (doc.errors.length > 0) {
      for (const err of doc.errors) console.error(`${err.name}: ${err.message}`)
      process.exit(2)
    }
  }

  const format = es6 ? 'es6' : node ? 'node' : yaml ? 'yaml' : 'json'
  const outputStr = stringify(doc, { format, pretty })
  if (output === '-') process.stdout.write(outputStr)
  else fs.writeFileSync(output, outputStr)
}

main(yargs.argv)
