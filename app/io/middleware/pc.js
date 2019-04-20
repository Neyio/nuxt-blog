'use strict';
// {app_root}/app/io/middleware/auth.js
// const PREFIX = 'room';
// const MODULE = 'default';
const uuidv4 = require('uuid/v4');
module.exports = () => {
  return async (ctx, next) => {
    const {
      app,
      socket, // 客户端长连接实例句柄
    } = ctx;
    // const id = socket.id; // id为当前用户的特殊id 类似 x-socket-id
    const {
      room,
    } = socket.handshake.query; // 获取握手的相关参数
    console.log('socket.handshake.query: ', socket.handshake.query);
    const nsp = app.io.of('/pc'); // Namespace ===nsp
    const rooms = [ '' ].concat(room ? [ room ] : []); // 当前房间，官方用例使用了数组的形式
    // socket.join(room); // 调用实例的join方法使用户加入某个房间 或多个房间
    socket.join(rooms, async () => {
      nsp.to(room).emit('welcome', { content: '欢迎使用最青春教学过程多模态应用PC端' });
      if (room === 'login') {
        const uuid = uuidv4();
        const socketId = socket.id;
        await ctx.app.redis.hset('loginUUid', uuid, socketId, () => {
          socket.emit('loginToken', {
            uuid,
            socketId,
          });
          console.log('​-------------------------------------------------------');
          console.log('​uuid,socketId', uuid, socketId);
          console.log('​-------------------------------------------------------');
        });
      }

    });
    await next(); // 保持长连接，一旦执行后续方法，表示已经断开连接
  };
};
