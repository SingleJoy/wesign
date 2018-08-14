<template>
  <div>
   <div class="Tops">
    <nav class='nav'>
      <p class='logo'>
        <img src="../../../../static/images/logo2.png" alt="">
      </p>
      <div class='buttons'>
        <el-button type="info" style='background:#ccc' :disabled="hasClick" @click="batchTempInfoCancel">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
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
              <!-- <img :src="[this.baseURL.BASE_URL+'/v1/tenant/contract/img?contractName='+templateName+'&contractUrl='+item]" alt="" style='width:100%;'> -->
            <img :src="['https://www.zqsign.com/restapi/wesign/v1/tenant/contract/img?contractName=zqsign&contractUrl='+item]" alt="" style='width:100%;'>
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
              <div class="input_title" >({{index+1}}){{item}}</div>
              <div class="input_box">
                <el-input placeholder="" clearable></el-input>
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
export default {
  name: 'batchInfos',
  data () {
    return {
      //初始化左侧页码，并使第一个高亮
      current:1,
      // 左侧页码显示的个数
      showItem:0,
      allpage:0,
      // 左侧页码的总数
      allpage:1,
      imgList:[],
      fillMessage:[],
      imgHeight: [],
      templateName:'',
     // centerDialogVisible:false,
      scrollY: 0,
      batchMessage:[],
      batchSignName:'',
      batchSignMobile:'',
      batchSignIdCard:'',
      operateType:'', //数据回显标示
      flag:true,
      hasClick:false
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
  created() {
    var templateName = sessionStorage.getItem('templateName');
    var templateNo = sessionStorage.getItem('templateNo');
    var contractNo = sessionStorage.getItem('contractNo');
    var templateGenre = sessionStorage.getItem('templateGenre');
    if (templateName) {
      templateName = JSON.parse(templateName)
      if ( this.$store.state.templateName == ''){
        this.$store.state.templateName = templateName
      }
    }
    if (templateNo) {
      templateNo = JSON.parse(templateNo)
      if ( this.$store.state.templateNo == ''){
        this.$store.state.templateNo = templateNo
      }
    }
    if (contractNo) {
      contractNo = JSON.parse(contractNo)
      if ( this.$store.state.contractNo1 == ''){
        this.$store.state.contractNo1 = contractNo
      }
    }
    if (templateGenre) {
      templateGenre = JSON.parse(templateGenre)
      if ( this.$store.state.templateGenre == ''){
        this.$store.state.templateGenre = templateGenre
      }
    }
    this.$loading.show(); //显示
    var data =[];
    this.templateName = this.$store.state.templateName
    let url = process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/templateImage/'+this.$store.state.templateNo;
    let urls = process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/templateList/'+this.$store.state.templateNo;
    let urlFill = process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/batchSign/'+this.$store.state.contractNo1+'/userInfo';

    this.$http.get(url,{params:{"templateSpecificType":this.$store.state.templateGenre}}).then(function (res) { //获取批量模板图片信息
    if(res.data.sessionStatus == '0'){
          this.$router.push('/Server')
        } else {
      this.allpage = res.data.list.length
      this.$nextTick(() => {
        this._initScroll()
        this._calculateHeight()
      })
      for (let i = 0; i < res.data.list.length;i++) {
      let templateUrl = res.data.list[i]
      data[i] = templateUrl
      this.$loading.hide(); //隐藏
      }
      this.imgList = data
        }
    })

    this.$http.get(urls,{params:{"contractTempNo":this.$store.state.contractNo1}}).then(function (res) { //获取批量模板jsonVal list信息
     this.batchMessage = res.data.lists
    })
    var names="";
		var mobiles ="";
		var idCards ="";
    this.$http.get(urlFill).then(function (res) { //获取批量模板对手方信息
     if(res.data.sessionStatus == '0'){
          this.$router.push('/Server')
        } else {
     for (let i =0;i< res.data.length; i++){
       var name = res.data[i].name
       var mobile = res.data[i].mobile
       var idCard = res.data[i].idCard
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
        }
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
      this.$store.dispatch('template',{templateName:this.$store.state.templateName,templateNo:this.$store.state.templateNo})
      this.$store.dispatch('fileSuccess1',{contractNo:this.$store.state.contractNo1})
      this.$store.dispatch('templateType',{templateGenre:this.$store.state.templateGenre})
      this.$store.dispatch('type',{type:'back'})
      sessionStorage.setItem('templateName', JSON.stringify(this.$store.state.templateName))
      sessionStorage.setItem('templateNo', JSON.stringify(this.$store.state.templateNo))
      sessionStorage.setItem('contractNo', JSON.stringify(this.$store.state.contractNo1))
      sessionStorage.setItem('templateGenre',JSON.stringify(this.$store.state.templateGenre))
      sessionStorage.setItem('type',JSON.stringify('back'))
      this.$router.push('/batchSetting')
    },
    nextStepFit () {
      if(this.flag == true){
        this.flag = false
        var jsonVal =''
        var controls = document.getElementsByTagName('input');
        this.$loading.show(); //显示
        for(var i=0; i<controls.length; i++){
          if(controls[i].type=='text'){
            var json =controls[i].value
            jsonVal += (this.batchMessage[i]+'='+json +'&')
          }
        }
        jsonVal = jsonVal.substring(0,jsonVal.length-1)
        this.$http.post(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/templateBatchSign',
        {"contractName":this.$store.state.templateName,"templateNum":this.$store.state.templateNo,"jsonVal":jsonVal,"contractTempNo":this.$store.state.contractNo1,"templateSpecificType":this.$store.state.templateGenre,"operateType":''},{emulateJSON:true}).then(function (res) {
          if(res.data.sessionStatus == '0'){
            this.$router.push('/Server')
          } else {
          if(res.data.resultCode == 0){
            this.$message({
              showClose: true,
              message: '模板填充信息完成!',
              type: 'success'
            })
              this.$loading.hide(); //隐藏
              this.$store.dispatch('template',{templateName:this.$store.state.templateName,templateNo:this.$store.state.templateNo})
              this.$store.dispatch('fileSuccess1',{contractNo:this.$store.state.contractNo1})
              sessionStorage.setItem('templateName', JSON.stringify(this.$store.state.templateName))
              sessionStorage.setItem('templateNo', JSON.stringify(this.$store.state.templateNo))
              sessionStorage.setItem('contractNo', JSON.stringify(this.$store.state.contractNo1))
              this.$router.push('/batchsign')
          } else {
            this.$message({
              showClose: true,
              message: '此模板已填充完毕,无法再次填充!!',
              type: 'error'
            })
          }
          }
        })
      }
    }
  },
  mounted() {
    prohibit()
  }
}
</script>
<style scoped>
  @import "../../../styles/batchInfo/batchInfo.css";
  @import "../../../common/styles/Tops.css";
  @import "../../../common/styles/SigningSteps.css";
</style>

