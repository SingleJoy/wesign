//自定义过滤字符串长度  str为字符串 length为自定义长度
export function filterStr(value, length) {
    if (!value) {
        return ''
    } else if (value.length > length) {
        return value.slice(0, length)
    } else {

    }

}
export function filtercontractStatus(value) {
    if (!value) {
        return '';
    };
    if (value == "0") {
        return "已过期";
    } else if (value == "1") {
        return "待我签署";
    } else if (value == "2") {
        return "待他人签署";
    } else if (value == "3") {
        return "已生效";
    } else {

    }
}
