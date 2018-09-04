<template>
  <div class="hello" style="width:100%;height:100%;position: fixed;left:0;top:0;">
<!--touchstart,touchmove,touchend,touchcancel 这-->
    <canvas id="canvas" disable-scroll="true" style="position: fixed;left:0;top:0;" width="500" height="700">Canvas画板</canvas>
    <h2 class='info_info'>请在下面签署</h2>
    <!-- <van-button type="primary" style='width:60px;height:60px;background:#0e6eb8;border-radius:50%;font-size:12px;position:fixed;right:3%;bottom:35%; transform: rotate(90deg);' v-on:click="save">提交</van-button>
    <van-button type="primary" style='width:60px;height:60px;background:#0e6eb8;border-radius:50%;font-size:12px;position:fixed;right:3%;bottom:22%; transform: rotate(90deg);' v-on:click="clear">清除</van-button> -->
    <p style='color:#fff;width:60px;height:60px;text-align:center;line-height:60px;background:#0e6eb8;border-radius:50%;font-size:12px;position:fixed;right:3%;bottom:30%; transform: rotate(90deg);' v-on:click="save">提交</p>
    <br>
    <p style='color:#fff;width:60px;height:60px;text-align:center;line-height:60px;background:#0e6eb8;border-radius:50%;font-size:12px;position:fixed;right:3%;bottom:15%; transform: rotate(90deg);' v-on:click="clear">清除</p>
    <!-- <van-button type="primary" style='width:60px;height:60px;background:#0e6eb8;border-radius:50%;font-size:12px;position:fixed;right:3%;bottom:10%; transform: rotate(90deg);'  v-on:click="closeCan">退出</van-button>  -->
    <div>
      <!-- <mu-dialog :open="dialog">
         <p>确认提交签署？</p>
          <mu-flat-button label="确定" slot="actions" primary @click="close" />
      </mu-dialog> -->
    </div>

      <!-- <mu-dialog :open="hint">
         <p>您还没有书写您的签名</p>
          <mu-flat-button label="确定" slot="actions" primary @click="closeDown" />
      </mu-dialog> -->
      <div class='bg'>
          <div class='center_cen'>
              <p>您还没有完成签署！</p>
              <a href="javascript:void(0);" id='closeBtn' @click='closeBtn'>确定</a>
          </div>
      </div>
    <div class='bg1'>
          <div class='center1'>
              <p>为了更好的签署体验，请关闭手机自动旋转功能！</p>
              <a href="javascript:void(0);" id='closeBtn' @click='closeBtn1'>确定</a>
          </div>
      </div>
    <div id='bg'>
      <div class='prompt'>
           <!-- <mt-button type="primary" size="large" style='position:absolute;bottom:0%;width:243px;' @click='shut'>确定</mt-button> -->
      </div>
    </div>
  </div>

</template>

<script>
var draw;
//var preHandler = function(e){e.preventDefault();}
function preHandler (e){e.preventDefault();}

class Draw {
    constructor(el) {
        this.el = el
        this.canvas = document.getElementById(this.el)
        this.cxt = this.canvas.getContext('2d')

        this.stage_info = canvas.getBoundingClientRect()
        this.path = {
            beginX: 0,
            beginY: 0,
            endX: 0,
            endY: 0
        }
    }
    init(btn) {
        var that = this;
        // this.canvas.width = window.innerWidth;
        // this.canvas.height = window.innerHeight;
        let width = this.canvas.width,height=this.canvas.height;
        if (window.devicePixelRatio) {
        this.canvas.style.width = width + "px";
        this.canvas.style.height = height + "px";
        this.canvas.height = height * window.devicePixelRatio;
        this.canvas.width = width * window.devicePixelRatio;
        this.cxt.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
        this.canvas.addEventListener('touchstart', function(event) {
            document.addEventListener('touchstart', preHandler, false);
            that.drawBegin(event)
        })
        this.canvas.addEventListener('touchend', function(event) {
            document.addEventListener('touchend', preHandler, false);
            that.drawEnd()

        })
        this.clear(btn)
    }
    drawBegin(e) {
        var that = this;
        window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty()
        this.cxt.strokeStyle = "#000"
        this.cxt.lineWidth = 3.0; // 设置线宽
        this.cxt.beginPath()
        this.cxt.moveTo(
            e.changedTouches[0].clientX - this.stage_info.left,
            e.changedTouches[0].clientY - this.stage_info.top
        )
        this.path.beginX = e.changedTouches[0].clientX - this.stage_info.left
        this.path.beginY = e.changedTouches[0].clientY - this.stage_info.top
        canvas.addEventListener("touchmove",function(){
            that.drawing(event)
        })
    }
    drawing(e) {
        this.cxt.lineTo(
            e.changedTouches[0].clientX - this.stage_info.left,
            e.changedTouches[0].clientY - this.stage_info.top
        )
        this.path.endX = e.changedTouches[0].clientX - this.stage_info.left
        this.path.endY = e.changedTouches[0].clientY - this.stage_info.top
        this.cxt.stroke()
    }
    drawEnd() {
        document.removeEventListener('touchstart', preHandler, false);
        document.removeEventListener('touchend', preHandler, false);
        document.removeEventListener('touchmove', preHandler, false);
        //canvas.ontouchmove = canvas.ontouchend = null
    }
    clear(btn) {
       this.cxt.clearRect(0, 0, window.innerWidth, window.innerHeight)
    }
    save(){
      var png = canvas.toDataURL("image/png")
      this.url= png
  }

}
import cookie from '@/common/js/getTenant'
import {GetQueryString} from '@/common/js/InterceptUrl'
export default {
 name:'Can',
  data () {
    return {
      val:true,
      url:"",
      dialog: false,
    //   hint:false,
      png:''
    }
  },
  mounted() {
    draw=new Draw('canvas');
    draw.init();
  },
  created (){
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
        if (window.orientation === 180 || window.orientation === 0) {
         var hide1 = document.getElementsByClassName('bg1')[0];
        hide1.style.display='none';
        }
        if (window.orientation === 90 || window.orientation === -90 ){
         var hide1 = document.getElementsByClassName('bg1')[0];
        hide1.style.display='block';
        }
    }, false);
  },
  methods:{
    clear:function(){
        draw.clear();
    },

     shut(){
        var bg = document.getElementById('bg')
         bg.style.display='none';
    },
    save:function(){
    var that = this
    var blank = document.createElement('canvas');
    blank.width = canvas.width;
    blank.height = canvas.height;

    if( canvas.toDataURL() == blank.toDataURL()){
     var hide = document.getElementsByClassName('bg')[0]
     hide.style.display='block'
      return false
    }
//     function rotateBase64Img(src, edg, callback) {

//    var canvas = document.createElement("canvas");
//    var ctx = canvas.getContext("2d");

//    var imgW;//图片宽度
//    var imgH;//图片高度
//    var size;//canvas初始大小

//    if (edg % 90 != 0) {
//        console.error("旋转角度必须是90的倍数!");
//        throw '旋转角度必须是90的倍数!';
//    }
//    (edg < 0) && (edg = (edg % 360) + 360)
//    const quadrant = (edg / 90) % 4; //旋转象限
//    const cutCoor = {sx: 0, sy: 0, ex: 0, ey: 0}; //裁剪坐标

//    var image = new Image();
//    image.crossOrigin = "anonymous"
//    image.src = src;

//    image.onload = function () {

//        imgW = image.width;
//        imgH = image.height;
//        size = imgW > imgH ? imgW : imgH;

//        canvas.width = size * 2;
//        canvas.height = size * 2;
//        switch (quadrant) {
//            case 0:
//                cutCoor.sx = size;
//                cutCoor.sy = size;
//                cutCoor.ex = size + imgW;
//                cutCoor.ey = size + imgH;
//                break;
//            case 1:
//                cutCoor.sx = size - imgH;
//                cutCoor.sy = size;
//                cutCoor.ex = size;
//                cutCoor.ey = size + imgW;
//                break;
//            case 2:
//                cutCoor.sx = size - imgW;
//                cutCoor.sy = size - imgH;
//                cutCoor.ex = size;
//                cutCoor.ey = size;
//                break;
//            case 3:
//                cutCoor.sx = size;
//                cutCoor.sy = size - imgW;
//                cutCoor.ex = size + imgH;
//                cutCoor.ey = size + imgW;
//                break;
//        }


//        ctx.translate(size, size);
//        ctx.rotate(edg * Math.PI / 180);
//        ctx.drawImage(image, 0, 0);

//        var imgData = ctx.getImageData(cutCoor.sx, cutCoor.sy, cutCoor.ex, cutCoor.ey);
//        if (quadrant % 2 == 0) {
//            canvas.width = imgW;
//            canvas.height = imgH;
//        } else {
//            canvas.width = imgH;
//            canvas.height = imgW;
//        }
//        ctx.putImageData(imgData, 0, 0);
//        callback(canvas.toDataURL())
//    };
//  }
       var signToken = GetQueryString("signToken")
       var png = canvas.toDataURL("image/png")
       rotateBase64Img(png, -90, function(base64data){
       that.url = base64data

        })
        that.$http.post(process.env.API_HOST+'restapi/wesign/v1.4/signToken/'+ signToken +'/saveSignatureImg',{signatureImg:png },{emulateJSON:true}).then(function(res){
        that.$router.push('/MobileSuccess')
      })
    },
    closeBtn () {
        var hide = document.getElementsByClassName('bg')[0];
        hide.style.display='none';
    },
       closeBtn1 () {
        var hide1 = document.getElementsByClassName('bg1')[0];
        hide1.style.display='none';
    },
    close(){
      var interfaceCode = cookie.getJSON('interfaceCode')
      var contractNum = cookie.getJSON('contractNo')
      var userCode = cookie.getJSON('user_code')
      var base64Img = this.url
       var signContractVo = {
          'contractNum':contractNum,
          'phoneHeight':'500',
          'phoneWidth': '300',
          'signatureImg': base64Img,
          'signH':'100',
          'signW':'100',
          'signPositionStr':''
        }
      this.dialog = false
    },
    closeCan () {
      this.$router.push('/ContractInfo')
  },
　　mutate(word) {
      this.$emit("input", word);
    },
} } </script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> h1, h2 { font-weight: normal; } ul { list-style-type: none; padding: 0; } li { display: inline-block; margin: 0 10px; } a { color: #42b983; } #canvas { background: white; cursor: default; } #keyword-box { margin: 10px 0; } </style>
<style>
  .mu-dialog{
    transform:rotate(90deg)
  }
  .info_info{
    position: absolute;
    right: 1px;
    top: 200px;
    transform: rotate(90deg);
  }
  #bg{
    display:none;
    width:100%;
    height: 100%;
    background:#000;
    background:rgba(0,0,0,.3);
    position: relative;
  }
  #bg .prompt{
    position: absolute;
    left: 0;
    top:0;
    bottom:0;
    right:0;
    margin:auto;
     width:239px;
     height:220px;
     background-size:100% 100%;
  }
  .demo-flat-button{

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
</style>
