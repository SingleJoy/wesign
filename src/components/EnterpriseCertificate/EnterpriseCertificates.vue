<template>
    <div class="main">
        <div class="companyCertificate">
            <div class="step">
                <ul>
                    <li class="active"><i class='el-icon-edit'></i><b>企业认证</b></li>
                    <p></p>
                    <li><i class='el-icon-menu'></i><b>打款验证</b></li>
                    <p></p>
                    <li><i class='el-icon-check'></i><b>完成</b></li>
                </ul>
            </div>
            <div class="line"></div>
            <!-- 查看示例 -->
            <el-dialog
                :visible.sync="licenseExample"
                width="500px"
              >
                <img src="../../../static/images/case.png" alt="" style="width:100%;height:100%;">
            </el-dialog>
             <el-dialog
                :visible.sync="frontIdExample"
                width="500px"
              >
                <img src="../../../static/images/case.png" alt="" style="width:100%;height:100%;">
            </el-dialog>
             <el-dialog
                :visible.sync="backIdExample"
                width="500px"
              >
                <img src="../../../static/images/case.png" alt="" style="width:100%;height:100%;">
            </el-dialog>
            <div class="certification-content">
                <div class="company-info">
                    <div class="title-bg">
                        <span class="title-name">企业信息</span>
                    </div>
                    <div class="content-bg">
                            <div class="content-box">
                                <div class="content-title">
                                    <span class="vertical-line"></span>
                                    <span class="little-name">营业执照副本</span>
                                </div>
                                <div class="content-body">
                                    <p class="view-example" style="width:330px;" @click="viewExample('license')">查看示例</p>
                                    <div class="business-license">
                                        <el-upload
                                            ref='upload1'
                                            class="upload-license"
                                            :action='uploadLicenseUrl()'
                                            :before-upload="beforeUpload"
                                            :on-success="handIdSuccess"
                                            :show-file-list=false
                                            >
                                            <img v-if="license.src" :src="license.src" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                    </div>
                                    <div class="upload_warp_text">
                                        共{{bytesToSize(this.licenseSize)}}
                                    </div>

                                </div>
                                <p class="upload-tip" :v-if="licenseStatus==false">温馨提示：上传单张图片大小应小于5M,可支持JPEG、JPG、PNG格式</p>
                                <p class="upload-tip" v-if="licenseStatus"> <span class="el-icon-warning" style="margin-right:20px;"></span>以下信息为系统自动识别信息，若与贵公司实际信息不符，请重新拍照后上传</p>
                                <div class="company-input" v-if="licenseInputShow">
                                    <div class="input-item">
                                        <span class="input-title">企业名称</span>
                                        <el-input
                                            style='width:336px'
                                            placeholder="请输入内容"
                                            v-model="licenseForm.tenantName"
                                            @blur='enterpriseName'
                                            :disabled= licenseStatus
                                        >
                                        </el-input>
                                    </div>
                                     <div class="input-item">
                                        <span class="input-title">统一社会信用代码</span>
                                        <el-input
                                            style='width:336px'
                                            placeholder="请输入内容"
                                            v-model="licenseForm.creditCode"
                                            @blur='enterpriseName'
                                            :disabled= licenseStatus
                                        >
                                        </el-input>
                                    </div>
                                     <div class="input-item">
                                        <span class="input-title">法人/企业负责人姓名</span>
                                        <el-input
                                            style='width:336px;'
                                            placeholder="请输入内容"
                                            v-model="licenseForm.legalPerson"
                                            @blur='enterpriseName'
                                            :disabled= licenseStatus
                                        >
                                        </el-input>
                                    </div>
                                </div>

                            </div>
                    </div>
                </div>
                <div class="admin-info">
                     <div class="title-bg">
                        <span class="title-name">管理员信息</span>
                    </div>
                    <div class="admin-type">
                        <el-radio-group @change="changeAuthorType" v-model="adminType">
                            <el-radio  label='0' style='float:left;padding-top:5px;'>法人本人</el-radio>
                            <el-radio  label='1' style='float:left;padding-top:5px;'>被授权人</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="content-bg">
                             <div class="content-box">
                                <div class="content-title">
                                    <span class="vertical-line"></span>
                                    <span class="little-name">证件照片</span>
                                </div>
                                <div class="content-body">
									<div class="card-id">
                                        <!-- 身份证正面 -->
										<div class='card-left'>
                                            <el-upload
                                                v-if="!IdFrontImg"
                                                ref='upload2'
                                                class="upload-cardID"
                                                :action='uploadIDUrl("front")'
                                                :before-upload="beforeUpload"
                                                :on-success="handIdFrontSuccess"
                                                :show-file-list=false
                                                >
                                                <div class="upload_warp"></div>
                                            </el-upload>
                                             <div class="img_warp"  v-if="IdFrontImg">
                                                    <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+IdFrontImg"  class="avatar">
                                                </div>
											<div class="upload_warp_text">
												共&nbsp;{{bytesToSize(this.IdCardFrontSize)}}
											</div>
                                            <p class="view-example" style="text-align:center" @click="viewExample('frontId')">查看示例</p>
										</div>
                                        <!-- 身份证反面 -->
										<div class='card-right'>
											  <el-upload
                                                v-if="!IdBackImg"
                                                ref='upload2'
                                                class="upload-cardID"
                                                :action='uploadIDUrl("back")'
                                                :before-upload="beforeUpload"
                                                :on-success="handIdBackSuccess"
                                                :show-file-list=false
                                                >
                                                <div class="upload_warp"></div>
                                            </el-upload>
                                            <div class="img_warp"  v-if="IdBackImg">
                                                     <img id="IdBackImg" :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+IdBackImg" class="avatar">
                                            </div>
											<div class="upload_warp_text">
												共&nbsp;{{bytesToSize(this.IdCardBackSize)}}
											</div>
                                            <p class="view-example" style="text-align:center"  @click="viewExample('backId')">查看示例</p>
										</div>
									</div>

                                </div>
								<p class="upload-tip">温馨提示：上传单张图片大小应小于5M,可支持JPEG、JPG、PNG格式</p>

                                 <div class="company-input" v-if="!IdBackImg">
                                  
                                    <div class="input-item">
                                        <span class="input-title">法人姓名</span>
                                        <el-input
                                            style='width:336px'
                                            placeholder=""
                                            v-model="IdInfo.userName"
                                            @blur='validateIdInfo'
                                            :disabled= IdDisabled
                                        >
                                        </el-input>
                                    </div>
                                     <div class="input-item">
                                        <span class="input-title">身份证号</span>
                                        <el-input
                                            style='width:336px'
                                            placeholder=""
                                            v-model="IdInfo.idcard"
                                            @blur='validateIdInfo'
                                            :disabled= IdDisabled
                                        >
                                        </el-input>
                                    </div>
                                    <div class="input-item">
                                        <span class="input-title">手机号</span>
                                        <el-input
                                            style='width:336px;'
                                            placeholder=""
                                            v-model="IdInfo.mobile"
                                            @blur='validateIdInfo("mobile")'
                                            :disabled = idMobile 
                                        >
                                        </el-input>
                                        <span v-if="mobileTip" class="validate-tip">{{mobileTipText}}</span>
                                    </div>
                                    <div class="input-item">
                                        <span class="input-title">验证码</span>
                                        <el-input 
                                            style='width:230px;'
                                            placeholder=""
                                            v-model="IdInfo.smsCode"
                                            @blur='validateIdInfo("smsCode")'
                                            :disabled= fullName
                                        >
                                        </el-input>
                                        <span>
                                             <el-button type="primary" style='width:100px;padding:12px 10px;' id='code' :disabled="smsSend" @click="getSmsCode">{{smsCodeText}}</el-button>
                                        </span>
                                    </div>
                                    <div class="input-item" style="margin-left: 303px; font-size:14px;">
                                        <el-checkbox v-model="checked" @click="confirmSignFile()"></el-checkbox>
                                        <span style="color:#333;cursor: pointer;">确认签署</span>
                                        <span v-if="authorizerType" style="color: #409eff;cursor: pointer;">《一般企业认证授权书》</span>
                                        <span v-else style="color: #409eff;cursor: pointer;">《法人说明函》</span>
                                    </div>
                                    <p class="attorney-text">该授权书/说明函仅作为个人与企业关系证明；将会在对公账户打款成功后生效</p>
                                </div>
                            </div>
                    </div>
                </div>
                <div class="public-account-info">
                    <div class="title-bg">
                        <span class="title-name">对公账户信息</span>
                    </div>
                    <div class="content-box">
                        <div class="company-input">

                            <el-form :model="companyForm" :companyRules="companyRules" ref="companyInfo">
                                <el-form-item  label="企业名称" prop="tenantName" label-width="473px">
                                    <el-input disabled v-model="companyForm.tenantName"></el-input>
                                </el-form-item>
                                <el-form-item label="企业银行账号" prop="bankNum" label-width="473px">
                                    <el-input v-model="companyForm.bankNum"></el-input>
                                </el-form-item>
                                <el-form-item  label="银行名称"  prop="bankName" label-width="473px">
                                    <el-input v-model="companyForm.bankName"></el-input>
                                </el-form-item>
                                <el-form-item label="开户行所在省／市"  prop="bankName" label-width="473px">
                                    <el-cascader
                                        :options="options"
                                        v-model="selectedOptions"
                                        @change="handleCityChange">
                                    </el-cascader>
                                </el-form-item>
                                <el-form-item  label="开户行支行名称"  prop="bank" label-width="473px">
                                    <el-input v-model="companyForm.bank"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>

                <div class="submit-btn">
                     <el-button type="" style='width:280px' @click="cancelIDcard">取&nbsp;&nbsp;消</el-button>
                     <el-button type="primary" style='width:280px' @click="submitIDcard">提&nbsp;&nbsp;交</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import server from "@/api/certificationUrl";
import {validateMoblie,validatePassWord} from '../../common/js/validate.js'
export default {
    name:'',
    data() {
        var checkName= (rule,value,callback)=>{
            if(value==''){
                callback(new Error('请输入企业名称'))
            }
        }
        var checkBankNum = (rule,value,callback)=>{
             if(value==''){
                callback(new Error('请输入企业银行账号'))
            }
        }
        var checkBankName = (rule,value,callback)=>{
             if(value==''){
                callback(new Error('请输入企业银行名称'))
            }
        }
        var checkCity =  (rule,value,callback)=>{
             if(value==''){
                callback(new Error('请选择所在省市'))
            }
        }
        var checkBank =  (rule,value,callback)=>{
             if(value==''){
                callback(new Error('请输入开户行行名称'))
            }
        }
        return {
            baseURL:this.baseURL.BASE_URL,
            interfaceCode:'',
            license:{
                src:null
            },
            licenseSize:0,             //营业执照大小
            licenseInfoEdit:false,   //营业执照信息
            licenseInputShow:false,
            licenseStatus:true,        //营业执照上传状态是否正确
            licenseForm:{              //企业信息
                tenantName:'naem',
                creditCode:'23432432432',
                legalPerson:'ewre',
            },
            licenseExample:false,
            frontIdExample:false,
            backIdExample:false,
            IdInfo:{
                idcard:'',
                userName:'',
                mobile:'',
                smsCode:'',
                smsNo:'',
                resultMobile:''
            },
            IdDisabled:true,
            IdFrontImg:'',           //正面img
            IdBackImg:'',             //反面img
            IdCardFrontSize:0,     //身份证正面
            IdCardBackSize:0,      //身份证反面
            authorizerType:0,     //管理员了类型
            adminType:'0',
            frontPhoto:'',        //正面照地址
            backPhoto:"",         //反面照地址
            idMobile:true,
            checked:false,
            companyStatus:true,
            companyForm:{
                tenantName:'',
                bankNum:'',
                bankName:'',
                city:'',
                bank:''

            },
            companyRules:{
                tenantName: [
                    { validator: checkName, trigger: 'blur' }
                ],
                bankNum:[
                    { validator: checkBankNum, trigger: 'blur' }
                ],
                bankName: [
                    { validator: checkBankName, trigger: 'blur' }
                ],
                city:[
                    { validator:checkCity, trigger: 'blur' }
                ],
                bank:[
                    { validator:checkBank, trigger: 'blur' }
                ]
            },

            fullName:false,

            //管理员信息(身份证正反面)
            IDcardFront:{
                src:''
            },
            IDcardSide:{
                src:''
            },


            mobileTip:false,
            mobileTipText:'',
            smsCodeText:'获取验证码',
            smsSend:false,
            selectedOptions:[],
            options:[{
                value: 'notice',
                label: 'Notice',
                children: [{
                    value: 'alert',
                    label: 'Alert 警告'
                }, {
                    value: 'loading',
                    label: 'Loading 加载'
                }, {
                    value: 'message',
                    label: 'Message 消息提示'
                }, {
                    value: 'message-box',
                    label: 'MessageBox 弹框'
                }, {
                    value: 'notification',
                    label: 'Notification 通知'
                }]
            }],
            option:[{

            }]

        }
    },
    methods:{

        //查看示例
        viewExample(type){
            if(type == 'license'){
                this.licenseExample = true;
            }else if(type=='frontId'){
                this.frontIdExample = true;
            }else{
                this.backIdExample = true;
            }
            
        },
        //输入验证
        enterpriseName(){

        }, 
        //身份证信息校验
        validateIdInfo(type){
            console.log(2323)
            if(type == 'mobile'){
                if(this.IdInfo.mobile == ''){
                    this.mobileTip = true;
                    this.mobileTipText="请输入手机号"
                    return false
                }else if(!validateMoblie(this.IdInfo.mobile) ){
                    this.mobileTip = true;
                    this.mobileTipText="手机号输入不正确"
                    return false
                }else{
                     this.mobileTip = false;
                     this.valiteMobile()
                     return true
                }
            }
        },
        //验证手机号
        valiteMobile(){
            let param={
                userName:this.IdInfo.mobile
            }
            server.valiteMobile(param).then(res=>{
                if(res.data.resultCode==0){

                }else{

                }
            }).catch(error=>{

            })
        },
       
        //获取验证码
        getSmsCode(){
           if(!this.validateIdInfo("mobile")){
               return 
           }
            var codeType = '0'
            var InterValObj = 60
            var count = 60
            var curCount = count
            var timer = null
            let params = {
                userName:this.IdInfo.mobile,
                sendType:codeType
            }
            let that = this;
            server.smsCode(params).then(res=>{
                var appId = res.data.appId
                that.appId = appId
                var resultCode = res.data.resultCode
                var smsNo = res.data.smsNo
                that.IdInfo.resultMobile = res.data.mobile     //发送验证码后返回的手机号
                if (resultCode == '0') {
                    that.smsCodeText = curCount + '秒'
                    that.IdInfo.smsNo = smsNo
                    that.smsSend = true;
                    timer = setInterval(function () {
                        that.smsCodeText =  (curCount - 1) + '秒'
                        if (curCount === 0) {
                            that.smsCodeText  = '获取验证码'
                             that.smsSend = false;
                            clearInterval(timer)
                        } else {
                            curCount--
                        }
                    }, 1000)
                }else{
                    that.$message({
                        message: res.data.resultMessage,
                        type: 'warning'
                    })
                }
            }).catch(error=>{

            })
       
        },
        //确认签署函
        confirmSignFile(){
         this.checked = !this.checked;
        },
        //授权人类型
        changeAuthorType(){
            if(!this.authorizerType){
                this.authorizerType = 1
            }else{
                this.authorizerType = 0
            }
        },
        //营业执照上传路径
        uploadLicenseUrl(){
             return `${this.baseURL}/restapi/wesign/v1.6/tenant/creditPhotoOcr`
        },
        //身份证上传路径
        uploadIDUrl(type){
            if(type=='front'){
              return `${this.baseURL}/restapi/wesign/v1.6/user/frontPhotoOcr`
            }else{
                return `${this.baseURL}/restapi/wesign/v1.6/user/backPhoto`
            }
        },
        //上传前的校验
        beforeUpload(file){
             this.IdCardFrontSize = 1024*1024
            var max_size = 5; // 5M
            var reg= /[.](png|PNG|jpg|JPG|jpeg|JPEG)$/
            var index = file.name.lastIndexOf('.')
            if(!reg.test(file.name.slice(index))) {
                this.$alert('图片格式不正确!','上传', {
                    confirmButtonText: '确定'
                });
                return false
            }else if(file.size > max_size*1024*1024){
                this.$alert('图片大小超过限制！','上传', {
                    confirmButtonText: '确定'
                });
                return false
            } else {

            }

        },
        //营业执照上传成功
        handIdSuccess(){
            this.licenseInputShow = true;
        },

        //身份证正面上传成功
        handIdFrontSuccess(name, file, fileList){
             if(name.data.resultCode == 1){
             this.IdFrontImg = name.data.frontPhoto;
                this.$message({
                    showClose: true,
                    message: '上传成功',
                    type: 'success'
                })
             }else{
                  this.$message({
                    showClose: true,
                    message: name.data.resultMessage,
                    type: 'error'
                })
             }
        },
        
        //背面上传成功
        handIdBackSuccess(name, file, fileList){
            if(name.data.resultCode == 1){
            this.IdBackImg = name.data.backPhoto;
                this.$message({
                    showClose: true,
                    message: '上传成功',
                    type: 'error'
                })
             }else{
                  this.$message({
                    showClose: true,
                    message: name.data.resultMessage,
                    type: 'error'
                })
             }
        },
        //选择城市
        handleCityChange(){
            
        },
       
        
      
        bytesToSize(bytes) {
            if (bytes === 0) return '0 B';
            let k = 1024,
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
            return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
        },

        imageClick(){

        },


        //取消
        cancelIDcard(){

        },
        //提交
        submitIDcard(){
            this.subIdInfo()
        },

        subIdInfo(){
            let params={
                userName:this.IdInfo.userName,
                idCard:this.IdInfo.idcard,
                mobile:this.IdInfo.mobile,
                interfaceCode:this.interfaceCode,
                authorizerType:this.authorizerType,
                frontPhoto:this.frontPhoto,
                backPhoto:this.backPhoto   
            }
            server.IdCard(params).then(res=>{

            }).catch(error=>{

            })
        }


    }
}
</script>
<style lang="scss" scoped>
    @import "../../common/styles/content.scss";
    @import "../../styles/CompanyCertificate/CompanyCertificate.scss";

</style>


