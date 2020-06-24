# 【挑战】实现云函数（不能是http云接入形式）接入腾讯验证码
（具体效果：在网页中弹出腾讯云验证码，后台云函数验证是否是有效，并返回给页面提示）。
提示：网页部署在静态网站中，使用匿名登录，直接展示腾讯验证码，操作后直接发起云函数验证操作是否有效，返回结果给页面。
参考资料：
SDK相关能力：https://docs.cloudbase.net/api-reference/server/node-sdk/auth.html#getclientip；
Http触发形式的腾讯验证码云函数代码：https://github.com/TCloudBase/WEB-FILES/blob/master/cloudfunctions/functions/getFile/index.js；
腾讯验证码控制台：https://console.cloud.tencent.com/captcha]

#创建云函数real

###该页面验证码
```javascript
   let app = tcb.init({
                env:'web-files-1931d3'
            });
            let auth = app.auth();

            let Cap = new TencentCaptcha('2088953318',function(res){
                let {randstr,ticket} = res;
                console.log(randstr,ticket);
                app.callFunction({
                    name:'real',
                    data:{randstr,ticket}
                }).then((res)=>{
                    console.log(res);
                    if(res.result.err_msg=="OK"){
                        alert('验证成功！');
                    }
                    else{
                        alert('验证失败！');
                    }
                })
            });

            auth.anonymousAuthProvider().signIn().then(()=>{
                Cap.show();
            });
```