'use strict'
const Service = require('egg').Service

class HomeService extends Service {
  sayHelloWorld() {
    console.log('HelloWorld!')
    this.ctx.logger.info('HelloWorld!')
  }
}
module.exports = HomeService
