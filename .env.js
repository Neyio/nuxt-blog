'use strict';
exports.config = {
    appName: '最青春教学过程管理系统中间件',
    port: 7001,
    dataServerUrl: {
        //后台的数据处理服务器
        dev: 'http://neo.go', //测试服务器 h 回头改ttps://test.mostyouth.cn', //
        prod: 'https://www.mostyouth.cn', //线上服务器
    },
    mysql: {
        host: 'www.mostyouth.cn',
        port: 3306,
        database: 'node',
        core_db: "test_db",
        username: 'root',
        password: 'Neyio@159357!'
    },
    mysql2: {
        host: '127.0.0.1',
        port: 3306,
        database: 'node',
        core_db: "test_db",
        username: 'root',
        password: null
    },
    redis: {
        port: 6379, // Redis port
        host: '127.0.0.1', // Redis host
        password: null, //Redis password
    },
    // ...other configs 
}