# 将教程范例（意见反馈平台DEMO）中的管理端部分的列表加载变成实时数据库监听形式触发。用户端列表加载云函数适配超过100条的场景，采用promise all的形式进行改造，使其可以支持超过100条。
### 思路 
```
    先用count命令得到有多少条数据记录
    云函数每次最多读取100条记录，根据这个规定计算需要读取几次 new promise 每次读取
    使用 Promise.all方法同步进行所有promise，等所有的promise结束之后，return返回值到前端
```
### 创建admin 与 advice集合 页面输入云端数据库结构
```
{"_id":"~","advice":"~","imgs":[],"number":"~","_openid":"~","adddue":{"$date":"2020-06-24T15:45:19.558Z"}}
...
```
### 例如调用数据集合监听案例
```
const adviceWatcher = db.collection('advice').orderBy('adddue', 'desc').where({
        _id: _.exists(true)
    }).watch({

        onChange: function (snapshot) {
            console.log('snapshot', snapshot)
        },
        onError: function (err) {
            console.error('the watch closed because of error', err)
        }
    })
```