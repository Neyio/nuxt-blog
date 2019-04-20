'use strict'
module.exports = options => {
  return function nuxt(ctx, next) {
    // if(routerList hitted)
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    ctx.app.nuxt.render(ctx.req, ctx.res)
    return true
    // await next()
  }
}
