'use strict';
// {app_root}/app/io/middleware/connection.js
module.exports = () => { // 去除app参数
  return async (ctx, next) => {
    // 当用户打开连接时
    ctx.socket.emit('res', '用户已接入!');
    // 如果触发条件，则剔除用户
    // if (condition) {
    //   ctx.socket.disconnet();
    //   return;
    // }
    await next();
    // 当用户断开链接时
    console.log('用户已断开!');
  };
};
