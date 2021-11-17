# Authing 多租户 Demo

### 修改配置

修改 `server/config.js` 文件，修改以下配置：

```
authing.userPoolId = '<your user pool id>'
authing.userPoolSecret = '<your user pool secret>'
authing.appId = '<your app id>'
authing.appHost = '<your app host>'
topLevelDomain = 'Authing 顶级域名，一般为 authing.cn'
```

### 启动后端服务

```
cd server
npm i
npm run start
```

### 启动前端服务

```
cd client
npm i
npm run start
```

### 启动完成

访问 `http://localhost:3007/login`
