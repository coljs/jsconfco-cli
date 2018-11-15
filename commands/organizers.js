'use strict'

const cardinal = require('cardinal')
const chalk = require('chalk')
const ora = require('./../lib/spinner')
const Table = require('cli-table3')
const fs = require('fs')
const path = require('path')

const jsonOrganizers = fs
  .readFileSync(path.join(__dirname, '..', 'lib', 'assets', 'organizers.json'))
  .toString()

async function organizers (command, sub, args) {
  const spinner = ora('Loading JSConfCO Organizers')

  try {
    spinner.start()

    // Print just JSON if the args and option are received
    if (args && args.json) {
      spinner.succeed('JSConfCO Organizers loaded')
      return console.log(cardinal.highlight(jsonOrganizers))
    }

    if (args && args.raw) {
      spinner.succeed('JSConfCO Organizers loaded')
      return console.log(jsonOrganizers)
    }

    // Create the tables for normal output
    const content = JSON.parse(jsonOrganizers)

    // Table the tables
    const organizers = createTable(content)

    // Print the info
    spinner.succeed('JSConfCO Organizers loaded')

    console.log(chalk.yellow('\nOrganizers\n'))
    console.log(organizers.toString())
  } catch (error) {
    spinner.fail('Failed to load JSConfCO Organizers')
    console.error(chalk.red('There was an error: ', error))
  }
}

function createTable (data) {
  const header = [
    chalk.blue('Name'),
    chalk.blue('Twitter')
  ]

  const table = new Table({
    head: header
  })

  const colors = [chalk.red, chalk.blue, chalk.yellow]

  for (let i = 0; i < data.length; i++) {
    const name = data[i].name
    const twitterHandle = data[i].twitter
    const twitterLink = 'https://twitter.com/' + twitterHandle
    const twitterInfo = `@${twitterHandle} (${twitterLink})`
    const idxRnd = (Math.floor(Math.random() * 3) + 1) - 1
    table.push([
      colors[idxRnd](name),
      twitterInfo
    ])
  }
  return table
}

module.exports = organizers
