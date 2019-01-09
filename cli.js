#!/usr/bin/env node

const fs = require('fs')
const YAML = require('yaml')

const yargs = require('yargs')
  .usage('$0 [options]', 'Convert between YAML and JSON')
  .options({
    input: {
      alias: 'i',
      default: '-',
      describe: 'Input file; use - for stdin',
      type: 'string'
    },
    keep: {
      alias: 'k',
      default: false,
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
      default: false,
      describe: 'When outputting JSON, make it pretty',
      type: 'boolean'
    },
    yaml: {
      alias: 'y',
      default: false,
      describe: 'Format output as YAML'
    }
  })
  .help()

const { input, keep, output, pretty, yaml } = yargs.argv

if (input === '-' && process.stdin.isTTY) {
  yargs.showHelp()
  process.exit(1)
}

const inputStr = fs.readFileSync(input === '-' ? 0 : input, 'utf8')
const options = { keepNodeTypes: keep }
const doc = YAML.parseDocument(inputStr, options)

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
