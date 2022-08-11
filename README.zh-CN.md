# Authing 多租户 Demo

<div align=center>
  <img width="250" src="https://files.authing.co/authing-console/authing-logo-new-20210924.svg" />
</div>

<div align=center>
  <a href="https://forum.authing.cn/" target="_blank"><img src="https://img.shields.io/badge/chat-forum-blue" /></a>
  <a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/License-MIT-success" alt="License"></a>
</div>

**简体中文** | [English](./README.md)

## 简介

此 Demo 程序将为你演示如何使用 Authing 开发一个名为 Uthing 的 SaaS 软件。让我们以示例软件 Uthing 为例，Uthing 是一款先进的企业协作工具，提供高效的工作流管理功能，同时它也是一款 SaaS 软件，不同的公司都能在上面管理自己的工作流。


## 修改配置

修改 `/server/config.js` 文件，修改以下配置：

```js
module.exports = {
  authing: {
    userPoolId: '<your user pool id>',
    userPoolSecret: '<your user pool secret>',
    appId: '<your app id>',
    appSecret: '<your app secret>',
    host: '<your app host>', // Authing api url, usually https://core.authing.cn
  },
}
```

修改 `/client/src/config.ts` 文件，修改以下配置：

```js
export const config = {
  apiBaseUrl: 'http://localhost:3006',
  pageBaseHost: 'localhost:3007',
  authing: {
    appId: '<your app id>',
    appHost: '<your app host>',
  },
}
```

## 启动后端服务

打开终端，执行

```sh
cd server
yarn install
yarn start
```

## 启动前端服务

打开另一个终端，执行

```sh
cd client
yarn install
yarn start
```

## 启动完成

访问 `http://localhost:3007/login`



## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2019-present, Authing
