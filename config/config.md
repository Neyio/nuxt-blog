###Redis cluster 配置

```javascript
exports.redis = {
  client: {
    cluster: true,
    nodes: [
      {
        host: "127.0.0.1",
        port: "6379",
        family: "user",
        password: "password",
        db: "db"
      },
      {
        host: "127.0.0.1",
        port: "6380",
        family: "user",
        password: "password",
        db: "db"
      }
    ]
  }
};
```
