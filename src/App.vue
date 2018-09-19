<template>
  <div id="app">
    <!-- <keep-alive> -->
      <router-view />
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body{
  width: 100%;
  height:100%;
background: #f5f5f5;
}
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width:100%;
  height:100%;
  overflow: visible !important;
}
   #pane-first .el-table__header-wrapper .has-gutter tr th{
      text-align: center;
    }
*{
  margin:0;padding: 0;
  }
   body,
h1,
h2,
h3,
h4,
p,
ul,
ol,
dl,
dd,
textarea,
button {
    margin: 0;
    padding: 0;
}

li {
    list-style: none;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
ol,
li,
dl,
dt,
dd,
a,
textarea,
input,
button,
span,
em,
strong,
img,
div {
    -webkit-touch-callout: none;
    -moz-touch-callout: none;
    -ms-touch-callout: none;
    touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    -moz-tap-highlight-color: transparent;
    -ms-tap-highlight-color: transparent;
    tap-highlight-color: transparent;
}

input[type=text],
input[type=button],
input[type=password],
input[type=telphone],
input[type=search],
textarea,
button {
    outline: 0 none;
    -webkit-appearance: none;
  box-shadow: none;
}

textarea {
    resize: none;
}

img {
    border: none;
}

a {
    text-decoration: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width:100%;
  height:100%;
}
input::-webkit-input-placeholder {
  /* placeholder颜色  */
   color: #999;
   font-size: 12px;
 /* placeholder位置  */

 }
::-webkit-input-placeholder { /* WebKit, Blink, Edge */
  color:    #999;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color:    #999;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
  color:    #999;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color:    #999;
}
.el-dialog--center .el-dialog__body{
 padding-bottom: 10px !important;
 padding-top: 10px !important;
}
.cell>span{
  color: #333;
}
</style>
