/**
 * Created by liuzhuo on 2016/12/5.
 */

var http = require('http');

http.createServer(function (res, res){

    res.writeHeader(200, {'Content-Type':'text/plain'});
    res.end("hello world!");

}).listen(1234);

console.log("The end");


