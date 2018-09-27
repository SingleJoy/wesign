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
             <el-dialog
                :visible.sync="synopsis"
                width="500px"
              >
                <img src="../../../static/images/case.png" alt="" style="width:100%;height:100%;">
            </el-dialog>
             <el-dialog
                :visible.sync="attorney"
                width="500px"
              >
                <img src="../../../static/images/case.png" alt="" style="width:100%;height:100%;">
            </el-dialog>
            <div class="certification-content">
                <div class="company-info">
                    <div class="title-bg">
                        <span class="title-name">企业信息</span>
                    </div>
                    <p  v-if="!licenseStatus" class="el-icon-warning  result-warning">企业信息审核未通过，请上传真实有效的企业信息</p>
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
                                            :on-change="fileChange"
                                            >
                                             <div class="license-wrap">
                                                <img  v-if="licenseInfo.creditPhoto" :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+licenseInfo.creditPhoto" class="avatar">
                                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                            </div>
                                           
                                        </el-upload>
                                    </div>
                                    <div class="upload_warp_text">
                                        共{{bytesToSize(this.licenseSize)}}
                                    </div>

                                </div>
                                <p class="upload-tip" :v-if="!licenseInputShow">温馨提示：上传单张图片大小应小于5M,可支持JPEG、JPG、PNG格式</p>
                                <p class="upload-tip" v-if="licenseInputShow"> <span class="el-icon-warning" style="margin-right:20px;"></span>以下信息为系统自动识别信息，若与贵公司实际信息不符，请重新拍照后上传</p>
                                <div class="company-input" v-if="licenseInputShow">
                                    <div class="input-item">
                                        <span class="input-title">企业名称</span>
                                        <el-input
                                            style='width:336px'
                                            placeholder="请输入内容"
                                            v-model="licenseInfo.tenantName"
                                            @blur='enterpriseName'
                                            :disabled= true
                                        >
                                        </el-input>
                                    </div>
                                     <div class="input-item">
                                        <span class="input-title">统一社会信用代码</span>
                                        <el-input
                                            style='width:336px'
                                            placeholder="请输入内容"
                                            v-model="licenseInfo.creditCode"
                                            @blur='enterpriseName'
                                            :disabled= true
                                        >
                                        </el-input>
                                    </div>
                                     <div class="input-item">
                                        <span class="input-title">法人/企业负责人姓名</span>
                                        <el-input
                                            style='width:336px;'
                                            placeholder="请输入内容"
                                            v-model="licenseInfo.legalPerson"
                                            @blur='enterpriseName'
                                            :disabled= true
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
                    <p  v-if="!IdStatus" class="el-icon-warning  result-warning">个人信息审核未通过，请上传真实有效的个人信息</p>
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
                                                ref='upload2'
                                                class="upload-cardID"
                                                :action='uploadIDUrl("front")'
                                                :before-upload="beforeUpload"
                                                :on-success="handIdFrontSuccess"
                                                :show-file-list=false
                                                >
                                                <div class="upload_warp">
                                                    <img  v-if="IdInfo.frontPhoto" :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+IdInfo.frontPhoto" class="avatar">
                                                    <img v-else src="../../../static/images/Credentials/Personal/Pupload/left-card.png" alt="">
                                                </div>
                                            </el-upload>
											<div class="upload_warp_text">
												共&nbsp;{{bytesToSize(this.IdCardFrontSize)}}
											</div>
                                            <p class="view-example" style="text-align:center" @click="viewExample('frontId')">查看示例</p>
										</div>
                                        <!-- 身份证反面 -->
										<div class='card-right'>
											  <el-upload
                                                ref='upload2'
                                                class="upload-cardID"
                                                :action='uploadIDUrl("back")'
                                                :before-upload="beforeUpload"
                                                :on-success="handIdBackSuccess"
                                                :show-file-list=false
                                                >
                                                <div class="upload_warp">
                                                    <img  v-if="IdInfo.backPhoto" :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+IdInfo.backPhoto" class="avatar">
                                                    <img v-else src="../../../static/images/Credentials/Personal/Pupload/right-card.png" alt="">
                                                </div>
                                            </el-upload>
											<div class="upload_warp_text">
												共&nbsp;{{bytesToSize(this.IdCardBackSize)}}
											</div>
                                            <p class="view-example" style="text-align:center"  @click="viewExample('backId')">查看示例</p>
										</div>
									</div>

                                </div>
								<p class="upload-tip">温馨提示：上传单张图片大小应小于5M,可支持JPEG、JPG、PNG格式</p>

                                 <div class="company-input" v-if="IdInfoShow">
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
                                            :disabled = authorizerType
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
                                        <span v-if="smsTip" class="validate-tip">{{smsTipText}}</span>
                                    </div>
                                    <div class="input-item" style="margin-left: 303px; font-size:14px;">
                                        <el-checkbox v-model="checked" @click="confirmSignFile()"></el-checkbox>
                                        <span style="color:#333;cursor: pointer;">确认签署</span>
                                        <span v-if="authorizerType" style="color: #409eff;cursor: pointer;" @click="viewExample('synopsis')">《一般企业认证授权书》</span>
                                        <span v-else style="color: #409eff;cursor: pointer;" @click="viewExample('attorney')">《法人说明函》</span>
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
                         <p  v-if="!bankStatus"  class="el-icon-warning  result-warning">对公账户打款失败，请核实对公账户信息后重新提交</p>
                        <div class="company-input">
                            <el-form :model="bankInfo" :rules="bankRules" ref="bankInfo">
                                <el-form-item  label="企业名称" prop="to_acc_name" label-width="473px">
                                    <el-input disabled v-model="bankInfo.to_acc_name"></el-input>
                                </el-form-item>
                                <el-form-item label="企业银行账号" prop="to_acc_no" label-width="473px">
                                    <el-input v-model="bankInfo.to_acc_no"></el-input>
                                </el-form-item>
                                <el-form-item  label="银行名称"  prop="to_bank_name" label-width="473px">
                                    <el-input v-model="bankInfo.to_bank_name"></el-input>
                                </el-form-item>
                                <el-form-item label="开户行所在省／市"  prop="selectedOptions" label-width="473px">
                                    <el-cascader
                                        :options="options"
                                        v-model="selectedOptions"
                                        @change="handleCityChange">
                                    </el-cascader>
                                </el-form-item>
                                <el-form-item  label="开户行支行名称"  prop="to_acc_dept" label-width="473px">
                                    <el-input v-model="bankInfo.to_acc_dept"></el-input>
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
import {validateMoblie,validatePassWord,validateBank,TrimAll} from '../../common/js/validate.js'
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
            }else if(!validateBank(TrimAll(value))){
                callback(new Error('银行账号输入不正确'))
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
            interfaceCode:'1',
            licenseSize:0,             //营业执照大小
            licenseInfoEdit:false,   //营业执照信息
            licenseInputShow:false,
            IdInfoShow:false,
            licenseInfo:{              //企业信息
                tenantName:'naem',
                creditCode:'23432432432',
                creditPhoto:'',
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
                appId:'',
                resultMobile:'',
                frontPhoto:'',  //正面照地址
                backPhoto:''   //反面照地址
            },
            IdDisabled:true,
            IdFrontImg:'',           //正面img
            IdBackImg:'',             //反面img
            IdCardFrontSize:0,     //身份证正面
            IdCardBackSize:0,      //身份证反面
            authorizerType:false,     //管理员了类型  false:0 法人/true:1 授权人
            adminType:'0',
            idMobile:true,
            checked:false,
            bankInfo:{
                to_acc_name:"王宁测试公司",      //企业名称
                to_acc_no:"",         //收款账号
                to_bank_name:"",       //银行名称
                to_pro_name:"",        //开户行省名
                to_city_name:"",        //开户行市名
                to_acc_dept:"",          //支行名称
            },
            bankRules:{
                to_acc_name: [
                    {validator: checkName, trigger: 'blur' }
                ],
                to_acc_no:[
                    {validator: checkBankNum, trigger: 'blur' }
                ],
                to_bank_name: [
                    { validator: checkBankName, trigger: 'blur' }
                ],
                selectedOptions:[
                    {validator:checkCity, trigger: 'blur' }
                ],
                to_acc_dept:[
                    { validator:checkBank, trigger: 'blur' }
                ]
            },
            selectedOptions:[],

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
            smsTip:false,
            smsCodeText:'获取验证码',
            smsTipText:'',
            smsSend:false,
            synopsis:false,
            attorney:false,
            licenseStatus:true,        //营业执照认证状态
            IdStatus:true,        //管理员信息认证状态
            bankStatus:true,   //企业信息认证状态
            count:0,           //请求计数
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

        }
    },
    created(){
        let param={

        }
        let interfaceCode = this.interfaceCode;
        let licenseInfo = this.licenseInfo;
        let bankInfo = this.bankInfo;
        let IdInfo = this.IdInfo;
        return
        server.companyInfoDetail(param,interfaceCode).then(res=>{
            if(res.data.resultCode==1){
                let data = res.data;
                licenseInfo.tenantName = data.tenantName
                licenseInfo.creditCode = data.creditCode
                licenseInfo.creditPhoto = data.creditPhoto
                licenseInfo.legalPerson = data.legalPerson
                this.licenseInputShow = true;

                IdInfo.idcard = data.idcard
                IdInfo.userName = data.userName
                IdInfo.mobile = data.mobile
                IdInfo.frontPhoto = data.frontPhoto
                IdInfo.backPhoto = data.backPhoto
                IdInfo.adminType = data.authorizerType
                this.smsSend = true;
                this.IdInfoShow = true;

                bankInfo.to_acc_name = data.to_acc_name
                bankInfo.to_acc_no = data.to_acc_no
                bankInfo.to_bank_name = data.to_bank_name
                bankInfo.to_pro_name = data.to_pro_name
                bankInfo.to_city_name = data.to_city_name
                bankInfo.to_acc_dept = data.to_acc_dept

            }
        }).catch(error=>{

        })

    },
    methods:{

        //查看示例
        viewExample(type){
            if(type == 'license'){
                this.licenseExample = true;
            }else if(type=='frontId'){
                this.frontIdExample = true;
            }else if(type=='backId'){
                this.backIdExample = true;
            }else if(type=='synopsis'){
                 this.synopsis = true;
            }else{
                this.attorney = true;
            }

        },
        //输入验证
        enterpriseName(){

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

        fileChange(file){
            console.log(file)
        },
        beforeUpload(file){
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
        handIdSuccess(name, file, fileList){
            if(name.resultCode == 1){
                this.licenseInputShow = true;
                this.licenseSize = file.size;
                this.licenseInfo.tenantName = name.data.tenantName;
                this.licenseInfo.creditCode = name.data.creditCode;
                this.licenseInfo.creditPhoto = name.data.creditPhoto;
                this.licenseInfo.legalPerson = name.data.legalPerson;
                this.bankInfo.to_acc_name = name.data.tenantName;
                this.$message({
                    showClose: true,
                    message: '上传成功',
                    type: 'success'
                })
            }else{
                 this.IdInfoShow = false;
                  this.$message({
                    showClose: true,
                    message: "上传失败",
                    type: 'error'
                })
            }
            
        },

        //身份证正面上传成功
        handIdFrontSuccess(name, file, fileList){
            if(name.resultCode == 1){
                this.IdCardFrontSize = file.size;
                this.IdInfo.frontPhoto = name.data.frontPhoto;
                this.IdInfo.userName = name.data.name
                this.IdInfo.idcard = name.data.idcard
                this.IdInfoShow = true;
                if(this.authorizerType){
                    this.IdInfo.mobile = sessionStorage.getItem('mobile')
                }
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
            if(name.resultCode == 1){
                this.IdCardBackSize = file.size;
                this.IdInfo.backPhoto = name.data.backPhoto;
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
        //身份证信息校验
        validateIdInfo(type){
            // console.log(type)
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
                     this.mobileTip = false
                     return true
                }
            }else if(type == 'smsCode'){
                if(this.IdInfo.smsCode==""){
                    this.smsTip=true;
                    this.smsTipText = "验证码不为空";
                }else{
                    this.valiteSms()
                }
            }
            //   console.log(this.smsTip)
        },
        //验证手机号
        valiteMobile(){
            let param={
                username:this.IdInfo.mobile
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
                if (res.data.resultCode == 0) {
                    that.smsCodeText = curCount + '秒';
                    that.IdInfo.appId =  res.data.appId;
                    that.IdInfo.smsNo =  res.data.smsNo
                    that.IdInfo.resultMobile = res.data.mobile     //发送验证码后返回的手机号
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
                    this.$message({
                        message: res.data.resultMessage,
                        type: 'warning'
                    })
                }
            }).catch(error=>{

            })

        },
        //校验验证码
        valiteSms(){
            let param={
                mobile:this.IdInfo.mobile,
                smsNo:this.IdInfo.smsNo,
                smsCode:this.IdInfo.smsCode,
                appId:this.IdInfo.appId,
            }
            server.smsValite(param).then(res=>{
                if(res.data.resultCode == 1){

                }else{
                    this.smsTip=true;
                    this.smsTipText = "验证码错误"
                }
            })
        },
        //确认签署函
        confirmSignFile(){
         this.checked = !this.checked;
        },
        //授权人类型
        changeAuthorType(){
            if(!this.authorizerType){
                this.authorizerType = true
            }else{
                this.authorizerType = false
            }
            this.IdInfo={
                idcard:'',
                userName:'',
                mobile:'',
                smsCode:'',
                smsNo:'',
                appId:'',
                resultMobile:'',
                frontPhoto:'',  //正面照地址
                backPhoto:''   //反面照地址
            }
        },

        //选择城市
        handleCityChange(val){
            this.bankInfo.to_pro_name=val[0]
            this.bankInfo.to_city_name=val[1]
        },

        bytesToSize(bytes) {
            if (bytes === 0) return '0 B';
            let k = 1024,
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
            return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
        },
        //取消
        cancelIDcard(){

        },
        //提交
        submitIDcard(){
             
            // if(this.licenseInfo.creditPhoto == ''){
            //     this.$message({
            //         showClose: true,
            //         message: '请上传营业执照',
            //         type: 'error'
            //     })
            //     return
            // }else if(this.IdInfo.frontPhoto==""){
            //     this.$message({
            //         showClose: true,
            //         message: '请上传身份证正面照',
            //         type: 'error'
            //     })
            //     return
            // }else if(this.IdInfo.backPhoto ==""){
            //     his.$message({
            //         showClose: true,
            //         message: '请上传身份证反面照',
            //         type: 'error'
            //     })
            //     return
            // }
            // if(this.IdInfo.mobile != this.IdInfo.resultMobile){
            //     this.$message({
            //         showClose: true,
            //         message: '手机号填写错误',
            //         type: 'error'
            //     })
            //     return
            // }
            // if(!this.checked){
            //     this.$message({
            //         showClose: true,
            //         message: '请勾选确认签署',
            //         type: 'error'
            //     })
            //     return
            // }

            // if(this.bankInfo.to_acc_no =="" || this.bankInfo.to_bank_name ==""|| this.bankInfo.to_pro_name ==""|| this.bankInfo.to_city_name ==""|| this.bankInfo.to_acc_dept ==""){
            //      this.$message({
            //         showClose: true,
            //         message: '请确认账户信息填写是否正确',
            //         type: 'error'
            //     })
            //     return
            // }
            this.$loading.show(
               '信息提交中...',  
            );
            this.sublicenseInfo();
            this.subIdInfo();
            this.subbankInfo();
        },
        //营业执照信息提交
        sublicenseInfo(){
            let param={
                tenantName:this.licenseInfo.tenantName,
                creditCode:this.licenseInfo.creditCode,
                creditPhoto:this.licenseInfo.creditPhoto,
                legalPerson:this.licenseInfo.legalPerson,
            }
            server.licenseInfo(param).then(res=>{
                 if(res.data.resultCode==1){
                    this.licenseStatus = true;
                    this.count+=1;
                }else{
                    this.licenseStatus = false;
                    this.$loading.hide();
                    this.count-=1;
                }
            }).catch(error=>{

            })

        },
        //身份证信息提交
        subIdInfo(){
            let params={
                userName:this.IdInfo.userName,
                idCard:this.IdInfo.idcard,
                mobile:this.IdInfo.mobile,
                interfaceCode:this.interfaceCode,
                authorizerType:this.authorizerType==true?1:0,
                frontPhoto:this.IdInfo.frontPhoto,
                backPhoto:this.IdInfo.backPhoto
            }
            server.IdCardInfo(params).then(res=>{
                if(res.data.resultCode==1){
                    this.IdStatus = true;
                    this.count+=1;
                }else{
                    this.IdStatus = false;
                    this.$loading.hide();
                    this.count-=1;
                }

            }).catch(error=>{

            })
        },
        //银行信息提交
        subbankInfo(){
            let param={
                to_acc_name:this.bankInfo.to_acc_name,               //企业名称
                to_acc_no:TrimAll(this.bankInfo.to_acc_no),                     //收款账号
                to_bank_name:TrimAll(this.bankInfo.to_bank_name),                   //银行名称
                to_pro_name:TrimAll(this.bankInfo.to_pro_name),                    //开户行省名
                to_city_name:TrimAll(this.bankInfo.to_city_name),                   //开户行市名
                to_acc_dept:TrimAll(this.bankInfo.to_acc_dept),               //支行名称
            }
            let interfaceCode = this.interfaceCode;
            server.bankInfo(param,interfaceCode).then(res=>{
                if(res.data.resultCode==1){
                    this.bankStatus = true;
                    this.count+=1;
                }else{
                    this.bankStatus = false
                    this.$loading.hide();
                    this.count-=1;
                }
            }).catch(error=>{
                   
            })
        },
        //请求成功跳转
        success(val){
            if(val==3){
                this.$loading.hide();
                this.$router.push('/EnterprisePayment')
            }
        }
    },
    watch:{
        count:function(val){
            this.success(val);
        }
    }


}
</script>
<style lang="scss" scoped>
    @import "../../common/styles/content.scss";
    @import "../../styles/CompanyCertificate/CompanyCertificate.scss";

</style>


