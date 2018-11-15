'use strict'

const ora = require('ora')

function createSpinner (text) {
  const spinner = ora({
    text: text,
    spinner: 'arrow3',
    color: 'yellow'
  })

  return spinner
}

module.exports = createSpinner
