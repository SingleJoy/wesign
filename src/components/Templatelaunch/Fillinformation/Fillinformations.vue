<template>
  <div>
   <div class="Tops">
    <nav class='nav'>
      <p class='logo'>
        <img src="../../../../static/images/logo2.png" alt="">
      </p>
      <div class='buttons'>
        <el-button type="info" style='background:#ccc' @click="SigleTempCancel">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
        <el-button style='color:#22a7ea' @click="nextStepFit" :loading= load>下一步</el-button>
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
  <div class='Fillinformations' style="margin-top: 100px;">
    <div class='step' style="width: 890px;">
      <ul>
        <li class="active"><i class='el-icon-document'></i><b>选择模板</b></li>
        <p></p>
        <li class="active"><i class='el-icon-edit'></i><b>填充信息</b></li>
        <p></p>
        <li><i class='el-icon-edit'></i><b>签署设置</b></li>
        <p></p>
        <li><i class='el-icon-edit'></i><b>指定位置</b></li>
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
          <li v-for="(item,index) in imgList" :key="index" class="contractImg-hook" style="height:844px;">
             <!-- <img :src="[`${this.baseURL.BASE_URL}`+'/v1/tenant/contract/img?contractName='+templateName+'&contractUrl='+item]" alt="" style='width:100%;height:100%;'> -->
          <img :src="['http://192.168.1.15:8080/zqsign-web-wesign/restapi/wesign/v1/tenant/contract/img?contractName=zqsign&contractUrl='+item]" alt="" style='width:100%;height:844px;'>
          </li>
         </ul>
        </div>
        <div class='sign_right'>
          <div class="right_title">
            模板中有需要填写的信息，请您填写
          </div>
          <div v-for="(ele,index) in fillMessage" :key="index">
          <div class="input_title" >({{index+1}}){{ele}}</div>
          <div class="input_box">
            <el-input placeholder="" clearable></el-input>
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
export default {
  name: 'Fillinformations',
  data () {
    return {
        //初始化左侧页码，并使第一个高亮
        current:1,
        // 左侧页码显示的个数
        showItem:10,
        allpage:10,
        // 左侧页码的总数
        allpage:10,
        imgList:[],
        fillMessage:[],
        imgHeight: [],
        templateName:'',
       // centerDialogVisible:false,
        scrollY: 0,
        load:false

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
           // var middle = this.currentIndex - Math.floor(this.showItem / 2 ),//从哪里开始
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
    var templateName = sessionStorage.getItem('templateName');
    var templateNo = sessionStorage.getItem('templateNo');
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
    this.$loading.show(); //显示
    var data =[];
    this.templateName = this.$store.state.templateName
    let url = process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/template/'+this.$store.state.templateNo;
    this.$http.get(url).then(function (res) {
      if(res.sessionStatus == '0'){
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
      this.fillMessage = res.data.lists
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
    SigleTempCancel() {    //取消操作
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
    nextStepFit () {  // 下一步操作
      this.load = true
      var jsonVal =''
      var controls = document.getElementsByTagName('input');

      for(var i=0; i<controls.length; i++){
        if(controls[i].type=='text'){
          var json =controls[i].value
          jsonVal += (this.fillMessage[i]+'='+json +'&')
        }
      }
      jsonVal = jsonVal.substring(0,jsonVal.length-1)
      this.$http.post(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/template',
      {"contractName":this.$store.state.templateName,"templateNum":this.$store.state.templateNo,"jsonVal":jsonVal},{emulateJSON:true}).then(function (res) {
        if(res.sessionStatus == '0'){
          this.$router.push('/Server')
        } else {
        var contractNo = res.data.contractNo
        if(res.data.resultCode == 0){
          this.$message({
            showClose: true,
            message: '模板填充信息完成!',
            type: 'success'
          })
           this.$store.dispatch('template',{templateName:this.$store.state.templateName,templateNo:this.$store.state.templateNo})
           this.$store.dispatch('fileSuccess1',{contractNo:contractNo})
           sessionStorage.setItem('templateName', JSON.stringify(this.$store.state.templateName))
           sessionStorage.setItem('templateNo', JSON.stringify(this.$store.state.templateNo))
           sessionStorage.setItem('contractNo', JSON.stringify(contractNo))
           this.$router.push('/Signaturesetting')
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
}
</script>
<style scoped>
  @import "../../../styles/Fillinformation/Fillinformations.css";
  @import "../../../common/styles/Tops.css";
</style>

