/**
 * 禁止浏览器回退
 */

export function prohibit(){
  history.pushState(null, null, document.URL);
  window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
  });
}