#!/usr/bin/env node

const fs = require('fs')
const YAML = require('yaml')

const yargs = require('yargs')
  .command('$0 [input]', 'Convert between YAML and JSON')
  .options({
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
      describe: 'When outputting JSON, make it pretty',
      type: 'boolean'
    },
    quiet: {
      alias: 'q',
      describe: 'Silence warnings and errors; always try to produce output',
      type: 'boolean'
    },
    yaml: {
      alias: 'y',
      describe: 'Format output as YAML',
      type: 'boolean'
    }
  })
  .help()

const { input, keep, output, pretty, quiet, yaml } = yargs.argv

if (input === '-' && process.stdin.isTTY) {
  yargs.showHelp()
  process.exit(1)
}

const inputStr = fs.readFileSync(input === '-' ? 0 : input, 'utf8')
const options = { keepNodeTypes: keep }
const doc = YAML.parseDocument(inputStr, options)
if (quiet) {
  doc.errors = []
} else {
  for (const warn of doc.warnings) console.warn(`${warn.name}: ${warn.message}`)
  if (doc.errors.length > 0) {
    for (const err of doc.errors) console.error(`${err.name}: ${err.message}`)
    process.exit(2)
  }
}

const outputStr = yaml
  ? String(doc)
  : pretty
  ? JSON.stringify(doc.toJSON(), null, '  ')
  : JSON.stringify(doc.toJSON())

if (output === '-') {
  process.stdout.write(outputStr)
} else {
  fs.writeFileSync(output, outputStr)
}
