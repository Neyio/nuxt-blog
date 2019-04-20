'use strict'
// 辅助函数，如果需要在定义辅助函数体中使用其他方法，请使用this.
module.exports = {
  log(param = 'hello world !') {
    console.log(param)
  },
  /**
   * 封装socket.io的数据
   * @param {*} action 'chat | deny | exchange | broadcast | notification',
   * @param {*} payload {}
   * @param {*} metadata {}
   * @return {Object} { meta, data: { action, payload } }
   */
  parseMsg(action, payload = {}, metadata = {}) {
    const meta = Object.assign(
      {},
      {
        timestamp: Date.now()
      },
      metadata
    )
    return {
      meta,
      data: {
        action,
        payload
      }
    }
  },
  /**
   * 转换字符串为数字
   * @param {string|number} string 需要转换的变量
   * @return {integer} number 转换后int数
   */
  parseInt(string) {
    if (typeof string === 'number') return string
    if (!string) return string
    return parseInt(string) || 0
  }
}
