<template>
  <div>
    <div class="Tops">
      <nav class='nav'>
        <p class='logo'>
          <img src="../../../../static/images/logo2.png" alt="">
        </p>
        <div class='buttons'>
          <el-button type="info" style='background:#ccc' @click="templateCancel">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
          <el-button style='color:#22a7ea' @click="lastStepFit">上一步</el-button>
          <el-button style='color:#22a7ea' @click="nextStepFit">下一步</el-button>
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
    <div class="Specifiedpositions" style="margin-top: 100px;">
      <div class="step" style="width:890px;">
        <ul>
          <li class="active"><i class='el-icon-document'></i><b>选择模板</b></li>
          <p></p>
          <li class="active"><i class='el-icon-edit'></i><b>填充信息</b></li>
          <p></p>
          <li class="active"><i class='el-icon-edit'></i><b >签署设置</b></li>
          <p></p>
          <li class="active" style='border:1px dashed #22a7ea'><i class='el-icon-edit' style='background:#22a7ea'></i><b style='color:#22a7ea'>指定位置</b></li>
          <p></p>
          <li><i class='el-icon-menu'></i><b>合同签署</b></li>
          <p></p>
          <li style='border:1px dashed #ccc'><i class='el-icon-check' style='background:#ccc'></i><b style='color:#ccc'>完成</b></li>
        </ul>
      </div>
      <div class="signing" >   <!--签署合同开始-->
        <p id="textInfo">温馨提示:请用鼠标点击右侧签署人列表中的“拖入位置”后，在合同中选择需要放置签名的位置，为了您的签署体验，建议您每个签署人拖拽的签署位置不超过10处。</p>

        <div class='sign_left' ref="leftWrapper">
          <ul class="pagination" >
            <p  id='top' v-show="currentIndex != 0" @click="goto(currentIndex)" ><a class='el-icon-arrow-up' href="javascript:void(0);"></a></p>
            <li v-for="index in pages" :key="index" :class="{'active':currentIndex === (index - 1)}" @click="clickNav(index)" >
              <a href="javascript:void(0);" >{{index}}</a>
            </li>
            <p id='bottom' v-show="allpage != currentIndex + 1 && allpage != 0 " @click="goto2(currentIndex+1)"><a class='el-icon-arrow-down'  href="javascript:void(0);" ></a></p>
          </ul>
        </div>
        <div class='sign_center' ref="rightWrapper" id="div1"> <!-- 渲染合同页面 -->
          <ul class='content contractImg' id='div2' style="position: relative;cursor:pointer;">
            <li v-for="(item, index) in imgList" :key="index" class="contractImg-hook" style="height:844px;">
              <!-- <img :src="[`${this.baseURL.BASE_URL}`+'/v1/tenant/contract/img?contractUrl='+item]" alt="" style='width: 100%;height:100%;' id='signImg'> -->
              <img :src="['http://192.168.1.15:8080/zqsign-web-wesign/restapi/wesign/v1/tenant/contract/img?contractUrl='+item]" alt="" style='width: 100%;height:844px;' id='signImg'>
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
              <dd>拖入位置（ 0 ）次</dd>
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
  import {prohibit} from '@/common/js/prohibitBrowser'
  export default {
    name: 'Specifiedpositions',
    data () {
      return {
        current:0,
        showItem:1,
        allpage:1,
        centerDialogVisible:false,
        signUserList:[],
        imgList:[],
        imgHeight: [],
        scrollY: 0  //batterScroll 滚动的Y轴距离
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
    mounted() {
      prohibit()
    },
    methods:{
      goto (currentIndex){
        this.clickNav(currentIndex)
      },
      goto2 (currentIndex){
        currentIndex++
        this.clickNav(currentIndex)
      },
      clickNav(index) {
        let imgLists = this.$refs.rightWrapper.getElementsByClassName('contractImg-hook')
        let el = imgLists[index - 1]
        this.rightScroll.scrollToElement(el, 300)
      },
      _initScroll(){
        this.leftScroll = new BScroll(this.$refs.leftWrapper, {
          click: true,
          preventDefaultException:{className:/(^|\s)sign_left(\s|$)/}       //正在整改中。。。
        })

        this.rightScroll = new BScroll(this.$refs.rightWrapper, {
          probeType: 3,
          preventDefaultException:{className:/(^|\s)sign_left(\s|$)/}
        })

        this.rightScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight(){
        let imgLists = this.$refs.rightWrapper.getElementsByClassName('contractImg-hook')
        let height = 0
        this.imgHeight.push(height)
        for (let i = 1; i < imgLists.length; i++) {
          let item = imgLists[i]
          height += item.clientHeight
          this.imgHeight.push(height)
        }
      },
      templateCancel() {    //取消操作
        this.$store.dispatch('tabIndex',{tabIndex:0});  //导航高亮
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
      lastStepFit (){ //上一步
        this.$store.dispatch('fileSuccess1',{contractName:this.$store.state.templateName,contractNo:this.$store.state.contractNo1})
        this.$store.dispatch('type',{type:'back'})
        sessionStorage.setItem('contractName', JSON.stringify(this.$store.state.templateName))
        sessionStorage.setItem('contractNo', JSON.stringify(this.$store.state.contractNo1))
        sessionStorage.setItem('type',JSON.stringify('back'))
        this.$router.push('/Signaturesetting')

      },
      nextStepFit(){
        var imgHeight = document.getElementById('signImg').clientHeight
        var imgWidth = document.getElementById('signImg').clientWidth
        var signBox = document.getElementsByClassName('signBox')
        var len = document.getElementById('more').getElementsByTagName('dl').length           //获取签署人个数
        var arr =[]
        var param = ""
        var sign_length = document.getElementById('more').childNodes
        for (var i=0;i<sign_length.length;i++){
          var elementNum = sign_length[i].childNodes[6].innerText.replace(/[^0-9\-,]/g,'').split('').join('')
          arr.push(elementNum)
        }
        if( arr.indexOf("0") == -1){
          for (var i = 0; i<signBox.length; i++ ) {
            var userId = signBox[i].childNodes[2].value                                         //获取签署人的标示id
            var topY = parseInt(signBox[i].style.top)                                           //获取用户签章的top值
            var leftX = parseInt(signBox[i].style.left)                                         //获取用户签章的left值
            var  pageNo = parseInt(topY/imgHeight)                                              //获取页数
            var offsetY = (topY-(imgHeight)*pageNo)/imgHeight                                   //获取签章相对于合同的偏移量
            var offsetX  = leftX/imgWidth;                                                      //获取签章相对于合同的偏移量
            if(i == len-1){
              param += userId+","+(pageNo+1)+","+offsetX+","+offsetY+"&"

            }else{
              param += userId+","+(pageNo+1)+","+offsetX+","+offsetY+"&"
            }
          }
          this.$http.post(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/contract/'+this.$store.state.contractNo1+'/signerpositions',{"signerpositions":param},{emulateJSON: true}).then(function (res) {
            if(res.data.resultCode == '0') {
              this.$message({
                showClose: true,
                message: '指定位置成功!',
                type: 'success'
              })

              this.$store.dispatch('fileSuccess1',{contractName:this.$store.state.templateName,contractNo:this.$store.state.contractNo1})
              sessionStorage.setItem('contractName', JSON.stringify(this.$store.state.templateName))
              sessionStorage.setItem('contractNo', JSON.stringify(this.$store.state.contractNo1))
              this.$router.push('/Contractsign')

            }else{
              this.$message({
                showClose: true,
                message: '指定位置失败!',
                type: 'error'
              })
            }
          })
        } else {
          this.$alert('位置未指定完成!','指定位置', {
            confirmButtonText: '确定'
          })
        }
      }
    },
    created () {
      var templateName = sessionStorage.getItem('templateName')
      var templateNo = sessionStorage.getItem('templateNo')
      var contractNo = sessionStorage.getItem('contractNo')

      if (templateName) {
        templateName = JSON.parse(templateName)
        if ( this.$store.state.templateName == ''){
          this.$store.state.templateName = templateName
        }
      }
      if (contractNo) {
        contractNo = JSON.parse(contractNo)
        if ( this.$store.state.contractNo1 == ''){
          this.$store.state.contractNo1 = contractNo
        }
      }
      if (templateNo) {
        templateNo = JSON.parse(templateNo)
        if ( this.$store.state.templateNo == ''){
          this.$store.state.templateNo = templateNo
        }
      }
      this.$loading.show(); //显示
      this.$http.get(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/getContractDetails/'+this.$store.state.contractNo1).then(function (res) {
        if(res.data.sessionStatus == '0'){
          this.$router.push('/Server')
        } else {
          var signUserVo = res.data.signUserVo
          this.signUserList = signUserVo
        }
      })
      var data =[];
      this.$http.get(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/contract/'+this.$store.state.contractNo1+'/contractimgs').then(function (res) {
        if(res.data.sessionStatus == '0'){
          this.$router.push('/Server')
        } else {
          this.allpage = res.data.length
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
          for (let i = 0; i < res.data.length;i++) {
            let contractUrl = res.data[i].contractUrl
            data[i] = contractUrl
            this.$loading.hide(); //隐藏
          }
          this.imgList = data
        }
      })

    },
    directives: {
      drag: {
        bind :function (el, binding) {
          var n = 0
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
              var del = document.getElementsByClassName('delete')
              for(var i= 0;i<del.length;i++){
                del[i].addEventListener('click', function () {
                  this.parentNode.parentNode.removeChild(this.parentNode)
                  var m = Number(el.childNodes[6].innerText.replace(/[^0-9\-,]/g,'').split('').join(''))
                  el.style.display='block'

                  n--
                  m--
                  el.childNodes[6].innerText ='拖入位置（'+m +'）次'
                  el.childNodes[6].style.fontSize='12px'
                  el.childNodes[6].style.color ='white'
                }, true);
              }

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

                  var signBox =document.getElementsByClassName("signBox");
                  for (var i =0;i<signBox.length;i++){
                    signBox[i].onmousedown = function (e){
                      e.preventDefault();
                      let X = e.clientX - this.offsetLeft;
                      let Y = e.clientY - this.offsetTop +document.documentElement.scrollTop;
                      this.style.position='absolute';
                      var _this=this
                      document.onmousemove = function (e) {
                        e.preventDefault = false

                        var e = e|| window.event;
                        let le = e.clientX - X;
                        let to = e.clientY - Y + document.documentElement.scrollTop;

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
    }
  }
</script>
<style lang="css" scoped>
  @import "../../../styles/Specifiedposition/Specifiedpositions.css";
  @import "../../../common/styles/Tops.css";
  @import "../../../common/styles/SigningSteps.css";
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
    border: 1px solid #22a7ea;
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
    border:  1px solid #22a7ea;
    border-radius:  50%;
    width:  20px;
    height:  20px;
    line-height: 20px;
    text-align:  center;
    color: #22a7ea;
    font-weight:normal;
  }
  .signBox .infoStyle{
    width:125px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>


