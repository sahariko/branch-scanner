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

| Flag | What it does | Positional arguments |
|----------|----------|---------------------------------------------|--------------|
| `-v`, `--version` | Output the program's version number. | - |
| `-d`, `--directory` | Specify a directory to scan (default: "the current directory"). | An absolute or relative path to the directory you widh to scan. Defaults to the current directory. |
| `-h`, `--help` | Output the program's usage information. | - |
