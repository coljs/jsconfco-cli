'use strict'

const cardinal = require('cardinal')
const chalk = require('chalk')
const marked = require('marked')
const fs = require('fs')
const TerminalRenderer = require('marked-terminal')
const path = require('path')
const ora = require('./../lib/spinner')
const markdown = fs
  .readFileSync(path.join(__dirname, '..', 'lib', 'assets', 'coc.md'))
  .toString()
const markdownAsJson = { content: markdown }

async function coc (command, sub, args) {
  const spinner = ora('Loading JSConfCO Code of Conduct')
  try {
    spinner.start()

    // Print just JSON if the args and option are received
    if (args && args.json) {
      spinner.succeed('JSConfCO Schedule loaded')
      return console.log(cardinal.highlight(JSON.stringify(markdownAsJson)))
    }

    if (args && args.raw) {
      spinner.succeed('JSConfCO Schedule loaded')
      return console.log(JSON.stringify(markdownAsJson))
    }

    marked.setOptions({
      // Define custom renderer
      renderer: new TerminalRenderer({
        firstHeading: chalk.yellow.bold,
        heading: chalk.red.bold
      })
    })

    // Print the info
    spinner.succeed('JSConfCO Code of Conduct loaded')
    console.log(marked(markdown))
  } catch (error) {
    spinner.fail('Failed to load JSConfCO Code of Conduct')
    console.error(chalk.red('There was an error: ', error))
  }
}

module.exports = coc
