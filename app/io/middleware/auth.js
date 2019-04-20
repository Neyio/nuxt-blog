'use strict'
module.exports = () => {
  return async (ctx, next) => {
    const { socket } = ctx

    // socket.join(room); // 调用实例的join方法使用户加入某个房间 或多个房间
    socket.join('system', () => {
      console.log('用户默认加入一个系统名为（system）房间')
    })

    await next() // 保持长连接，一旦执行后续方法，表示已经断开连接
  }
}
