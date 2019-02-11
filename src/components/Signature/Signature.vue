<template>
  <div class='infos'>
    <div>
      <div class="Tops">
        <nav class='nav'>
          <p class='logo'>
            <img src="/static/images/Top/v1.6-logo.png" alt="logo图">
          </p>
          <div class='buttons'>
            <el-button type="info" style='background:#ccc' :disabled="hasClick" @click="signCancel">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
            <el-button style='color:#4091fb' :disabled="nextBtn" @click="nextFit">下一步</el-button>
          </div>
        </nav>
      </div>

      <div class="Contents">
        <div class="step" style="width:720px;">
          <ul>
            <li class="active"><i class='el-icon-upload2'></i><b>上传文件</b></li>
            <p></p>
            <li class="active"><i class='el-icon-goods'></i><b>签署设置</b></li>
            <p></p>
            <li><i class='el-icon-edit'></i><b>指定位置</b></li>
            <p></p>
            <li><i class='el-icon-menu'></i><b>合同签署</b></li>
            <p></p>
            <li><i class='el-icon-check'></i><b>完成</b></li>
          </ul>
        </div>

        <div class="file" style="border-top: 1px solid #ddd;">
          <!--文件信息-->
          <div class="setting" style="padding-top: 15px;">
            <p class="title">文件信息</p>
            <div class="file-info" style="margin-bottom: 30px;">

              <div class="info-left">
                <p style="display: inline-flex;">
                  <b style="color: #333;font-size: 14px;margin-top:9px;">合同名称：</b>
                  <el-input v-model="input" style="width:178px;" :maxlength=50></el-input>
                  <a  @click="lookContractImg" style='padding-top:9px;cursor:pointer'>查看</a>
                  <el-upload
                    ref='upload'
                    class="upload-demo"
                    :action='urlloadUrl()'
                    :data=Type
                    :before-upload="handleChange"input
                    :on-success="fileSuccess"
                    :on-error="fileErron"
                    :show-file-list= false
                    accept='.docx,.pdf,.doc,.txt'
                  >
                    <a style='margin-top: 9px;display: block;'>更换</a>
                  </el-upload>
                </p>
              </div>

              <div class="info-right demo-input-suffix">

                <span style="color: #333;">签署截止日期：</span>
                <el-date-picker
                  style='width:138px;margin-right:20px'
                  height='height:40px'
                  v-model="date"
                  type="date"
                  :editable= false
                  :clearable= false
                  placeholder="选择日期"
                  format="yyyy-MM-dd 23:59:59"
                  value-format="yyyy-MM-dd 23:59:59"
                  @change="dateInput"
                  :picker-options="pickerOptions0"
                >
                </el-date-picker>
                <el-checkbox v-model="checked" style="margin-left: 20px;" @change='checkedBox'>永久有效</el-checkbox>

              </div>
            </div>
            <el-dialog title="合同详情图片" :visible.sync="dialogVisible" custom-class="showDialogs" >    <!-- :lock-scroll= false有问题！！！！ -->
              <div v-for="(item,index) in imgList" :key="index">
                <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+item" alt="" style='width:100%;'>
              </div>
            </el-dialog>
            <!--签署人设置-->
            <div class="sign-people">
              <p class="title">签署人设置</p>
              <div class="list-content">
                <div  class="list-body">
                  <div class="list-left" >

                    <div class="list-info" style="padding-top: 160px;">
                      <span >企业名称：</span>
                      <el-input
                        style='width:254px;height:44px;margin-left: 15px;'
                        placeholder="请输入企业名称"
                        v-model="companyName"
                        :disabled=disabled
                      >
                      </el-input>
                    </div>

                    <div class="list-info">
                      <span >邮箱：</span>
                      <el-input
                        style='width:254px;height:44px;margin-left: 15px;'
                        placeholder="请输入邮箱"
                        v-model="email"
                        :disabled=disabled
                      >
                      </el-input>
                    </div>

                    <div class="list-info">
                      <span >姓名：</span>
                      <el-input
                        style='width:254px;height:44px;margin-left: 15px;'
                        placeholder="请输入姓名"
                        v-model="username"
                        :disabled=disabled
                      >
                      </el-input>
                    </div>

                    <div class="list-info">
                      <span >手机号：</span>
                      <el-input
                        style='width:254px;height:44px;margin-left: 15px;'
                        placeholder="请输入手机号"
                        v-model="mobile"
                        :disabled=disabled
                      >
                      </el-input>
                    </div>
                    <div></div>
                  </div>
                  <div class="list-right">

                    <div class="list-info" style="padding-top: 160px;">
                      <span >企业名称：</span>
                      <el-input
                        style='width:185px;height:44px;margin-left: 15px;'
                        placeholder="请输入企业名称"
                        v-model="enterpriseName"
                        @blur="verificationen"
                        :maxlength = 50
                      >
                      </el-input>
                      <p class="authentication" v-if="prohibitt == true"></p>
                      <p class="analogue" v-else></p>
                    </div>

                    <div class="list-info">
                      <span >邮箱：</span>
                      <el-input
                        style='width:254px;height:44px;margin-left: 15px;'
                        placeholder="请输入邮箱"
                        v-model="analogueEmail"
                        :disabled=prohibit
                        :maxlength = 50
                        @blur="VaildEmail"
                      >
                      </el-input>
                    </div>

                    <div class="list-info">
                      <span >姓名：</span>
                      <el-input
                        style='width:254px;height:44px;margin-left: 15px;'
                        placeholder="请输入姓名"
                        v-model="analogueName"
                        :disabled=prohibit
                        :maxlength = 20
                      >
                      </el-input>
                    </div>

                    <div class="list-info">
                      <span >手机号：</span>
                      <el-input
                        style='width:254px;height:44px;margin-left: 15px;'
                        placeholder="请输入手机号"
                        v-model="analogueMobile"
                        :disabled=prohibit
                        :maxlength = 11
                      >
                      </el-input>
                    </div>

                    <div class="list-info">
                      <span ></span>
                      <el-button type="primary" style='width:254px;height:44px;margin-left: 15px;' icon="el-icon-plus" @click="show" v-if="add == false">
                        添加经办人
                      </el-button>
                      <el-button type="danger" style='width:254px;height:44px;margin-left: 15px;' icon="el-icon-delete" @click="show" v-else>
                        取消经办人
                      </el-button>
                    </div>

                    <div class="list-info agent" v-show="agentShow">
                      <span >经办人姓名：</span>
                      <el-input
                        style='width:254px;height:44px;margin-left: 15px;'
                        placeholder="请输入经办人姓名"
                        v-model="handleUserName"
                        :maxlength = 20
                      >
                      </el-input>
                    </div>
                    <div class="list-info agent" v-show="agentShow">
                      <span >经办人手机号：</span>
                      <el-input
                        style='width:254px;height:44px;margin-left: 15px;'
                        placeholder="请输入经办人手机号"
                        v-model="handleMobile"
                        @blur="agentMobile"
                        :maxlength = 11
                      >
                      </el-input>
                    </div>
                    <div class="list-info agent" v-show="agentShow">
                      <span >经办人邮箱：</span>
                      <el-input
                        style='width:254px;height:44px;margin-left: 15px;'
                        placeholder="请输入经办人邮箱"
                        v-model="handleEmail"
                        @blur="agentEmail"
                        :maxlength = 50
                      >
                      </el-input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Bottom></Bottom>
  </div>

</template>
<script>
  import Bottom from '@/common/components/Bottom'
  import cookie from '@/common/js/getTenant'
  import {validateMoblie,validateEmail,TrimAll} from '@/common/js/validate'
  import {echoContractSetting,contractimgs,setting,getTenantByName} from '@/api/business'
  export default {
    components: {
      Bottom
    },
    data () {
      return {
        baseURL:this.baseURL.BASE_URL,
        date:'',
        checked:true,
        nextBtn:false,
        input:sessionStorage.getItem("contractName"),
        companyName:'',
        email:'',
        username:'',
        mobile:'',
        enterpriseName:'',
        analogueEmail:'',
        analogueName:'',
        analogueMobile:'',
        handleUserName:'',
        handleMobile:'',
        handleEmail:'',
        agentShow:false,
        add:false,
        disabled:true,
        prohibit:false,
        prohibitt:false,
        signInterfaceCode:'',
        userCode:'',
        hasClick:false,
        ContractNumber:'',
        interfaceCode:cookie.getJSON('tenant')[1].interfaceCode,
        accountCode:sessionStorage.getItem('accountCode')?sessionStorage.getItem('accountCode'):'',
        contractNo:sessionStorage.getItem('contractNo'),
        operateType:'',
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        Type:{contractType:'0'},
        dialogVisible:false,
        imgList:[]
      }
    },
    methods:{
      urlloadUrl(){

        return `${this.baseURL}/restapi/wesign/v1/tenant/${this.interfaceCode}/contract/${this.contractNo}/changeContract?=accountCode=${this.accountCode}`
      },
      handleChange (name,file) {
        this.nextBtn = true;
        var max_size = 5;// 5M
        var fileNameCont = name.name.replace(/\s+/g, "")
        var reg= /[.](docx|pdf|doc|txt|DOCX|PDF|DOC|TXT)$/
        if(!reg.test(fileNameCont)){
          this.$alert('只能传pdf,doc,txt,docx格式的文件!','上传文件', {
            confirmButtonText: '确定'
          })
          this.nextBtn = false;
          return false
          this.$refs.upload.clearFiles()
          this.nextBtn = false;
          return false
        } else if( name.size > max_size*1024*1024){
          this.$alert('文件大小超过限制!','上传文件', {
            confirmButtonText: '确定'
          })
          this.nextBtn = false;
          return false
          this.$refs.upload.clearFiles()
          this.nextBtn = false;
          return false
        } else if(fileNameCont.length > 50){
          this.$alert('上传文件名称不得超过50字符！','上传文件', {
            confirmButtonText: '确定'
          })
          this.nextBtn = false;
          return false
          this.$refs.upload.clearFiles()
          this.nextBtn = false;
          return false
        } else {
          this.$loading.show(); //显示
        }

      },
      fileSuccess(name, file, fileList){ //上传文件，传参数 contractName contractNo 渲染 Contractsigning.vue
        this.nextBtn = false;
        var contractName = file.name.replace(/\s+/g, "")
        var contractNo = file.response.contractNo
        var resultCode = file.response.resultCode
        this.$loading.hide(); //隐藏
        var index1=contractName.lastIndexOf(".");
        var suffix=contractName.slice(0,index1);
        this.input = suffix
        this.$store.dispatch('fileSuccess1',{contractName:suffix,contractNo:contractNo})
        sessionStorage.setItem('contractName', suffix)
        sessionStorage.setItem('contractNo', contractNo)
        // }
      },
      fileErron(){
        this.nextBtn = false;
        this.$message({
          showClose: true,
          message: '上传失败',
          type: 'success'
        })
      },
      show() {
        this.agentShow=!this.agentShow;
        this.add =!this.add
        this.handleUserName = ''
        this.handleMobile = ''
        this.handleEmail = ''
      },
      dateInput () {
        this.checked = false
      },
      checkedBox () {
        if(this.checked == true){
          this.date = ''
        }
      },
      verificationen() {
        if(!this.enterpriseName){
          this.analogueName = ''
          this.analogueMobile = ''
          this.analogueEmail =''
          this.prohibitt = false
          return false
        }else if (((/[`~!@#$%^&*_+<>?:"{},\/;'[\]]/im).test(this.enterpriseName))||(/[·！#￥：；“”‘、，|《。》？、【】[\]]/im).test(this.enterpriseName)) {
          this.$alert('对手方企业名称不能包含非法符号!','提示', {
            confirmButtonText: '确定',

          });
          return false
        } else if(this.enterpriseName.length>50){
          this.$alert('对手方企业名称不能名称超过50位!','提示', {
            confirmButtonText: '确定',
          });
          return false
        }
       let params={
         'tenantName':this.enterpriseName
       }
       //判断对手方企业是否在微签平台已实名
        getTenantByName(params).then(res =>{

          if(res.data.resultCode == '1'){
            this.$message({
              showClose: true,
              message: '企业已实名',
              type: 'success'
            })
            this.analogueName = res.data.data.userName
            this.analogueMobile = res.data.data.mobile
            this.analogueEmail = res.data.data.email
            this.signInterfaceCode = res.data.data.interfaceCode
            this.userCode = res.data.data.userCode
            this.prohibit = true
            this.prohibitt = true
            sessionStorage.setItem('Jurisdiction',this.prohibit)
          }else{
            this.analogueName = ''
            this.analogueMobile = ''
            this.analogueEmail =''
            this.prohibit = false
            this.prohibitt = false
            this.signInterfaceCode = ''
            this.userCode =''
          }
        }).catch(error=>{

        })
      },
      agentMobile() {
        if(this.handleMobile != '' && !validateMoblie(this.handleMobile)){
          this.$alert('手机号格式错误!','添加经办人', {
            confirmButtonText: '确定'
          });
        }
      },
      VaildEmail(){
        if(TrimAll(this.analogueEmail) != "" && !validateEmail(TrimAll(this.analogueEmail))){
          this.$alert('邮箱格式错误!','提示', {
            confirmButtonText: '确定'
          });
        }
      },
      agentEmail() {
        if(TrimAll(this.handleEmail) != '' && !validateEmail(TrimAll(this.handleEmail))){
          this.$alert('邮箱格式错误!','添加经办人', {
            confirmButtonText: '确定'
          });
        }
      },
      signCancel() {    //取消操作
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
                this.$store.dispatch('tabIndex',{tabIndex:0});  //导航高亮
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
      nextFit() {

        if(TrimAll(this.input) == ''){
          this.$alert('您还没有填写合同名称!','签署', {
            confirmButtonText: '确定'
          });
          return false
        }
        if( this.checked == false && this.date == ''|| this.checked == false && this.date == null){
          this.$alert('您还没有选择签署时间!','签署时间', {
            confirmButtonText: '确定'
          });
          return false
        }
        if(!this.enterpriseName){
          this.$alert('您还没有添加对手方企业!','添加对手方', {
            confirmButtonText: '确定'
          });
          return false
        }else if (((/[`~!@#$%^&*_+<>?:"{},\/;'[\]]/im).test(this.enterpriseName))||(/[·！#￥：；“”‘、，|《。》？、【】[\]]/im).test(this.enterpriseName)) {
          this.$alert('对手方企业名称不能包含非法字符!','提示', {
            confirmButtonText: '确定',
          });
          return false
        } else if(this.enterpriseName.length>50){
          this.$alert('对手方企业名称不能名称超过50位!','提示', {
            confirmButtonText: '确定',
          });
          return false
        }
        if(TrimAll(this.analogueEmail) == ''){
          this.$alert('您还没有添加对手方邮箱!','添加对手方', {
            confirmButtonText: '确定'
          });
          return false
        } else if(TrimAll(this.analogueEmail) != '' && !validateEmail(TrimAll(this.analogueEmail))){
          this.$alert('对手方邮箱格式错误!','添加对手方', {
            confirmButtonText: '确定'
          });
          return false
        }
        if(TrimAll(this.analogueName) == ''){
          this.$alert('您还没有添加对手方姓名!','添加对手方', {
            confirmButtonText: '确定'
          });
          return false
        }
        if(!this.analogueMobile){
          this.$alert('您还没有添加对手方手机号!','添加对手方', {
            confirmButtonText: '确定'
          });
          return false
        } else if(this.analogueMobile != '' && !validateMoblie(this.analogueMobile)){
          this.$alert('对手方手机号格式错误!','添加对手方', {
            confirmButtonText: '确定'
          });
          return false
        }
        if(this.handleUserName != '' && this.handleMobile == '' && TrimAll(this.handleEmail) == ''||this.handleUserName != '' && this.handleMobile == '' && TrimAll(this.handleEmail) != ''||this.handleUserName != '' && this.handleMobile != '' && TrimAll(this.handleEmail) == ''){
          this.$alert('您还没有完成添加经办人!','添加经办人', {
            confirmButtonText: '确定'
          });
          return false
        }
        if(this.handleUserName == '' && this.handleMobile != '' && TrimAll(this.handleEmail) != ''||this.handleUserName == '' && this.handleMobile == '' && TrimAll(this.handleEmail) != ''||this.handleUserName == '' && this.handleMobile != '' && TrimAll(this.handleEmail) == ''){
          this.$alert('您还没有完成添加经办人!','添加经办人', {
            confirmButtonText: '确定'
          });
          return false
        }
        if(this.handleMobile != '' && !validateMoblie(this.handleMobile)){
          this.$alert('手机号格式错误!','添加经办人', {
            confirmButtonText: '确定'
          });
          return false
        }
        if(TrimAll(this.handleEmail) != '' && !validateEmail(TrimAll(this.handleEmail))){
          this.$alert('邮箱格式错误!','添加经办人', {
            confirmButtonText: '确定'
          });
          return false
        }
        var interfaceCode = cookie.getJSON('tenant')[1].interfaceCode;
        var contractNo = sessionStorage.getItem('contractNo');
        var perpetualValid = ''
        if(this.checked == true){
          perpetualValid = '1'
        } else{
          perpetualValid = '0'
        }
        if(this.ContractNumber != contractNo){
          this.operateType = ''
        }
      let param={
        accountCode:sessionStorage.getItem('accountCode'),
        operateType:this.operateType, //操作类型(回显)
        signInterfaceCode:this.signInterfaceCode, //签署企业编号
        signTenantName:this.enterpriseName, //对手方企业名称
        tenantName:this.companyName, //签署企业名称
        userCode:this.userCode, //签署企业授权人编号
        userName:TrimAll(this.analogueName), //签署企业授权人名称
        mobile:this.analogueMobile, //授权人手机号（对手方）
        tenantMobile:this.mobile,   //发起方手机号
        email:TrimAll(this.analogueEmail), //授权人邮箱
        handleUserName:this.handleUserName,//经办人姓名
        handleMobile:this.handleMobile,//经办人手机号
        handleEmail:TrimAll(this.handleEmail),//经办人邮箱
        contractName:TrimAll(this.input), //合同名称
        perpetualValid:perpetualValid,//合同签署有效时间类型 0：非永久有效；1：永久有效
        validTime:this.date //签署截止时间
      }
        // 对手方企业信息设置
        setting(this.interfaceCode,this.contractNo,param).then(res =>{
          if(res.data.resultCode == '1'){
            sessionStorage.setItem('contractName', TrimAll(this.input))
            this.$router.push('/Place')
          }else if(res.data.resultCode == '-1'){
            this.$alert(res.data.resultMessage,'提示', {
              confirmButtonText: '确定'
            })
          }else{
            this.$message({
              showClose: true,
              message: res.data.resultMessage,
              type: 'warning'
            })
          }
        }).catch(error=>{

        })
      },
      lookContractImg (){
        this.imgList=[];
        this.$loading.show(); //显示
        let data =[];

        //合同图片查看

        contractimgs(this.interfaceCode ,this.contractNo).then(res=> {

          for (let i = 0; i < res.data.dataList.length;i++) {
            let contractUrl = res.data.dataList[i].contractUrl
            data[i] = contractUrl
            this.$loading.hide(); //隐藏
          }
          this.imgList = data

        }).catch(error=>{

        })
        this.dialogVisible = true
      },
    },
    created() {

      let type = sessionStorage.getItem('type');
      this.operateType = sessionStorage.getItem('type');
      this.companyName = cookie.getJSON('tenant')[1].companyName;
      this.username = cookie.getJSON('tenant')[0].userName;
      this.mobile = cookie.getJSON('tenant')[0].mobile;
      this.email = cookie.getJSON('tenant')[1].email;
      if(type == 'back'){
        let Jurisdiction = sessionStorage.getItem('Jurisdiction');
        //页面回退  数据回显
        echoContractSetting(this.interfaceCode,this.contractNo).then(res=> {
          this.input = res.data.data.contractName;
          this.date = res.data.data.validTime
          if(res.data.data.perpetualValid == 1){

            this.checked = true
          } else {
            this.checked = false
          }

          if(res.data.dataList[0].accountStatus ==1&& Jurisdiction == true){

            this.prohibit = true
            this.prohibitt = true
          }

          this.enterpriseName = res.data.dataList[0].signUserName
          this.analogueName = res.data.dataList[0].userName
          this.analogueMobile = res.data.dataList[0].mobile
          this.analogueEmail = res.data.dataList[0].email
          this.signInterfaceCode = res.data.dataList[0].interfaceCode
          this.userCode = res.data.dataList[0].userCode

          if(res.data.dataList[1] != '' && res.data.dataList[1] != null){
            this.agentShow=!this.agentShow;
            this.add =!this.add
            this.handleUserName = res.data.dataList[1].agentName
            this.handleMobile = res.data.dataList[1].agentMobile
            this.handleEmail = res.data.dataList[1].agentEmail
          }
        }).catch(error=>{

        })
      }
    }
  }
</script>
<style scoped>
  @import "../../styles/Signature/Signature.css";
  @import "../../common/styles/Tops.css";
  @import "../../common/styles/SigningSteps.css";
  .Contents .file .setting .title{
    display: block;
    height: 65px;
    margin: 20px 0 0 15px;
    line-height: 46px;
    padding-left: 40px;
    color: #fff;
    font-size: 20px;
    padding-top: 0 !important;
    border-top: none !important;
    background: url("/static/images/Common/title.png") no-repeat;
  }
</style>
<style>
  .contract-info{
    box-sizing: border-box !important;
    height:700px !important;
    overflow-y: scroll !important;
  }
</style>
