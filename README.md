# yaml-convert

<br/><br/>

## Deprecated: Command-line tool now included in [`yaml`](https://github.com/eemeli/yaml).

<br/><br/><br/>

Command-line utility for converting between YAML and JSON, using
[`yaml`](https://eemeli.org/yaml/). By default parses either YAML or JSON from
standard input and outputs JSON on standard output.

### Installation

```
npm install yaml-convert
```

### Usage

```
yaml-convert [input]

Convert between YAML and JSON, optionally wrapping output as a JS module

Output format:
  --es6, -e   Convert to an ECMAScript module                          [boolean]
  --json, -j  Convert to JSON                          [boolean] [default: true]
  --node, -n  Convert to a Node.js module                              [boolean]
  --yaml, -y  Convert to YAML                                          [boolean]

Options:
  --version     Show version number                                    [boolean]
  --input, -i   Input file; use - for stdin              [string] [default: "-"]
  --keep, -k    When outputting YAML, keep original styling            [boolean]
  --output, -o  Output file; use - for stdout            [string] [default: "-"]
  --pretty, -p  When outputting JS or JSON, make it pretty             [boolean]
  --quiet, -q   Silence warnings and errors; always try to produce output
                                                                       [boolean]
  --help        Show help                                              [boolean]
```

### Examples

```
yaml-convert --input file.yaml --output file.json
yaml-convert -np < file.yaml > file.js
yaml-convert file.yaml | jq .foo
```
