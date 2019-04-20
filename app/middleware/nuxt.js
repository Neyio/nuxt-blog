'use strict'
module.exports = options => {
  // return function nuxt(ctx, next) {
  //   // if(routerList hitted)
  //   ctx.status = 200
  //   ctx.respond = false // Bypass Koa's built-in response handling
  //   ctx.request.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
  //   ctx.app.nuxt.render(ctx.req, ctx.res)
  //   return true
  //   // await next()
  // }

  return async (ctx, next) => {
    const path = ctx.request.path
    // webpack hot reload
    if (path !== '/__webpack_hmr') {
      await next()

      // ignore status if not 404
      if (ctx.status !== 404 || ctx.method !== 'GET') {
        return
      }

      ctx.status = 200

      if (/\.js$/.test(path)) {
        ctx.set('Content-Type', 'application/javascript')
      }
      if (/\.css/.test(path)) {
        ctx.set('Content-Type', 'text/css')
      }
    }
    ctx.respond = false
    await ctx.app.nuxt.render(ctx.request, ctx.response)
  }
}
