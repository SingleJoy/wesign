<template>
    <div class="main">
        <div class="companyCertificate">
            <div class="step">
                <ul>
                    <li class="active"><i class='el-icon-goods'></i><b>实名认证</b></li>
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
                width="300px"
              >
                <img src="../../../static/images/frontPhoto.png" alt="" style="width:100%;height:100%;">
            </el-dialog>
            <el-dialog
                :visible.sync="backIdExample"
                width="300px"
              >
                <img src="../../../static/images/backPhoto.png" alt="" style="width:100%;height:100%;">
            </el-dialog>
             <el-dialog
                :visible.sync="synopsis"
                width="700px"
              >
              <div class="enterprise-attorney-synopsis">
                    <h2 class="synopsis-title">企业授权委托书</h2>
                    <p>
                        <span>致：</span>
                        <span>北京众签科技有限公司</span>
                    </p>

                    <p class="synopsis-text">
                        <span>我单位</span>
                        <span class="add-info">{{licenseInfo.tenantName}}</span>
                        <span>现委托</span>
                        <span class="add-info">{{IdInfo.userName}}</span>
                        <span style="line-height:18px;">作为我单位合法代理人，授权其代表我单位使用贵司微签平台。该委托代理人使用微签平台的授权范围为：代表我单位发出签约请求、签署电子合同在内的各类文件、对已签约的文件进行存证等。在与贵司的微签服务
                            的有效期内，该代理人的一切行为，均代表本单位，与本单位的行为具有同等法律效力。本单位将承担该代理人行为的全部法律后果和法律责任。
                        </span>
                    </p>
                    <p>
                        <span>代理人无权转委托。特此委托。 </span>
                    </p>
                    <div class="item-info">
                        <p>
                            <span>代理人：</span>
                            <span>{{IdInfo.userName}}</span>
                        </p>

                        <p>
                            <span>身份证号码：</span>
                            <span>{{IdInfo.idCard}}</span>
                        </p>
                        <p>
                            <span>企业公章（盖章）：</span>
                        </p>
                        <p>
                            <span>法定代表人：</span>
                            <span>{{licenseInfo.legalPerson}}</span>
                        </p>
                        <p>
                            <span>日期：</span>
                            <span>{{IdInfo.date}}</span>
                        </p>
                    </div>


              </div>

            </el-dialog>
             <el-dialog
                :visible.sync="attorney"
                width="700px"
                height="800px"
              >
              <div class="enterprise-attorney-synopsis">
                    <h2>企业法人说明函</h2>
                    <p class="attorney-text">
                            <span> 姓名：</span> <span class="add-info">{{IdInfo.userName}}</span><span>，身份证号：</span> <span class="add-info">{{IdInfo.idCard}}</span><span>，系</span>
                            <span class="add-info">{{licenseInfo.tenantName}}</span><span>的法定代表人。</span>

                    </p>
                    <p style="margin-bottom:160px;margin-top:20px;">特此声明！</p>
                    <p  style="margin-bottom:50px;text-align:right;padding-right:100px;">
                            <span> 单位（公章）</span>
                    </p>
                    <p  style="margin-bottom:50px;text-align:right;margin-bottom:200px;padding-right:65px;">
                        <span>时间：</span>
                        <span>{{IdInfo.date}}</span>
                    </p>
              </div>
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
                                            :disabled="this.auditStatus==2"
                                            >
                                             <div class="license-wrap">
                                                <img  v-if="licenseInfo.creditPhoto" :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+licenseInfo.creditPhoto" class="avatar">
                                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                            </div>

                                        </el-upload>
                                    </div>
                                    <div class="upload_warp_text" v-if="showData">
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
                                            placeholder=""
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
                                            placeholder=""
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
                                            placeholder=""
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
                            <el-radio  label='1' style='float:left;padding-top:5px;'>被授权人</el-radio>
                            <el-radio  label='0' style='float:left;padding-top:5px;'>法人本人</el-radio>
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
                                                :disabled="this.authStatus==1"
                                                >
                                                <div class="upload_warp">
                                                    <img  v-if="IdInfo.frontPhoto" :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+IdInfo.frontPhoto" class="avatar">
                                                    <img v-else src="../../../static/images/Credentials/Personal/Pupload/left-card.png" alt="">
                                                </div>
                                            </el-upload>
											<div class="upload_warp_text"  v-if="showData">
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
                                                :disabled="this.authStatus==1"
                                                >
                                                <div class="upload_warp">
                                                    <img  v-if="IdInfo.backPhoto" :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+IdInfo.backPhoto" class="avatar">
                                                    <img v-else src="../../../static/images/Credentials/Personal/Pupload/right-card.png" alt="">
                                                </div>
                                            </el-upload>
											<div class="upload_warp_text"  v-if="showData">
												共&nbsp;{{bytesToSize(this.IdCardBackSize)}}
											</div>
                                            <p class="view-example" style="text-align:center"  @click="viewExample('backId')">查看示例</p>
										</div>
									</div>

                                </div>
								<p class="upload-tip">温馨提示：上传单张图片大小应小于5M,可支持JPEG、JPG、PNG格式</p>

                                 <div class="company-input" v-if="IdInfoShow">
                                    <div class="input-item">
                                        <span v-if="authorizerType" class="input-title">被授权人姓名</span>
                                        <span v-else class="input-title">法人姓名</span>
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
                                            v-model="IdInfo.idCard"
                                            @blur='validateIdInfo'
                                            :disabled= IdDisabled
                                        >
                                        </el-input>
                                    </div>
                                     <div class="input-item">
                                        <span class="input-title">绑定邮箱</span>
                                        <el-input
                                            style='width:336px'
                                            placeholder=""
                                            v-model="IdInfo.email"
                                            @blur='validateIdInfo("email")'

                                        >
                                        </el-input>
                                        <span v-if="emailTip" class="validate-tip">{{emailText}}</span>
                                    </div>
                                    <div class="input-item">
                                        <span class="input-title">手机号</span>
                                        <el-input
                                            style='width:336px;'
                                            placeholder=""
                                            v-model="IdInfo.mobile"
                                            @blur='validateIdInfo("mobile")'
                                            :disabled = true
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
                                            :maxlength=6
                                            :minlength=6
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
                                    <el-input disabled v-model="bankInfo.to_acc_name"  placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item label="企业银行账号" prop="to_acc_no" label-width="473px">
                                    <el-input v-model="bankInfo.to_acc_no" placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item  label="银行名称"  prop="to_bank_name" label-width="473px">
                                    <el-input   v-model="bankInfo.to_bank_name" placeholder="请输入"></el-input>
                                </el-form-item>

                                <el-form-item label="开户行所在省／市"  label-width="473px">
                                    <el-cascader
                                        :options="options"
                                        v-model="selectedOptions"
                                        @change="handleCityChange">
                                    </el-cascader>
                                    <span style="position: absolute; left: 0;top: 30px;margin-left: 0;" v-if="cityTip" class="validate-tip">请选择省市</span>
                                </el-form-item>
                                <el-form-item  label="开户行支行名称"  prop="to_acc_dept" label-width="473px">
                                    <el-input v-model="bankInfo.to_acc_dept" placeholder="请输入"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>

                <div class="submit-btn">
                     <el-button type="" style='width:280px' @click="cancelIDcard">取&nbsp;&nbsp;消</el-button>
                     <el-button type="primary" style='width:280px' :disabled="sigleClick" @click="submit('bankInfo')">提&nbsp;&nbsp;交</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import server from "@/api/certification";
import {validateMoblie,validatePassWord,validateBankNum,TrimAll,validateEmail,validateSmsCode,specialCharacter} from '../../common/js/validate.js';
import cookie from "@/common/js/getTenant";
import {getDate} from "@/api/account";

export default {
    name:'',
    data() {
        var checkName= (rule,value,callback)=>{
            if(!value){
                callback(new Error('企业名称不为空'))
            }else{
                  callback()
            }
        }
        var checkBankNum = (rule,value,callback)=>{
            if(!value){
                callback(new Error('请输入企业银行账号'))
            }else if(!validateBankNum(value)){
                callback(new Error('银行账号输入不正确'))
            }else{
                callback()
            }
        }
        var checkBankName = (rule,value,callback)=>{
             if(!value){
                callback(new Error('请输入企业银行名称'))
            }else if(!specialCharacter(TrimAll(value))){
                callback(new Error('名称格式不正确'))
            }else{
                  callback()
            }
        }
        var checkBank =  (rule,value,callback)=>{
            if(!value){
                callback(new Error('请输入开户行行名称'))
            }else if(!specialCharacter(TrimAll(value))){
                callback(new Error('名称格式不正确'))
            }else{
                callback()
            }
        }
        return {
            baseURL:this.baseURL.BASE_URL,
            interfaceCode: cookie.getJSON("tenant")?cookie.getJSON("tenant")[1].interfaceCode:'',
            auditStatus:'',     //企业认证状态
            authStatus:'',      //个人认证状态
            licenseSize:0,             //营业执照大小
            licenseInfoEdit:false,   //营业执照信息
            licenseInputShow:false,
            IdInfoShow:false,
            licenseInfo:{              //企业信息
                tenantName:'',
                creditCode:'',
                creditPhoto:'',
                legalPerson:'',
            },
            licenseExample:false,
            frontIdExample:false,
            backIdExample:false,
            IdInfo:{
                idCard:'',
                userName:'',
                mobile:'',
                smsCode:'',
                smsNo:'',
                appId:'',
                email:'',
                resultMobile:'',
                frontPhoto:'',  //正面照地址
                backPhoto:'',   //反面照地址
                date:'',       //授权日期
            },
            showData:true,
            IdDisabled:true,
            IdFrontImg:'',           //正面img
            IdBackImg:'',             //反面img
            IdCardFrontSize:0,     //身份证正面
            IdCardBackSize:0,      //身份证反面
            authorizerType:true,     //管理员了类型  false:0 法人/true:1 授权人
            adminType:'1',
            idMobile:true,
            checked:false,
            bankInfo:{
                to_acc_name:"",      //企业名称
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
            sigleClick:false,
            emailTip:false,
            emailText:'',
            mobileTip:false,
            mobileTipText:'',
            smsTip:false,
            smsCodeText:'获取验证码',
            cityTip:false,
            smsTipText:'',
            smsSend:false,
            synopsis:false,
            attorney:false,
            licenseStatus:true,        //营业执照认证状态
            IdStatus:true,        //管理员信息认证状态
            bankStatus:true,   //企业信息认证状态
            countRequest:0,           //请求计数
            options: [{
          value: '北京市',
          label: '北京市',
          children: [{
            value: '东城区',
            label: '东城区'
          }, {
            value: '西城区',
            label: '西城区'
          }, {
            value: '宣武区',
            label: '宣武区'
          }, {
            value: '崇文区',
            label: '崇文区'
          }, {
            value: '朝阳区',
            label: '朝阳区'
          },{
            value: '丰台区',
            label: '丰台区'
          },{
            value: '石景山区',
            label: '石景山区'
          },{
            value: '海淀区',
            label: '海淀区'
          },{
            value: '门头沟区',
            label: '门头沟区'
          },{
            value: '房山区',
            label: '房山区'
          },{
            value: '通州区',
            label: '通州区'
          },{
            value: '顺义区',
            label: '顺义区'
          },{
            value: '昌平区',
            label: '昌平区'
          },{
            value: '大兴区',
            label: '大兴区'
          },{
            value: '怀柔区',
            label: '怀柔区'
          },{
            value: '平谷区',
            label: '平谷区'
          },{
            value: '密云县',
            label: '密云县'
          },{
            value: '延庆县',
            label: '延庆县'
          }]
        }, {
          value: '天津市',
          label: '天津市',
          children: [{
            value: '和平区',
            label: '和平区'
          },{
            value: '河东区',
            label: '河东区'
          },{
            value: '河西区',
            label: '河西区'
          },{
            value: '南开区',
            label: '南开区'
          },{
            value: '河北区',
            label: '河北区'
          },{
            value: '红桥区',
            label: '红桥区'
          },{
            value: '塘沽区',
            label: '塘沽区'
          },{
            value: '汉沽区',
            label: '汉沽区'
          },{
            value: '大港区',
            label: '大港区'
          },{
            value: '东丽区',
            label: '东丽区'
          },{
            value: '西青区',
            label: '西青区'
          },{
            value: '津南区',
            label: '津南区'
          },{
            value: '北辰区',
            label: '北辰区'
          },{
            value: '武清区',
            label: '武清区'
          },{
            value: '宝坻区',
            label: '宝坻区'
          },{
            value: '宁河县',
            label: '宁河县'
          },{
            value: '静海县',
            label: '静海县'
          },{
            value: '蓟县',
            label: '蓟县'
          }]
        }, {
          value: '上海市',
          label: '上海市',
          children: [{
            value: '黄浦区',
            label: '黄浦区'
          },{
            value: '卢湾区',
            label: '卢湾区'
          },{
            value: '徐汇区',
            label: '徐汇区'
          },{
            value: '长宁区',
            label: '长宁区'
          },{
            value: '静安区',
            label: '静安区'
          },{
            value: '普陀区',
            label: '普陀区'
          },{
            value: '闸北区',
            label: '闸北区'
          },{
            value: '虹口区',
            label: '虹口区'
          },{
            value: '杨浦区',
            label: '杨浦区'
          },{
            value: '闵行区',
            label: '闵行区'
          },{
            value: '宝山区',
            label: '宝山区'
          },{
            value: '嘉定区',
            label: '嘉定区'
          },{
            value: '浦东新区',
            label: '浦东新区'
          },{
            value: '金山区',
            label: '金山区'
          },{
            value: '松江区',
            label: '松江区'
          },{
            value: '青浦区',
            label: '青浦区'
          },{
            value: '南汇区',
            label: '南汇区'
          },{
            value: '奉贤区',
            label: '奉贤区'
          },{
            value: '崇明县',
            label: '崇明县'
          }]
        }, {
          value: '重庆市',
          label: '重庆市',
          children: [{
            value: '万州区',
            label: '万州区'
          },{
            value: '涪陵区',
            label: '涪陵区'
          },{
            value: '渝中区',
            label: '渝中区'
          },{
            value: '大渡口区',
            label: '大渡口区'
          },{
            value: '江北区',
            label: '江北区'
          },{
            value: '沙坪坝区',
            label: '沙坪坝区'
          },{
            value: '九龙坡区',
            label: '九龙坡区'
          },{
            value: '南岸区',
            label: '南岸区'
          },{
            value: '北碚区',
            label: '北碚区'
          },{
            value: '万盛区',
            label: '万盛区'
          },{
            value: '双桥区',
            label: '双桥区'
          },{
            value: '渝北区',
            label: '渝北区'
          },{
            value: '巫溪县',
            label: '巫溪县'
          },{
            value: '巴南区',
            label: '巴南区'
          },{
            value: '黔江区',
            label: '黔江区'
          },{
            value: '长寿区',
            label: '长寿区'
          },{
            value: '江津区',
            label: '江津区'
          },{
            value: '合川区',
            label: '合川区'
          },{
            value: '永川区',
            label: '永川区'
          },{
            value: '南川区',
            label: '南川区'
          },{
            value: '綦江县',
            label: '綦江县'
          },{
            value: '潼南县',
            label: '潼南县'
          },{
            value: '铜梁县',
            label: '铜梁县'
          },{
            value: '大足县',
            label: '大足县'
          },{
            value: '荣昌县',
            label: '荣昌县'
          },{
            value: '璧山县',
            label: '璧山县'
          },{
            value: '梁平县',
            label: '梁平县'
          },{
            value: '城口县',
            label: '城口县'
          },{
            value: '丰都县',
            label: '丰都县'
          },{
            value: '垫江县',
            label: '垫江县'
          },{
            value: '武隆县',
            label: '武隆县'
          },{
            value: '忠县',
            label: '忠县'
          },{
            value: '开县',
            label: '开县'
          },{
            value: '云阳县',
            label: '云阳县'
          },{
            value: '奉节县',
            label: '奉节县'
          },{
            value: '巫山县',
            label: '巫山县'
          },{
            value: '石柱土家族自治县',
            label: '石柱土家族自治县'
          },{
            value: '秀山土家族苗族自治县',
            label: '秀山土家族苗族自治县'
          },{
            value: '酉阳土家族苗族自治县',
            label: '酉阳土家族苗族自治县'
          },{
            value: '彭水苗族土家族自治县',
            label: '彭水苗族土家族自治县'
          }]
        },{
          value: '河北省',
          label: '河北省',
          children: [{
            value: '石家庄市',
            label: '石家庄市'
          },{
            value: '唐山市',
            label: '唐山市'
          },{
            value: '秦皇岛市',
            label: '秦皇岛市'
          },{
            value: '邯郸市',
            label: '邯郸市'
          },{
            value: '邢台市',
            label: '邢台市'
          },{
            value: '保定市',
            label: '保定市'
          },{
            value: '张家口市',
            label: '张家口市'
          },{
            value: '承德市',
            label: '承德市'
          },{
            value: '沧州市',
            label: '沧州市'
          },{
            value: '廊坊市',
            label: '廊坊市'
          },{
            value: '衡水市',
            label: '衡水市'
          }]
        },{
          value: '河南省',
          label: '河南省',
          children: [{
            value: '郑州市',
            label: '郑州市'
          },{
            value: '开封市',
            label: '开封市'
          },{
            value: '洛阳市',
            label: '洛阳市'
          },{
            value: '平顶山市',
            label: '平顶山市'
          },{
            value: '安阳市',
            label: '安阳市'
          },{
            value: '鹤壁市',
            label: '鹤壁市'
          },{
            value: '新乡市',
            label: '新乡市'
          },{
            value: '焦作市',
            label: '焦作市'
          },{
            value: '济源市',
            label: '济源市'
          },{
            value: '濮阳市',
            label: '濮阳市'
          },{
            value: '许昌市',
            label: '许昌市'
          },{
            value: '漯河市',
            label: '漯河市'
          },{
            value: '三门峡市',
            label: '三门峡市'
          },{
            value: '南阳市',
            label: '南阳市'
          },{
            value: '商丘市',
            label: '商丘市'
          },{
            value: '信阳市',
            label: '信阳市'
          },{
            value: '周口市',
            label: '周口市'
          },{
            value: '驻马店市',
            label: '驻马店市'
          }]
        },{
          value: '云南省',
          label: '云南省',
          children: [{
            value: '昆明市',
            label: '昆明市'
          },{
            value: '曲靖市',
            label: '曲靖市'
          },{
            value: '玉溪市',
            label: '玉溪市'
          },{
            value: '保山市',
            label: '保山市'
          },{
            value: '昭通市',
            label: '昭通市'
          },{
            value: '丽江市',
            label: '丽江市'
          },{
            value: '思茅市',
            label: '思茅市'
          },{
            value: '临沧市',
            label: '临沧市'
          },{
            value: '楚雄彝族自治州',
            label: '楚雄彝族自治州'
          },{
            value: '红河哈尼族彝族自治州',
            label: '红河哈尼族彝族自治州'
          },{
            value: '文山壮族苗族自治州',
            label: '文山壮族苗族自治州'
          },{
            value: '西双版纳傣族自治州',
            label: '西双版纳傣族自治州'
          },{
            value: '大理白族自治州',
            label: '大理白族自治州'
          },{
            value: '德宏傣族景颇族自治州',
            label: '德宏傣族景颇族自治州'
          },{
            value: '怒江傈僳族自治州',
            label: '怒江傈僳族自治州'
          },{
            value: '迪庆藏族自治州',
            label: '迪庆藏族自治州'
          }]
        },{
          value: '辽宁省',
          label: '辽宁省',
          children: [{
            value: '沈阳市',
            label: '沈阳市'
          },{
            value: '大连市',
            label: '大连市'
          },{
            value: '鞍山市',
            label: '鞍山市'
          },{
            value: '抚顺市',
            label: '抚顺市'
          },{
            value: '本溪市',
            label: '本溪市'
          },{
            value: '丹东市',
            label: '丹东市'
          },{
            value: '锦州市',
            label: '锦州市'
          },{
            value: '营口市',
            label: '营口市'
          },{
            value: '阜新市',
            label: '阜新市'
          },{
            value: '辽阳市',
            label: '辽阳市'
          },{
            value: '盘锦市',
            label: '盘锦市'
          },{
            value: '铁岭市',
            label: '铁岭市'
          },{
            value: '朝阳市',
            label: '朝阳市'
          },{
            value: '葫芦岛市',
            label: '葫芦岛市'
          }]
        },{
          value: '黑龙江省',
          label: '黑龙江省',
          children: [{
            value: '哈尔滨市',
            label: '哈尔滨市'
          },{
            value: '齐齐哈尔市',
            label: '齐齐哈尔市'
          },{
            value: '鸡西市',
            label: '鸡西市'
          },{
            value: '鹤岗市',
            label: '鹤岗市'
          },{
            value: '双鸭山市',
            label: '双鸭山市'
          },{
            value: '大庆市',
            label: '大庆市'
          },{
            value: '伊春市',
            label: '伊春市'
          },{
            value: '佳木斯市',
            label: '佳木斯市'
          },{
            value: '七台河市',
            label: '七台河市'
          },{
            value: '牡丹江市',
            label: '牡丹江市'
          },{
            value: '黑河市',
            label: '黑河市'
          },{
            value: '绥化市',
            label: '绥化市'
          },{
            value: '大兴安岭地区',
            label: '大兴安岭地区'
          }]
        },{
          value: '湖南省',
          label: '湖南省',
          children: [{
            value: '长沙市',
            label: '长沙市'
          },{
            value: '株洲市',
            label: '株洲市'
          },{
            value: '湘潭市',
            label: '湘潭市'
          },{
            value: '衡阳市',
            label: '衡阳市'
          },{
            value: '邵阳市',
            label: '邵阳市'
          },{
            value: '岳阳市',
            label: '岳阳市'
          },{
            value: '常德市',
            label: '常德市'
          },{
            value: '张家界市',
            label: '张家界市'
          },{
            value: '益阳市',
            label: '益阳市'
          },{
            value: '郴州市',
            label: '郴州市'
          },{
            value: '永州市',
            label: '永州市'
          },{
            value: '怀化市',
            label: '怀化市'
          },{
            value: '娄底市',
            label: '娄底市'
          },{
            value: '湘西土家族苗族自治州',
            label: '湘西土家族苗族自治州'
          }]
        },{
          value: '安徽省',
          label: '安徽省',
          children: [{
            value: '合肥市',
            label: '合肥市'
          },{
            value: '芜湖市',
            label: '芜湖市'
          },{
            value: '蚌埠市',
            label: '蚌埠市'
          },{
            value: '淮南市',
            label: '淮南市'
          },{
            value: '马鞍山市',
            label: '马鞍山市'
          },{
            value: '淮北市',
            label: '淮北市'
          },{
            value: '铜陵市',
            label: '铜陵市'
          },{
            value: '安庆市',
            label: '安庆市'
          },{
            value: '黄山市',
            label: '黄山市'
          },{
            value: '滁州市',
            label: '滁州市'
          },{
            value: '阜阳市',
            label: '阜阳市'
          },{
            value: '宿州市',
            label: '宿州市'
          },{
            value: '巢湖市',
            label: '巢湖市'
          },{
            value: '六安市',
            label: '六安市'
          },{
            value: '亳州市',
            label: '亳州市'
          },{
            value: '池州市',
            label: '池州市'
          },{
            value: '宣城市',
            label: '宣城市'
          }]
        },{
          value: '山东省',
          label: '山东省',
          children: [{
            value: '济南市',
            label: '济南市'
          },{
            value: '青岛市',
            label: '青岛市'
          },{
            value: '淄博市',
            label: '淄博市'
          },{
            value: '枣庄市',
            label: '枣庄市'
          },{
            value: '东营市',
            label: '东营市'
          },{
            value: '烟台市',
            label: '烟台市'
          },{
            value: '潍坊市',
            label: '潍坊市'
          },{
            value: '济宁市',
            label: '济宁市'
          },{
            value: '泰安市',
            label: '泰安市'
          },{
            value: '威海市',
            label: '威海市'
          },{
            value: '日照市',
            label: '日照市'
          },{
            value: '莱芜市',
            label: '莱芜市'
          },{
            value: '临沂市',
            label: '临沂市'
          },{
            value: '德州市',
            label: '德州市'
          },{
            value: '聊城市',
            label: '聊城市'
          },{
            value: '滨州市',
            label: '滨州市'
          },{
            value: '菏泽市',
            label: '菏泽市'
          }]
        },{
          value: '新疆维吾尔自治区',
          label: '新疆维吾尔自治区',
          children: [{
            value: '乌鲁木齐市',
            label: '乌鲁木齐市'
          },{
            value: '克拉玛依市',
            label: '克拉玛依市'
          },{
            value: '吐鲁番地区',
            label: '吐鲁番地区'
          },{
            value: '哈密地区',
            label: '哈密地区'
          },{
            value: '昌吉回族自治州',
            label: '昌吉回族自治州'
          },{
            value: '博尔塔拉蒙古自治州',
            label: '博尔塔拉蒙古自治州'
          },{
            value: '巴音郭楞蒙古自治州',
            label: '巴音郭楞蒙古自治州'
          },{
            value: '阿克苏地区',
            label: '阿克苏地区'
          },{
            value: '克孜勒苏柯尔克孜自治州',
            label: '克孜勒苏柯尔克孜自治州'
          },{
            value: '喀什地区',
            label: '喀什地区'
          },{
            value: '和田地区',
            label: '和田地区'
          },{
            value: '伊犁哈萨克自治州',
            label: '伊犁哈萨克自治州'
          },{
            value: '塔城地区',
            label: '塔城地区'
          },{
            value: '阿勒泰地区',
            label: '阿勒泰地区'
          },{
            value: '石河子市',
            label: '石河子市'
          },{
            value: '阿拉尔市',
            label: '阿拉尔市'
          },{
            value: '图木舒克市',
            label: '图木舒克市'
          },{
            value: '五家渠市',
            label: '五家渠市'
          }]
        },{
          value: '江苏省',
          label: '江苏省',
          children: [{
            value: '南京市',
            label: '南京市'
          },{
            value: '无锡市',
            label: '无锡市'
          },{
            value: '徐州市',
            label: '徐州市'
          },{
            value: '常州市',
            label: '常州市'
          },{
            value: '苏州市',
            label: '苏州市'
          },{
            value: '南通市',
            label: '南通市'
          },{
            value: '连云港市',
            label: '连云港市'
          },{
            value: '淮安市',
            label: '淮安市'
          },{
            value: '盐城市',
            label: '盐城市'
          },{
            value: '扬州市',
            label: '扬州市'
          },{
            value: '镇江市',
            label: '镇江市'
          },{
            value: '泰州市',
            label: '泰州市'
          },{
            value: '宿迁市',
            label: '宿迁市'
          }]
        },{
          value: '浙江省',
          label: '浙江省',
          children: [{
            value: '杭州市',
            label: '杭州市'
          },{
            value: '宁波市',
            label: '宁波市'
          },{
            value: '温州市',
            label: '温州市'
          },{
            value: '嘉兴市',
            label: '嘉兴市'
          },{
            value: '湖州市',
            label: '湖州市'
          },{
            value: '绍兴市',
            label: '绍兴市'
          },{
            value: '金华市',
            label: '金华市'
          },{
            value: '衢州市',
            label: '衢州市'
          },{
            value: '舟山市',
            label: '舟山市'
          },{
            value: '台州市',
            label: '台州市'
          },{
            value: '丽水市',
            label: '丽水市'
          }]
        },{
          value: '江西省',
          label: '江西省',
          children: [{
            value: '南昌市',
            label: '南昌市'
          },{
            value: '景德镇市',
            label: '景德镇市'
          },{
            value: '萍乡市',
            label: '萍乡市'
          },{
            value: '九江市',
            label: '九江市'
          },{
            value: '新余市',
            label: '新余市'
          },{
            value: '鹰潭市',
            label: '鹰潭市'
          },{
            value: '赣州市',
            label: '赣州市'
          },{
            value: '吉安市',
            label: '吉安市'
          },{
            value: '宜春市',
            label: '宜春市'
          },{
            value: '抚州市',
            label: '抚州市'
          },{
            value: '上饶市',
            label: '上饶市'
          }]
        },{
          value: '湖北省',
          label: '湖北省',
          children: [{
            value: '武汉市',
            label: '武汉市'
          },{
            value: '黄石市',
            label: '黄石市'
          },{
            value: '十堰市',
            label: '十堰市'
          },{
            value: '宜昌市',
            label: '宜昌市'
          },{
            value: '襄樊市',
            label: '襄樊市'
          },{
            value: '鄂州市',
            label: '鄂州市'
          },{
            value: '荆门市',
            label: '荆门市'
          },{
            value: '孝感市',
            label: '孝感市'
          },{
            value: '荆州市',
            label: '荆州市'
          },{
            value: '黄冈市',
            label: '黄冈市'
          },{
            value: '咸宁市',
            label: '咸宁市'
          },{
            value: '随州市',
            label: '随州市'
          },{
            value: '恩施土家族苗族自治州',
            label: '恩施土家族苗族自治州'
          },{
            value: '仙桃市',
            label: '仙桃市'
          },{
            value: '潜江市',
            label: '潜江市'
          },{
            value: '天门市',
            label: '天门市'
          },{
            value: '神农架林区',
            label: '神农架林区'
          }]
        },{
          value: '广西壮族自治区',
          label: '广西壮族自治区',
          children: [{
            value: '南宁市',
            label: '南宁市'
          },{
            value: '柳州市',
            label: '柳州市'
          },{
            value: '桂林市',
            label: '桂林市'
          },{
            value: '梧州市',
            label: '梧州市'
          },{
            value: '北海市',
            label: '北海市'
          },{
            value: '防城港市',
            label: '防城港市'
          },{
            value: '钦州市',
            label: '钦州市'
          },{
            value: '贵港市',
            label: '贵港市'
          },{
            value: '玉林市',
            label: '玉林市'
          },{
            value: '百色市',
            label: '百色市'
          },{
            value: '贺州市',
            label: '贺州市'
          },{
            value: '河池市',
            label: '河池市'
          },{
            value: '来宾市',
            label: '来宾市'
          },{
            value: '崇左市',
            label: '崇左市'
          }]
        },{
          value: '甘肃省',
          label: '甘肃省',
          children: [{
            value: '兰州市',
            label: '兰州市'
          },{
            value: '嘉峪关市',
            label: '嘉峪关市'
          },{
            value: '金昌市',
            label: '金昌市'
          },{
            value: '白银市',
            label: '白银市'
          },{
            value: '天水市',
            label: '天水市'
          },{
            value: '武威市',
            label: '武威市'
          },{
            value: '张掖市',
            label: '张掖市'
          },{
            value: '平凉市',
            label: '平凉市'
          },{
            value: '酒泉市',
            label: '酒泉市'
          },{
            value: '庆阳市',
            label: '庆阳市'
          },{
            value: '定西市',
            label: '定西市'
          },{
            value: '陇南市',
            label: '陇南市'
          },{
            value: '临夏回族自治州',
            label: '临夏回族自治州'
          },{
            value: '甘南藏族自治州',
            label: '甘南藏族自治州'
          }]
        },{
          value: '山西省',
          label: '山西省',
          children: [{
            value: '太原市',
            label: '太原市'
          },{
            value: '大同市',
            label: '大同市'
          },{
            value: '阳泉市',
            label: '阳泉市'
          },{
            value: '长治市',
            label: '长治市'
          },{
            value: '晋城市',
            label: '晋城市'
          },{
            value: '朔州市',
            label: '朔州市'
          },{
            value: '晋中市',
            label: '晋中市'
          },{
            value: '运城市',
            label: '运城市'
          },{
            value: '忻州市',
            label: '忻州市'
          },{
            value: '临汾市',
            label: '临汾市'
          },{
            value: '吕梁市',
            label: '吕梁市'
          }]
        },{
          value: '内蒙古自治区',
          label: '内蒙古自治区',
          children: [{
            value: '呼和浩特市',
            label: '呼和浩特市'
          },{
            value: '包头市',
            label: '包头市'
          },{
            value: '乌海市',
            label: '乌海市'
          },{
            value: '赤峰市',
            label: '赤峰市'
          },{
            value: '通辽市',
            label: '通辽市'
          },{
            value: '鄂尔多斯市',
            label: '鄂尔多斯市'
          },{
            value: '呼伦贝尔市',
            label: '呼伦贝尔市'
          },{
            value: '巴彦淖尔市',
            label: '巴彦淖尔市'
          },{
            value: '乌兰察布市',
            label: '乌兰察布市'
          },{
            value: '兴安盟',
            label: '兴安盟'
          },{
            value: '锡林郭勒盟',
            label: '锡林郭勒盟'
          },{
            value: '阿拉善盟',
            label: '阿拉善盟'
          }]
        },{
          value: '陕西省',
          label: '陕西省',
          children: [{
            value: '西安市',
            label: '西安市'
          },{
            value: '铜川市',
            label: '铜川市'
          },{
            value: '宝鸡市',
            label: '宝鸡市'
          },{
            value: '咸阳市',
            label: '咸阳市'
          },{
            value: '渭南市',
            label: '渭南市'
          },{
            value: '延安市',
            label: '延安市'
          },{
            value: '汉中市',
            label: '汉中市'
          },{
            value: '榆林市',
            label: '榆林市'
          },{
            value: '安康市',
            label: '安康市'
          },{
            value: '商洛市',
            label: '商洛市'
          }]
        },{
          value: '吉林省',
          label: '吉林省',
          children: [{
            value: '长春市',
            label: '长春市'
          },{
            value: '吉林市',
            label: '吉林市'
          },{
            value: '四平市',
            label: '四平市'
          },{
            value: '辽源市',
            label: '辽源市'
          },{
            value: '通化市',
            label: '通化市'
          },{
            value: '白山市',
            label: '白山市'
          },{
            value: '松原市',
            label: '松原市'
          },{
            value: '白城市',
            label: '白城市'
          },{
            value: '延边朝鲜族自治州',
            label: '延边朝鲜族自治州'
          }]
        },{
          value: '福建省',
          label: '福建省',
          children: [{
            value: '福州市',
            label: '福州市'
          },{
            value: '厦门市',
            label: '厦门市'
          },{
            value: '莆田市',
            label: '莆田市'
          },{
            value: '三明市',
            label: '三明市'
          },{
            value: '泉州市',
            label: '泉州市'
          },{
            value: '漳州市',
            label: '漳州市'
          },{
            value: '南平市',
            label: '南平市'
          },{
            value: '龙岩市',
            label: '龙岩市'
          },{
            value: '宁德市',
            label: '宁德市'
          }]
        },{
          value: '贵州省',
          label: '贵州省',
          children: [{
            value: '贵阳市',
            label: '贵阳市'
          },{
            value: '六盘水市',
            label: '六盘水市'
          },{
            value: '遵义市',
            label: '遵义市'
          },{
            value: '安顺市',
            label: '安顺市'
          },{
            value: '铜仁地区',
            label: '铜仁地区'
          },{
            value: '黔西南布依族苗族自治州',
            label: '黔西南布依族苗族自治州'
          },{
            value: '毕节地区',
            label: '毕节地区'
          },{
            value: '黔东南苗族侗族自治州',
            label: '黔东南苗族侗族自治州'
          },{
            value: '黔南布依族苗族自治州',
            label: '黔南布依族苗族自治州'
          }]
        },{
          value: '广东省',
          label: '广东省',
          children: [{
            value: '广州市',
            label: '广州市'
          },{
            value: '韶关市',
            label: '韶关市'
          },{
            value: '深圳市',
            label: '深圳市'
          },{
            value: '珠海市',
            label: '珠海市'
          },{
            value: '汕头市',
            label: '汕头市'
          },{
            value: '佛山市',
            label: '佛山市'
          },{
            value: '江门市',
            label: '江门市'
          },{
            value: '湛江市',
            label: '湛江市'
          },{
            value: '茂名市',
            label: '茂名市'
          },{
            value: '肇庆市',
            label: '肇庆市'
          },{
            value: '惠州市',
            label: '惠州市'
          },{
            value: '梅州市',
            label: '梅州市'
          },{
            value: '汕尾市',
            label: '汕尾市'
          },{
            value: '河源市',
            label: '河源市'
          },{
            value: '阳江市',
            label: '阳江市'
          },{
            value: '清远市',
            label: '清远市'
          },{
            value: '东莞市',
            label: '东莞市'
          },{
            value: '中山市',
            label: '中山市'
          },{
            value: '潮州市',
            label: '潮州市'
          },{
            value: '揭阳市',
            label: '揭阳市'
          },{
            value: '云浮市',
            label: '云浮市'
          }]
        },{
          value: '青海省',
          label: '青海省',
          children: [{
            value: '西宁市',
            label: '西宁市'
          },{
            value: '海东地区',
            label: '海东地区'
          },{
            value: '海北藏族自治州',
            label: '海北藏族自治州'
          },{
            value: '黄南藏族自治州',
            label: '黄南藏族自治州'
          },{
            value: '海南藏族自治州',
            label: '海南藏族自治州'
          },{
            value: '果洛藏族自治州',
            label: '果洛藏族自治州'
          },{
            value: '玉树藏族自治州',
            label: '玉树藏族自治州'
          },{
            value: '海西蒙古族藏族自治州',
            label: '海西蒙古族藏族自治州'
          }]
        },{
          value: '西藏自治区',
          label: '西藏自治区',
          children: [{
            value: '拉萨市',
            label: '拉萨市'
          },{
            value: '昌都地区',
            label: '昌都地区'
          },{
            value: '山南地区',
            label: '山南地区'
          },{
            value: '日喀则地市',
            label: '日喀则地市'
          },{
            value: '那曲地区',
            label: '那曲地区'
          },{
            value: '阿里地区',
            label: '阿里地区'
          },{
            value: '林芝地区',
            label: '林芝地区'
          }]
        },{
          value: '四川省',
          label: '四川省',
          children: [{
            value: '成都市',
            label: '成都市'
          },{
            value: '自贡市',
            label: '自贡市'
          },{
            value: '攀枝花市',
            label: '攀枝花市'
          },{
            value: '泸州市',
            label: '泸州市'
          },{
            value: '德阳市',
            label: '德阳市'
          },{
            value: '绵阳市',
            label: '绵阳市'
          },{
            value: '广元市',
            label: '广元市'
          },{
            value: '遂宁市',
            label: '遂宁市'
          },{
            value: '内江市',
            label: '内江市'
          },{
            value: '乐山市',
            label: '乐山市'
          },{
            value: '南充市',
            label: '南充市'
          },{
            value: '眉山市',
            label: '眉山市'
          },{
            value: '宜宾市',
            label: '宜宾市'
          },{
            value: '广安市',
            label: '广安市'
          },{
            value: '达州市',
            label: '达州市'
          },{
            value: '雅安市',
            label: '雅安市'
          },{
            value: '巴中市',
            label: '巴中市'
          },{
            value: '资阳市',
            label: '资阳市'
          },{
            value: '阿坝藏族羌族自治州',
            label: '阿坝藏族羌族自治州'
          },{
            value: '甘孜藏族自治州',
            label: '甘孜藏族自治州'
          },{
            value: '凉山彝族自治州',
            label: '凉山彝族自治州'
          }]
        },{
          value: '宁夏回族自治区',
          label: '宁夏回族自治区',
          children: [{
            value: '银川市',
            label: '银川市'
          },{
            value: '石嘴山市',
            label: '石嘴山市'
          },{
            value: '吴忠市',
            label: '吴忠市'
          },{
            value: '固原市',
            label: '固原市'
          },{
            value: '中卫市',
            label: '中卫市'
          }]
        },{
          value: '海南省',
          label: '海南省',
          children: [{
            value: '海口市',
            label: '海口市'
          },{
            value: '三亚市',
            label: '三亚市'
          },{
            value: '五指山市',
            label: '五指山市'
          },{
            value: '琼海市',
            label: '琼海市'
          },{
            value: '儋州市',
            label: '儋州市'
          },{
            value: '文昌市',
            label: '文昌市'
          },{
            value: '万宁市',
            label: '万宁市'
          },{
            value: '东方市',
            label: '东方市'
          },{
            value: '定安县',
            label: '定安县'
          },{
            value: '屯昌县',
            label: '屯昌县'
          },{
            value: '澄迈县',
            label: '澄迈县'
          },{
            value: '临高县',
            label: '临高县'
          },{
            value: '白沙黎族自治县',
            label: '白沙黎族自治县'
          },{
            value: '昌江黎族自治县',
            label: '昌江黎族自治县'
          },{
            value: '乐东黎族自治县',
            label: '乐东黎族自治县'
          },{
            value: '陵水黎族自治县',
            label: '陵水黎族自治县'
          },{
            value: '保亭黎族苗族自治县',
            label: '保亭黎族苗族自治县'
          },{
            value: '琼中黎族苗族自治县',
            label: '琼中黎族苗族自治县'
          }]
        },{
          value: '台湾省',
          label: '台湾省',
          children: [{
            value: '台北市',
            label: '台北市'
          },{
            value: '高雄市',
            label: '高雄市'
          },{
            value: '基隆市',
            label: '基隆市'
          },{
            value: '台中市',
            label: '台中市'
          },{
            value: '台南市',
            label: '台南市'
          },{
            value: '新竹市',
            label: '新竹市'
          },{
            value: '嘉义市',
            label: '嘉义市'
          }]
        },{
          value: '香港特别行政区',
          label: '香港特别行政区',
          children: [{
            value: '中西区',
            label: '中西区'
          },{
            value: '湾仔区',
            label: '湾仔区'
          },{
            value: '东区',
            label: '东区'
          },{
            value: '南区',
            label: '南区'
          },{
            value: '油尖旺区',
            label: '油尖旺区'
          },{
            value: '深水埗区',
            label: '深水埗区'
          },{
            value: '九龙城区',
            label: '九龙城区'
          },{
            value: '黄大仙区',
            label: '黄大仙区'
          },{
            value: '观塘区',
            label: '观塘区'
          },{
            value: '荃湾区',
            label: '荃湾区'
          },{
            value: '葵青区',
            label: '葵青区'
          },{
            value: '沙田区',
            label: '沙田区'
          },{
            value: '西贡区',
            label: '西贡区'
          },{
            value: '大埔区',
            label: '大埔区'
          },{
            value: '北区',
            label: '北区'
          },{
            value: '元朗区',
            label: '元朗区'
          },{
            value: '屯门区',
            label: '屯门区'
          },{
            value: '离岛区',
            label: '离岛区'
          }]
        },{
          value: '澳门特别行政区',
          label: '澳门特别行政区',
          children: [{
            value: '澳门',
            label: '澳门'
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
        let options = [];
        server.companyInfoDetail(param,interfaceCode).then(res=>{
            if(res.data.resultCode==1){
                this.showData = false
                let data = res.data.data;
                sessionStorage.setItem('authorizerType',this.adminType)
                licenseInfo.tenantName = data.tenantName
                licenseInfo.creditCode = data.creditCode
                licenseInfo.creditPhoto = data.creditPhoto
                licenseInfo.legalPerson = data.legalPerson
                if(licenseInfo.tenantName){
                    this.licenseInputShow = true;
                }
                IdInfo.idCard = data.idCard
                IdInfo.userName = data.userName
                IdInfo.mobile = data.mobile
                IdInfo.frontPhoto = data.frontPhoto
                IdInfo.backPhoto = data.backPhoto
                IdInfo.adminType = data.authorizerType
                IdInfo.email = data.email;
                if(IdInfo.idCard){
                    this.IdInfoShow = true;
                    // this.smsSend = true;
                    this.getAuthDate();
                }

                bankInfo.to_acc_name = data.tenantName
                bankInfo.to_acc_no = data.to_acc_no
                bankInfo.to_bank_name = data.to_bank_name
                bankInfo.to_pro_name = data.to_pro_name
                bankInfo.to_city_name = data.to_city_name
                bankInfo.to_acc_dept = data.to_acc_dept
                options.push(data.to_pro_name,data.to_city_name)
                this.selectedOptions = options

                this.auditStatus = data.auditStatus;
                this.authStatus = data.authStatus;
                if(this.auditStatus==2){
                    this.licenseStatus = true;
                }
                if(this.auditStatus ==1){
                    this.IdStatus = true;
                }

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
                this.getAuthDate();
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
            // console.log(file)
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
                this.$loading.show(
                    '图片上传中...',
                );
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
                this.licenseStatus = true;
                this.$loading.hide();
                this.$message({
                    showClose: true,
                    message: '营业执照上传成功',
                    type: 'success'
                })
            }else{
                 this.$loading.hide();
                //  this.IdInfoShow = false;
                  this.$message({
                    showClose: true,
                    message: name.resultMessage,
                    type: 'error'
                })
            }

        },

        //身份证正面上传成功
        handIdFrontSuccess(name, file, fileList){
            if(name.resultCode == 1){
                    if(this.licenseInfo.legalPerson&&name.data.name&&this.authorizerType==0&&(this.licenseInfo.legalPerson!=name.data.name)){
                        this.$loading.hide();
                        this.$message({
                            showClose: true,
                            message: '当前身份信息与企业法人信息不一致',
                            type: 'error'
                        })
                        return
                    }
                    this.IdCardFrontSize = file.size;
                    this.IdInfo.frontPhoto = name.data.frontPhoto;
                    this.IdInfo.userName = name.data.name
                    this.IdInfo.idCard = name.data.idCard
                    this.IdInfoShow = true;
                    this.IdStatus = true;
                    // if(this.authorizerType){
                        this.IdInfo.mobile = sessionStorage.getItem('mobile')
                    // }
                    this.$loading.hide();
                    this.getAuthDate()

                    this.$message({
                        showClose: true,
                        message: '上传成功',
                        type: 'success'
                    })

             }else{
                this.$loading.hide();
                this.$message({
                    showClose: true,
                    message:'身份证信息验证失败',
                    type: 'error'
                })
             }
        },
        //获取授权日期
        getAuthDate(){
            // getDate().then(res=>{
            //     this.IdInfo.date=res.bodyText;
            // }).catch(error=>{

            // })
              getDate().then(res=> {
                this.IdInfo.date=res.data;
            });
        },

        //背面上传成功
        handIdBackSuccess(name, file, fileList){
            if(name.resultCode == 1){
                this.IdCardBackSize = file.size;
                this.IdInfo.backPhoto = name.data.backPhoto;
                this.$loading.hide();
                this.$message({
                    showClose: true,
                    message: '上传成功',
                    type: 'success'
                })
             }else{
                this.$loading.hide();
                this.$message({
                    showClose: true,
                    message: name.resultMessage,
                    type: 'error'
                })
             }
        },
        //身份证信息校验
        validateIdInfo(type){
            if(type == 'mobile'){
                if(!this.IdInfo.mobile){
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
                    this.smsTipText = "验证码不能为空";
                }else if(!validateSmsCode(this.IdInfo.smsCode)){
                      this.smsTip=true;
                    this.smsTipText = "验证码只能为6位数字";
                }else{
                    this.smsTip=false;
                    this.smsTipText = "";
                    this.valiteSms()
                }
            }else if(type=='email'){
                if(!this.IdInfo.email){
                    this.emailTip = true
                    this.emailText = '请输入邮箱'
                    return false
                }else if(!validateEmail(this.IdInfo.email)){
                    this.emailTip = true
                    this.emailText = '邮箱格式不正确';
                    return false
                }else{
                    this.emailTip = false
                    this.emailText = '';
                    return true
                }
            }
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
                userName:this.IdInfo.userName,
                codeType:codeType,
                mobile:this.IdInfo.mobile,
                interfaceCode:this.interfaceCode
            }
            let that = this;
            server.smsCode(params).then(res=>{
                if (res.data.resultCode == 1) {
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
            this.IdStatus = true;
            this.IdInfoShow = false;
            this.IdCardFrontSize = 0;
            this.IdCardBackSize = 0;
            if(!this.authorizerType){
                this.authorizerType = true
            }else{
                this.authorizerType = false
            }
            sessionStorage.setItem('authorizerType',this.adminType)
            this.authStatus = 0;    //切换个人身份时打开身份证上传
            this.IdInfo={
                idCard:'',
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
            this.bankInfo.to_city_name=val[1];
            this.cityTip = false;
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
            this.$router.push('/Merchant')
        },
        //提交
        submit(bankInfo){
            this.countRequest = 0;
            if(!this.licenseInfo.creditPhoto){
                this.$message({
                    showClose: true,
                    message: '请上传营业执照',
                    type: 'error'
                })
                return
            }else if(!this.IdInfo.frontPhoto){
                this.$message({
                    showClose: true,
                    message: '请上传身份证正面照',
                    type: 'error'
                })
                return
            }else if(!this.IdInfo.backPhoto){
                this.$message({
                    showClose: true,
                    message: '请上传身份证反面照',
                    type: 'error'
                })
                return
            }
            if(this.licenseInfo.legalPerson&& this.IdInfo.userName&&(this.licenseInfo.legalPerson!= this.IdInfo.userName)&&this.authorizerType==0){
                this.$message({
                    showClose: true,
                    message: '当前身份信息与企业法人信息不一致',
                    type: 'error'
                })
                return
            }
            if(!this.IdInfo.email){
                this.$message({
                     showClose: true,
                    message: '邮箱为必填',
                    type: 'error'
                })
                return
            }
            if(!validateEmail(this.IdInfo.email)){
                 this.$message({
                    showClose: true,
                    message: '邮箱格式不正确',
                    type: 'error'
                })
                return
            }
            if(!this.IdInfo.mobile){
                this.$message({
                    showClose: true,
                    message: '手机号不能为空',
                    type: 'error'
                })
                return
            }
            if(!this.IdInfo.smsCode){
                this.$message({
                    showClose: true,
                    message: '验证码不能为空',
                    type: 'error'
                })
                return
            }
            if(this.IdInfo.mobile != this.IdInfo.resultMobile){
                this.$message({
                    showClose: true,
                    message: '手机号与验证码不匹配',
                    type: 'error'
                })
                return
            }
            if(!this.checked){
                this.$message({
                    showClose: true,
                    message: '请勾选确认签署',
                    type: 'error'
                })
                return
            }
            if(!this.bankInfo.to_pro_name){
                    this.cityTip = true;
                    return
                }else{
                    this.cityTip = false;
            }
            this.$refs[bankInfo].validate((valid) => {
                if(valid){

                    this.$loading.show(
                        '信息提交中...',
                    );
                    this.sublicenseInfo()
                    // this.sigleClick = true;
                    // if(this.auditStatus==2){   //企业认证成功
                    //     this.subIdInfo();
                    //     // this.subbankInfo();
                    //     this.countRequest+=1;
                    // }else if(this.auditSteps==1){     //个人认证成功
                    //     this.sublicenseInfo();
                    //     // this.subbankInfo();
                    //     this.countRequest+=1;
                    // }else{
                    //     this.sublicenseInfo();
                    //     this.subIdInfo();
                    //     // this.subbankInfo();
                    // }
                }
            })




        },
        //营业执照信息提交
        sublicenseInfo(){
            let param={
                tenantName:this.licenseInfo.tenantName,
                creditCode:this.licenseInfo.creditCode,
                creditPhoto:this.licenseInfo.creditPhoto,
                legalPerson:this.licenseInfo.legalPerson,
                interfaceCode:this.interfaceCode
            }
            server.licenseInfo(param).then(res=>{
                 if(res.data.resultCode==1){
                    this.sigleClick = false;
                    this.licenseStatus = true;
                    this.subIdInfo();
                    // this.$loading.hide();
                    this.countRequest+=1;
                }else{
                    this.sigleClick = false;
                    this.licenseStatus = false;
                    this.subIdInfo();
                    // this.$loading.hide();
                    this.countRequest-=1;
                    this.$message({
                        showClose: true,
                        message:res.data.resultMessage,
                        type: 'error'
                    })
                }
            }).catch(error=>{

            })

        },
        //身份证信息提交
        subIdInfo(){
            let params={
                userName:this.IdInfo.userName,
                idCard:this.IdInfo.idCard,
                mobile:this.IdInfo.mobile,
                interfaceCode:this.interfaceCode,
                authorizerType:this.authorizerType==true?1:0,
                frontPhoto:this.IdInfo.frontPhoto,
                backPhoto:this.IdInfo.backPhoto,
                email:this.IdInfo.email
            }
            server.IdCardInfo(params).then(res=>{
                if(res.data.resultCode==1){
                    this.sigleClick = false;
                    // this.$loading.hide();
                     this.subbankInfo();
                    this.IdStatus = true;
                    this.countRequest+=1;
                }else{
                    this.sigleClick = false;
                    this.IdStatus = false;
                    // this.$loading.hide();
                    this.subbankInfo();
                    this.countRequest-=1;
                    this.$message({
                        showClose: true,
                        message:res.data.resultMessage,
                        type: 'error'
                    })
                }

            }).catch(error=>{

            })
        },
        //银行信息提交
        subbankInfo(){
            let param={
                to_acc_name:this.bankInfo.to_acc_name,               //企业名称
                to_acc_no:this.bankInfo.to_acc_no,                     //收款账号
                to_bank_name:this.bankInfo.to_bank_name,                   //银行名称
                to_pro_name:this.bankInfo.to_pro_name,                    //开户行省名
                to_city_name:this.bankInfo.to_city_name,                   //开户行市名
                to_acc_dept:this.bankInfo.to_acc_dept,               //支行名称
            }
            let interfaceCode = this.interfaceCode;
            server.bankInfo(param,interfaceCode).then(res=>{
                if(res.data.resultCode==1){
                    this.sigleClick = false;
                    this.bankStatus = true;
                    this.$loading.hide();
                    if(this.countRequest==2){
                        this.$router.push('/EnterprisePayment');
                    }
                }else{
                    this.sigleClick = false;
                    this.bankStatus = false
                    this.$loading.hide();
                    this.$message({
                        showClose: true,
                        message:res.data.resultMessage,
                        type: 'error'
                    })
                }
            }).catch(error=>{

            })
        },
        //更新cookie
        // updateCookie(){
        //     let param={
        //         mobile:sessionStorage.getItem('mobile')
        //     };
        //     let urlParam = sessionStorage.getItem('interfaceCode')
        //     let that=this
        //     server.login(param,urlParam).then(res => {
        //         cookie.set("tenant", res.data.dataList);  //更新cookie

        //     })
        // },
        //请求成功跳转
        // success(val){
        //     if(val==2){       //执照信息和个人信息认证成功后调银行信息接口 成功后跳转
        //         if(this.licenseStatus&&this.IdStatus){
        //         this.updateCookie();
        //         }

        //     }
        // }
    },
    watch:{
        countRequest:function(val){
            // this.success(val);
        }
    }


}
</script>
<style lang="scss" scoped>
    @import "../../common/styles/content.scss";
    @import "../../common/styles/SigningSteps.css";
    @import "../../styles/CompanyCertificate/CompanyCertificate.scss";

</style>

<style>

.el-cascader-menu::-webkit-scrollbar{width:2px;}
.el-cascader-menu::-webkit-scrollbar-track{background-color:rgb(217, 217, 217);}
.el-cascader-menu::-webkit-scrollbar-thumb{background-color:rgb(205, 205, 205);}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
}
input{
    -moz-appearance:textfield;
}


</style>



