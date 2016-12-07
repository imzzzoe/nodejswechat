/**
 * Created by liuzhuo on 2016/12/6.
 */
'use strict';

var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var prefix = 'https://api.weixin.qq.com/cgi-bin/';
var api = {
    accessToken: prefix + 'token?grant_type=client_credential'
};
var util = require('./util');

/*constructor function
to manage the api with wechat
to update access_token
1.create an object
2. read the existing access_token from a file
3. check if access_token is still available or not.
4. if the access_token is unavailable, update the access_token to the file
*/
function Wechat(opts){
    var that = this;
    this.appID = opts.appID;
    this.appsecret = opts.appsecret;
    this.getAccessToken = opts.getAccessToken;
    this.saveAccessToken =opts.saveAccessToken;

    this.getAccessToken()
        .then(function(data) {
            // read the data from file and transform to JSON
            try {
                data = JSON.parse(data);
            }
            // if read data is failed,update access_token by the new access_token
            catch (e) {
                return that.updateAccessToken();
            }
            // if file's access_token is valid, keep it
            // if access_token is not valid,update access_token
            if (that.isValidAccessToken(data)) {
                return Promise.resolve(data);
            } else {
                return that.updateAccessToken();
            }
        })
         .then(function(data){
            // set the new access_token, and save to file
             console.log(data);
            that.access_token = data.access_token;
            that.expires_in = data.expires_in;
            that.saveAccessToken(data)
    })
   }

Wechat.prototype.isValidAccessToken = function(data) {
    if(!data || !data.access_token || !data.expires_in) {
        return false;
    }
    var access_token = data.access_token;
    var expires_in =data.expires_in;
    var now = (new Date().getTime());

    return (now < expires_in)
};

Wechat.prototype.updateAccessToken = function(){
    var appID = this.appID;
    var appsecret = this.appsecret;
    var url = api.accessToken +'&appid=' + appID + '&secret=' + appsecret;

    return new Promise(function(resolve, reject){
        //request to web server
        request({url: url, json:true}).then(function(response){
        var data  = response.body;
        console.log(response.body);
        var now = (new Date().getTime());
        var expires_in = now + (data.expires_in - 20) * 1000;
        data.expires_in = expires_in;
        resolve(data);
        })
    })
};

Wechat.prototype.reply = function () {
    var content = this.body;
    var message = this.weixin;

    var xml = util.tpl(content, message);
    this.status = 200;
    this.type = 'application/xml';
    this.body = xml;
}

module.exports = Wechat;
