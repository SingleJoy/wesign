/*
* @Author: wangjia
* @Date: 2018-06-21 10:28:02
* @Last Modified by: wangjia
* @Last Modified time: 2018-06-26 13:20:31
*/
<template>
  <div>
    <div class="Topes" style="position: fixed;top:0;z-index: 999">
      <nav class='nav'>
        <p class='logo'>
          <img src="../../../../static/images/logo2.png" alt="">
        </p>
        <div class='buttons'>
          <el-button type="info" style='background:#ccc' @click="cancelSign">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
          <el-button style='color:#22a7ea' @click="entCertification">提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交</el-button>
        </div>
      </nav>
    </div>
    <div class='Enterprises' style="margin-top: 100px;z-index: 9;">
      <div class='step' style="width:720px;">
        <ul>
          <li class="active"><i class='el-icon-document'></i><b>注册</b></li>
          <p></p>
          <li class="active"><i class='el-icon-goods'></i><b>个人认证</b></li>
          <p></p>
          <li class="active"><i class='el-icon-edit'></i><b>企业认证</b></li>
          <p></p>
          <li ><i class='el-icon-menu'></i><b>打款确认</b></li>
          <p></p>
          <li ><i class='el-icon-check'></i><b>完成</b></li>
        </ul>
      </div>
      <div class='productes'>
        <h2 class='title' style='padding-left:15px;padding-top: 20px;'>
          <img src="../../../../static/images/Confirmation/Enterprise/title.jpg" alt="">
        </h2>
        <div class='center'>
          <div class='container'>
            <div class='firstSelect'>
              <span>企业类型</span>
              <el-select v-model="enterpriseType" slot="prepend" placeholder="请选择" style='width:336px;height:20px;'>
                <el-option label="有限责任公司" value="1"></el-option>
                <el-option label="股份有限公司" value="2"></el-option>
                <el-option label="个体\私营企业" value="3"></el-option>
                <el-option label="非盈利组织" value="4"></el-option>
                <el-option label="外资独资\合资" value="5"></el-option>
              </el-select>
            </div>
            <div class='second'>
              <span>企业全称</span>
              <el-input
                style='width:336px;height:20px;'
                placeholder="请输入内容"
                v-model="tenantName"
                @blur='enterpriseName'
                :disabled= fullName
              >
              </el-input>

              <p class='secondTitle' style="text-align:left">支持中国大陆工商局或市场监督管理局登记的企业。请填写工商营业执照上的企业全称。</p>
            </div>
            <div class='second'>
              <span style='margin-left:-53px;'>统一社会信用代码</span>
              <el-input
                style='width:336px;height:20px;'
                placeholder="请输入内容"
                v-model="creditCode"
                :maxlength=25
              >
              </el-input>
              <p class='secondTitle' style="color:#ff0040;"></p>
            </div>
            <div class='third' style="margin-top:20px;">
              <span class='thirdInfo'>法人代表/企业负责人姓名</span>
              <el-input
                style="width:336px;height:20px;margin-left:11px;"
                placeholder="请输入内容"
                v-model="legalPerson"
                :maxlength=15
              >
              </el-input>
              <p class='secondTitle'>如果属于分公司则填写工商营业执照上明确的负责人,个体工商户请填写经营者姓名,合伙企业请填写合伙人姓名，个人独资企业请填写投资人姓名，企业法人的非法人分支机构填写负责人。</p>
              <a href="javascript:void(0)" class='check' @click="dialogAgreement = true">查看示例</a>
              <el-dialog
                :visible.sync="dialogAgreement"
                width="500px"
              >
                <img src="../../../../static/images/case.png" alt="" style="width:100%;height:100%;">
              </el-dialog>
            </div>
            <div class='four' style="clear: both;">
              <span  class='fourInfo' style='float:left'>营业执照</span>
              <div  style='float:left'>

                <div class="upload_warp">
                  <div class="upload_warp_left " @click="fileClick" style="font-size:0;position:relative" >
                    <i class='el-icon-plus' style="font-size:60px;display:block;position:absolute;left:0;right:0;top:60px;bottom:0;" id='firstFile'></i>
                    <img :src="imgList.src" style="width:100%;height:100%;border:none;" v-show="imgList.src!=null">
                  </div>
                </div>
                <div class="upload_warp_text">
                  共{{bytesToSize(this.size)}}
                </div>
                <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>

              </div>
            </div>
            <div style='clear:both' class='person'>
              <div class='personInfo' style='float:left;margin-left:25%;'>本人角色</div>
              <el-radio v-model="radio" label="1" style='float:left;padding-top: 5px;'>企业授权人</el-radio>
              <el-radio v-model="radio" label="2" style='float:left;padding-top: 5px;'>企业法人</el-radio>
              <a href="javascript:void(0)" class='check' style='visibility: hidden;'>查看示例</a>
            </div>
            <div class='four' style="clear: both;">
              <span  class='fourInfo' style='float:left'>认证授权书</span>
              <div class='11221' style='float:left'>

                <div class="upload_warp">
                  <div class="upload_warp_left" @click="Uploadclick" style="font-size:0;position:relative">
                    <i class='el-icon-plus' style="font-size:60px;display:block;position:absolute;left:0;right:0;top:60px;bottom:0;" id='secondFile'></i>
                    <img :src="proxyImg.src" style="width:100%;height:100%;border:none;" v-show="proxyImg.src!=null">
                  </div>
                </div>
                <div class="upload_warp_text">
                  共{{UploadBytesToSize(this.fileSize)}}
                </div>
                <input @change="UploadChange($event)" type="file" id="upload_proxy" multiple style="display: none"/>

              </div>
            </div>
            <div class='agreement' style='clear:both'>
              <p>如果为法人本人操作请下载<a href='javascript:void(0);' @click="coveringLetter">法人说明函</a></p>
              <p>一般企业请下载<a href='javascript:void(0);' @click='authorization'>一般企业认证授权书</a></p>
              <p>个体请下载<a href='javascript:void(0);' @click="letterAttorney">个体工商户认证授权书</a></p>
              <p>上传加盖企业公章的原件照片或扫描件</p>
              <p>支持.jpg .jpeg .png格式照片，大小不超过2M.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import { Message } from 'element-ui';
  import { validateCredit,validateOpenName, TrimAll} from '@/common/js/validate'
  export default {
    name: 'Enterprises',
    data() {
      return {

        tenantName:'',
        enterpriseType:'',
        creditCode:'',
        legalPerson:'',
        authorizerType:'',
        creditPhoto:'',
        authorizationPhoto:'',
        imgList: '',
        proxyImg:'',
        size: 0,
        fileSize:0,
        dialogAgreement:false,
        radio:'1',
        fullName:true
      }
    },
    created() {
      var enterpriseName = sessionStorage.getItem('enterpriseName')
      this.tenantName = enterpriseName
    },
    methods: {
      enterpriseName() {
        if(this.input10 ==''){
          //验证消息
        }
      },
      creditInfo() {
        // var reg = /^[0-9a-zA-Z]+$/;
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/   //必须为数字和字母组合
        if(TrimAll(this.creditCode) == ''){
          // this.$alert('统一社会信用代码不能为空！','企业认证', {
          //   confirmButtonText: '确定'
          // });
          this.$message({
            showClose: true,
            message: '统一社会信用代码不能为空！',
            type: 'warning'
          })
          return false
        }else if(TrimAll(this.creditCode) != '' && !reg.test(TrimAll(this.creditCode))){
          // this.$alert('统一社会信用代码格式错误！','企业认证', {
          //   confirmButtonText: '确定'
          // });
          this.$message({
            showClose: true,
            message: '统一社会信用代码格式错误！',
            type: 'warning'
          })
          return false
        }
      },
      nonnumeric() {
        if(this.legalPerson == ''){
          // this.$alert('法人代表/企业负责人姓名不能为空！','企业认证', {
          //   confirmButtonText: '确定'
          // })
          this.$message({
            showClose: true,
            message: '法人代表/企业负责人姓名不能为空！',
            type: 'warning'
          })
          return false
        }else if(TrimAll(this.legalPerson) != '' && !validateOpenName(TrimAll(this.legalPerson))){
          // this.$alert('法人代表/企业负责人姓名格式错误！','企业认证', {
          //   confirmButtonText: '确定'
          // })
           this.$message({
            showClose: true,
            message: '法人代表/企业负责人姓名格式错误！',
            type: 'warning'
          })
          return false
        }
      },
      cancelSign() {    //取消操作
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, ' 确定将返回登录页'),
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
                this.$router.push('/')
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
      //设置
      fileClick() {
        document.getElementById('upload_file').click()
      },
      Uploadclick() {
        document.getElementById('upload_proxy').click()
      },
      fileChange(el) {
        if (!el.target.files[0].size) return;
        this.fileList(el.target);
        el.target.value = ''
      },
      UploadChange(el) {
        if (!el.target.files[0].size) return;
        this.UploadList(el.target);
        el.target.value = ''
      },
      fileList(fileList) {
        let files = fileList.files;
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
      UploadList(UploadList) {
        let files = UploadList.files;
        for (let i = 0; i < files.length; i++) {
          //判断是否为文件夹
          if (files[i].type != '') {
            this.UploadFileAdd(files[i]);
          } else {
            //文件夹处理
            if(UploadList.items){
              this.UploadFolders(UploadList.items[i]);
            }else{
              this.$alert('图片格式不正确!','上传', {
                confirmButtonText: '确定'
              });
            }
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
      //文件夹处理
      UploadFolders(files) {
        let _this = this;
        //判断是否为原生file
        if (files.kind) {
          files = files.webkitGetAsEntry();
        }
        files.createReader().readEntries(function (file) {
          for (let i = 0; i < file.length; i++) {
            if (file[i].isFile) {
              _this.UploadFoldersAdd(file[i]);
            } else {
              _this.UploadFolders(file[i]);
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

      UploadFoldersAdd(entry) {
        let _this = this;
        entry.file(function (file) {
          _this.UploadFileAdd(file)
        })
      },
      //base64 转化图片
      fileAdd(file) {
        if (this.limit !== undefined) this.limit--;
        if (this.limit !== undefined && this.limit < 0) return;
        //总大小

        //判断是否为图片文件
        var reg= /[.](png|PNG|jpg|JPG|jpeg|JPEG)$/
        var index = file.name.lastIndexOf('.')
        if (!reg.test(file.name.slice(index))) {
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
          let _this=this;
          reader.readAsDataURL(file);
          reader.onload = function () {
            file.src = this.result;
            image.onload=function(){
              let width = image.width;
              let height = image.height;
              file.width=width;
              file.height=height;
              _this.imgList=file
            };
            image.src= file.src;

            _this.$http.post(process.env.API_HOST+'v1.4/async/imgUpload',{'image':file.src},{emulateJSON: true}).then(res =>{
              if(res.data.resultCode == '1'){
                _this.$message({
                  showClose: true,
                  message: res.data.resultMessage,
                  type: 'success'
                })
                _this.creditPhoto = res.data.data
              } else {
                _this.$message({
                  showClose: true,
                  message: res.data.resultMessage,
                  type: 'error'
                })
              }
            })
          }
        }
        // 联调
      },
      UploadFileAdd(file) {
        if (this.limit !== undefined) this.limit--;
        if (this.limit !== undefined && this.limit < 0) return;

        //判断是否为图片文件
        var reg= /[.](png|PNG|jpg|JPG|jpeg|JPEG)$/
        var index = file.name.lastIndexOf('.')
        if (!reg.test(file.name.slice(index))) {
          this.$alert('图片格式不正确!','上传', {
            confirmButtonText: '确定'
          });
          return false
        } else if(file.size > 2*1024*1024){
          this.$alert('图片大小超过限制！','上传', {
            confirmButtonText: '确定'
          });
          return false
        }else {
          //大小
          document.getElementById('secondFile').style.display='none';
          this.fileSize =  file.size;
          let reader = new FileReader();
          let image = new Image();
          let _this=this;
          reader.readAsDataURL(file);
          reader.onload = function () {
            file.src = this.result;
            image.onload=function(){
              let width = image.width;
              let height = image.height;
              file.width=width;
              file.height=height;
              _this.proxyImg=file
            };
            image.src= file.src;

            _this.$http.post(process.env.API_HOST+'v1.4/async/imgUpload',{'image':file.src},{emulateJSON: true}).then(res =>{
              if(res.data.resultCode == '1'){
                _this.$message({
                  showClose: true,
                  message: res.data.resultMessage,
                  type: 'success'
                })
                _this.authorizationPhoto = res.data.data
              } else {
                _this.$message({
                  showClose: true,
                  message: res.data.resultMessage,
                  type: 'error'
                })
              }
            })
          }
        }
      },
      //删除图片
      fileDel(index) {
        this.size = this.size - this.imgList[index].file.size;//总大小
        this.imgList.splice(index, 1);
        if (this.limit !== undefined) this.limit = this.imgList.length;
      },
      //显示大小
      bytesToSize(bytes) {
        if (bytes === 0) return '0 B';
        let k = 1024,
          sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
      },
      UploadBytesToSize(bytes) {
        if (bytes === 0) return '0 B';
        let k = 1024,
          sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
      },
      dragenter(el) {
        //是否支持拖拽
        el.stopPropagation();
        el.preventDefault();
      },
      dragover(el) {
        //是否支持拖拽
        el.stopPropagation();
        el.preventDefault();
      },
      drop(el) {
        //是否支持拖拽
        el.stopPropagation();
        el.preventDefault();
        this.fileList(el.dataTransfer);
      },

      //企业认证
      entCertification(){
        let that = this;
        if(this.enterpriseType ==''){
          //  this.$alert('请选择企业类型','提示', {
          //   confirmButtonText: '确定'
          // });
           this.$message({
            showClose: true,
            message: '请选择企业类型',
            type: 'warning'
          })
          
          return false
        }
        if(this.radio == '1'){
          this.authorizerType = '1'
        }else {
          this.authorizerType = '0'
        }
        if(this.creditInfo() == false){ //信用代码校验
          return false
        }
        if(this.nonnumeric() == false){
          return false
        }
        if(this.creditPhoto == ''){
          // this.$alert('营业执照未上传！','上传', {
          //   confirmButtonText: '确定'
          // });
          this.$message({
            showClose: true,
            message: '营业执照未上传！',
            type: 'warning'
          })
          return false
        }
        if(this.authorizationPhoto == ''){
          // this.$alert('认证授权书未上传！','上传', {
          //   confirmButtonText: '确定'
          // });
          this.$message({
            showClose: true,
            message: '认证授权书未上传！',
            type: 'warning'
          })
          return false
        }

        var interfaceCode = sessionStorage.getItem('interfaceCode')
        interfaceCode = JSON.parse(interfaceCode)
        that.$http.post(process.env.API_HOST+'v1.4/tenant/'+interfaceCode+'/authentication',{
          'tenantName':this.tenantName,//企业名称
          'enterpriseType':this.enterpriseType,//企业类型
          'creditCode':this.creditCode,//信用代码
          'legalPerson':this.legalPerson,//法人
          'creditPhoto':this.creditPhoto,//信用代码证书
          'authorizerType':this.authorizerType,//授权人类型(0企业法人、1企业授权人)
          'authorizationPhoto':this.authorizationPhoto//授权书
        },{emulateJSON: true}).then(res =>{
          if (res.data.resultCode == '1') {
            that.$message({
              showClose: true,
              message: res.data.resultMessage,
              type: 'success'
            })
            this.$router.push('/Payment')
          } else {
            that.$message({
              showClose: true,
              message: res.data.resultMessage,
              type: 'warning'
            })
          }
        })
      },
      coveringLetter (){
        var way = '1'
        var url = process.env.API_HOST+'v1.4/tenant/downloadFile?fileType='+way;
        var up = document.createElement('a');
        document.body.appendChild(up)
        up.setAttribute('href',url);
        up.click()
      },
      authorization () {
        var way = '2'
        var url = process.env.API_HOST+'v1.4/tenant/downloadFile?fileType='+way;
        var up = document.createElement('a');
        document.body.appendChild(up)
        up.setAttribute('href',url);
        up.click()
      },
      letterAttorney() {
        var way = '3'
        var url = process.env.API_HOST+'v1.4/tenant/downloadFile?fileType='+way;
        var up = document.createElement('a');
        document.body.appendChild(up)
        up.setAttribute('href',url);
        up.click()
      }
    }
  }
</script>
<style scoped>
  @import "../../../styles/Confirmation/Enterprise/Enterprises.css";
  @import "../../../common/styles/Topes.css";
</style>
