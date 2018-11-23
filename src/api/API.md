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