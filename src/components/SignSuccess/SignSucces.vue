/*
* @Author: wangjia
* @Date: 2018-06-06 13:41:52
* @Last Modified by: wangjia
* @Last Modified time: 2018-06-26 17:24:06
*/
<template>
  <div class='SignSucces' style="margin-top: 20px;">
    <div class="main" style="height: 850px;">
      <div class='step' style="width:750px;">  <!--步骤条 -->
        <ul>
          <li class="active"><i class='el-icon-document'></i><b>上传文件</b></li>
          <p></p>
          <li class="active"><i class='el-icon-goods'></i><b>签署设置</b></li>
          <p></p>
          <li class="active"><i class='el-icon-edit'></i><b>指定位置</b></li>
          <p></p>
          <li class="active"><i class='el-icon-menu'></i><b>合同签署</b></li>
          <p></p>
          <li class="active"><i class='el-icon-check'></i><b>完成</b></li>
        </ul>
      </div>
      <!-- 合同返回用户成功or失败 -->

      <div class="state">
        <div class="stateInfo">
          <div>
            <img src="/static/images/Common/contract-sign-success.png" alt="" style="margin-top: 10px;">
          </div>
          <div style="margin-left: 30px;">
            <span>恭喜,合同签署成功！</span>

            <p style="margin-top: 30px;">众签已将该合同通过短信方式通知其他签署人</p>
          </div>
        </div>
      </div>

      <!-- 合同所有信息开始 -->
      <div class='contractInfo'>
        <div class='personState'>
          <div class='person'>
            <div class='stateCentral'>
              <h5 style="width:360px;"><span style="float:left;display:inline-block;" >合同信息</span></h5>
              <p style="position: absolute;display: block;margin-left: 345px;margin-top:35px;color: #fff;" @click="examine" >查看合同</p>
              <ul id='contractProduct' style="text-align: left;clear:both;margin-top:30px;width:360px; border-top: 1px solid  #fff;">
                <li >
                  <span style="display:inline-block;float: left;">合同名称：</span>
                  <span style="max-width:215px; overflow:hidden;text-overflow:ellipsis; white-space:nowrap;display:inline-block;float: left;">
                    {{contractName}}
                  </span>

                </li>
                <li style="clear: both;"><span>截止日期：</span><span>{{validTimes}}</span></li>
                <span>签署人员：</span>
                <li v-for="(item,index) in signContractUser" :key="index" style="clear: both;">
                  <el-tooltip class="item" effect="dark" :content=item.signUserName placement="left">
                    <span id='ele'>{{item.signUserName}}</span>
                  </el-tooltip>
                  <b style="color: #dd944f;" v-if="item.signStatus == 1">已签署</b>
                  <b style="color: #cc4056;" v-else>未签署</b>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
      <el-dialog title="合同详情图片" :visible.sync="prompt" custom-class="showDialogs" >    <!-- :lock-scroll= false有问题！！！！ -->
        <div v-for="(item,index) in imgList" :key="index">
          <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+item" alt="" style='width:100%;'>
        </div>
      </el-dialog>
      <div class='btns'>
        <el-button type="info" style='width:200px' @click="back">返回首页</el-button>
        <el-button type="primary" style='width:200px' @click="examineDetails">查看详情</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import "../../styles/SignSuccess/SignSuccess.css";
  @import "../../common/styles/SigningSteps.css";
</style>

<script>
  import cookie from '@/common/js/getTenant'
  import {contractimgs,signFinish} from '@/api/business'
  export default {
    data(){
      return{
        baseURL:this.baseURL.BASE_URL,
        signContractUser:[],
        validTimes:'',
        prompt:false,
        imgList:[],
        contractName:'',
        interfaceCode:sessionStorage.getItem("interfaceCode"),
        contractNo:sessionStorage.getItem("contractNo"),
        userCode:cookie.getJSON('tenant')[0].userCode,
      }
    },
    created() {


      signFinish(this.contractNo).then(res=>{

          this.signContractUser = res.data.dataList
          this.validTimes = res.data.data.validTime
          this.contractName = res.data.data.contractName

      })
    },
    methods:{
      examine() {

        this.$loading.show(); //显示
        let data =[];
        let t=Math.random();
        contractimgs(this.interfaceCode ,this.contractNo,t).then(res=> {

            for (let i = 0; i < res.data.dataList.length;i++) {
              let contractUrl = res.data.dataList[i].contractUrl
              data[i] = contractUrl
              this.$loading.hide(); //隐藏
            }
            this.imgList = data

        }).catch(error=>{

        })
        this.prompt = true
      },
      examineDetails () {
        //查看详情
        cookie.set("state", "Home");
        this.$router.push('/CompanyExa')
      },
      back(){
        this.$router.push('/Home')
      }
    }
  }
</script>
<style>
  .showDialogs .el-dialog__body{
    padding: 30px 20px;
    color: #606266;
    font-size: 14px;
    overflow-y: scroll;
    height: 700px;
  }
</style>
