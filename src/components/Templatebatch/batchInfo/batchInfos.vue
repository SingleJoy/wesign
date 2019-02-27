<template>
  <div>
    <div class="Tops">
      <nav class='nav'>
        <p class='logo'>
          <img src="/static/images/logo2.png" alt="">
        </p>
        <div class='buttons'>
          <el-button type="info" style='background:#ccc' :disabled="hasClick" @click="batchTempInfoCancel">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
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
    <div class='batchInfos' style="margin-top: 100px;">
      <div class='step' style="width:720px;">
        <ul>
          <li class="active"><i class='el-icon-document'></i><b>选择模板</b></li>
          <p></p>
          <li class="active"><i class='el-icon-goods'></i><b>签署设置</b></li>
          <p></p>
          <li class="active"><i class='el-icon-edit'></i><b>填充信息</b></li>
          <p></p>
          <li><i class='el-icon-menu'></i><b>合同签署</b></li>
          <p></p>
          <li><i class='el-icon-check'></i><b>完成</b></li>
        </ul>
      </div>
      <div class='signing'>   <!--签署合同开始-->
        <div class='sign_left' ref="leftWrapper">
          <ul class="pagination">
            <p  id='top' v-show="currentIndex != 0" @click="goto(currentIndex)" ><a class='el-icon-arrow-up' href="javascript:void(0);"></a></p>
            <li v-for="index in pages" :class="{'active':currentIndex === (index - 1)}" :key="index"  @click="clickNav(index)">
              <a href="javascript:void(0);" >{{index}}</a>
            </li>
            <p id='bottom' v-show="allpage != currentIndex + 1 && allpage != 0 " @click="goto2(currentIndex+1)"><a class='el-icon-arrow-down'  href="javascript:void(0);" ></a></p>
          </ul>
        </div>
        <div class='sign_center' ref="rightWrapper"> <!-- 渲染合同页面 -->
          <ul class='content contractImg' id="contractImg">
            <li v-for="(item,index) in imgList" :key="index" class="contractImg-hook">
              <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractName=zqsign&contractUrl='+item" alt="" id="imgSign"  style='width:100%;width: 639px;'>
            </li>
          </ul>
        </div>
        <div class='sign_right'>
          <div class="right_title" style='font-size:12px' v-show="batchMessage != ''">
            模板中有需要填写的信息，请您填写
          </div>
          <div v-for="(item,index) in batchMessage" :key="index">
            <div v-if="item == '对手方_姓名'">
              <div class="input_title" >({{index+1}}){{item}}</div>
              <div class="input_box">
                <el-input placeholder="" :disabled="true" :value="batchSignName"></el-input>
              </div>
            </div>
            <div v-else-if="item == '对手方_手机号'">
              <div class="input_title" >({{index+1}}){{item}}</div>
              <div class="input_box">
                <el-input placeholder="" :disabled="true" :value="batchSignMobile"></el-input>
              </div>
            </div>
            <div v-else-if="item == '对手方_身份证号'">
              <div class="input_title" >({{index+1}}){{item}}</div>
              <div class="input_box">
                <el-input placeholder="" :disabled="true" :value="batchSignIdCard"></el-input>
              </div>
            </div>
            <div v-else>
              <div class="input_title">({{index+1}}){{item}}</div>
              <div class="input_box">
                <!-- <el-input placeholder="" clearable></el-input> -->
                <input type="text" class="auto-input">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import cookie from '@/common/js/getTenant'
  import {prohibit} from '@/common/js/prohibitBrowser'
  import {getTemplateImags,templateVal,userInfo,templateBatchSign} from '@/api/template'
  export default {
    name: 'batchInfos',
    data () {
      return {
        baseURL:this.baseURL.BASE_URL,
        //初始化左侧页码，并使第一个高亮
        current:1,
        // 左侧页码显示的个数
        showItem:0,
        // 左侧页码的总数
        allpage:1,
        imgList:[],
        fillMessage:[],
        imgHeight: [],
        // centerDialogVisible:false,
        scrollY: 0,
        batchMessage:[],
        batchSignName:'',
        batchSignMobile:'',
        batchSignIdCard:'',
        operateType:'', //数据回显标示
        flag:true,
        hasClick:false,
        interfaceCode:cookie.getJSON('tenant')?cookie.getJSON('tenant')[1].interfaceCode:'',
        templateNo:sessionStorage.getItem('templateNo'),
        contractNo:sessionStorage.getItem('contractNo'),
        templateName:sessionStorage.getItem('templateName'),
        templateGenre:sessionStorage.getItem('templateGenre'),
        accountCode:sessionStorage.getItem('accountCode'),
        type:sessionStorage.getItem('type'),
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
        this.showItem = 10;
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
    mounted() {
      this.rightScroll = new BScroll(this.$refs.rightWrapper, {
        probeType: 3,
        preventDefaultException:{className:/(^|\s)sign_center(\s|$)/}
      })

    },
    created() {

      this.$loading.show(); //显示
      let data =[];
      let params={
        "templateSpecificType":this.templateGenre
      }
      getTemplateImags(this.interfaceCode,this.templateNo,params).then(res=> {
        //获取批量模板图片信息
        this.allpage = res.data.list.length;
        for (let i = 0; i < res.data.list.length;i++) {
          let templateUrl = res.data.list[i]
          data[i] = templateUrl
          this.$loading.hide(); //隐藏
        }
        this.imgList = data
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      }).catch(error=>{

      })
      let templateVal_params={
        "contractTempNo":this.contractNo
      };
      templateVal(this.interfaceCode,this.templateNo,templateVal_params).then(res=> {
        //获取批量模板jsonVal list信息
        this.batchMessage = res.data.lists
      }).catch(error=>{

      })
      let names="";
      let mobiles ="";
      let idCards ="";

      userInfo(this.interfaceCode,this.contractNo).then(res=> { //获取批量模板对手方信息

        for (let i =0;i< res.data.length; i++){
          let name = res.data[i].name
          let mobile = res.data[i].mobile
          let idCard = res.data[i].idCard
          if ( i == res.data.length -1){
            names += name
            mobiles += mobile
            idCards += idCard
          }else{
            names += name+","
            mobiles += mobile+","
            idCards += idCard+","
          }
        }
        this.batchSignName = names
        this.batchSignMobile = mobiles
        this.batchSignIdCard = idCards

      }).catch(error=>{

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
          click: true,
          probeType: 3,
          // preventDefaultException:{className:/(^|\s)sign_center(\s|$)/}
        })
        this.rightScroll = new BScroll(this.$refs.rightWrapper, {
          probeType: 3,
          preventDefaultException:{className:/(^|\s)sign_center(\s|$)/}
        })

        this.rightScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight(){
        let imgList = this.$refs.rightWrapper.getElementsByClassName('contractImg-hook')
        let height = 0;
        this.imgHeight.push(height)
        for (let i = 1; i < imgList.length; i++) {
          let item = imgList[i]
          height += item.clientHeight
          this.imgHeight.push(height)
        }
      },
      batchTempInfoCancel() {    //取消操作
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
                this.$store.dispatch('tabIndex',{tabIndex:0});
                this.$router.push('/Home')
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 50);
              }, 100);
            } else {
              this.hasClick = false;
              done();
            }
          }
        })
      },
      lastStepFit () {
        // this.$store.dispatch('template',{templateName:this.$store.state.templateName,templateNo:this.templateNo})
        // this.$store.dispatch('fileSuccess1',{contractNo:this.$store.state.contractNo1})
        // this.$store.dispatch('templateType',{templateGenre:this.$store.state.templateGenre})
        // this.$store.dispatch('type',{type:'back'})

        sessionStorage.setItem('templateGenre',this.$store.state.templateGenre)
        sessionStorage.setItem('type','back')
        this.$router.push('/batchSetting')
      },
      nextStepFit () {
        if(this.flag == true){
          this.flag = false
          var jsonVal =''
          var controls = document.getElementsByTagName('input');
          this.$loading.show(); //显示
          for(let i=0; i<controls.length; i++){
            if(controls[i].type=='text'){
              var json =controls[i].value
              jsonVal += (this.batchMessage[i]+'='+json +'&')
            }
          }
          jsonVal = jsonVal.substring(0,jsonVal.length-1)
          var params=
            {"contractName":this.templateName,
              "templateNum":this.templateNo,
              "jsonVal":jsonVal,
              "contractTempNo":this.contractNo,
              "templateSpecificType":this.templateGenre,
              "operateType":'',
              'accountCode':this.accountCode
            };
          templateBatchSign(this.interfaceCode,params).then(res=> {

            if(res.data.resultCode == 0){
              this.$message({
                showClose: true,
                message: '模板填充信息完成!',
                type: 'success'
              })
              this.$loading.hide(); //隐藏


              this.$router.push('/batchsign')
            } else {
              this.$message({
                showClose: true,
                message: '此模板已填充完毕,无法再次填充!!',
                type: 'error'
              })
            }

          }).catch(error=>{

          })
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../styles/batchInfo/batchInfo.scss";
  @import "../../../common/styles/Tops.css";
  @import "../../../common/styles/SigningSteps.css";
  .auto-input{
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
  }
</style>

