/**
 * Created by liuzhuo on 2016/12/5.
 */
'use strict';

var sha1 = require('sha1');
var Wechat = require('./wechat');
var getRawBody = require('raw-body');
var util = require('./util')

module.exports = function(opts){
    // var wechat = new Wechat(opts);
    return function *(next){
        console.log(this.query);

        var token = opts.token;
        var signature = this.query.signature;
        var nonce = this.query.nonce;
        var timestamp = this.query.timestamp;
        var echostr = this.query.echostr;

        var str = [token, timestamp, nonce].sort().join('');
        var sha = sha1(str);

        console.log(sha);
        if (this.method === 'GET') {
            if (sha === signature) {
                this.body = echostr + '';
                console.log('Method:GET,right');
            } else {
                this.body = "wrong";
                console.log('Method:GET,wrong');
            }
        }
        else if (this.method === 'POST') {
            if (sha !== signature) {
                this.body = "wrong";
                console.log('4POSE,wrong');
                return false;
            } else {
                console.log('Method:POST,right');
                var data = yield getRawBody(this.req,{
                    length: this.length,
                    limit: '1mb',
                    encoding: this.charset
                });
                var content = yield util.parseXMLAsync(data);
                console.log(content);
                console.log(typeof(content.xml));
                console.log(content.xml);
                var message = util.formatMessage(content.xml);
                // console.log(message);
            }
        }

    }
};

