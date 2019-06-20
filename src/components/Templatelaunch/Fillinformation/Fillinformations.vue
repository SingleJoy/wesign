<template>
  <div>
    <div class="Tops">
      <nav class='nav'>
        <p class='logo'>
          <img src="/static/images/logo2.png" alt="">
        </p>
        <div class='buttons'>
          <el-button type="info" style='background:#ccc' :disabled="hasClick" @click="SigleTempCancel">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
          <el-button style='color:#4091fb' @click="nextStepFit" :loading= load>下一步</el-button>
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
      <div class='step' style="width: 870px;">
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
              <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractName=zqsign&contractImagePath='+item" alt=""  style='width: 100%;height:844px;'>
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
              <!-- <el-input placeholder="" value="" clearable></el-input> -->
              <input type="text" class="auto-input">
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
  import {getTemplateValAndImgs,template} from '@/api/template'
  export default {
    name: 'Fillinformations',
    data () {
      return {
        baseURL:this.baseURL.BASE_URL,
        // 初始化左侧页码，并使第一个高亮
        current:1,
        // 左侧页码显示的个数
        showItem:0,
        // 左侧页码的总数
        allpage:10,
        imgList:[],
        fillMessage:[],
        imgHeight: [],
        scrollY: 0,
        load:false,
        hasClick:false,
        templateName:sessionStorage.getItem('templateName'),
        interfaceCode:cookie.getJSON('tenant')?cookie.getJSON('tenant')[1].interfaceCode:'',
        accountCode:sessionStorage.getItem('accountCode'),
        templateNo:sessionStorage.getItem('templateNo'),
        contractNo:sessionStorage.getItem("contractNo"),
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
    mounted() {
      this.$nextTick(() => {
        this.rightScroll = new BScroll(this.$refs.rightWrapper, {
          probeType: 3,
          preventDefaultException:{className:/(^|\s)sign_center(\s|$)/}
        })
      })
    },
    created() {


      this.$loading.show(); //显示
      let data =[];

      getTemplateValAndImgs(this.interfaceCode,this.templateNo,this.accountCode).then(res=> {
        this.$loading.hide(); //隐藏
        if(res.data.list)
          this.allpage = res.data.list.length
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
        for (let i = 0; i < res.data.list.length;i++) {
          let templateUrl = res.data.list[i];
          data[i] = templateUrl;
        }
        this.imgList = data;
        this.fillMessage = res.data.lists

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
        let height = 0
        this.imgHeight.push(height)
        for (let i = 1; i < imgList.length; i++) {
          let item = imgList[i]
          height += item.clientHeight
          this.imgHeight.push(height)
        }
      },
      SigleTempCancel() {    //取消操作
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
              this.hasClick = false;
              done();
            }
          }
        })
      },
      nextStepFit () {  // 下一步操作
        this.load = true
        let jsonVal =''
        let controls = document.getElementsByTagName('input');

        for(let i=0; i<controls.length; i++){
          if(controls[i].type=='text'){
            let json =controls[i].value
            jsonVal += (this.fillMessage[i]+'='+json +'&')
          }
        }
        jsonVal = jsonVal.substring(0,jsonVal.length-1);
        let params={
          "contractName":this.templateName,
          "templateNum":this.templateNo,
          "jsonVal":jsonVal,
          "accountCode":this.accountCode
        };
        //模板填充结束之后 返回合同编号
        template(this.interfaceCode ,params).then(res=> {
            let contractNo = res.data.contractNo;
            sessionStorage.setItem('contractNo',contractNo);
            if(res.data.resultCode == 0){
              this.$message({
                showClose: true,
                message: '模板填充信息完成!',
                type: 'success'
              })

              this.$router.push('/Signaturesetting')
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
  }
</script>
<style scoped>
  @import "../../../styles/Fillinformation/Fillinformations.css";
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

