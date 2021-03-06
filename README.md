# DM商城 app Dcpay 后台管理系统
[![](https://img.shields.io/badge/version-1.0-brightgreen)](https://github.com/asd494235908/TerMinal)
[![GitHub stars](https://img.shields.io/github/stars/asd494235908/TerMinal.svg?style=social&label=Stars)](https://github.com/asd494235908/TerMinal)
[![GitHub forks](https://img.shields.io/github/forks/asd494235908/TerMinal.svg?style=social&label=Fork)](https://github.com/asd494235908/TerMinal)
 - [若图片显示不完整请跳转码云](https://gitee.com/dcmaomi/Dm)
### 项目已部署，在线Demo
- 后台管理系统：https://tm.dcmaomi.com
- Dcpay前台：https://dcpay.dcmaomi.com
- Swagger接口文档：https://www.dcmaomi.com:3000/api/Swagger
- 项目综合项目：https://www.dcmaomi.com
### v1.0更新日志
- 上传商品
- 轮播图管理
- 板块管理
- 订单管理
- 用户管理
- 体统日志
- 上传图片
- 首页导航栏可后台配置
- 添加东验证码
### 功能模块图
![首页](https://www.dcmaomi.com:3010/serverImage/20210305011146_16923.png)
![上传商品](https://www.dcmaomi.com:3010/serverImage/20210305011146_11931.png)
![查看商品](https://www.dcmaomi.com:3010/serverImage/20210305011146_13147.png)
![系统日志](https://www.dcmaomi.com:3010/serverImage/20210305011146_16878.png)
### 前端所用技术 [后台](https://github.com/asd494235908/TerMinal) 
- 后台页面
    - [vue 2.x](https://cn.vuejs.org/)：vue全家桶
    - [echarts](http://echarts.apache.org/zh/)：图表插件
    - [Element](https://element.eleme.cn/#/zh-CN)：Element-UI 组件库
    - 第三方接口
    - [中国天气网](https://cj.weather.com.cn/plugin/standard)：中国天气网 天气插件
### 后端所用技术 [后端](https://github.com/asd494235908/DM-Server) 
- 主要
   - [Node Js](https://nodejs.org/zh-cn/)：Node.js
   - [express](https://www.expressjs.com.cn/)：基于 Node.js 平台， Web 开发框架
   - [mysql](https://www.mysql.com/)：基于 Node.js 平台， Web 开发框架
   - [Swagger2](https://www.dcmaomi.com:3000/api/swagger/#/)：Api文档生成
   - [svg-captcha](https://www.npmjs.com/package/svg-captcha)：登录验证码
   - [silly-datetime](https://www.npmjs.com/package/silly-datetime)：时间格式化工具
   - [qr-image](https://www.npmjs.com/package/silly-datetime)：链接生成二维码
- 第三方接口
  - 高德地图城市列表API：获取全国省/市/县(区)三级列表 需要注册appid
  - [天气api](http://www.tianqiapi.com/index/doc?version=day)：根据Ip地址获取城市天气（服务器主要用来获取城市）需要注册appid
- 服务器
  - [宝塔建站](https://www.bt.cn/)：宝塔建站
  - [Apache](http://httpd.apache.org/)

### 本地运行
- 前后端分离请先运行[后端](https://github.com/asd494235908/DM-Server)
- node.js 版本(v12.18.3) 
- vue-cli 版本(@vue/cli 4.5.4)
- 下载zip直接解压或安装git后执行克隆命令 `https://github.com/asd494235908/TerMinal.git`
- 右键进入PowerShell

初始化项目
```
npm install
```

```javascript
// src/main.js 配置
axios.defaults.baseURL = "http://您的本地服务器地址:端口号"  //注意http与https
```
运行项目
```
npm run serve
```

### 作者其他项目推荐
- [DM商城：分布式电商购物商城](https://www.dcmaomi.com/)
  ![](https://www.dcmaomi.com:3010/serverImage/20210305011146_17326.png "前台首页")
- [DM微信小程序 APP前端 现已开源！](https://github.com/asd494235908/DM-Mobile-terminal)
    
    [![WX20190924-234416@2x.png](https://www.dcmaomi.com:3010/serverImage/20210305010710_12523.png)](https://github.com/asd494235908/DM-Mobile-terminal)

- [DcPay个人收款支付系统](https://github.com/asd494235908/DcPay)

    ![](https://www.dcmaomi.com:3010/serverImage/20210306141208_16064.png)

### 技术疑问交流
- 免费交流群 `949139553` [![](http://pub.idqqimg.com/wpa/images/group.png)](https://qm.qq.com/cgi-bin/qm/qr?k=dtD6X04E3q7v3C8wuOnUENoW5S7hdGHO&jump_from=webapi)
- 作者邮箱 asd494235908@qq.com
### 商用授权
- 个人学习使用遵循GPL开源协议
- 商用需联系作者低价授权
### [捐赠](https://dcpay.dcmaomi.com/pay)

