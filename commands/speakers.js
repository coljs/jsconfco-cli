'use strict'

const chalk = require('chalk')
const cardinal = require('cardinal')
const got = require('got')
const ora = require('./../lib/spinner')
const Table = require('cli-table3')
const wrap = require('word-wrap')

async function speakers (command, sub, args) {
  const spinner = ora('Loading JSConfCO Speakers')
  try {
    spinner.start()

    const response = await got('https://sessionize.com/api/v2/795mfyn6/view/speakers')

    // Print just JSON if the args and option are received
    if (args && args.json) {
      spinner.succeed('JSConfCO Speakers loaded')
      return console.log(cardinal.highlight(response.body))
    }

    if (args && args.raw) {
      spinner.succeed('JSConfCO Speakers loaded')
      return console.log(response.body)
    }

    // Create the tables for normal output
    const content = JSON.parse(response.body)

    const sortedContent = content.sort(function () { return 0.5 - Math.random() })

    // Table the table
    const speakers = createTable(sortedContent)

    // Print the info
    spinner.succeed('JSConfCO Speakers loaded')

    console.log(chalk.yellow('Speakers'))
    console.log(speakers.toString())
  } catch (error) {
    spinner.fail('Failed to load JSConfCO Speakers')
    console.error(chalk.red('There was an error: ', error))
  }
}

function createTable (data) {
  const header = [
    chalk.red('Name'),
    chalk.blue('Bio'),
    chalk.blue('Twitter'),
    chalk.yellow('😎')
  ]

  const table = new Table({
    head: header
  })
  const colors = [chalk.red, chalk.blue, chalk.yellow]
  for (let i = 0; i < data.length; i++) {
    const speaker = data[i]
    const linkTwitter = findLinks(speaker, 'Twitter')
    let twitterInfo = ''
    if (typeof linkTwitter !== 'undefined') {
      // remove last character if it's an "/" and get the handle of twitter link
      const twitterHandle = linkTwitter.url.replace(/\/$/, '').split('/').pop()
      twitterInfo = `@${twitterHandle} (${linkTwitter.url})`
    }
    const idxRnd = (Math.floor(Math.random() * 3) + 1) - 1
    table.push([
      colors[idxRnd](wrap(speaker.fullName, { width: 20 })),
      // replace all break line beacuse that broke cli-table design
      wrap(speaker.bio.replace(/(\r\n|\n|\r)/gm, ' ')),
      wrap(twitterInfo, { width: 30 }),
      wrap(speaker.tagLine, { width: 20 })
    ]
    )
  };
  return table
}

function findLinks (speaker, linkType) {
  return speaker.links && speaker.links.find((link) => {
    return link.linkType === linkType
  })
}

module.exports = speakers
