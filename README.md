# yaml-convert

Command-line utility for converting between YAML and JSON, using
[`yaml`](https://eemeli.org/yaml/). By default parses either YAML or JSON from
standard input and outputs JSON on standard output.

### Installation

```
npm install yaml-convert
```

### Usage

```
yaml-convert [options]

Convert between YAML and JSON

Options:
  --version     Show version number                                    [boolean]
  --input, -i   Input file; use - for stdin              [string] [default: "-"]
  --keep, -k    When outputting YAML, keep original styling            [boolean]
  --output, -o  Output file; use - for stdout            [string] [default: "-"]
  --pretty, -p  When outputting JSON, make it pretty                   [boolean]
  --quiet, -q   Silence warnings and errors; always try to produce output
                                                                       [boolean]
  --yaml, -y    Format output as YAML                                  [boolean]
  --help        Show help                                              [boolean]
```

### Examples

```
yaml-convert --input file.yaml --output file.json
yaml-convert -p < file.yaml > pretty.json
yaml-convert -i file.yaml | jq .foo
```
