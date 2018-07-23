/*
 * @Author: wangjia 
 * @Date: 2018-06-07 16:51:08 
 * @Last Modified by: wangjia
 * @Last Modified time: 2018-06-07 18:06:16
 */
export function GetQueryString (name)
{
     var after = window.location.hash.split("?")[1];
     if(after)
     {
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = after.match(reg);
         if(r != null)
        {
             return  decodeURIComponent(r[2]);
        }
         else
         {
             return null;
         }
     }
 }