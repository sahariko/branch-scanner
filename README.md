# branch-scanner

A tiny CLI program that lists all non-standard git branches of the current directory's subdirectories.

![screenshot](./docs/screenshot.png)

## Table of Contents

- [Installation and Usage](#installation-and-usage)
    * [Options](#options)

## Installation and Usage

Intsall the program globally:
```sh
npm i -g branch-scanner
```

Then use it from your terminal like so:
```sh
branch-scanner
```

### Options

| Argument | What it does | Possible value |
|----------|----------|---------------------------------------------|--------------|
| `-v`, `--version` | output the program's version number | **REQUIRED** |

-v, --version           output the version number
  -d, --directory [path]  specify a directory to scan (default: "the current directory")
  -h, --help              output usage information
