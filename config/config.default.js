/* eslint-disable no-bitwise */
'use strict'
const path = require('path')
// const fs = require('fs')
// const jwt = require('jsonwebtoken')
const { config: env } = require('../.env')

const uuid = (len, radix) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
    ''
  )
  const uuid = []
  let i = 0
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    // rfc4122, version 4 form
    let r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}

module.exports = appInfo => {
  const config = (exports = {})
  // 是否是debug模式
  config.debug = config.env !== 'production'
  config.keys = appInfo.name + 'neyio'
  // add your config here
  config.middleware = ['nuxt', 'compress']
  // add your other configs
  config.appName = env.appName || 'Neyio -Version  0.0.1 beta'

  config.cacheNamespace = {
    userInfo: 'nUInfo' // 系统的 用户信息 hash表
  }
  // 配置 gzip 中间件的配置
  config.compress = {
    threshold: 2048 // 小于 2k 的响应体不压缩
  }
  // 配置静态服务器
  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/public'),
    dynamic: true,
    preload: false,
    buffer: true,
    maxFiles: 1000,
    maxAge: 31536000
  }

  // 用于监听配置端口号 ，19-03-19新增
  config.cluster = {
    listen: {
      path: '',
      port: env.port || 7001,
      hostname: '0.0.0.0'
    }
  }

  // 配置 mysql-sequelize的配置
  config.sequelize = {
    // database: env.mysql.database || 'neo',
    datasources: [
      {
        dialect: 'mysql',
        delegate: 'model', // load all models to app.model and ctx.model
        baseDir: 'model', // load models from `app/model/*.js`
        database: 'node',
        host: env.mysql.host || '127.0.0.1',
        port: env.mysql.port || 3306,
        username: env.mysql.username || 'root',
        password: env.mysql.password || null,
        // dialectOptions: {
        //   useUTC: false,
        // },
        timezone: '+08:00'
        // other sequelize configurations
      },
      {
        dialect: 'mysql',
        delegate: 'coreModel', // load all models to app.coreModel and ctx.coreModel
        baseDir: 'core_models', // load models from `app/core_models/*.js`
        database: env.mysql.core_db || 'neo',
        host: env.mysql.host || '127.0.0.1',
        port: env.mysql.port || 3306,
        username: env.mysql.username || 'root',
        password: env.mysql.password || null,
        // dialectOptions: {
        //   useUTC: false,
        // },
        timezone: '+08:00'
      }
    ]
  }
  // 配置 redis 的设置
  config.redis = {
    // Redis: require('ioredis'), // 如果你需要自定义Redis的版本，修改此处
    client: {
      port: env.redis.port || 6379, // Redis port
      host: env.redis.host || '127.0.0.1', // Redis host
      password: env.redis.password || null,
      db: env.redis.db || 0 // 默认的
    }
  }

  // 安全配置 security关闭  ，使用纯API不需要防止 CSRF 和 XSS
  config.security = {
    xframe: {
      enable: false
    },
    csrf: {
      enable: false,
      useSession: false, // if useSession set to true, the secret will keep in session instead of cookie
      ignoreJSON: false, // skip check JSON requests if ignoreJSON set to true
      cookieName: 'csrfToken', // csrf token's cookie name
      sessionName: 'csrfToken', // csrf token's session name
      headerName: 'x-csrf-token', // request csrf token's name in header
      bodyName: '_csrf', // request csrf token's name in body
      queryName: '_csrf' // request csrf token's name in query
    },
    domainWhiteList: ['*']
  }
  // 跨域问题
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  config.httpclient = {
    // 是否开启本地 DNS 缓存，默认关闭，开启后有两个特性
    // 1. 所有的 DNS 查询都会默认优先使用缓存的，即使 DNS 查询错误也不影响应用
    // 2. 对同一个域名，在 dnsCacheLookupInterval 的间隔内（默认 10s）只会查询一次
    enableDNSCache: true,
    // 对同一个域名进行 DNS 查询的最小间隔时间
    dnsCacheLookupInterval: 10000,
    // DNS 同时缓存的最大域名数量，默认 1000
    dnsCacheMaxLength: 1000,

    request: {
      // 默认 request 超时时间
      timeout: 3000
    },

    httpAgent: {
      // 默认开启 http KeepAlive 功能
      keepAlive: true,
      // 空闲的 KeepAlive socket 最长可以存活 4 秒
      freeSocketTimeout: 4000,
      // 当 socket 超过 30 秒都没有任何活动，就会被当作超时处理掉
      timeout: 30000,
      // 允许创建的最大 socket 数
      maxSockets: Number.MAX_SAFE_INTEGER,
      // 最大空闲 socket 数
      maxFreeSockets: 256
    },

    httpsAgent: {
      // 默认开启 https KeepAlive 功能
      keepAlive: true,
      // 空闲的 KeepAlive socket 最长可以存活 4 秒
      freeSocketTimeout: 4000,
      // 当 socket 超过 30 秒都没有任何活动，就会被当作超时处理掉
      timeout: 30000,
      // 允许创建的最大 socket 数
      maxSockets: Number.MAX_SAFE_INTEGER,
      // 最大空闲 socket 数
      maxFreeSockets: 256
    }
  }

  // 配置 websocket 命名空间为 / 与 /example, 不是 example
  config.io = {
    mutiClientOnline: true, // 多个客户端同时在线
    defaultCacheNamespaceHashPrefix: 'nsph', // 系统的socketId的命名空间
    init: {
      wsEngine: 'ws'
    },
    namespace: {
      '/': {
        connectionMiddleware: ['auth'],
        packetMiddleware: ['packet'] // 针对消息的处理暂时不实现
      }
    },
    // cluster 模式下，通过 redis 实现数据共享, 如果项目中同时使用了 egg-redis， 请单独配置，不可共用。
    redis: {
      host: env.redis.host || '127.0.0.1',
      port: env.redis.port || 6379,
      auth_pass: env.redis.password || null,
      db: env.redis.db || 7
    },
    generateId: request => {
      return uuid(8, 16)
    }
  }

  // 模板文件的根目录，为绝对路径，默认为 ${baseDir}/app/view。支持配置多个目录，以 , 分割，会从多个目录查找文件。
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks'
    },
    root: [
      // path.join(appInfo.baseDir, 'app/public'),
      path.join(appInfo.baseDir, 'app/view')
      // path.join(appInfo.baseDir, 'path/to/another'),
    ].join(',')
  }

  // 日志命名
  config.logger = {
    appLogName: `${appInfo.name}-${env.port || 7001}-web.log`,
    coreLogName: `${appInfo.name}-${env.port || 7001}-core.log`,
    agentLogName: `${appInfo.name}-${env.port || 7001}-agent.log`,
    errorLogName: `${appInfo.name}-${env.port || 7001}-error.log`
    // disableConsoleAfterReady: false, // 业务日志
  }

  // var audioQueue = new Queue('audio transcoding', {redis: {port: 6379, host: '127.0.0.1', password: 'foobared'}}); // Specify Redis connection using object
  // 队列配置
  config.bull = {
    clients: {
      mainQueue: {
        name: 'mainQueue'
      }, // 请对应到 queue文件夹下写 事件处理方法。
      supportQueue: {
        name: 'supportQueue'
      } // 请对应到queue文件夹下写事件处理方法
    },
    default: {
      redis: {
        host: env.redis.host || '127.0.0.1',
        port: env.redis.port || 6379,
        password: env.redis.password || null, // 原egg-bull文档中不存在
        db: 3
      }
    }
  }

  // exports.alinode = {
  //   // 从 `Node.js 性能平台` 获取对应的接入参数
  //   appid: 'xxx',
  //   secret: 'xxx'
  // }

  return config
}
