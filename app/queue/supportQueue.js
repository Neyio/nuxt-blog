'use strict'
const assert = require('assert')
const QUEUE_NAME = 'supportQueue'
const concurrency = 1
// 样例函数
const example = payload => {
  console.log(payload)
}
/**
 * QUEUE_NAME事件处理
 * @param {*} job {data:{type:'eventName',payload:{} },id}
 * @param {*} done ()=>{ resolve();}
 */
const jobProcessing = (job, done) => {
  console.log(`队列${QUEUE_NAME}触发事件`, job.data, job.id)
  assert(
    job.data && job.data.type && job.data.payload && job.id,
    '事件内必须包含类型 { data:{type:string,payload:{}} ,id:"auto generated with out filled"}'
  )
  switch (job.data.type) {
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
    }
    console.log(`${job.id} has been done.`)
  })
  app.bull.get(QUEUE_NAME).on('failed', function(job, err) {
    console.log(err)
    console.log(`error ocurred ,sth is wrong at the job with id ${job.id} !`)
  })
}
