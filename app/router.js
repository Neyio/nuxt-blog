'use strict'
/**
 * @param {ApplicationInstance}  app  EggApplication
 */
module.exports = app => {
  const { router, controller } = app
  /**
   * ================================================
   *  直接输出页面部分
   * ================================================
   */
  router.get('/', controller.home.index)
}
