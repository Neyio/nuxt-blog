'use strict'
const fs = require('fs')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const mainQueue = require('./app/queue/mainQueue')
// Import and Set Nuxt.js options
const config = require('./nuxt.config.js')

module.exports = app => {
  app.beforeStart(async () => {
    // 应用会等待这个函数执行完成才启动
    // const cert = fs.readFileSync('./cert/oauth-public.key') // get public key
    // app.passportPublicKey = cert
    // Instantiate nuxt.js
    app.nuxt = new Nuxt(config)
    // Build in development
    if (true) {
      console.log('CurrentMode ====> develop mode')
      const builder = new Builder(app.nuxt)
      await builder.build()
    } else {
      await app.nuxt.ready()
    }
    config.dev = !(config.env === 'production')
    const room = await app.redis.get('room:demo')
    if (!room) {
      await app.redis.set('room:demo', 'demo')
    }
    // 监听事件队列
    mainQueue(app)
  })

  app.log = (...args) => {
    if (app.config.debug) {
      console.log('输出为：\n', args, '\n')
    }
  }

  app.once('server', () => {
    consola.ready({
      message: 'Server is running.',
      badge: true
    })
  })

  app.on('error', (err, ctx) => {
    ctx.logger.error(ctx.headers, err)
  })

  app.on('request', ctx => {
    console.log('request recived')
    ctx.logger.info(ctx.headers)
  })

  app.on('response', ctx => {
    const used = Date.now() - ctx.starttime
    console.log(`本次请求处理时间为 ${used} ms`)
  })
}
