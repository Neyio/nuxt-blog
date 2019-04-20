'use strict';
/**
 * 加分规则
 */
const INCR_SCORE = {
  VIEW: 1,
  LIKE: 3,
  COMMENT: 5,
  SHARE: 10,
};

/**
 * 缓存维护  HotCache
 * prefix用于 定义缓存的名字
 * 等同于开辟 3个List型的缓存，每个都带有对应的index
 */
class CacheRepository {
  constructor() {
    this._prefix = null;
    this.nR = null;
    this.hR = null;
    this.tR = null;
    this.cacheInstance = null;
    this.cacheService = null;
  }

  async _initFrame(cacheService, prefix) {
    this.cacheService = cacheService;// 浅拷贝一份redis引用到cacheInstance上，此处的instance和调用者 分别为 redis实例 和 service
    this.cacheInstance = cacheService.redis;// 浅拷贝一份redis引用到cacheInstance上，此处的instance和调用者 分别为 redis实例 和 service
    this._prefix = prefix;
    this.nR = prefix + '-NR';
    this.hR = prefix + '-HR';
    this.tR = prefix + '-TR';
    await this.cacheInstance.set('CacheRepository', 'ok');
    return true;
  }

  async test() {
    return this.cacheInstance.get('CacheRepository');
  }

  async test2() {
    return this.cacheService.namespaces('happy', 'sayHi').get('saveKeyName');
  }

  initCache() {

    /**
     * 用户信息 hash表
     * @param[Hash]  s:{:schoolId}:u:{:id}
     * [ profile =>'json' , ...]
     **/

    /**
     * 用户关注follower set表
     * @param[Set] s-{:schoolId}-u-{:id}-follower
     * [...ids] id 唯一集合
     **/

    /**
     * 用户fans set表
     * @param[Set] s-{:schoolId}-u-{:id}-fans
     * [...ids]id唯一集合
     **/

    /**
     * 用户（ 文章 || 其他 :Type = ['twitter','moment','errands','secondhand']的首字母） 队列表
     * @param[List] s:{:schoolId}:u:{:id}:Type
     * [ ids ]  链表
     **/

    /**
     * 文章 hash表
     * @param[Hash] s:{:schoolId}:u:{:id}:Type
     * [ {key:value},...{key:value} ]
     **/

    /**
     * 某个文章的评论列表 有序列表
     * @param[List] s:{:schoolId}:u:{:id}:Type
     * [ ids ]
     **/
  }

}

module.exports = CacheRepository;
