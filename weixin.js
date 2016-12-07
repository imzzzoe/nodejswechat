/**
 * Created by liuzhuo on 2016/12/6.
 */
'use strict';

exports.reply = function* (next) {
    var message = this.weixin;
    if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            if (message.EventKey) {
                console.log("follow by scan QR code: " + message.EventKey + ' ' + message.Ticket);
            }
            this.body = 'welcome to subscribe\r\n' + ' Message ID: ' + message.MsgId;
        }

        else if (message.Event === 'unsubscribe') {
            console.log("unfortunately, unsubscribed");
            this.body = '';
        }
    }
    else {

    }

    yield next;
}