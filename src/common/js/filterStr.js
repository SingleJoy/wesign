//自定义过滤字符串长度  str为字符串 length为自定义长度
export function filterStr(value,length) {
  if (!value){
    return ''
  }else if (value.length > length) {
    return value.slice(0,length)
  }else{

  }

}
