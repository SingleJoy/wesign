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
                                            :before-upload="beforeLicenseUpload"
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
                                <div class="company-input" v-if="licenseStatus">
                                    <div class="input-item">
                                        <span class="input-title">企业名称</span>
                                        <el-input
                                            style='width:336px'
                                            placeholder="请输入内容"
                                            v-model="licenseForm.tenantName"
                                            @blur='enterpriseName'
                                            :disabled= fullName
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
                                            :disabled= fullName
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
                                            :disabled= fullName
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
                        <el-radio v-model="adminType" label="1" style='float:left;padding-top: 5px;'>法人本人</el-radio>
                        <el-radio v-model="adminType" label="2" style='float:left;padding-top: 5px;'>被授权人</el-radio>
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
                                                :before-upload="beforeIdUpload"
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
                                                :before-upload="beforeIdUpload"
                                                :on-success="handIdBackSuccess"
                                                :show-file-list=false
                                                >
                                                <div class="upload_warp"></div>
                                            </el-upload>
                                            <div class="img_warp"  v-if="IdBackImg">
                                                     <img id="IdBackImg" :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+IdBackImg" class="avatar">
                                            </div>
											<div class="upload_warp_text">
												共&nbsp;{{bytesToSize(this.IdCardFrontSize)}}
											</div>
                                            <p class="view-example" style="text-align:center"  @click="viewExample('backId')">查看示例</p>
											<!-- <input @change="idCardChange($event,'back')" type="file" id="upload_img" multiple style="display: none"/> -->
										</div>
									</div>

                                </div>
								<p class="upload-tip">温馨提示：上传单张图片大小应小于5M,可支持JPEG、JPG、PNG格式</p>

                                 <div class="company-input" v-if="licenseStatus">
                                    <div class="input-item">
                                        <span class="input-title">法人姓名</span>
                                        <el-input
                                            style='width:336px'
                                            placeholder="请输入内容"
                                            v-model="IdInfo.name"
                                            @blur='enterpriseName'
                                            :disabled= fullName
                                        >
                                        </el-input>
                                    </div>
                                     <div class="input-item">
                                        <span class="input-title">身份证号</span>
                                        <el-input
                                            style='width:336px'
                                            placeholder="请输入内容"
                                            v-model="IdInfo.idcard"
                                            @blur='enterpriseName'
                                            :disabled= fullName
                                        >
                                        </el-input>
                                    </div>
                                    <div class="input-item">
                                        <span class="input-title">手机号</span>
                                        <el-input
                                            style='width:336px;'
                                            placeholder="请输入内容"
                                            v-model="IdInfo.mobile"
                                            @blur='enterpriseName'
                                            :disabled= fullName
                                        >
                                        </el-input>
                                    </div>
                                     <div class="input-item">
                                        <span class="input-title">验证码</span>
                                        <el-input
                                            style='width:336px;'
                                            placeholder="请输入内容"
                                            v-model="IdInfo.smsCode"
                                            @blur='enterpriseName'
                                            :disabled= fullName
                                        >
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                <div class="public-account-info">
                     <div class="title-bg">
                        <span class="title-name">对公账户信息</span>
                    </div>
                     <!-- <div class="content-bg"> -->
                            <div class="content-box">
                                <div class="company-input">
                                    <div class="input-item">
                                        <span class="input-title">企业名称</span>
                                        <el-input
                                            style='width:336px;'
                                            placeholder="请输入内容"
                                            v-model="companyForm.tenantName"
                                            @blur='enterpriseName'
                                            :disabled= fullName
                                        >
                                        </el-input>
                                    </div>
                                     <div class="input-item">
                                        <span class="input-title">企业银行账号</span>
                                        <el-input
                                            style='width:336px'
                                            placeholder="请输入内容"
                                            v-model="companyForm.bankNum"
                                            @blur='enterpriseName'
                                            :disabled= fullName
                                        >
                                        </el-input>
                                    </div>
                                    <div class="input-item">
                                        <span class="input-title">银行名称</span>
                                        <el-input
                                            style='width:336px;'
                                            placeholder="请输入内容"
                                            v-model="companyForm.bankName"
                                            @blur='enterpriseName'
                                            :disabled= fullName
                                        >
                                        </el-input>
                                    </div>
									 <div class="input-item">
                                        <span class="input-title">开户行所在省／市</span>
                                        <el-input
                                            style='width:336px;'
                                            placeholder="请输入内容"
                                            v-model="companyForm.city"
                                            @blur='enterpriseName'
                                            :disabled= fullName
                                        >
                                        </el-input>
                                    </div> <div class="input-item">
                                        <span class="input-title">开户行支行名称</span>
                                        <el-input
                                            style='width:336px;'
                                            placeholder="请输入内容"
                                            v-model="companyForm.bank"
                                            @blur='enterpriseName'
                                            :disabled= fullName
                                        >
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                    <!-- </div> -->

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
export default {
    name:'',
    data() {
        return {
            baseURL:this.baseURL.BASE_URL,
            license:{
                src:null
            },
            licenseSize:0,             //营业执照大小
            licenseInfoEdit:false,   //营业执照信息
            licenseStatus:false,        //营业执照上传状态是否正确
            licenseForm:{           //企业信息
                tenantName:'naem',
                creditCode:'23432432432',
                legalPerson:'ewre',
            },
            licenseExample:false,
            frontIdExample:false,
            backIdExample:false,
            IdInfo:{
                idcard:'',
                name:'',
                mobile:'',
                smsCode:''
            },
            IdFrontImg:'',           //正面img
            IdBackImg:'',             //反面img
            IdCardFrontSize:0, //身份证正面
            IdCardBackSize:0, //身份证反面
            adminType:'1',    //管理员了类型
           
            companyStatus:true,
            companyForm:{
                tenantName:'',
                bankNum:'',
                bankName:'',
                city:'',
                bank:''

            },

            fullName:false,

            //管理员信息(身份证正反面)
            IDcardFront:{
                src:''
            },
            IDcardSide:{
                src:''
            }

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
        beforeLicenseUpload(file){
            var max_size = 5; // 5M
            var reg= /[.](png|PNG|jpg|JPG|jpeg|JPEG)$/
            var index = file.name.lastIndexOf('.')
            if(!reg.test(file.name.slice(index))) {
                this.$alert('图片格式不正确!','上传', {
                    confirmButtonText: '确定'
                });
                return false
            }else if(file.size > 2*1024*1024){
                this.$alert('图片大小超过限制！','上传', {
                    confirmButtonText: '确定'
                });
                return false
            } else {

            }

        },

        //身份证上传校验
        beforeIdUpload(){

        },
        //正面上传成功
        handIdFrontSuccess(name, file, fileList){
            console.log(name)
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
        //上传成功
        handleicenseSuccess(){

        },
        //身份证上传
        handIdSuccess(){

        },
        
        //企业信息上传事件
        fileClick() {
            document.getElementById('upload_file').click()
        },
        //上传文件
        fileChange(el) {
            if (!el.target.files[0].size) return;
            this.fileList(el.target);
            el.target.value = ''
        },
        fileList(fileList) {
            let files = fileList.files;
            console.log(files)
            for (let i = 0; i < files.length; i++) {
            //判断是否为文件夹
            if (files[i].type != '') {
                this.fileAdd(files[i]);
            } else {
                //文件夹处理
                if(fileList.items){
                this.folders(fileList.items[i]);
                }else{
                this.$alert('图片格式不正确!','上传', {
                    confirmButtonText: '确定'
                });
                }
            }
            }
        },
        fileAdd(file) {
            if (this.limit !== undefined) this.limit--;
            if (this.limit !== undefined && this.limit < 0) return;

            //判断是否为图片文件
            var reg= /[.](png|PNG|jpg|JPG|jpeg|JPEG)$/
            var index = file.name.lastIndexOf('.')
            if(!reg.test(file.name.slice(index))) {
                this.$alert('图片格式不正确!','上传', {
                    confirmButtonText: '确定'
                });
                return false
            }else if(file.size > 2*1024*1024){
                this.$alert('图片大小超过限制！','上传', {
                    confirmButtonText: '确定'
                });
                return false
            } else {
            document.getElementById('firstFile').style.display='none';
            this.size = file.size;
            let reader = new FileReader();
            let image = new Image();
            let that=this;
            reader.readAsDataURL(file);
            reader.onload = function () {
                file.src = this.result;
                image.onload=function(){
                    let width = image.width;
                    let height = image.height;
                    file.width=width;
                    file.height=height;
                    that.license=file
                };
                image.src= file.src;
                console.log(file)
                let param={
                    "image":image.src
                }
                that.licenseStatus = true;
                // server.license(param).then(res=>{
                //     if(res.data.resultCode == '1'){
                //         that.$message({
                //             showClose: true,
                //             message: res.data.resultMessage,
                //             type: 'success'
                //         })
                //         that.licenseStatus = true;
                //     } else {
                //         that.$message({
                //             showClose: true,
                //             message: res.data.resultMessage,
                //             type: 'error'
                //         })
                //         that.licenseStatus = false;
                //     }
                // })
               
                }
            }
        },

         //文件夹处理
        folders(files) {
            let _this = this;
            //判断是否为原生file
            if (files.kind) {
            files = files.webkitGetAsEntry();
            }
            files.createReader().readEntries(function (file) {
            for (let i = 0; i < file.length; i++) {
                if (file[i].isFile) {
                _this.foldersAdd(file[i]);
                } else {
                _this.folders(file[i]);
                }
            }
            })
        },

        foldersAdd(entry) {
            let _this = this;
            entry.file(function (file) {
            _this.fileAdd(file)
            })
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

        //点击触发上传
        idImgClick(type){

        },
        //身份证照片
        idCardChange(e,type){

        },

        //取消
        cancelIDcard(){

        },
        //提交
        submitIDcard(){

        }


    }
}
</script>
<style lang="scss" scoped>
    @import "../../common/styles/content.scss";
    @import "../../styles/CompanyCertificate/CompanyCertificate.scss";

</style>


