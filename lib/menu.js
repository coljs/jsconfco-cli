'use strict'

module.exports = {
  type: 'list',
  name: 'command',
  message: 'Select a command',
  choices: [{
    name: 'Schedule',
    value: 's'
  },
  {
    name: 'Speakers',
    value: 'p'
  },
  {
    name: 'Organizers',
    value: 'o'
  },
  {
    name: 'Sponsors',
    value: 'n'
  },
  {
    name: 'Code of Conduct (coc)',
    value: 'c'
  },
  {
    name: 'Report a CoC violation',
    value: 'r'
  },
  {
    name: 'Help',
    value: 'h'
  }
  ],
  default: 's'
}
