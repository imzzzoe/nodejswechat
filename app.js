/**
 * Created by liuzhuo on 2016/12/5.
 */
'use strict';

var Koa = require('koa');
var path = require('path');
var wechat = require('./wechat/generator');
var util = require('./libs/util');
var config = require('./config');
var weixin = require('./weixin');
var wechat_file = path.join(__dirname, './config/wechat.txt');

// var config = {
//     wechat: {
//         // Test count
//         appID: 'wxe65c2efcf5baa926',
//         appsecret: '3617ebd3be3218c68b8e5047740d8dbd',
//         //offical account
//         // appID: 'wx1c0c039c9c65eec3',
//         // appsecret: '2d923644410a946cbd33b8e1fdee4fbb',
//         token: 'reallymasaka123456',
//         encodingASEKey: 'n4h1Ejx5mhHh4gr8MB0CBVf41wsRjlnT6s0uqg806vi',
//         getAccessToken: function(){
//             return  util.readFileAsync(wechat_file);
//         },
//         saveAccessToken: function(data){
//             data = JSON.stringify(data);
//             return util.writeFileAsync(wechat_file, data);
//         }
//     }
// };

var app =new Koa();
app.use(wechat(config.wechat,weixin.reply));

app.listen(1234);
console.log("listening 1234");
