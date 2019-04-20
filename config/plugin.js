'use strict'
exports.static = true
// 跨域包
exports.cors = {
  enable: true,
  package: 'egg-cors'
}

// redis缓存
exports.redis = {
  enable: true,
  package: 'egg-redis'
}

// 模版渲染
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
}

// socket.io
exports.io = {
  enable: true,
  package: 'egg-socket.io'
}

// 数据库模型相关
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
}

// BULL队列相关
exports.bull = {
  enable: true,
  package: 'egg-bull-queue'
}

// 静态资源相关
// exports.assets = {
//   enable: true,
//   package: 'egg-view-assets',
// };

// 路由命名空间的试用，方便统一试用中间件和子路由
exports.routerPlus = {
  enable: true,
  package: 'egg-router-plus'
}

// `Node.js 性能平台`
// exports.alinode = {
//   enable: true,
//   package: 'egg-alinode',
// };
