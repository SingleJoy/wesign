/*
 * @Author: wangjia
 * @Date: 2018-05-29 20:47:00
 * @Last Modified by: wangjia
 * @Last Modified time: 2018-06-26 09:20:12
 */
<template>
  <div class='Puploads'>
    <div class="Topes">
      <nav class='nav'>
        <p class='logo'>
          <img src="../../../../../static/images/logo2.png" alt="">
        </p>
      </nav>
    </div>
    <div class='contents'>
     <div class='step' style="width:720px;">
      <ul>
        <li class="active"><i class='el-icon-document'></i><b>注册</b></li>
        <p></p>
        <li class="active"><i class='el-icon-goods'></i><b>个人认证</b></li>
        <p></p>
        <li><i class='el-icon-edit'></i><b>企业认证</b></li>
        <p></p>
        <li><i class='el-icon-menu'></i><b>打款确认</b></li>
        <p></p>
        <li><i class='el-icon-check'></i><b>完成</b></li>
      </ul>
    </div>
      <div style="width: 100%;border-top: 1px solid #ddd;"></div>
    <div class='productes'>
      <div class='center'>
        <div class='container'>
          <div class="puploads-title">
            <ul>
              <li><b>证件上传</b></li>
              <li><b>信息确认</b></li>
              <li><b>完成</b></li>
            </ul>
            <p class='personInfo'>
              <span>对不起！您的实名未通过</span>
              <span>请上传被授权人身份证件信息</span>
            </p>
          </div>
          <div class="header-title-3">
            <div class='personUpload'>
              <h6><span></span><b style="color:#22a7ea;">图片示例</b></h6>
              <div class='left'>
                <div class="upload_warp">
                  <div class="upload_warp_left" @click="fileClick" style="font-size:0">
                    <img :src="IDcardFront.src" style="width:100%;height:100%;border:none;" v-show="IDcardFront.src!=null">
                  </div>
                </div>
                <div class="upload_warp_text">
                  共&nbsp;{{bytesToSize(this.size)}}
                </div>
                <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
              </div>
              <div class='right'>
                <div class="upload_warp">
                  <div class="upload_warp_left" @click="imageClick" style="font-size:0">
                    <img :src="IDcardSide.src" style="width:100%;height:100%;border:none;" v-show="IDcardSide.src!=null">
                  </div>
                </div>
                <div class="upload_warp_text">
                  共&nbsp;{{imgBytesToSize(this.imgSize)}}
                </div>
                <input @change="imgChange($event)" type="file" id="upload_img" multiple style="display: none"/>
              </div>
            </div>
              <p class='textInfo'>温馨提示:上传单张图片大小应小于2M，可支持JPEG.JPG.PNG格式图片</p>
            <div class='btns' style='clear:both'>
              <!-- <router-link to='/Home'><el-button type="primary" style='width:200px'>返回首页</el-button></router-link> -->
              <el-button type="primary" style='width:300px' @click="submitIDcardImg">提&nbsp;&nbsp;交</el-button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>
<style>
 @import "../../../../styles/Credentials/Personal/Pupload/Puploads.css";
 @import "../../../../common/styles/Topes.css";
</style>
<script>
  import cookie from '@/common/js/getTenant'
  import {prohibit} from '@/common/js/prohibitBrowser'
  export default {
    name: 'Puploads',
    data() {
      return {
        IDcardFront:'',
        IDcardSide:'',
        size: 0,
        imgSize:0,
        IDcardUrl:'',
        url:'',
        falg:false,
        isSubmit:false
      }
	},
    mounted() {
      prohibit()
    },
	created(){
        var userCode =sessionStorage.getItem('userCode')
	     	userCode = JSON.parse(userCode)
		// console.log(userCode)
	},
    methods: {
      fileClick() {
        document.getElementById('upload_file').click()
      },
      imageClick() {
        document.getElementById('upload_img').click()
      },
      fileChange(el) {
        if (!el.target.files[0].size) return;
        this.fileList(el.target);
        el.target.value = ''
      },
      imgChange(el) {
        if (!el.target.files[0].size) return;
        this.imgList(el.target);
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
            this.folders(fileList.items[i]);
          }
        }
      },
      imgList(fileList) {
        let files = fileList.files;
        for (let i = 0; i < files.length; i++) {
          //判断是否为文件夹
          if (files[i].type != '') {
            this.imgFileAdd(files[i]);
          } else {
              //文件夹处理
            this.imgfolders(imgList.items[i]);
          }
        }
      },
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
      imgfolders(files) {
        let _this = this;
        //判断是否为原生file
        if (files.kind) {
          files = files.webkitGetAsEntry();
        }
        files.createReader().readEntries(function (file) {
          for (let i = 0; i < file.length; i++) {
            if (file[i].isFile) {
              _this.imgFoldersAdd(file[i]);
            } else {
              _this.imgfolders(file[i]);
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
      imgFoldersAdd(entry) {
        let _this = this;
        entry.file(function (file) {
          _this.imgFileAdd(file)
        })
      },
      //base64 转化图片
      fileAdd(file) {
        this.$loading.show();
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
          this.$loading.hide();
          return false
        }else if(file.size > 2*1024*1024){
          this.$alert('图片大小超过限制！','上传', {
            confirmButtonText: '确定'
          });
          this.$loading.hide();
          return false
        } else {
          this.$loading.hide()
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
              _this.IDcardFront=file
            };
            image.src= file.src;

            _this.$http.post(process.env.API_HOST+'v1.4/async/imgUpload',{'image':file.src},{emulateJSON: true}).then(res =>{
              if(res.data.resultCode == '1'){
                _this.$message({
                  showClose: true,
                  message: res.data.resultMessage,
                  type: 'success'
                })
                _this.IDcardUrl = res.data.data
                _this.falg = false
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
        //后台传输图片
        // 联调

      },
      imgFileAdd(file) {
        this.$loading.show()
        if (this.limit !== undefined) this.limit--;
        if (this.limit !== undefined && this.limit < 0) return;
        //总大小

        //判断是否为图片文件
        var reg= /[.](png|PNG|jpg|JPG|jpeg|JPEG)$/
        var index = file.name.lastIndexOf('.')
       //file.type.indexOf('image') == -1
        if (!reg.test(file.name.slice(index))) {
          this.$alert('图片格式不正确!','上传', {
            confirmButtonText: '确定'
          });
          this.$loading.hide();
          return false
        } else if(file.size > 2*1024*1024){
          this.$alert('图片大小超过限制！','上传', {
            confirmButtonText: '确定'
          });
          this.$loading.hide();
          return false
        }else {
          this.$loading.hide()
          this.imgSize = file.size;
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
              _this.IDcardSide=file
            };
            image.src= file.src;

             _this.$http.post(process.env.API_HOST+'v1.4/async/imgUpload',{'image':file.src},{emulateJSON: true}).then(res =>{
              if(res.data.resultCode == '1'){
                _this.$message({
                  showClose: true,
                  message: res.data.resultMessage,
                  type: 'success'
                })
                _this.url = res.data.data
                _this.falg = false
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
      //显示大小
      bytesToSize(bytes) {
        if (bytes === 0) return '0 B';
        let k = 1024,
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];

      },
      imgBytesToSize(bytes) {
        if (bytes === 0) return '0 B';
        let k = 1024,
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
      },
      submitIDcardImg() {                          //正反面缩略图显示页面 准备提交后台
        //保存身份证正反面
        if(this.isSubmit){
          this.$message({
            message:'请勿重复提交',
            type:'warning'
          })
          return
        }
        var interfaceCode = sessionStorage.getItem('interfaceCode')
            interfaceCode = JSON.parse(interfaceCode)
        if(this.IDcardFront.src == undefined || this.IDcardSide.src == undefined){
          this.$message({
            showClose: true,
            message: '请上传身份证件照',
            type: 'error'
          })
        } else {
          if(this.falg == false){
            this.falg = true
            var userCode = sessionStorage.getItem('userCode')
                userCode = JSON.parse(userCode);
            this.$http.post(process.env.API_HOST+'v1.4/user/'+userCode+'/saveIdCardImgUrl',{'frontPhoto':this.IDcardUrl,'backPhoto':this.url,'interfaceCode':interfaceCode},{emulateJSON: true}).then(res =>{
              if(res.data.resultCode == '1'){
                this.$message({
                  showClose: true,
                  message: res.data.resultMessage,
                  type: 'success'
                })
                this.isSubmit = true;
                sessionStorage.setItem('idcard',res.data.data.idcard)
                sessionStorage.setItem('name', res.data.data.name)
                this.$router.push('/Information')
              } else if(res.data.resultCode == '-2'){
                this.$message({
                  showClose: true,
                  message: res.data.resultMessage,
                  type: 'error'
                })
                this.isSubmit = false;
              }else {
                this.$message({
                  showClose: true,
                  message: res.data.resultMessage,
                  type: 'error'
                })
                this.isSubmit = false;
                this.$router.push('/ErrorPupload')
              }
            })
          }
        }
      }
    }
  }
</script>
