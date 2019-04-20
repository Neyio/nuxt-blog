'use strict'
const Subscription = require('egg').Subscription

class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '1m', // 1m: 1 分钟间隔 通过 schedule.interval 参数来配置定时任务的执行时机，定时任务将会每间隔指定的时间执行一次。interval 可以配置成 4000 即4秒
      type: 'worker' // 指定所有的 worker 都需要执行 ，如果是worker指的是某个worker
    }
  }
  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    // 此处可以定义向系统汇报数据的接口。
    console.log(
      "当前为事件队列，通过调用this.ctx.app.bull.get('mainQueue').add({type:'xx',payload:'xxx'})触发事件队列"
    )
    this.ctx.app.logger.info('开始处理队列任务')
    await this.ctx.app.bull.get('mainQueue').add(
      {
        type: 'example',
        payload: {
          video: 'http://example.com/video1.mov'
        }
      },
      {
        removeOnComplete: true
      }
    )
    this.ctx.app.logger.info('处理队列任务完成')
  }
}

module.exports = UpdateCache
// 等同于
// module.exports = {
//     schedule: {
//       interval: '1m', // 1 分钟间隔
//       type: 'all', // 指定所有的 worker 都需要执行
//     },
//     async task(ctx) {
//       const res = await ctx.curl('http://www.api.com/cache', {
//         dataType: 'json',
//       });
//       ctx.app.cache = res.data;
//     },
//   };
