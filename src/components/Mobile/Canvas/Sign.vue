<template>
  <div class="container">
    <div id="canvasBox" :style="getHorizontalStyle" v-show="!showBox">
      <div class="greet">
        <span>{{msg}}</span>
        <div class="sign-operation">
          <button type="button" value="清屏" @touchstart="clear" @mousedown="clear" class="btn-style clear-sign" >清屏</button>
          <button type="button"  @touchstart="savePNG" @mousedown="savePNG" class="btn-style sign-submit" :disabled="once">提交</button>
        </div>
      </div>
      <canvas id="canvas"></canvas>
    </div>

    <div class="modal unsign-modal" id="unsign-modal">
      <div class="modal-box" >
        <div class="modal-body">
          <a href="javascript:void(0);" @click="close" class="close">X</a>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  import Draw from '@/common/js/draw';
  import {GetQueryString} from '@/common/js/InterceptUrl'
  import {saveSignatureImg } from '@/api/mobile'
  export default {
    name: 'canvas',
    data() {
      return {
        msg: '请在下方空白处签名',
        degree: 90,
        signImage: null,
        showBox: false,
        once:false
      };
    },
    components: {
      Draw,
    },
    created (){
      window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
        if (window.orientation === 180 || window.orientation === 0) {
          var hide1 = document.getElementsByClassName('bg1')[0];

          document.getElementById("unsign-modal").style.display="none";
        }
        if (window.orientation === 90 || window.orientation === -90 ){
          var hide1 = document.getElementsByClassName('bg1')[0];

          document.getElementById("unsign-modal").style.display="block";
        }
      }, false);
    },
    beforeCreate() {
      document.title = '手写签名';
    },
    mounted() {
      this.canvasBox = document.getElementById('canvasBox');
      this.initCanvas();
    },
    computed: {
      getHorizontalStyle() {
        const d = document;
        const w = window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth;
        const h = window.innerHeight || d.documentElement.clientHeight || d.body.clientHeight;
        let length = (h - w) / 2;
        let width = w;
        let height = h;

        switch (this.degree) {
          case -90:
            length = -length;
          case 90:
            width = h;
            height = w;
            break;
          default:
            length = 0;
        }
        if (this.canvasBox) {
          this.canvasBox.removeChild(document.querySelector('canvas'));
          this.canvasBox.appendChild(document.createElement('canvas'));
          setTimeout(() => {
            this.initCanvas();
        }, 200);
        }
        return {
          transform: `rotate(${this.degree}deg) translate(${length}px,${length}px)`,
          width: `${width}px`,
          height: `${height}px`,
          transformOrigin: 'center center',
        };
      },
    },
    methods: {
      initCanvas() {
        const canvas = document.querySelector('canvas');
        this.draw = new Draw(canvas, -this.degree);
      },
      clear() {
        this.draw.clear();
      },
      download() {
        this.draw.downloadPNGImage(this.draw.getPNGImage());
      },
      savePNG() {
        this.once=true;
        this.signImage = this.draw.getPNGImage();
        var blank = document.createElement('canvas');
        blank.width = document.querySelector('canvas').width;
        blank.height = document.querySelector('canvas').height;

        if( this.signImage == blank.toDataURL()){
          return false
        }
        let signToken = GetQueryString("signToken");
        let params={'signatureImg': this.signImage};

        saveSignatureImg(signToken,params).then(res=>{

          this.once=false;
          this.signImage=null;
          this.$router.push('/MobileSuccess')
        })
      },
      upload() {
        const image = this.draw.getPNGImage();
        const blob = this.draw.dataURLtoBlob(image);

        const url = '';
        const successCallback = (response) => {
          // console.log(response);
        };
        const failureCallback = (error) => {
          // console.log(error);
        };
        this.draw.upload(blob, url, successCallback, failureCallback);
      },
      // 关闭提示框
      close(){
        var close=document.getElementById("unsign-modal").style.display='none';
      }
    },
  };


</script>

<style>
  .sign-operation{
    position: absolute;
    bottom:10px;
    right:10px;


  }
  .btn-style{
    border:none;
    outline: none;
    display: inline-block;
    width: 40px;
    height: 40px;
    font-size:13px;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
  }
  .clear-sign{
    position: absolute;
    right: 0;
    top:-50px;
    border: 1px solid #4091fb;
    background: #fff ;
    color:#4091fb;
  }
  .sign-submit{
    background: #4091fb;
    color: #fff;
  }

  .container {
    width: 100%;
    height: 100%;
  }
  #canvasBox {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .greet {
    padding: 5px 0;
    font-size:16px;
    user-select: none;
    line-height: 30px;
    width: 100%;
    text-align: center;
    color:#4091fb;

  }

  .greet select {
    font-size: 18px;
  }
  canvas {
    flex: 1;
    cursor: crosshair;
    border:1px dashed lightgray;
  }
  .image-box {
    width: 100%;
    height: 100%;
  }
  .image-box header{
    font-size: 18px;
  }
  .image-box img {
    max-width: 80%;
    max-height: 80%;
    margin-top: 50px;
    border: 1px solid gray;
  }
  .bg{
    width:100%;
    height:100%;
    background:#000;
    background:rgba(0,0,0,.3);
    position: absolute;
    left: 0;
    top:0;
    display:none;
  }
  .bg .center{
    width:200px;
    height:100px;
    background:#fff;
    position: absolute;
    left:0;
    top:0;
    bottom:0;
    right:0;
    margin:auto;
    transform:rotate(90deg);
    border-radius:5px;
  }
  .center_cen p{
    width:200px;
    text-align:center;
    padding-top:10px;
    font-size:18px;
    font-family:'SimHei';
  }
  #closeBtn{
    display:block;
    padding-top:30px;
    padding-left:40%;
  }

  .bg1{
    width:100%;
    height:100%;
    background:#000;
    background:rgba(0,0,0,.3);
    position: absolute;
    left: 0;
    top:0;
    display:none;
  }
  .bg1 .center1{
    padding:5px;
    width:200px;
    height:150px;
    background:#fff;
    position: absolute;
    left:0;
    top:0;
    bottom:0;
    right:0;
    margin:auto;

    border-radius:5px;
  }
  .center1 p{
    width:200px;
    padding-top:10px;
    font-size:18px;
    font-family:'SimHei';
    text-indent:2rem;
  }
  #closeBtn{
    display:block;
    padding-top:30px;
    padding-left:40%;
    color:#000;
  }

  .modal{
    width: 100%;
    height: 100%;
    position: absolute;
    left:0;
    right:0;
    bottom:0;
    top: 0;
    z-index: 2;
    background: rgba(0, 0, 0, 0.3);
    overflow-x: hidden;
    overflow-y: auto;
    display: none;

  }
  .modal-box{
    width:225px;
    height: 225px;
    background-color: #fff;
    position:fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
    border-radius: 5px;

  }
  .modal-header{
    padding: 15px;
    border-bottom: 1px solid #e5e5e5;
    font-size: 14px;
  }
  .modal-header h3{
    text-align: left;
    font-size: 14px;
  }
  .modal-body{
    width:200px;
    height:200px;
    background: url('/static/images/Canvas/canvas-tips.png') no-repeat;
  }
  .modal-footer{padding: 10px;height:30px;}
  .modal-footer a{display: inline-block;border-radius: 4px; }
  .close{
    position: absolute;
    right: -10px;
    top: -10px;
    width: 30px;
    height: 30px;
    color: #fff;
    background: #ccc;
    border-radius: 50%;
    text-align: center;
    line-height: 30px
  }

</style>
