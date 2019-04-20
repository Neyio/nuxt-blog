'use strict'

const Controller = require('egg').Controller

class TestController extends Controller {
  async cache() {
    await this.ctx.service.cache
      .namespaces('happy', 'sayHi')
      .set('testKey', 'HSet-TestValue', 40, () => {})
    await this.ctx.service.cache
      .namespaces('happy', 'sayHi')
      .set('testKey2', 'HSet-TestValue2', 40, () => {})
    const testKey = await this.ctx.service.cache
      .namespaces('happy', 'sayHi')
      .get('testKey')
    console.log(
      `namespaces ${this.ctx.service.cache.getNamespaces()} \n`,
      `testKey:${testKey} \n`
    )

    // 如果拥有多个key时，可以传入 get('key1','key2')|| get(['key1','key2']) 区分大小写 ，返回 数组,若为空值以 null填充
    const testKeyArray = await this.ctx.service.cache
      .namespaces('happy', 'sayHi')
      .get('testKey', 'testkey2', 'testKey2')
    console.log(
      `namespaces ${this.ctx.service.cache.getNamespaces()} \n`,
      `testKeyArray:${testKeyArray} \n`
    )

    const key = 'saveKeyName'
    const value = 'saveKeyValue'
    const time = 60
    const callback = () => {
      console.log('saved')
    }

    // 设置一个hash的数据
    await this.ctx.service.cache
      .namespaces('happy', 'sayHi')
      .set(key, value, time, callback)
    // 读取一个hash的数据
    const saveKey = await this.ctx.service.cache
      .namespaces('happy', 'sayHi')
      .get('saveKeyName')
    // 设置一个普通string数据
    await this.ctx.service.cache.set(
      'stringKey',
      'stringKeyValue',
      time,
      callback
    )
    // 读取string数据
    const stringKey = await this.ctx.service.cache.get('stringKey')
    // 判断string数据是否带有该键值的数据
    const ifExistsStringKey = await this.ctx.service.cache.exists('stringKey')
    // 判断hash中是否带有该键值的数据
    const ifExistsHappySayHiSaveKeyName = await this.ctx.service.cache
      .namespaces('happy', 'sayHi')
      .exists('saveKeyName')
    // 判断hash中是否带有该键值的数据 大小写敏感
    const ifExistsHappySayHiSaveKeyName2DefaultFalse = await this.ctx.service.cache
      .namespaces('happy', 'sayHi')
      .exists('saveKeyName2')
    // 清空队列
    const emptyList = await this.ctx.service.cache.emptyList('testList')
    // 左侧push
    const lPush = await this.ctx.service.cache.lPush('testList', '1', '2', '3')
    // 获取 0，1两个元素
    const lRange = await this.ctx.service.cache.lRange('testList', 0, 1)
    // 右侧push
    const rPush = await this.ctx.service.cache.rPush('testList', '6', '5', '4')
    // 取右侧push后的值
    const lRangeAfterRPush = await this.ctx.service.cache.lRange(
      'testList',
      rPush - 3,
      rPush - 1
    )
    // 向有序集合中插入数据
    const zAdd = await this.ctx.service.cache.zAdd('zSet', [
      [11, 'aliyun'],
      [9, 'tecent'],
      [3, '163'],
      [88, 'aws'],
      [100, 'google']
    ])
    // 向有序集合中的某个key增加对应的数值
    const zIncrBy = await this.ctx.service.cache.zIncrBy('zSet', 11, 'aws')
    // 向有序集合拉取指定位置的内容，按分数从小到大排序
    const zRange = await this.ctx.service.cache.zRange('zSet', 0, 6)
    // 向有序集合拉取指定位置的内容，按分数从大到小排序
    const zRevRange = await this.ctx.service.cache.zRevRange('zSet', 0, 6)
    // 判断是否在集合中
    const ifExistsInSet = await this.ctx.service.cache.sisMember('sSet', 'key')
    // 增加一个属性到集合中
    const sAdd = await this.ctx.service.cache.sAdd('sSet', 'key')
    // 判断是否在集合中
    const ifExistsInSetAfterSAdd = await this.ctx.service.cache.sisMember(
      'sSet',
      'key'
    )

    const { cache } = this.ctx.service
    let ans = null
    // 入侵3个特殊的缓存 ，HotCacheR ， NewCache ，TargetCache
    const injectThreeList = prefix => {
      return cache.inject(prefix).then(() => {
        return cache.cacheInstance
          .test2()
          .then(result => {
            console.log(ans, 'ans')
            this.app.logger.info(result)
            return Promise.resolve(result)
          })
          .catch(err => {
            throw err
          })
      })
    }
    ans = await injectThreeList(cache, 'nothing')

    this.ctx.response.body = {
      ans,
      testKey,
      testKeyArray,
      saveKey,
      stringKey,
      ifExistsStringKey,
      ifExistsHappySayHiSaveKeyName,
      ifExistsHappySayHiSaveKeyName2DefaultFalse,
      lPush,
      lRange,
      rPush,
      lRangeAfterRPush,
      emptyList,
      zAdd,
      zIncrBy,
      zRange,
      zRevRange,
      ifExistsInSet,
      sAdd,
      ifExistsInSetAfterSAdd
    }
  }
}

module.exports = TestController
