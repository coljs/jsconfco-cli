'use strict'

const cardinal = require('cardinal')
const chalk = require('chalk')
const ora = require('./../lib/spinner')
const opn = require('opn')
const reportLinkAsJson = { reporturl: 'https://goo.gl/forms/Y8THVJGcGtvaPECD2' }

async function report (command, sub, args) {
  const spinner = ora('Loading JSConfCO Reporting')

  try {
    spinner.start()

    if (args && args.json) {
      spinner.succeed('JSConfCO Reporting loaded')
      return console.log(cardinal.highlight(JSON.stringify(reportLinkAsJson)))
    }

    if (args && args.raw) {
      spinner.succeed('JSConfCO Reporting loaded')
      return console.log(JSON.stringify(reportLinkAsJson))
    }

    // Print the info
    spinner.succeed('JSConfCO Reporting loaded')
    console.log(
      chalk.yellow(
        'Thanks for telling us, please fill out the form that opened (https://goo.gl/forms/Y8THVJGcGtvaPECD2)'
      )
    )
    opn('https://goo.gl/forms/Y8THVJGcGtvaPECD2', { wait: false })
  } catch (error) {
    spinner.fail('Failed to load JSConfCO Reporting')
    console.error(chalk.red('There was an error: ', error))
  }
}

module.exports = report
