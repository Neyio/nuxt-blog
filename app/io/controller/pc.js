'use strict';

const Controller = require('egg').Controller;

class PCController extends Controller {
  /**
     * 聊天（发送） 请求入口 含 [ 单聊 | 群聊 | 系统消息]
     */
  async chat() {
    const {
      app,
      ctx,
    } = this;
    const namespace = app.io.of('/pc');
    const message = ctx.args[0] || {};
    await this.ctx.service.mchat.send(namespace, 'chat', message);
  }


  /**
     * 加入聊天房间
     */
  async joinRoom() {
    const {
      app,
      ctx,
    } = this;
    const namespace = app.io.of('/pc');
    const message = ctx.args[0] || {};
    await this.ctx.service.mchat.joinRoom(namespace, message);

  }

}

module.exports = PCController;
