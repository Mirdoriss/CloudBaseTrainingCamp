const tcb = require('@cloudbase/node-sdk');
const request = require('request');
const TCaptchaID = {
    aid: '2088953318',//腾讯验证码项目aid
    AppSecretKey: '0xx91M_qe3O00xv9hBeYVAw**'//腾讯验证码项目Secretkey
};

const app = tcb.init({ env: 'web-files-1931d3' });
const auth = app.auth()

let CallWeb = (obj) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://ssl.captcha.qq.com/ticket/verify?aid=' + TCaptchaID.aid + '&AppSecretKey=' + TCaptchaID.AppSecretKey +
                '&Ticket=' + obj.ticket +
                '&Randstr=' + obj.randstr +
                '&UserIP =' + obj.ip,
            method: 'GET'
        }, (error, response, body) => {
            if (error) {
                reject(error);
            }
            resolve((typeof response.body === 'object') ? response.body : JSON.parse(response.body));
        });
    });
}
exports.main = async event => {
    const ip = auth.getClientIP();
    return await CallWeb({
        ticket: event.ticket,
        randstr: event.randstr,
        ip: ip
    });
}