<template>
  <div>
  <div class="Tops">
    <nav class='nav'>
      <p class='logo'>
        <img src="/static/images/Top/v1.6-logo.png" alt="logo图">
      </p>
      <div class='buttons'>
        <el-button type="info" style='background:#ccc' @click="cancelSign">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
        <el-button style='color:#4091fb' @click="lastStepFit">上一步</el-button>
        <el-button style='color:#4091fb' @click="nextStepFit">下一步</el-button>
      </div>
      <!-- <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="25%"
        top='35vh'
        center>
        <span style="margin-left: 111px;">3秒后跳转回首页</span>
      </el-dialog> -->
    </nav>
  </div>
  <div class='Pcontract' style="margin-top: 100px;">
    <div class='step' style="width: 600px;">
        <ul>
          <li class="active"><i class='el-icon-document'></i><b>上传文件</b></li>
          <p></p>
          <li class="active"><i class='el-icon-goods'></i><b>签署设置</b></li>
          <p></p>
          <li class="active"><i class='el-icon-edit'></i><b>指定位置</b></li>
          <!-- <p></p> -->
          <!-- <li><i class='el-icon-menu'></i><b>合同签署</b></li> -->
          <p></p>
          <li><i class='el-icon-check'></i><b>完成</b></li>
        </ul>
      </div>
    <p id='textInfo' style="width: 100%;text-align: center;">温馨提示:请用鼠标点击右侧签署人列表中的“拖入位置”后，在合同中选择需要放置签名的位置，为了您的签署体验，建议您每个签署人拖拽的签署位置不超过10处。</p>

    <div class='signing' style="margin-top: 20px;">   <!--签署合同开始-->
          <div class='sign_left' ref="leftWrapper">
            <ul class="pagination">
              <div id="top_box">
                <p id='top' v-show="currentIndex != 0" @click="goto(currentIndex)"><a class='el-icon-arrow-up' href="javascript:void(0);"></a></p>
              </div>
              <li v-for="index in pages" :class="{'active':currentIndex === (index - 1)}" :key="index" @click="clickNave(index)">
                <a href="javascript:void(0);" >{{index}}</a>
              </li>
              <div id="bottom_box">
                <p id='bottom' v-show="allpage != currentIndex + 1 && allpage != 0 " @click="goto2(currentIndex+1)"><a class='el-icon-arrow-down'  href="javascript:void(0);" ></a></p>
              </div>
            </ul>
          </div>
          <div class='sign_center' ref="rightWrapper" id="div1"> <!-- 渲染合同页面 -->
          <ul class='content contractImg' id='div2' style="position: relative;cursor:pointer;">
            <li  v-for="(ele,i) in imgList" :key="i" class="contractImg-hook" style="height:844px;">
              <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractName=zqsign&contractUrl='+ele" alt="" style='width: 100%;height:844px;' id='signImg'>
            </li>
          </ul>
          </div>
          <div class='sign_right'>
              <h2>提示：可指定多个位置</h2>
              <h1>签署人：</h1>
              <div class='more' id="more">
                <dl v-for="(item,index) in signUserList" :key="index" v-drag>
                  <dd  style='width:130px;overflow:hidden;text-overflow:ellipsis; white-space:nowrap'>{{item.signUserName}}</dd>
                  <dd>{{item.mobile}}</dd>
                  <p class='hidden' style="display:none">{{item.userCode}}</p>
                  <!-- <dd v-on:click="getIndex(item,index)">拖入位置</dd> -->
                  <dd>拖入位置（0）次</dd>
                </dl>
              </div>
          </div>
      </div>
  </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { mapActions, mapState } from 'vuex'
import cookie from '@/common/js/getTenant'
import {signerpositions,contractDetail,contractImg} from '@/api/personal.js'
export default {
  name: 'Pcontract',
    data () {
      return {
        baseURL:this.baseURL.BASE_URL,
        //centerDialogVisible:false,
        current:0,
        showItem:0,
        allpage:0,
        signUserList:[],
        imgList:[],
        imgHeight: [],
        scrollY: 0 , //batterScroll 滚动的Y轴距离
        interfaceCode:sessionStorage.getItem("interfaceCode"),
        contractNo:sessionStorage.getItem("contractNo"),
        contractName:sessionStorage.getItem("contractName"),
      }
  },
  computed:{
    currentIndex() {
      for (let i = 0; i < this.imgHeight.length; i++) {
        /*当前本身的高度*/
        let height1 = this.imgHeight[i]
        /*下一个的高度*/
        let height2 = this.imgHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    pages:function(){
       this.showItem = 10;
    var pag = [];
      if( this.currentIndex < this.showItem ){ //如果当前的激活的项 小于要显示的条数
            //总页数和要显示的条数那个大就显示多少条
            var i = Math.min(this.showItem,this.allpage);
            while(i){
                pag.unshift(i--);
            }
        }else{ //当前页数大于显示页数了
            //var middle = this.currentIndex - Math.floor(this.showItem / 2 ),//从哪里开始
            var middle = this.currentIndex + 1
              i = this.showItem;
            if( middle >  (this.allpage - this.showItem)  ){
                middle = (this.allpage - this.showItem) + 1
            }
            while(i--){
                pag.push( middle++ );
            }
        }
      return pag
    }
  },
  methods:{
      goto (currentIndex){
        this.clickNave(currentIndex)
      },
      goto2 (currentIndex){
        currentIndex++
        this.clickNave(currentIndex)
      },
     clickNave(index) {
      let imgLists = this.$refs.rightWrapper.getElementsByClassName('contractImg-hook')
      let el = imgLists[index - 1]
      this.rightScroll.scrollToElement(el, 300)
    },
    initScroll(){
      // this.leftScroll = new BScroll(this.$refs.leftWrapper, {
      //   click: true,
      //     preventDefaultException:{className:/(^|\s)sign_left(\s|$)/}       //正在整改中。。。
      // })

      this.rightScroll = new BScroll(this.$refs.rightWrapper, {
        // mouseWheel: {
		// 			speed: 1200,
		// 			invert: false,
		// 			easeTime: 300
		// 		},
		// 		preventDefault:false,
        probeType: 3,
        preventDefaultException:{className:/(^|\s)sign_left(\s|$)/}
      })

      this.rightScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    calculateHeight(){
      let imgLists = this.$refs.rightWrapper.getElementsByClassName('contractImg-hook')
      let height = 0
      this.imgHeight.push(height)
      for (let i = 1; i < imgLists.length; i++) {
        let item = imgLists[i]
        height += item.clientHeight
        this.imgHeight.push(height)
      }
    },
    cancelSign() {    //取消操作
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, ' 确定将返回首页'),
            h('i', { style: 'color: teal' }, '')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                this.$router.push('/Home')
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 50);
              }, 100);
            } else {
              done();
            }
          }
        })
      },
    lastStepFit(){  //上一步

      sessionStorage.setItem('type','back')
      this.$router.push('/Contractsigning')
    },
    nextStepFit(){  //下一步
      var imgHeight = document.getElementById('signImg').offsetHeight
      var imgWidth = document.getElementById('signImg').offsetWidth
      var signBox = document.getElementsByClassName('signBox')
      var len = document.getElementById('more').getElementsByTagName('dl').length           //获取签署人个数
      var param = ""
      var arr =[]
      var sign_length = document.getElementById('more').childNodes
      for (var i=0;i<sign_length.length;i++){
        var elementNum = sign_length[i].childNodes[6].innerText.replace(/[^0-9\-,]/g,'').split('').join('')
        arr.push(elementNum)
      }
      if( arr.indexOf("0") == -1){
        for (var i = 0; i<signBox.length; i++ ) {
          var userId = signBox[i].childNodes[2].value                                         //获取签署人的标示id
          var topY = parseInt(signBox[i].offsetTop)       //获取用户签章的top值
          var leftX = parseInt(signBox[i].offsetLeft)                                         //获取用户签章的left值
          var  pageNo = parseInt(topY/imgHeight)                                              //获取页数
          var offsetY = (topY-(imgHeight)*pageNo)/imgHeight                                   //获取签章相对于合同的偏移量
          var offsetX  = leftX/imgWidth;                                                      //获取签章相对于合同的偏移量
          if(i == len-1){
            param += userId+","+(pageNo+1)+","+offsetX+","+offsetY+"&"

          }else{
            param += userId+","+(pageNo+1)+","+offsetX+","+offsetY+"&"
          }
        }
        let requestParam={
            signerpositions:param
        };
        signerpositions(requestParam,this.interfaceCode,this.contractNo).then(res=>{
            if(res.data.resultCode == '0') {


                if(sessionStorage.getItem("needSign")!= 1){
                this.$router.push('/Success')
                }
            }else if(res.data.resultCode==1){
               this.$confirm(
                    <div class="warn-num">
                        <p class="title" style="font-size:16px;text-align:center;">对不起，您的对个人签约次数已用尽!</p>
                        <div class="customer-service"></div>
                    </div>,'提示', {
                    confirmButtonText: '去购买',
                    cancelButtonText: '取消'
                }).then(() => {
                 this.$router.push('/PackagePurchase')
                })
            }else{
                this.$message({
                showClose: true,
                message: '指定位置失败!',
                type: 'error'
                })
            }
        }).catch(error=>{

        })
      } else {
        this.$message({
          showClose: true,
          message: '位置未指定完成!',
          type: 'error'
        })
      }
    }
  },
  created () {


    this.$loading.show(); //显示
    contractDetail(this.interfaceCode,this.contractNo).then(res=>{
        let signUserVo = res.data.signUserVo
        this.signUserList = signUserVo
    }).catch(error=>{

    })

    let data =[];
    contractImg(this.interfaceCode,this.contractNo).then(res=>{
        this.allpage = res.data.length
        this.$nextTick(() => {
            this.initScroll()
            this.calculateHeight()
        })
        for (let i = 0; i < res.data.length;i++) {
            let contractUrl = res.data[i].contractUrl
            data[i] = contractUrl
            this.$loading.hide(); //隐藏
        }
        this.imgList = data
    }).catch(error=>{

    })

  },
  directives: {
    drag: {
    bind :function (el, binding) {
        var n = 0
         var that = null
        el.onmousedown = function (e) {
            e.preventDefault();
            //鼠标按下，计算当前元素距离可视区的距离
            //el.style.position='absolute';
            n++;

            let disX = e.clientX - el.offsetLeft;
            let disY = e.clientY - el.offsetTop + document.documentElement.scrollTop;
            var item = document.createElement("div");
            var more = document.getElementById('more')
            //var div2 = document.getElementById('div2')
            item.style.left = disX+'px'
            item.style.top = disY+'px'
            //item.style.width = div2.clientWidth*9/21 +'px'
            //item.style.height = div2.clientWidth*9/21 +'px'
            more.appendChild(item);
            document.onmousemove = function (e) {
                item.style.cursor='move'
                var maxRight = document.getElementById('div1').clientWidth+ document.getElementById('div1').offsetLeft - el.clientWidth //最大右部距离
                var minLeft = document.getElementById('div1').offsetLeft   //判断最小左面距离
                var minTop = document.getElementById('div1').offsetTop     //判断最小上部距离
                var maxTop = document.getElementById('div1').offsetHeight + minTop -  el.clientWidth //最大下距离
                //通过事件委托，计算移动的距离
                var e = e|| window.event;
                let l = e.clientX - disX;
                let t = e.clientY - disY + document.documentElement.scrollTop;
                //移动当前元素
                item.className ='signBox'
                item.innerHTML = '<h5 class="infoStyle">'+el.childNodes[0].innerText+'</h5><h6 class="textStyle">'+el.childNodes[2].innerText+'</h6><input type="hidden" class="user" value="'+el.childNodes[4].innerText+'"><b  class="delete">X</b>';

                item.style.left = l + 'px';
                item.style.top = t + 'px';

                if(l < minLeft || l>maxRight){
                    document.onmouseup = null
                } else if (t< minTop || t>maxTop) {
                    document.onmouseup = null
                } else {
                document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
                var del = document.getElementsByClassName('delete')
                if(del){
                    del[del.length-1].addEventListener('click', function () {
                        if(this.parentNode.parentNode){
                            this.parentNode.parentNode.removeChild(this.parentNode)
                        }
                        var m = Number(el.childNodes[6].innerText.replace(/[^0-9\-,]/g,'').split('').join(''))
                        el.style.display='block'
                        n--
                        m--
                        el.childNodes[6].innerText ='拖入位置（'+m +'）次'
                        el.childNodes[6].style.color ='white'
                    }, true);
                }
             more.removeChild(item)
             var scrollY = document.getElementById('div2').style.transform.match(/\.*translate\((.*?)\)/)[1].replace(/[^0-9\-,]/g,'').split(',')[1];
             var left = l - document.getElementById('div2').offsetLeft  //进入合同页面左偏移量
             var top = t - document.getElementById('div2').offsetTop  //进入合同页面上偏移量
             item.style.width='125px'
             item.style.height='125px'
             item.style.left = left + 'px';
             item.style.top = (top+Math.abs(scrollY)) + 'px';
             div2.appendChild(item)

              var dragNum = el.childNodes[6]
              dragNum.innerText ='拖入位置（'+ n +'）次'

              // if (n >= 10){
              //   dragNum.style.fontSize='12px'
              //   dragNum.innerText ='最大拖拽次数（'+ n +'）次'
              //   dragNum.style.color='red'
              //   el.onmousedown = null
              //   el.onmousemove = null
              //   el.onmouseup = null
              //   return false;
              // }
              var signBox =document.getElementsByClassName("signBox");
              for (var i =0;i<signBox.length;i++){
                signBox[i].onmousedown = function (e){
                  e.preventDefault();
                   let X = e.clientX - this.offsetLeft;
                   let Y = e.clientY - this.offsetTop ;
                  this.style.position='absolute';
                  var _this=this
                  document.onmousemove = function (e) {
                    var e = e|| window.event;
                    let le = e.clientX - X;
                    let to = e.clientY - Y ;
                    e.preventDefault();
                    if (le <= 0) {
                     le = 0;
                    } else if (le > div2.clientWidth - _this.offsetWidth) {
                    le = div2.clientWidth - _this.offsetWidth;
                    }
                    if (to <= 0) {
                    to = 0;
                    } else if (to > div2.clientHeight - _this.offsetHeight ) {
                    to =  div2.clientHeight - _this.offsetHeight
                    }
                    _this.style.left = le +'px'
                    _this.style.top = to +'px'
                    }
                    document.onmouseup = function (e) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                  }
              }
             }
            }
           }
          }
        }
      }
    }
  },
}
</script>
<style lang="css" scoped>
  @import "../../styles/Whether/Whethers.css";
  @import "../../common/styles/Tops.css";
  @import "../../common/styles/SigningSteps.css";
</style>

<style>
  body{
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .signBox{
    width: 138px;
    height: 138px;
    border: 1px solid #4091fb;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
  }
  .infoStyle{
    text-align:center;
    line-height:86px;
    font-size:16px;
    font-weight:normal;
  }
  .textStyle{
    text-align:center;
    font-size:16px;
    font-weight:normal;
  }
  .delete{
    cursor: pointer;
    position:  absolute;
    right: -21px;
    top: -17px;
    border:  1px solid #4091fb;
    border-radius:  50%;
    width:  50px;
    width:  20px;
    height:  20px;
    line-height: 20px;
    text-align:  center;
    color: #4091fb;
    font-weight:normal;
  }
   .customer-service{
    width: 200px!important;
    height: 50px!important;
    background: url('/static/images/Common/customer-service.gif') no-repeat !important;
    margin-left: 80px;
  }
</style>
