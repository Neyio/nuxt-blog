'use strict';
// {app_root}/app/io/middleware/school.js
const MODULE = 'school';
const PREFIX = 'room';
module.exports = () => {
  return async (ctx, next) => {
    const {
      app,
      socket,
      logger,
    } = ctx;
    const id = socket.id; // id为当前用户的特殊id 类似 x-socket-id
    const {
      room,
      user,
    } = socket.handshake.query; // 获取握手的相关参数
    const nsp = app.io.of('/school'); // Namespace ===/team
    const rooms = [ room || 'default' ]; // 当前房间，官方用例使用了数组的形式
    const hasRoom = await app.redis.get(`${MODULE}:${PREFIX}:${room}`);
    if (!hasRoom) {
      await app.redis.set(`${MODULE}:${PREFIX}:${room}`, 'inited');
    }
    socket.join(room, () => {
      console.log('请在此处提交当前的加入房间后的处理方法');
    }); // 调用实例的join方法使用户加入某个房间

    nsp.to(room).emit('online', {
      msg: 'welcome',
      id: socket.id,
      user: user && user.name || '未传送获取用户名',
    });

    nsp.in(room).clients((error, clients) => {
      if (error) throw error;
      nsp.to(room).emit('online', {
        clients,
        action: 'join',
        target: 'participator',
        message: `二次提示：用户(${id}) 进入了房间 ${room} `,
      });
    });

    await next(); // 保持长连接，一旦执行后续方法，表示已经断开连接
    // 用户离开
    logger.debug('#leave', room);
    // 在线列表
    nsp.adapter.clients(rooms, (err, clients) => {
      // 获取 client 信息
      // const clientsDetail = {};
      // clients.forEach(client => {
      //   // const _client = app.io.sockets.sockets[client];
      //   // const _query = _client.handshake.query;
      //   // clientsDetail[client] = _query;
      // });
      // 更新在线用户列表
      nsp.to(room).emit('offline', {
        clients,
        action: 'leave',
        target: 'participator',
        payload: {
          // clientsDetail,
        },
        message: `用户(${id}) 离开了.`,
      });
    });


  };
};
