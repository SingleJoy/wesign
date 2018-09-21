/**
 * Author:WANGJIA
 * Date：2018/2/7
 */


/**
 * @param {*moblie} str
 */
export function validateMoblie(str) {
    const reg = /^0?(13[0-9]|15[0123456789]|18[0123456789]|14[135789]|17[0123467859]|16[6]|19[89])[0-9]{8}$/
    return reg.test(str)
}

/**
 * @param {*email} str
 */
export function validateEmail(str) {
    // const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
    return reg.test(str)
}

/**
 *  @param {*idCard} str
 */
export function validateCard(str){
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(X|x)$)/
    return reg.test(str)
}

/**
 *  @param {*password} str
 */
export function validatePassWord(str){
    const reg = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/
    return reg.test(str)
}

/**
 *  @param {*credit} str
 */
export function validateCredit(str){
    const reg =  /^[0-9a-zA-Z]+$/
    return reg.test(str)
}

/**
 *  @param {*nonnumeric} str
 */
export function validateName(str){
    const reg = (/[\u4e00-\u9fa5]/g)
    return reg.test(str)
}

/**
 *  @param {*bank} str
 */
export function validateBank(str){
    const reg = /^([1-9]{1})(\d{14}|\d{18})$/
    return reg.test(str)
}

/**
 *  @param {*} str
 */
export function validateOpenName(str){
    const reg = /^[A-Za-z\u4e00-\u9fa5]+$/
    return reg.test(str)
}

/**
 *  @param {*} str
 */
export function validateNumber(str){
    const reg = /^[0-9]*$/
    return reg.test(str)
}

/**
 *  @param {*} str
 */
export function validateVerbal(str){
    const reg = /^[0-9\u4e00-\u9fa5]+$/
    return reg.test(str)
}

/**
 *  @param {*} str
 */
export function validateDecimal(str){
    const reg = /^(?!0\.(?!0{2})\d{2}).+$/
    return reg.test(str)
}

// 校验公章防伪码必须是13位数字
export function validateSeal(str){
  const reg = /\b\d{13}\b/;
  return reg.test(str)
}


// 校验手机验证码必须是6位数字
export function validateSmsCode(str){
  const reg = /\b\d{6}\b/;
  return reg.test(str)
}

//校验银行账户最多为30位数字
export function validateBankAccountNumber(str){
  const reg = /^d{1,30}$/;
  return reg.test(str)
}



export  function Trim(str){
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
export  function TrimAll(str){
    return str.replace(/\s/g, "");
  }
/**
 * 加 g 去除全部空格 不加去除前后空格
 * @param {*} str 目标字符串
 * @param {*} is_global 是否检查整个字符串
 */
// export function TrimAll(str,is_global){
//     var result;
//     _is_global = (typeof(is_global) !== 'undefined')? is_global: 'n';
//     result = str.replace(/(^\s+)|(\s+$)/g, "");
//     if(_is_global.toLowerCase() == 'g'){
//         result = result.replace(/\s/g, "");
//     }
//     return result
// }
