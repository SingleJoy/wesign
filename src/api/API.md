#新增接口以函数形式导出（因不同组件会引用同一api.js文件中的不同接口 ）

##注明每个接口作用

###example
```
export function apiName(){
    return({
        url:'/',
        method: "get",
        params: param
    })
}
```
##在文件中一对象形式导入

```
import {apiA,apiB} from '@api/***.js'

apiA(param).then(res=>{

}).catch(error=>{


})
```

###原有接口中的
```
if(res.data.sessionStatus == '0'){
    this.$router.push('/Server')
}
```
 ###不必再写 会统一处理
    
    
 ###接口名和暴露名尽可能保持一致   
 ```
export function apiName(){
    return({
        url:'/apiName',
        method: "get",
        params: param
    })
}
```               
