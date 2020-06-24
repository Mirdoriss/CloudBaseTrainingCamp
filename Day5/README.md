# 将教程范例的cloudtohttp函数使用sdk的getTempFileURL进行替换。
### 思路 
调用官方SDK中的getTempFileURL 权限
```javascript
function cloudtohttp(src) {
    const result = await app.getTempFileURL({
        fileList: fileList
    })

    result.fileList.forEach(item => {
        console.log('转换的链接为：',item.tempFileURL) 
    })

    return result.fileList
}
```
### 还需改进该项目,完善功能需求