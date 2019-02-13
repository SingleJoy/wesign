<template>
  <div class="Folder">
    <div class="folder-content">
      <!--/向左边切换归档文件夹箭头-->
      <div class="left-arrow" @click="slideLeft" ><p :class="{'leftActive':leftActive}"></p></div>
      <div class="folder-list">
        <div class="list-item" style="width: 100px;float: left;left: 20px;">
          <ul >
            <li style="width: 110px;" :class="{'active':(!$store.state.showFilingNo)}">
              <p class="folder-img" @click="searchFolderData()">{{defaultFolderTotalNum}}</p>
              <p class="folder-name" style="text-align: left;padding-left: 10px;">默认文件夹</p>
            </li>
          </ul>
        </div>
        <div class="list-item" style="width: 980px;">

          <div class="for-folder-list" :style="{'transform':'translateX('+nowIndex*980+'px)','transition-duration': '1.5s'}" v-if="folderListShow1">
            <ul >
              <li v-for="(item ,index) in folderListShow1" :key="index" :class="{'active':(item.filingNo==$store.state.showFilingNo)}">
                <p class="folder-img" @click="searchFolderData(item.filingNo)">{{item.contractNum}}</p>

                <p class="folder-setting"  >
                  <el-dropdown style="position: absolute;left:10px;top:10px"  trigger="click" placement="bottom" >
                  <span class="el-dropdown-link">
                      <b class="setting-img"></b>
                 </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="reNameFolder(item.filingNo,item.filingName)">重命名</el-dropdown-item>
                      <el-dropdown-item @click.native="deleteFolder(item.filingNo)">删除</el-dropdown-item>

                    </el-dropdown-menu>
                  </el-dropdown>
                </p>
                <p class="folder-name" :title="item.filingName">{{item.filingName}}</p>

              </li>
            </ul>
          </div>
          <div class="for-folder-list" :style="{'transform':'translateX('+(nowIndex+1)*980+'px)','transition-duration': '1.5s'}" v-if="folderListShow2">
            <ul >
              <li v-for="(item ,index) in folderListShow2" :key="index" :class="{'active':(item.filingNo==$store.state.showFilingNo)}">
                <p class="folder-img" @click="searchFolderData(item.filingNo)">{{item.contractNum}}</p>

                <p class="folder-setting"  >
                  <el-dropdown style="position: absolute;left:10px;top:10px"  trigger="click" placement="bottom" >
                  <span class="el-dropdown-link">
                      <b class="setting-img"></b>
                 </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="reNameFolder(item.filingNo,item.filingName)">重命名</el-dropdown-item>
                      <el-dropdown-item @click.native="deleteFolder(item.filingNo)">删除</el-dropdown-item>

                    </el-dropdown-menu>
                  </el-dropdown>
                </p>
                <p class="folder-name" :title="item.filingName">{{item.filingName}}</p>

              </li>
            </ul>
          </div>
          <div class="for-folder-list" :style="{'transform':'translateX('+(nowIndex+2)*980+'px)','transition-duration': '1.5s'}" v-if="folderListShow3">
            <ul >
              <li v-for="(item ,index) in folderListShow3" :key="index" :class="{'active':(item.filingNo==$store.state.showFilingNo)}">
                <p class="folder-img" @click="searchFolderData(item.filingNo)">{{item.contractNum}}</p>

                <p class="folder-setting"  >
                  <el-dropdown style="position: absolute;left:10px;top:10px"  trigger="click" placement="bottom" >
                  <span class="el-dropdown-link">
                      <b class="setting-img"></b>
                 </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="reNameFolder(item.filingNo,item.filingName)">重命名</el-dropdown-item>
                      <el-dropdown-item @click.native="deleteFolder(item.filingNo)">删除</el-dropdown-item>

                    </el-dropdown-menu>
                  </el-dropdown>
                </p>
                <p class="folder-name" :title="item.filingName">{{item.filingName}}</p>

              </li>
            </ul>
          </div>
          <div class="for-folder-list" :style="{'transform':'translateX('+(nowIndex+3)*980+'px)','transition-duration': '1.5s'}" v-if="folderListShow4">
            <ul >
              <li v-for="(item ,index) in folderListShow4" :key="index" :class="{'active':(item.filingNo==$store.state.showFilingNo)}">
                <p class="folder-img" @click="searchFolderData(item.filingNo)">{{item.contractNum}}</p>

                <p class="folder-setting"  >
                  <el-dropdown style="position: absolute;left:10px;top:10px"  trigger="click" placement="bottom" >
                  <span class="el-dropdown-link">
                      <b class="setting-img"></b>
                 </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="reNameFolder(item.filingNo,item.filingName)">重命名</el-dropdown-item>
                      <el-dropdown-item @click.native="deleteFolder(item.filingNo)">删除</el-dropdown-item>

                    </el-dropdown-menu>
                  </el-dropdown>
                </p>
                <p class="folder-name" :title="item.filingName">{{item.filingName}}</p>

              </li>
            </ul>
          </div>
          <div class="for-folder-list" :style="{'transform':'translateX('+(nowIndex+4)*980+'px)','transition-duration': '1.5s'}" v-if="folderListShow5">
            <ul >
              <li v-for="(item ,index) in folderListShow5" :key="index" :class="{'active':(item.filingNo==$store.state.showFilingNo)}">
                <p class="folder-img" @click="searchFolderData(item.filingNo)">{{item.contractNum}}</p>

                <p class="folder-setting"  >
                  <el-dropdown style="position: absolute;left:10px;top:10px"  trigger="click" placement="bottom" >
                  <span class="el-dropdown-link">
                      <b class="setting-img"></b>
                 </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="reNameFolder(item.filingNo)">重命名</el-dropdown-item>
                      <el-dropdown-item @click.native="deleteFolder(item.filingNo)">删除</el-dropdown-item>

                    </el-dropdown-menu>
                  </el-dropdown>
                </p>
                <p class="folder-name" :title="item.filingName">{{item.filingName}}</p>

              </li>
            </ul>
          </div>
        </div>
        <div class="list-item" style="position: absolute;right: 0;top:10px;width: 90px;">
          <div class="operate-folder">
            <div class="add-folder" @click="addFolder()"></div>
          </div>
        </div>

      </div>
      <!--向右切换归档文件夹箭头-->
      <div class="right-arrow" @click="slideRight" ><p :class="{'rightActive':rightActive}"></p></div>
    </div>
    <div class="common-top" v-if="auditSteps==3" >
      <div class="common-top-tab">
        <div @click="EnterPer" :class="{'btn-active':$store.state.showTypePanel,'btn-default':(!$store.state.showTypePanel)}">企业对个人</div>
        <div style="margin-left: -5px;" @click="EnterEnter" :class="{'btn-active':(!$store.state.showTypePanel),'btn-default':$store.state.showTypePanel}">企业对企业</div>
      </div>

    </div>

    <el-dialog title="新增文件夹" :visible.sync="addFolderShow"  custom-class="folderDialog"  :before-close="handleClose">

      <div class="add-folder-content" >
      <el-form :model="ruleForm" :rules="rulesAdd"  ref="rulesAdd">

        <el-form-item prop="folderName">
          <el-input v-model="ruleForm.folderName" placeholder="请输入合同名称" class="folderName-input"  style="width: 380px;"></el-input>
        </el-form-item>
        <div class="login-btn" style="margin-left: 200px;">
          <el-button type="default" size="medium" @click="quit">取消</el-button>
          <el-button type="primary" size="medium" @click="addSure">确定</el-button>
        </div>
      </el-form>
    </div>
    </el-dialog>
    <el-dialog title="修改文件名称" :visible.sync="editFolderShow"  custom-class="folderDialog" :before-close="handleClose">

      <div class="add-folder-content" >
        <el-form :model="ruleFormEdit" :rules="rulesEdit"  ref="rulesEdit">

          <el-form-item prop="folderName">
            <el-input v-model="ruleFormEdit.folderName" placeholder="请输入合同名称" class="folderName-input" style="width: 380px;" ></el-input>
          </el-form-item>

          <div class="login-btn" style="margin-left: 200px;">
            <el-button type="default" size="medium" @click="quit">取消</el-button>
            <el-button type="primary" size="medium" @click="editSure">确定</el-button>
          </div>

        </el-form>

      </div>
    </el-dialog>
  </div>
</template>

<script>

  import {addContractFiling,
    contractFiling,
    contractFilings,
    deleteContractFiling,
    updateContractFiling} from '@/api/folder';
  import cookie from '@/common/js/getTenant'
  import {state, actions,mutations} from '@/store/index';
  export default {
    name: 'Folder',
    data() {
      let checkFoulderName = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入文件名称"));
        } else if (((/[`~!@#$%^&*()_+<>?:"{},\/;'[\]]/im).test(value))||(/[·！#￥（）：；“”‘、，|《。》？、【】[\]]/im).test(value)) {
          callback(new Error("文件夹名称不能包含非法符号"));
        } else if(value.length>30){
          callback(new Error("文件夹名称超过30位"));
        }else{
          callback();
        }
      };
      return {
        interfaceCode:sessionStorage.getItem('interfaceCode'),
        accountCode:sessionStorage.getItem('accountCode'),
        defaultFolderTotalNum:'',  //默认文件夹合同总数
        folderList: [],
        folderListShow: [],
        folderListShow1: [],
        folderListShow2: [],
        folderListShow3: [],
        folderListShow4: [],
        folderListShow5: [],
        showFilingNo:this.$store.state.showFilingNo,
        isBtnActive:this.$store.state.isBtnActive,
        auditSteps:'',
        nowIndex:this.$store.state.nowIndex,
        leftActive:true,
        rightActive:true,
        folderNum:'',
        addFolderShow:false,
        editFolderShow:false,
        ruleForm:{
          folderName:''
        },
        ruleFormEdit:{
          folderName:''
        },
        rulesAdd:{
          folderName: [{ validator: checkFoulderName, trigger: "blur" }],
        },
        rulesEdit:{
          folderName: [{ validator: checkFoulderName, trigger: "blur" }],
        },
        defaultEditFillNo:'',
      }
    },
    
    methods:{

      EnterPer() {
        this.$store.dispatch('isBtnActive',{isBtnActive:true});
        this.$store.dispatch('PanelActiveName',{PanelActiveName:'first'});
        this.$store.dispatch('showTypePanel',{showTypePanel:true});
        this.$emit('FolderSearchData')
      },

      EnterEnter() {
        this.$store.dispatch('isBtnActive',{isBtnActive:false});
        this.$store.dispatch('PanelActiveName',{PanelActiveName:'first'});
        this.$store.dispatch('showTypePanel',{showTypePanel:false});
        this.$emit('FolderSearchData')
      },

      handleClose(done){
        this.ruleForm.folderName='';
        this.ruleFormEdit.folderName='';
        done();
      },

      reNameFolder(filingNo,filingName){
       this.editFolderShow=true;
       this.defaultEditFillNo=filingNo;
      },

      //重命名归档文件夹名称
      updateContractFiling(){
        let params={
          'filingNo':this.defaultEditFillNo,
          'filingName':this.ruleFormEdit.folderName
        };
        updateContractFiling(this.interfaceCode,this.accountCode,params).then(res=>{

          if(res.data.resultCode=='1'){
            this.$message({
              type: 'success',
              message: '修改文件夹名称成功!'
            });
            this.contractFilings();
          }else{
            this.$message({
              type: 'error',
              message: res.data.resultMessage
            });
          }

        }).catch(error=>{

        })
      },

      //删除归档文件
      deleteFolder(filingNo){
        this.$confirm('文件夹删除后，该文件夹中的合同文件将会回归未归档状态，是否删除文件夹？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {

          this.deleteContractFiling(filingNo);

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },

      // 新增文件夹，数据更新  调用兄弟组件方法
      addFolder(){
        if(this.folderList.length==50){
          this.$message({
            type: 'error',
            message: '您可新增的文件夹数量已达上限50'
          });
          return false
        }
        this.addFolderShow=true;

      },

      //新增文件夹接口
      addContractFiling(){
        let params={
          'filingName':this.ruleForm.folderName
        };
        addContractFiling(this.interfaceCode,this.accountCode,params).then(res=>{
          if(res.data.resultCode=='1'){
            this.$message({
              type: 'success',
              message: '添加新文件夹成功 '
            });
          }else{
            this.$message({
              type: 'error',
              message: res.data.resultMessage
            });
          }
          this.contractFilings();
        }).catch(error=>{

        })
      },

      // 查询所有归档文件夹接口
      contractFilings(){
        contractFilings(this.interfaceCode,this.accountCode).then(res=>{
          if(res.data.resultCode=='1'){
            this.folderList=res.data.dataList;
            this.defaultFolderTotalNum=res.data.data;
            // console.log(this.folderList.length)
            this.folderNum=Math.ceil(this.folderList.length/10);

            this.$store.dispatch('folderNum',{folderNum:this.folderNum});

            if(res.data.dataList.length<=10){
              this.leftActive=false;
              this.rightActive=false;
              this.folderListShow=this.folderList;
              this.folderListShow1=this.folderList;
              this.folderListShow2=null;
              this.folderListShow3=null;
              this.folderListShow4=null;
              this.folderListShow5=null;
            }
            else if(res.data.dataList.length>=11&&res.data.dataList.length<=20){
              this.leftActive=false;
              this.rightActive=true;
              this.folderListShow=this.folderList.slice(0,10);
              this.folderListShow1=this.folderList.slice(0,10);
              this.folderListShow2=this.folderList.slice(10,res.data.dataList.length);
              this.folderListShow3=null;
              this.folderListShow4=null;
              this.folderListShow5=null;
            }
            else if(res.data.dataList.length>=21&&res.data.dataList.length<=30){
              this.leftActive=false;
              this.rightActive=true;
              this.folderListShow=this.folderList.slice(0,10);
              this.folderListShow1=this.folderList.slice(0,10);
              this.folderListShow2=this.folderList.slice(10,20);
              this.folderListShow3=this.folderList.slice(20,res.data.dataList.length);
              this.folderListShow4=null;
              this.folderListShow5=null;
            }
            else if(res.data.dataList.length>=31&&res.data.dataList.length<=40){
              this.leftActive=false;
              this.rightActive=true;
              this.folderListShow=this.folderList.slice(0,10);
              this.folderListShow1=this.folderList.slice(0,10);
              this.folderListShow2=this.folderList.slice(10,20);
              this.folderListShow3=this.folderList.slice(20,30);
              this.folderListShow4=this.folderList.slice(30,res.data.dataList.length);
              this.folderListShow5=null;
            }
            else if(res.data.dataList.length>=41&&res.data.dataList.length<=50){
              this.leftActive=false;
              this.rightActive=true;
              this.folderListShow=this.folderList.slice(0,10);
              this.folderListShow1=this.folderList.slice(0,10);
              this.folderListShow2=this.folderList.slice(10,20);
              this.folderListShow3=this.folderList.slice(20,30);
              this.folderListShow4=this.folderList.slice(30,40);
              this.folderListShow5=this.folderList.slice(40,res.data.dataList.length);
            }
            else {
              this.leftActive=false;
              this.rightActive=true;
              this.folderListShow=this.folderList.slice(0,10);
              this.folderListShow1=this.folderList.slice(0,10);
              this.folderListShow2=this.folderList.slice(10,20);
              this.folderListShow3=this.folderList.slice(20,30);
              this.folderListShow4=this.folderList.slice(30,40);
              this.folderListShow5=this.folderList.slice(40,50);
            }
           // this.setTabState();
          }else{

          }
        }).catch(error=>{

        })
      },
      // 页面刷新 左右切换状态
      // setTabState(){
      //   if((1-this.nowIndex)>1){
      //
      //     if((1-this.nowIndex)==this.folderNum){
      //       this.rightActive=false;
      //     }else if(this.nowIndex==0){
      //       this.leftActive=false;
      //     }else{
      //       this.leftActive=true
      //     }
      //   }
      //
      //   if((1-this.nowIndex)<this.folderNum){
      //
      //     this.leftActive=true;
      //     if((1-this.nowIndex)==this.folderNum){
      //       this.rightActive=false;
      //     }else if(this.nowIndex==0){
      //       this.leftActive=false;
      //     }else{
      //       this.leftActive=true
      //     }
      //   }
      // },
      // 删除归档文件夹接口
      deleteContractFiling(filingNo){
        let params={
          'filingNo':filingNo
        };
        deleteContractFiling(this.interfaceCode,this.accountCode,params).then(res=>{

          if(res.data.resultCode=='1'){
            this.$store.dispatch('showFilingNo',{showFilingNo:''});
            this.$store.dispatch('nowIndex',{nowIndex:0});
            this.$store.dispatch('showFilingType',{showFilingType:true});
            this.$store.dispatch('showFilingTypeUnRec',{showFilingTypeUnRec:false});

            this.contractFilings();
            this.$emit('FolderSearchData');
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }else{
            this.$message({
              type: 'error',
              message: res.data.resultMessage
            });
          }

        }).catch(error=>{
        })
      },

      searchFolderData(filingNo){
        this.$store.dispatch('PanelActiveName',{PanelActiveName:'first'});
        this.$store.dispatch('showTypePanel',{showTypePanel:true});

        if(filingNo){
          this.$store.dispatch('showFilingNo',{showFilingNo:filingNo});
          this.$store.dispatch('showFilingNoDefault',{showFilingNoDefault:filingNo});
          this.$store.dispatch('showFilingType',{showFilingType:false});
          this.$store.dispatch('showFilingTypeUnRec',{showFilingTypeUnRec:true});
        }else {
          this.$store.dispatch('showFilingNo',{showFilingNo:''});
          this.$store.dispatch('showFilingNoDefault',{showFilingNoDefault:''});
          this.$store.dispatch('showFilingType',{showFilingType:true});
          this.$store.dispatch('showFilingTypeUnRec',{showFilingTypeUnRec:false});
        }
        this.$emit('changeDefaultFillNo');
        this.$emit('FolderSearchData');
        this.$emit('defaultSelectValue');
      },

      slideLeft(){

        if((1-this.nowIndex)>1){
          this.nowIndex=this.nowIndex+1;
          this.rightActive=true;
          this.$store.dispatch('nowIndex',{nowIndex:this.nowIndex});
          if((1-this.nowIndex)==this.folderNum){
            this.rightActive=false;
          }else if(this.nowIndex==0){
            this.leftActive=false;
          }
        }else{
          return false
        }
        console.log("当前文件夹是:"+(1-this.nowIndex)+"页");
      },

      slideRight(){
        if((1-this.nowIndex)<this.folderNum){
           this.nowIndex=this.nowIndex-1;
           this.leftActive=true;
           this.$store.dispatch('nowIndex',{nowIndex:this.nowIndex});
            if((1-this.nowIndex)==this.folderNum){
              this.rightActive=false;
            }else if(this.nowIndex==0){
              this.leftActive=false;
            }
        }else{
          return false
        }
        console.log("当前文件夹是:"+(1-this.nowIndex)+"页");
      },

      addSure(){
        this.$refs.rulesAdd.validate(valid => {
          if (valid) {
             this.addContractFiling();
            this.editFolderShow=false;
            this.addFolderShow=false;
            this.ruleForm.folderName='';
            this.ruleFormEdit.folderName='';
          }else{

          }
        });
      },

      editSure(){
        this.$refs.rulesEdit.validate(valid => {
          if (valid) {
            this.updateContractFiling();
            this.editFolderShow=false;
            this.addFolderShow=false;
            this.ruleForm.folderName='';
            this.ruleFormEdit.folderName='';
          }else{

          }
        });
      },

      quit(){
         this.editFolderShow=false;
         this.addFolderShow=false;
         this.ruleFormEdit.folderName='';
         this.ruleForm.folderName='';
      }
    },
    created(){
      this.auditSteps = cookie.getJSON('tenant')[1].auditSteps;
      this.contractFilings();
      //页面刷新 左右切换滑动  按钮 active状态

    }

  }
</script>


<style lang="scss" scoped>
  @import "../../common/styles/content.scss";
  @import "../../common/styles/Folder.scss";

</style>
<style>
 .folderDialog,.add-folder-content{
    width: 420px!important;
    height: 196px!important;
  }
  .folderName-input{
   width: 360px;
    /*padding: 0 15px;*/
    /*height: 40px;*/
    /*border: 1px solid #ddd;*/
    border-radius: 4px;
  }
</style>
