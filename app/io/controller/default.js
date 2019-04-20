'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {
  /**
   * 聊天（发送） 请求入口 含 [ 单聊 | 群聊 | 系统消息]
   */
  async chat() {
    const {
      app,
      ctx,
    } = this;
    const namespace = app.io.of('/');
    const message = ctx.args[0] || {};
    await this.ctx.service.mchat.send(namespace, 'chat', message);
  }
  /**
   * 聊天历史[ 单聊 | 群聊 | 系统消息]
   */
  async history() {
    const {
      app,
      ctx,
    } = this;
    const namespace = app.io.of('/');
    const message = ctx.args[0] || {};
    await this.ctx.service.mchat.history(namespace, message);
  }

  /**
   * 当前的聊天列表
   */
  async chatList() {
    const {
      app,
      ctx,
    } = this;
    const namespace = app.io.of('/');
    const message = ctx.args[0] || {};
    await this.ctx.service.mchat.chatList(namespace, message);
  }

  /**
   * 加入聊天房间
   */
  async joinRoom() {
    const {
      app,
      ctx,
    } = this;
    const namespace = app.io.of('/');
    const message = ctx.args[0] || {};
    console.log('TCL: ------------------------------------------------------');
    console.log('TCL: DefaultController -> joinRoom -> message', message);
    console.log('TCL: ------------------------------------------------------');

    await this.ctx.service.mchat.joinRoom(namespace, message);

  }

  /**
   * 房间在线人员的列表
   */
  async roomOnlineList() {
    const {
      app,
      ctx,
    } = this;
    const namespace = app.io.of('/');
    const message = ctx.args[0] || {};
    await this.ctx.service.mchat.roomOnlineList(namespace, message);
  }

  async notification() {
    const {
      app,
      ctx,
    } = this;
    const namespace = app.io.of('/');
    const message = ctx.args[0] || {};
    await this.ctx.service.mchat.send(namespace, 'notification', message);
  }

  /**
   * 控制操作，主要是指令原样分发
   */
  async controll() {
    const {
      app,
      ctx,
    } = this;
    const namespace = app.io.of('/');
    const message = ctx.args[0] || {};
    await this.ctx.service.mchat.controll(namespace, message);
  }

  /**
   * 获取syncfile
   */
  async getSyncFile() {
    const {
      app,
      ctx,
    } = this;
    const namespace = app.io.of('/');
    const message = ctx.args[0] || {};
    await this.ctx.service.mchat.getSyncFile(namespace, message);
  }
  /**
   * 生成或获取考勤 uuid
   * emit('uuid', {
   *    roomId: 'course-' + roomId,
   *    attendanceId: 1
   * })
   */
  async uuid() {
    const {
      app,
      ctx,
    } = this;
    const namespace = app.io.of('/');
    const message = ctx.args[0] || {};
    console.log('message: ', message);

    await this.ctx.service.mchat.uuid(namespace, message);
  }

  /**
   * 考勤
   */
  async attendance() {
    const {
      app,
      ctx,
    } = this;
    const namespace = app.io.of('/');
    const message = ctx.args[0] || {};
    console.log('message: ', message);
    await this.ctx.service.attendance.attendanceHandler(namespace, message);
  }
}

module.exports = DefaultController;
