
<template>
  <div>
    <div class="Tops">
      <nav class='nav'>
        <p class='logo'>
          <img src="/static/images/Top/v1.6-logo.png" alt="logo图">
        </p>
        <div class='buttons'>
          <el-button type="info" style='background:#ccc' :disabled="hasClick" @click="cancelSign">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
          <el-button style='color:#4091fb' :disabled="isAction" @click="lastStepFit">上一步</el-button>
          <el-button style='color:#4091fb' :disabled="isAction" @click="nextStepFit">下一步</el-button>
        </div>
      </nav>
    </div>
    <div class='Pcontract Place'>

      <div class="step" style="width: 720px;">
        <ul>
          <li class="active"><i class='el-icon-document'></i><b>上传文件</b></li>
          <p></p>
          <li class="active"><i class='el-icon-goods'></i><b>签署设置</b></li>
          <p></p>
          <li class="active"><i class='el-icon-edit'></i><b>指定位置</b></li>
          <p></p>
          <li><i class='el-icon-menu'></i><b>合同签署</b></li>
          <p></p>
          <li><i class='el-icon-check'></i><b>完成</b></li>
        </ul>
      </div>

      <div class="signing">   <!--签署合同开始-->
        <p id='textInfo'>温馨提示:请用鼠标点击右侧签署人列表中的“拖入位置”后，在合同中选择需要放置签名的位置，为了您的签署体验，建议您每个签署人拖拽的签署位置不超过10处。</p>

        <div class="sign_left" ref="leftWrapper">
          <ul class="pagination">
            <div id="top_box">
              <p id='top' v-show="currentIndex != 0" @click="goto(currentIndex)"><a class='el-icon-arrow-up' href="javascript:void(0);"></a></p>
            </div>
            <li v-for="index in pages" :class="{'active':currentIndex === (index - 1)}" :key="index" @click="clickNave(index)">
              <a href="javascript:void(0);" >{{index}}</a>
            </li>
            <!-- <span @click=>测试按钮</span> -->
            <div id="bottom_box">
              <p id='bottom' v-show="allpage != currentIndex + 1 && allpage != 0 " @click="goto2(currentIndex+1)"><a class='el-icon-arrow-down'  href="javascript:void(0);" ></a></p>
            </div>
          </ul>
        </div>
        <div class='sign_center' ref="rightWrapper" id="div1"> <!-- 渲染合同页面 -->
          <ul class='content contractImg' id='div2' style="position: relative;cursor:pointer;">
            <li  v-for="(ele,i) in imgList" :key="i" class="contractImg-hook" style="height:844px;">
              <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+ele" alt="" style="width:100%;height:844px;" id='signImg'>
            </li>
          </ul>
        </div>
        <div class='sign_right'>
          <h2>提示：可指定多个位置</h2>
          <h1>签署人：</h1>

          <div class='more'  id="more">
            <div class='morePerson' id="morePerson">
              <p style='line-height: 40px;font-family: 幼圆;'>发起方</p>
              <dl v-for="(item,index) in signUserList" :key="index" v-drag style="position:relative;width:100%;background:#fff">
                <dd style='width:130px;overflow:hidden;text-overflow:ellipsis; white-space:nowrap'>{{item.signUserName}}</dd>
                <!-- <dd style='width:130px;overflow:hidden;text-overflow:ellipsis; white-space:nowrap'>{{item.userName}}</dd> -->
                <dd style='width:130px;overflow:hidden;text-overflow:ellipsis; white-space:nowrap'>{{item.userName}}{{item.mobile}}</dd>
                <p class='hidden' style="display:none">{{item.interfaceCode}}</p>
                <p class='hidden' style="display:none">{{item.userCode}}</p>
                <!-- <dd v-on:click="getIndex(item,index)">拖入位置</dd> -->
                <dd style='font-size:12px;position:absolute;width:100%;bottom:0;'>拖入位置（0）次</dd>
              </dl>
            </div>

            <div class='morePerson' style='margin-top:10px' id="moreEnter">
              <p style="line-height: 40px;font-family: 幼圆;">对手方</p>
              <dl v-for="(item,index) in analogueList" :key="index"  v-drag style="position:relative;background:#fff">
                <dd style='width:130px;overflow:hidden;text-overflow:ellipsis; white-space:nowrap;'>{{item.signUserName}}</dd>
                <dd style='width:130px;overflow:hidden;text-overflow:ellipsis; white-space:nowrap'>{{item.userName}}{{item.mobile}}</dd>
                <p class='hidden' style="display:none">{{item.interfaceCode}}</p>
                <p class='hidden' style="display:none">{{item.userCode}}</p>
                <dd style='font-size:12px;position:absolute;width:100%;bottom:0;'>拖入位置（0）次</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'

  import { mapActions, mapState } from 'vuex'
  import { signerpositions ,contractimgs, contractSignUser} from '@/api/business'
  export default {
    name: 'Places',
    data () {
      return {
        //centerDialogVisible:false,
        baseURL:this.baseURL.BASE_URL,
        current:0,
        showItem:0,
        allpage:0,
        signUserList:[],
        analogueList:[],
        imgList:[],
        imgHeight: [],
        hasClick:false,
        isAction:true,
        scrollY: 0,  //batterScroll 滚动的Y轴距离
        rightScroll:'',
        interfaceCode:sessionStorage.getItem("interfaceCode"),
        contractNo:sessionStorage.getItem("contractNo"),
        contractName:sessionStorage.getItem("contractName"),
        accountLevel:sessionStorage.getItem("accountLevel"),     //账户类型 1是一级账号 2是二级账号
      }
    },
    mounted() {

      this.$nextTick(() => {
        this.rightScroll = new BScroll(this.$refs.rightWrapper, {
          probeType: 3,
          scrollY: true,
          preventDefaultException:{className:/(^|\s)sign_left(\s|$)/}
        })
      })
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
        this.showItem = 10;
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

        let imgLists = document.getElementsByClassName('contractImg-hook')
        let el = imgLists[index - 1]
        this.rightScroll.scrollToElement(el, 300)
      },
      initScroll(){
        if (!this.$refs.rightWrapper) { return }
        // this.leftScroll = new BScroll(this.$refs.leftWrapper, {
        //     click: true,
        //     preventDefaultException:{className:/(^|\s)sign_left(\s|$)/}       //正在整改中。。。
        // })

        this.rightScroll = new BScroll(this.$refs.rightWrapper, {
          probeType: 3,
          preventDefaultException:{className:/(^|\s)sign_right(\s|$)/}
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
          height += item.offsetHeight
          this.imgHeight.push(height)
        }

      },
      cancelSign() {    //取消操作
        this.$store.dispatch('tabIndex',{tabIndex:0});  //导航高亮
        const h = this.$createElement;
        this.hasClick = true;
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
              this.hasClick = false
              done();
            }
          }
        })
      },
      lastStepFit(){  //上一步

        this.$store.dispatch('type',{type:'back'})
        sessionStorage.setItem('contractName', this.contractName)
        sessionStorage.setItem('contractNo', this.contractNo)
        sessionStorage.setItem('type','back')
        this.$router.push('/Signature')
      },
      nextStepFit(){  //下一步
        var imgHeight = document.getElementById('signImg').offsetHeight
        var imgWidth = document.getElementById('signImg').offsetWidth
        var signBox = document.getElementsByClassName('signBox')
        var len = document.getElementById('more').getElementsByTagName('dl').length           //获取签署人个数
        var param = ""
        var arr =[]
        var sign_length = document.getElementById('morePerson').childNodes //发起方
        var sign_list = document.getElementById('moreEnter').childNodes //对手方
        for (var i=2;i<sign_length.length;i++){
          var elementNum = sign_length[i].childNodes[8].innerText.replace(/[^0-9\-,]/g,'').split('').join('')
          arr.push(elementNum)
        }
        for (var i=2;i<sign_list.length;i++){
          var elementNum = sign_list[i].childNodes[8].innerText.replace(/[^0-9\-,]/g,'').split('').join('')
          arr.push(elementNum)
        }
        if( arr.indexOf("0") == -1){
          for (var i = 0; i<signBox.length; i++ ) {
            var userId = signBox[i].childNodes[3].value                                         //获取签署人的标示id(userCode)
            var interfaceCode = signBox[i].childNodes[2].value                                  // interfaceCode
            var topY = parseInt(signBox[i].offsetTop)                                           //获取用户签章的top值
            var leftX = parseInt(signBox[i].offsetLeft)                                         //获取用户签章的left值
            var  pageNo = parseInt(topY/imgHeight)                                              //获取页数
            var offsetY = (topY-(imgHeight)*pageNo)/imgHeight                                   //获取签章相对于合同的偏移量
            var offsetX  = leftX/imgWidth;                                                      //获取签章相对于合同的偏移量
            if(i == len-1){
              param += interfaceCode+","+userId+","+(pageNo+1)+","+offsetX+","+offsetY+"&"

            }else{
              param += interfaceCode+","+userId+","+(pageNo+1)+","+offsetX+","+offsetY+"&"
            }
          }

          signerpositions(this.interfaceCode,this.contractNo,{"signerpositions":param}).then(res=>{
              if(res.data.resultCode == '1') {
                this.$message({
                  showClose: true,
                  message: '指定位置成功!',
                  type: 'success'
                })
                this.$router.push('/Dimension')
              }
              else if(res.data.resultCode==0){


                if(this.accountLevel == 1) {
                  this.$confirm(
                    <div class="warn-num ">
                      <p class="title" style="font-size:16px;text-align:center;">对不起，您的对企业签约次数已用尽!</p>
                      <div class="customer-service"></div>
                    </div>, '提示', {confirmButtonText: '确定', showCancelButton: '取消'}).then(() => {
                    this.$router.push('/PackagePurchase')
                  })
                }else{
                  this.$alert('对不起，您的签约次数已用尽!', '提示', {
                    confirmButtonText: '取消',
                  });
                }

              }else{
                this.$message({
                  showClose: true,
                  message: '指定位置失败!',
                  type: 'error'
                })
              }
          }).catch(error=>{

         })

        }
        else {
          this.$alert('未指定完位置!','指定位置', {
            confirmButtonText: '确定'
          })
        }
      }
      },
  created (){

    this.$loading.show(); //显示

    contractSignUser(this.contractNo).then(res=>{
      let signUserVo = []
      let analogueVo = []
      signUserVo.push(res.data.dataList[0])
      signUserVo.push(res.data.dataList[1])
      analogueVo.push(res.data.dataList[2])
      analogueVo.push(res.data.dataList[3])
      this.signUserList = signUserVo
      this.analogueList = analogueVo
    }).catch(error=>{

    })

    let data =[];
    let t=Math.random();
    contractimgs(this.interfaceCode,this.contractNo).then(res=> {

        this.allpage = res.data.dataList.length
        this.$nextTick(() => {
          this.initScroll()
          this.calculateHeight()
        })
        for (let i = 0; i < res.data.dataList.length;i++) {
          let contractUrl = res.data.dataList[i].contractUrl
          data[i] = contractUrl
          this.$loading.hide(); //隐藏
        }
        this.imgList = data;
        this.rightScroll = new BScroll(this.$refs.rightWrapper, {
          probeType: 3,
          scrollY: true,
          preventDefaultException:{className:/(^|\s)sign_left(\s|$)/}
        })
      this.isAction = false;
    }).catch(error=>{

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
            item.innerHTML = '<h5 class="infoStyle">'+el.childNodes[0].innerText+'<br>'+'</h5><h6 class="textStyle">'+el.childNodes[2].innerText+'</h6><input type="hidden" class="user" value="'+el.childNodes[4].innerText+'"><input type="hidden" class="user" value="'+el.childNodes[6].innerText+'"><b  class="delete">X</b>';

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
                    var m = Number(el.childNodes[8].innerText.replace(/[^0-9\-,]/g,'').split('').join(''))
                    el.style.display='block'
                    n--
                    m--
                    el.childNodes[8].innerText ='拖入位置（'+m +'）次'
                    el.childNodes[8].style.fontSize='12px'
                    el.childNodes[8].style.color ='white'
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
                var dragNum = el.childNodes[8]
                dragNum.innerText ='拖入位置（'+ n +'）次'

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
                      // e.preventDefault = false
                      e.preventDefault()
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
      },
    }
  },
  }
</script>
<style lang="css" scoped>
  @import "../../styles/Place/Places.css";
  @import "../../common/styles/Tops.css";
  @import "../../common/styles/SigningSteps.css";
</style>

<style>
  .loading{
    width:128px;
    height:128px;
    position: fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
    margin:auto;
  }
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
  .morePerson dl:nth-child(3) dd[data-v-77aee466]:nth-child(2){
      margin-top:-30px;
  }
  .infoStyle{
    text-align:center;
    line-height:86px;
    font-size:16px;
    font-weight:normal;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width:138px;
  }
  .Place .textStyle{
    text-align:center;
    font-size:16px;
    font-weight:normal;
    margin-top: 0!important;
    width: 130px;
    line-height: 30px;
  }
  .delete{
    cursor: pointer;
    position:  absolute;
    right: -21px;
    top: -17px;
    border:  1px solid #4091fb;
    border-radius:  50%;

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
