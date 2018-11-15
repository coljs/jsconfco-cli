#!/usr/bin/env node

'use strict'

const asciify = require('asciify-image')
const args = require('args')
const chalk = require('chalk')
const inquirer = require('inquirer')
const path = require('path')

// Assets
const header = path.join(__dirname, '..', 'lib', 'assets', 'header.png')
const menu = require('./../lib/menu')

// Commands
const schedule = require('../commands/schedule')
const speakers = require('../commands/speakers')
const organizers = require('../commands/organizers')
const sponsors = require('../commands/sponsors')
const coc = require('../commands/coc')
const report = require('../commands/report')

// Args configuration
args
  .option('json', 'Print all results in formatted JSON for the terminal', false)
  .option('raw', 'Print all results in raw JSON', false)
  .command('schedule', 'Show the schedule', schedule, ['s'])
  .command('speakers', 'Show the speakers', speakers, ['p'])
  .command('organizers', 'Show the staff', organizers, ['o'])
  .command('sponsors', 'Show the sponsors', sponsors, ['n'])
  .command('coc', 'Show the Code of Conduct (CoC)', coc, ['c'])
  .command('report', 'Report a CoC violation', report, ['r'])

args.config.mainColor = 'blue'

// Parse the command arguments
args.parse(process.argv)

if (!args.sub.length) {
  showMenu()
}

// Displays and parse the menu selection
async function showMenu () {
  try {
    const image = await asciify(header, { fit: 'box', width: '100%' })
    console.log(image)
    const input = await inquirer.prompt([menu])

    switch (input.command) {
      case 's':
        schedule()
        break

      case 'p':
        speakers()
        break

      case 'o':
        organizers()
        break

      case 'n':
        sponsors()
        break

      case 'c':
        coc()
        break

      case 'r':
        report()
        break

      default:
        args.showHelp()
        break
    }
  } catch (error) {
    console.error(chalk.red('There was an error: ', error))
  }
}
