'use strict'

const cardinal = require('cardinal')
const chalk = require('chalk')
const ora = require('./../lib/spinner')
const Table = require('cli-table3')
const fs = require('fs')
const path = require('path')

const jsonSponsors = fs
  .readFileSync(path.join(__dirname, '..', 'lib', 'assets', 'sponsors.json'))
  .toString()

async function sponsors (command, sub, args) {
  const spinner = ora('Loading JSConfCO Sponsors')

  try {
    spinner.start()

    // Print just JSON if the args and option are received
    if (args && args.json) {
      spinner.succeed('JSConfCO Sponsors loaded')
      return console.log(cardinal.highlight(jsonSponsors))
    }

    if (args && args.raw) {
      spinner.succeed('JSConfCO Sponsors loaded')
      return console.log(jsonSponsors)
    }

    // Create the tables for normal output
    const content = JSON.parse(jsonSponsors)

    // Table the tables
    const sponsors = createTable(content)

    // Print the info
    spinner.succeed('JSConfCO Sponsors loaded')

    console.log(chalk.blue('\nSponsors\n'))
    console.log(sponsors.toString())
  } catch (error) {
    spinner.fail('Failed to load JSConfCO Sponsors')
    console.error(chalk.red('There was an error: ', error))
  }
}

function createTable (data) {
  const colors = [chalk.yellow, chalk.blue, chalk.red]

  const header = [
    colors[0]('Type'),
    colors[1]('Name'),
    colors[2]('Link')
  ]

  const table = new Table({
    head: header
  })

  for (let i = 0; i < data.length; i++) {
    const type = data[i].type
    const content = data[i].content
    for (let j = 0; j < content.length; j++) {
      const name = content[j].name
      const link = content[j].link
      table.push([
        colors[0](type),
        colors[1](name),
        colors[2](link)
      ])
    }
  }

  return table
}

module.exports = sponsors
