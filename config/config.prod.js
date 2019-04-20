'use strict';
module.exports = () => { // app作为第一参数
  const config = exports = {};
  // use for cookie sign key, should change to your own and keep security
  // config.keys = appInfo.name + '_1543483706131_6251';

  // add your config here
  // config.middleware = [ 'decodeJwtToken', 'compress' ];
  // config/config.prod.js
  // 配置静态文件的 cdn 地址
  // config.assets = {
  //   url: 'https://cdn',
  //   publicPath: '/myapp/',
  // };
  return config;
};
