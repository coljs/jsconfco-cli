'use strict'

const cardinal = require('cardinal')
const chalk = require('chalk')
const got = require('got')
const moment = require('moment')
const ora = require('./../lib/spinner')
const Table = require('cli-table3')
const wrap = require('word-wrap')

async function schedule (command, sub, args) {
  const spinner = ora('Loading JSConfCO Schedule')
  try {
    spinner.start()

    // Get the schedule
    const response = await got('https://sessionize.com/api/v2/795mfyn6/view/grid')

    // Print just JSON if the args and option are received
    if (args && args.json) {
      spinner.succeed('JSConfCO Schedule loaded')
      return console.log(cardinal.highlight(response.body))
    }

    if (args && args.raw) {
      spinner.succeed('JSConfCO Schedule loaded')
      return console.log(response.body)
    }

    // Create the tables for normal output
    const content = JSON.parse(response.body)

    // Table the tables
    const day1 = createTable(content[0].rooms[0].sessions)
    const day2 = createTable(content[1].rooms[0].sessions)

    // Print the info
    spinner.succeed('JSConfCO Schedule loaded')

    console.log(chalk.yellow('\nDay 1 - 11/16/2018\n'))
    console.log(day1.toString())
    console.log(chalk.yellow('\n\nDay 2 - 11/16/2018\n'))
    console.log(day2.toString())
  } catch (error) {
    spinner.fail('Failed to load JSConfCO Schedule')
    console.error(chalk.red('There was an error: ', error))
  }
}

function createTable (data) {
  const header = [
    chalk.blue('Starts At'),
    chalk.red('Ends At'),
    chalk.blue('Session'),
    chalk.blue('Speaker')
  ]

  const table = new Table({
    head: header
  })

  for (let i = 0; i < data.length; i++) {
    const session = data[i]
    const speaker = (session.speakers[0]) ? session.speakers[0].name : ''
    const title = session.title
    const start = moment(session.startsAt).format('h:mm a')
    const end = moment(session.endsAt).format('h:mm a')

    if (speaker !== '') {
      table.push([
        start,
        end,
        wrap(title),
        wrap(speaker, { width: 20 })
      ])
    } else {
      table.push([
        chalk.yellow(start),
        chalk.yellow(end),
        { colSpan: 2, content: chalk.yellow((wrap(title))) }
      ])
    }
  }

  return table
}

module.exports = schedule
