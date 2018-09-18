<template>
  <div>
    <div class="Tops">
      <nav class='nav'>
        <p class='logo'>
          <img src="../../../../static/images/logo2.png" alt="">
        </p>
        <div class='buttons'>
          <!-- <el-button type="info" style='background:#ccc' @click="tempBatchSignCancel">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button> -->
        </div>
      </nav>
    </div>
    <div class='batchsigns' style="margin-top: 100px;">
      <div class='step' style="width: 720px;">
        <ul>
          <li class="active"><i class='el-icon-document'></i><b>选择模板</b></li>
          <p></p>
          <li class="active"><i class='el-icon-goods'></i><b>签署设置</b></li>
          <p></p>
          <li class="active"><i class='el-icon-edit'></i><b>填充信息</b></li>
          <p></p>
          <li class="active"><i class='el-icon-menu'></i><b>合同签署</b></li>
          <p></p>
          <li><i class='el-icon-check'></i><b>完成</b></li>
        </ul>
      </div>
      <div class='signing'>   <!--签署合同开始-->
        <div class='sign_left' ref="leftWrapper">
          <ul class="pagination">
            <p  id='top' v-show="currentIndex != 0" @click="goto(currentIndex)" ><a class='el-icon-arrow-up' href="javascript:void(0);"></a></p>
            <li v-for="index in pages" :class="{'active':currentIndex === (index - 1)}" :key="index" @click="clickNav(index)">
              <a href="javascript:void(0);" >{{index}}</a>
            </li>
            <p id='bottom' v-show="allpage != currentIndex + 1 && allpage != 0 " @click="goto2(currentIndex+1)"><a class='el-icon-arrow-down'  href="javascript:void(0);" ></a></p>
          </ul>
        </div>
        <div class='sign_center' ref="rightWrapper"> <!-- 渲染合同页面 -->
          <ul class='content contractImg' id="contractImg">
            <li v-for="(item, index) in imgArray" :key="index" class="contractImg-hook" style="height:844px;">
              <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractName=zqsign&contractUrl='+item" alt="" id='imgSign' style='width: 593px;'>
            </li>
          </ul>
        </div>
        <div class='sign_right'>
          <a href="javascript:void(0);" @click="batchSign"><img src="../../../../static/images/Contract/submit.png" alt=""></a>
          <br>
        </div>
        <!-- 右侧签署按钮结束 -->
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
    name: 'Contractsigns',
    data () {
      return {
        baseURL:this.baseURL.BASE_URL,
        //初始化左侧页码，并使第一个高亮
        current:0,
        // 左侧页码显示的个数
        showItem:0,
        // allpage:allpage
        // 左侧页码的总数
        allpage:0,
        imgArray:[],
        imgHeight: [],
        contractImgHeight: 0,
        contractUrl:[],
        scrollY: 0,
        contractSignImg:'',
        flag: true,
        // centerDialog:false,
        signPosition:''
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
          var middle = this.currentIndex - Math.floor(this.showItem / 2 ),//从哪里开始
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
      var contractName = sessionStorage.getItem('templateName')
      var contractNo = sessionStorage.getItem('contractNo')
      if (contractName) {
        // contractName = JSON.parse(contractName)
        if ( this.$store.state.templateName == ''){
          this.$store.state.templateName = contractName
        }
      }
      if (contractNo) {
        // contractNo = JSON.parse(contractNo)
        if ( this.$store.state.contractNo1 == ''){
          this.$store.state.contractNo1 = contractNo
        }
      }
      this.$loading.show(); //显示
      var data =[]
      let url = process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/contract/'+this.$store.state.contractNo1+'/contracttempimgs'
      this.$http.get(url).then(function (res) {
        /*获取后台数据，并使用imgArray*/

        for(var i=0;i<res.data.length;i++){
          var contractUrl = res.data[i].contractUrl
          data[i] = contractUrl
          this.$loading.hide(); //隐藏
        }
        this.imgArray = data
        /*获取总的页码*/
        this.allpage = res.data.length

        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      }).catch(function (error) {
        this.$message.error('请求失败！请刷新再试！')
      })

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
          height += item.clientHeight
          this.imgHeight.push(height)
        }
      },
      tempBatchSignCancel() {    //取消操作
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
      batchSign() {    //签署操作
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, ' 确定提交签署？'),
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
                this.gainPosition()
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
      gainPosition () { //点击签署
        this.$loading.show(); //显示
        if (this.flag == true){
          this.$http.post(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/user/'+ cookie.getJSON('tenant')[1].interfaceCode + '/contractkeywordsign/'+this.$store.state.contractNo1,{emulateJSON: true}).then(function (res) {
            if(res.data.sessionStatus == '0'){
              this.$router.push('/Server')
            } else {
              if (res.data.responseCode == 0){
                this.$message({
                  showClose: true,
                  message: '合同签署成功！',
                  type: 'success'
                })
                this.$loading.hide(); //隐藏
                this.$store.dispatch('fileSuccess1',{contractName:this.$store.state.templateName,contractNo:this.$store.state.contractNo1})
                sessionStorage.setItem('contractName', this.$store.state.templateName)
                sessionStorage.setItem('contractNo', this.$store.state.contractNo1)
                this.$router.push('/Templatecomplete')
              }
            }
          })
          this.flag = false
        }
      }
    },
    mounted() {
      prohibit()
    }
  }
</script>
<style scoped>
  @import "../../../styles/batchInfo/batchsigns.css";
  @import "../../../common/styles/Tops.css";
  @import "../../../common/styles/SigningSteps.css";
</style>

