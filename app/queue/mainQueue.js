'use strict'
const assert = require('assert')
const QUEUE_NAME = 'mainQueue'
const concurrency = 50
// 样例函数
const example = payload => {
  console.log('模拟事件处理，当前参数为', payload)
  console.log('处理完成')
}

/**
 * QUEUE_NAME事件处理
 * @param {*} job {data:{type:'eventName',payload:{} },id}
 * @param {*} done ()=>{ resolve();}
 */
const jobProcessing = (job, done) => {
  console.log(
    `队列${QUEUE_NAME}触发事件 ， 你的自定义数据在 data:{type:'eventName',payload:{} } 中, 编号为：${
      job.id
    }`
  )
  assert(
    job.data && job.data.type && job.data.payload && job.id,
    '事件内必须包含类型 { data:{type:string,payload:{}} ,id:"auto generated with out filled"}'
  ) // 为何此处断言仔服务器上出错？
  switch (job.data.type) {
    case 'happy-every-day':
      example(job.data.payload)
      done()
      break
    case 'example':
      example(job.data.payload)
      done()
      break
    default:
      done(new Error(`没有${job.data.type}相关的处理函数，事件被抛弃`))
  }
}
module.exports = app => {
  app.bull.get(QUEUE_NAME).process(concurrency, jobProcessing)
  app.bull.get(QUEUE_NAME).on('completed', function(job, result) {
    if (result) {
      console.log(`${job.id}的运行结果为`, result, '\n')
      app.logger.info(`${job.id}的运行结果为`, result, '\n')
    }
    console.log(`${job.id} has been done.`)
  })
  app.bull.get(QUEUE_NAME).on('failed', function(job, err) {
    console.log(err)
    console.log(`error ocurred ,sth is wrong at the job with id ${job.id} !`)
  })
}
