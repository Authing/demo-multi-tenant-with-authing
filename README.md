# Authing 多租户 Demo

### 修改配置

修改 `server/config.js` 文件，修改以下配置：

```
authing.userPoolId = '<your user pool id>'
authing.userPoolSecret = '<your user pool secret>'
authing.appId = '<your app id>'
authing.appSecret = '<your app secret>'
authing.host = '<your app host>，Authing api 地址，一般为 https://core.authing.cn'
```

修改 `client/config.ts` 文件，修改以下配置：

```
authing.appId = '<your app id>'
authing.appHost = '<your app host>'
```

### 启动后端服务

打开终端，执行

```
cd server
npm i
npm run start
```

### 启动前端服务

打开另一个终端，执行

```
cd client
npm i
npm run start
```

### 启动完成

访问 `http://localhost:3007/login`
