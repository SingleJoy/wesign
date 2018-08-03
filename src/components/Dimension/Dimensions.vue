<template>
  <div class='infos'>
   <div class="Tops">
    <nav class='nav'>
      <p class='logo'>
        <img src="../../../static/images/logo2.png" alt="">
      </p>
      <div class='buttons'>
        <el-button type="info" style='background:#ccc' @click="contractCancel" :disabled="clickOnce">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
        <el-button style='color:#22a7ea' v-show="clickSign==true" @click="submitBtn">提交签署</el-button>
      </div>
    </nav>
  </div>
  <div class='Contents'>
    <div class='step' style="width: 720px;">
      <ul>
        <li class="active"><i class='el-icon-document'></i><b>上传文件</b></li>
        <p></p>
        <li class="active"><i class='el-icon-goods'></i><b>签署设置</b></li>
        <p></p>
        <li class="active"><i class='el-icon-edit'></i><b>指定位置</b></li>
        <p></p>
        <li class="active"><i class='el-icon-menu'></i><b>合同签署</b></li>
        <p></p>
        <li><i class='el-icon-check'></i><b>完成</b></li>
      </ul>
    </div>
    <!-- 签署合同开始 -->
    <div class='signing' style="border-top: 1px solid #ddd;">
      <!-- 左侧页码导航开始 -->
      <div class='sign_left' ref="leftWrapper">
        <ul class="pagination">
          <div id="top_box">
            <p id='top' v-show="currentIndex != 0" @click="goto(currentIndex)"><a class='el-icon-arrow-up' href="javascript:void(0);"></a></p>
          </div>
          <li v-for="index in pages" :class="{'active':currentIndex === (index - 1)}" :key="index" @click="clickNav(index)">
            <a href="javascript:void(0);" >{{index}}</a>
          </li>
          <div id="bottom_box">
            <p id='bottom' v-show="allpage != currentIndex + 1 && allpage != 0 " @click="goto2(currentIndex+1)"><a class='el-icon-arrow-down'  href="javascript:void(0);" ></a></p>
          </div>
        </ul>
      </div>
      <!-- 左侧页码导航结束 -->
      <!-- 合同内容开始 -->
      <div class='sign_center' ref="rightWrapper"> <!-- 渲染合同页面 -->
        <ul class='content contractImg' id="contractImg">
          <li v-for="(lis, index) in imgArray" :key="index" class="contractImg-hook" style="height:844px;">
             <!-- <img :src="[`${this.baseURL.BASE_URL}`+'/v1/tenant/contract/img?contractUrl='+lis]" alt="" id='imgSign' style='width:100%;height:100%;'> -->
             <img :src="['http://192.168.1.15:8080/zqsign-web-wesign/restapi/wesign/v1/tenant/contract/img?contractUrl='+lis]" alt="" id='imgSign' style='width:100%;height:844px;'>
          </li>
          <div id='hidden' style='display:none'><img :src="[contractSignImg]"  id="signImg" style="height:125px;width:125px"></div>
          <div id='signCanvas' style='display:none;'><img :src="[canvasTest]"  id="signCanvasImg" style="height:63px;width:125px"></div>
        </ul>
      </div>
      <!-- 合同内容结束 -->
      <!-- 右侧签署按钮开始 -->
      <div class='sign_right'>
        <a href="javascript:void(0);" @click="getPosition"><img src="../../../static/images/Contract/submit1.png" alt="" ></a>

       <p id='smCode'>
         <el-tooltip class="item" effect="dark" content="被授权人扫码签署" placement="right">
         <img :src="[qrSignImg]" alt="" v-show="qrSignImg!=''">
         </el-tooltip>
         <span>被授权人签名</span>
       </p>
       <br>
       <br>
          <el-button style='color:#22a7ea' v-show='recapture == true' @click='showDilog'>重新获取</el-button>
      </div>
    </div>
    <!-- 签署合同结束 -->
  </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { mapActions, mapState } from 'vuex'
import cookie from '@/common/js/getTenant'
import {prohibit} from '@/common/js/prohibitBrowser'
export default {
  name: 'Dimensions',
  data () {
    return {
      current: 0,
      showItem:10,
      allpage: 10,
      imgArray:[],
      imgHeight: [],
      contractImgHeight: 0,
      contractUrl:[],
      scrollY: 0,
      contractSignImg:'',
      flag: true,//重复提交标示
      clickSign:false,
      centerDialogVisible:false,
      signPosition:'',
      resubmit:true,
      qrSignImg:'',
      arr:[],
      group:[],
      canvasTest:'',
      signPosit:'',
      recapture:false,
      arrow:[],
      timer:null,  //轮询定时器,
      clickOnce:false
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
  created() {
    var contractNo = sessionStorage.getItem('contractNo')
    if (contractNo) {
      // console.log(this.$store.state.contractNo1)
      contractNo = JSON.parse(contractNo)
      if ( this.$store.state.contractNo1 == ''){
        // console.log('session是不是空')
        this.$store.state.contractNo1 = contractNo
        // console.log(this.$store.state.contractNo1)
      }

    }
    this.$loading.show(); //显示
    var data =[]
    let url = process.env.API_HOST+'v1.4/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/contract/'+contractNo+'/contractimgs'
    let urlPic = process.env.API_HOST+'v1.4/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/getSignature'
    let qrUrl =  process.env.API_HOST+'v1.4/user/'+ cookie.getJSON('tenant')[0].userCode + '/qRCode'

    this.$http.get(url).then(function (res) {
      if(res.data.sessionStatus == '0'){
          this.$router.push('/Server')
        } else {
      /*获取后台数据，并使用imgArray*/

      for(var i=0;i<res.data.dataList.length;i++){
        var contractUrl = res.data.dataList[i].contractUrl
        data[i] = contractUrl
        this.$loading.hide(); //隐藏
      }
      this.imgArray = data
      /*获取总的页码*/
      this.allpage = res.data.dataList.length

      this.$nextTick(() => {
        this._initScroll()
        this._calculateHeight()
      })
      }
    }).catch(function (error) {
      this.$message.error('请求失败！请刷新再试！')
    })

     this.$http.get(urlPic).then(function (res) {
      this.contractSignImg = res.bodyText
     })

     this.$http.get(qrUrl,{params:{'contractNo':contractNo}}).then(function (res) {
      this.qrSignImg = res.bodyText
     })

    var that = this
    var timer = null
    this.timer = setInterval(function () {
      that.pollingPanel(this.timer)
    }, 3000)


    this.$http.get(process.env.API_HOST+'v1.4/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/contract/'+ contractNo +'/user/'+ cookie.getJSON('tenant')[0].userCode + '/signerpositions').then(function (res) {
      if(res.data.sessionStatus == '0'){
        this.$router.push('/Server')
      } else {
      var array = res.data.list

        for (var i =0 ; i<array.length; i++){
          var userCode = array[i].userCode;
          if(userCode == cookie.getJSON('tenant')[1].interfaceCode){
            this.arr.push(array[i])
          }
          if(userCode != cookie.getJSON('tenant')[1].interfaceCode){
            this.group.push(array[i])
          }
        }

      }
    })
  },
  methods:{
    showDilog(){
      var smCode = document.getElementById('smCode')
      smCode.style.display ='block'
      this.recapture = false
      var userCode = cookie.getJSON('tenant')[0].userCode
      var contractNo = sessionStorage.getItem('contractNo')
          contractNo = JSON.parse(contractNo);
      var that = this
      this.$http.get(process.env.API_HOST+'v1.4/contract/'+ contractNo +'/user/'+userCode+'/getSignatureImg',{params:{'temp':'0'}}).then(function (res) {
        if( res.data == '1'){
          for(var i = 0;i<this.arrow.length;i++){
            var signCanvas = document.getElementById("div-" + i)
            var parentBox = document.getElementById('contractImg')
             if(signCanvas&&parentBox){
                parentBox.removeChild(signCanvas)
             }
          }
          // var timer = null
          this.timer = setInterval(function () {
            that.pollingPanel(this.timer)
          }, 3000)
        }
      })
    },
    goto (currentIndex){
      this.clickNav(currentIndex)
    },
    goto2 (currentIndex){
      currentIndex++
      this.clickNav(currentIndex)
    },
    clickNav(index) {
      let imgList = this.$refs.rightWrapper.getElementsByClassName('contractImg-hook')
      let el = imgList[index - 1]
      this.rightScroll.scrollToElement(el, 300)
    },
    _initScroll(){
      this.leftScroll = new BScroll(this.$refs.leftWrapper, {
        click: true
      })

      this.rightScroll = new BScroll(this.$refs.rightWrapper, {
        probeType: 3,
      })

      this.rightScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight(){
      let imgList = this.$refs.rightWrapper.getElementsByClassName('contractImg-hook')
      let height = 0
      this.imgHeight.push(height)
      for (let i = 1; i < imgList.length; i++) {
        let item = imgList[i]
           height += item.offsetHeight
        this.imgHeight.push(height)
      }
    },
    contractCancel() {    //取消操作
      this.clickOnce=true;
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
               clearInterval(this.timer)
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                if(cookie.getJSON('tenant')[1].isBusiness == '0'){
                  this.$router.push('/Merchant')
                }else{
                  this.$router.push('/Home')
                }
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
    getPosition () { //点击签署
      if (this.flag == true){
      this.flag = false
       var signPositionStr = ''
        for (var i =0 ; i<this.arr.length; i++){
          var pageNum = this.arr[i].pageNum;
				  var offsetX = this.arr[i].offsetX;
          var offsetY = this.arr[i].offsetY;
          var parentBox = document.getElementById('contractImg')
          var firstImg =parentBox.getElementsByTagName('img')[1]
          var imgWight = document.getElementById('imgSign').offsetWidth //获取合同页面的宽度
          var imgHeight = document.getElementById('imgSign').offsetHeight//获取合同页面的高度
          var hidden =document.getElementById('hidden')
          var leftX = offsetX * imgWight;
          var topY = (pageNum - 1 + offsetY) * imgHeight;
          // var signCanvasImg = document.getElementById('signCanvasImg').offsetHeight
          // var topY = (pageNum - 1 + offsetY) * imgHeight + pageNum - parseInt(signCanvasImg/4);
          var signPic = document.getElementById('signImg').cloneNode(true)
          parentBox.appendChild(signPic);
          signPic.style.position= 'absolute';
          signPic.style.top= topY + 'px'
          signPic.style.left = leftX + 'px'
          hidden.style.display='none'
          var windowScrollTop = document.documentElement.scrollTop
          if(i == this.arr.length-1){
            signPositionStr += pageNum+","+leftX+","+offsetY * (imgHeight);
          }else{
            signPositionStr += pageNum+","+leftX+","+offsetY * (imgHeight)+"&";
          }
        }
        this.signPosition = signPositionStr
        }
       this.flag = false
       this.clickSign = true
    },
    submitBtn() {
      if(this.resubmit == true){
        this.resubmit = false
        if(this.canvasTest == null ||this.canvasTest == ''){
            this.$alert('未指定完所有签章','提示', {
              confirmButtonText: '确定'
            })
            this.resubmit = true
            return false
          }
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '是否确定要提交？ '),
            h('i', { style: 'color: teal' }, '')
          ]),
          center:true,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                this.submitContract();
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 50);
              }, 100);
            } else {
              done();
              this.resubmit = true
              this.$message({
                type: 'info',
                message: '取消签署'
              });
            }
          }
        })
      }
    },
    submitContract () { //确认签署
     this.$loading.show(); //显示
     var contractNo = sessionStorage.getItem('contractNo')
          contractNo = JSON.parse(contractNo);
     var imgWight = document.getElementById('imgSign').offsetWidth //获取合同页面的宽度
     var imgHeight = document.getElementById('imgSign').offsetHeight //获取合同页面的高度
     var signH = parseInt(document.getElementById('signImg').style.height)//签章高度
     var signW =  parseInt(document.getElementById('signImg').style.width)
     var signatureW =  parseInt(document.getElementById('signCanvasImg').style.width)//手写
     var signatureH =  parseInt(document.getElementById('signCanvasImg').style.height)
     let url = process.env.API_HOST+'v1.4/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/user/'+ cookie.getJSON('tenant')[0].userCode + '/contractmoresign/'+ contractNo
      this.$http.post(url,{
       'tenantSignCode':cookie.getJSON('tenant')[1].interfaceCode,
       'userSignCode': cookie.getJSON('tenant')[0].userCode,
       'enterpriseSignImg':this.contractSignImg.split(",")[1],
       'signatureImg':this.canvasTest.split(",")[1],
       'phoneHeight':imgHeight,
       'phoneWidth': imgWight,
       'signH':signH,
       'signW':signW,
       'signatureW':signatureW,
       'signatureH':signatureH,
       'enterprisePositionStr':this.signPosition,
       'personalPositionStr':this.signPosit
      },{emulateJSON: true}).then(function (res) {
       if(res.data.sessionStatus == '0'){
          this.$router.push('/Server')
        } else {
       if (res.data.responseCode == 1){
          this.centerDialogVisible = false
          this.$message({
            showClose: true,
            message: '合同签署成功！',
            type: 'success'
          })
          this.$loading.hide(); //隐藏
          this.$store.dispatch('fileSuccess1',{contractNo:this.$store.state.contractNo1})
          // sessionStorage.setItem('contractNo', JSON.stringify(this.$store.state.contractNo1))
          sessionStorage.setItem('contractNo', JSON.stringify(contractNo))
          this.$router.push('/SignSuccess')
       }
      }
     })
    },
    pollingPanel(timer) { //轮询手写面板
      var userCode = cookie.getJSON('tenant')[0].userCode
      var contractNo = sessionStorage.getItem('contractNo')
      contractNo = JSON.parse(contractNo)
      this.$http.get(process.env.API_HOST+'v1.4/contract/'+ contractNo +'/user/'+userCode+'/getSignatureImg').then(function (res) {
      this.canvasTest =  res.bodyText
      if(res.bodyText != '') {
        var smCode = document.getElementById('smCode')
        smCode.style.display ='none';
      }
      setTimeout(() => {
      if(this.canvasTest!=''){
          var signPosit = ''
          for (var i =0 ; i<this.group.length; i++){
            var pageNum = this.group[i].pageNum;
            var offsetX = this.group[i].offsetX;
            var offsetY = this.group[i].offsetY;
            var parentBox = document.getElementById('contractImg')
            var firstImg =parentBox.getElementsByTagName('img')[1]
            var imgWight = document.getElementById('imgSign').offsetWidth //获取合同页面的宽度
            var imgHeight = document.getElementById('imgSign').offsetHeight//获取合同页面的高度
            var signCanvas =document.getElementById('signCanvas')
            var leftX = offsetX * imgWight;
            var topY = (pageNum - 1 + offsetY) * imgHeight;
            var signPng = document.getElementById('signCanvasImg').cloneNode(true);
            parentBox.appendChild(signPng);
            signPng.style.position= 'absolute';
            signPng.style.top= topY + 'px'
            signPng.style.left = leftX + 'px'
            signPng.setAttribute("id", "div-" + i);
            this.arrow.push (i)
            signCanvas.style.display='none'
            var windowScrollTop = document.documentElement.scrollTop
            if(i == this.group.length-1){
              signPosit += pageNum+","+leftX+","+offsetY * (imgHeight);
            }else{
              signPosit += pageNum+","+leftX+","+offsetY * (imgHeight)+"&";
            }
          }
          clearInterval(this.timer)
          this.signPosit = signPosit
          this.recapture = true
        }
      },1000)
      })
    }
  },
  mounted() {
    sessionStorage.removeItem("type");
    sessionStorage.removeItem("Jurisdiction");
    prohibit()
  }
}
</script>
<style scoped>
  @import "../../styles/Dimension/Dimensions.css";
  @import "../../common/styles/Tops.css"
</style>
<style>
  .out{
    height:200px !important;
    width:400px !important;
    overflow-x: hidden;
  }

</style>
