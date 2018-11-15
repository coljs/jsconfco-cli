# JSConfCO CLI!

![JSConf Colombia Header](lib/assets/header.png)

Hi! We are so happy for having you in our **[JSConfCO](https://jsconf.co/#home)**.  This is a node based client and was designed for helping you with the basic information about **JSConfCO**.

## Prerequisites

 - Node 8

## Installation
Run this command:

```bash
npm install jsconfco -g
```

## Development installation
Clone this repository, then install all dependencies after this link this command locally to be able to execute it in the terminal, to do this run:
```bash
$ npm link
```
 After linking, just execute:
```bash
$ jsconfco
```
# Usage
For using this CLI you have to run this command
 ```bash
$ jsconfco
```

You can choose some of the options or pass it like an additional option
```bash
$ jsconfco [options] [command]
```
The possible commands are:

 |Command|Shortcut |Description|
|----------------|------------------|------------------|
|coc|`c`            |Show the Code of Conduct (CoC)|
|help|-|  Display help|
|**report**|**`r`**|**Report a CoC violation**|
|schedule |`s`|Show schedule |
|speakers |`p`|Show speakers |
|sponsors |`n`|Show  sponsors |
|version  |-|Display version |

The possible options are:

|Shortcut |Option |Description|
|----------------|------------------|------------------|
|-h|`--help`            |Output usage information            |
|-j          |`--json`            |  Print all results in formatted JSON for the terminal (disabled by default)          |
|-r          |`--raw`|Print all results in raw JSON (disabled by default)|
|-v          |`--version` |Output the version number |


## License

Copyright 2018 JSConf Colombia

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*
