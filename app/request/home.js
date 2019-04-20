'use strict'

// app/request/home.js
const createRule = {
  username: {
    type: 'email'
  },
  password: {
    type: 'password',
    compare: 're-password'
  }
}

exports.createRule = createRule
