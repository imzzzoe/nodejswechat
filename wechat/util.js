/**
 * Created by liuzhuo on 2016/12/6.
 */

var xml2js = require('xml2js');
var Promise = require('bluebird');
// var tpl = require('./tpl');

exports.parseXMLAsync = function (xml) {
    return new Promise (function(resolve, reject){
        xml2js.parseString(xml,{trim:true},function(err,content){
            if (err) reject(err);
            else resolve(content)
        })
    })
}

function formatMessage(result) {
    console.log("start formatMessage");
    var message = {}

    if (typeof result === 'object') {
        var keys = Object.keys(result);

        for (var i = 0; i< keys.length; i++) {
            var item = result[keys[i]];
            var key = keys[i]

            if(!(item instanceof Array) || item.length ===0) {
                continue
            }

            if (item.length === 1) {
                var val = item[0];

                if(typeof  val === 'object') {
                    message[key] = formatMessage(val)
                }
                else {
                    message[key] = (val || '').trim()
                }
            }
            else {
                message[key] = [];

                for (var j =0, k = item.length; j < k; j++) {
                    message[key].push(formatMessage(item[j]))
                }
            }
        }
    }

    return message
}

exports.formatMessage = function (xml) {
    console.log("call formatMessage");
    console.log(typeof(xml));
    return new Promise (function(resolve, reject){
        console.log("using xml2js");
        var parser = xml2js.Parser();
        parser.parseString(xml,function(err,content){
            if (err) {
                console.log("parseString error");
                reject(err);
            }
            else{
                console.log("parseString success");
                resolve(content);
            }
        })
    })
}
//
// exports.tpl = function(content,message) {
//     var info = {}
//     var type = 'text'
//     var fromUserName = message.FromUserName
//     var toUserName = message.ToUserName
//
//     if(Array.isArray(content)){
//         type = 'news'
//     }
//
//     type = content.type || type
//     info.createTime = new Date().getTime()
//     info.msgType = type
//     info.toUserName = toUserName
//     info.fromUserName = fromUserName
// }
