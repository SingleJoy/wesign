<template>
  <div class="Folder">
    <div class="folder-content">
      <div class="left-arrow"><p></p></div>
      <div class="folder-list">
        <div class="list-item">
          <ul >
            <li style="width: 80px;" :class="{'active':(!showFilingNo)}">
              <p class="folder-img" @click="searchFolderData(null)"></p>
              <p class="folder-name" >默认文件夹</p>
            </li>
            <li v-for="(item ,index) in folderList" :key="index" :class="{'active':(item.filingNo==showFilingNo)}">
              <p class="folder-img" @click="searchFolderData(item.filingNo)"></p>
              <p class="folder-num" >{{item.parentFilingNo}}</p>
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
              <p class="folder-name" :title=item.name>{{item.filingName}}</p>

            </li>
            <li class="add-folder" @click="addFolder()">

            </li>
          </ul>
        </div>
      </div>
      <div class="right-arrow"><p></p></div>
    </div>
    <div class="common-top">
      <div class="common-top-tab">
        <div @click="EnterPer(showFilingNo)" :class="{'btn-active':isBtnActive,'btn-default':!isBtnActive}">企业对个人</div>
        <div style="margin-left: -5px;" @click="EnterEnter(showFilingNo)" :class="{'btn-active':!isBtnActive,'btn-default':isBtnActive}">企业对企业</div>
      </div>

  </div>
  </div>
  </template>

  <script>
    import {addContractFiling,
    contractFiling,
    contractFilings,
    deleteContractFiling,
    updateContractFiling} from '@/api/folder'
  import {state, actions,mutations} from '@/store/index';
  export default {
    name: 'Folder',
    data() {
      return {
        interfaceCode:sessionStorage.getItem('interfaceCode'),
        accountCode:sessionStorage.getItem('accountCode'),
        folderList: [],
        showFilingNo:this.$store.state.showFilingNo,
        isBtnActive:this.$store.state.isBtnActive,
      }
    },
    methods:{
      EnterPer(showFilingNo) {
        this.$store.dispatch('showFilingNo',{showFilingNo:showFilingNo});
        this.$store.dispatch('isBtnActive',{isBtnActive:true});
        sessionStorage.setItem("B2BPanelActiveName",'');
        sessionStorage.setItem("B2CPanelActiveName",'');
        this.$router.push("/Mycontract")
      },
      EnterEnter(showFilingNo) {
        this.$store.dispatch('showFilingNo',{showFilingNo:showFilingNo});
        this.$store.dispatch('isBtnActive',{isBtnActive:false});
        sessionStorage.setItem("B2BPanelActiveName",'');
        sessionStorage.setItem("B2CPanelActiveName",'');
        this.$router.push("/CompanyContract")
      },
      //重命名归档文件夹名称
      reNameFolder(filingNo,filingName){

        this.$prompt('重命名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: '',
          inputErrorMessage: '文件夹名称不能包含非法符号且30位以内！'
        }).then(({ value }) => {

          this.updateContractFiling(filingNo,value);
        }).catch(() => {

        });
      },

      //删除归档文件
      deleteFolder(filingNo){
        console.log(filingNo)
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
      addFolder(filingName){
        this.$prompt('新增文件夹', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: '',
          inputErrorMessage: '文件夹长度最多30位'
        }).then(({ value }) => {
          //输入文件夹名称格式正确调用
          this.addContractFiling(value);
        }).catch(() => {

        });
      },

      //新增文件夹接口
      addContractFiling(value){
        let params={
          'filingName':value
        };
        addContractFiling(this.interfaceCode,this.accountCode,params).then(res=>{
          console.log(res)
          let resultCode = res.data.resultCode;

          if(resultCode=='0'){
            this.$message({
              type: 'success',
              message: '添加新文件夹成功 '
            });
          }
          this.contractFilings();
        }).catch(error=>{

        })
      },

      //重命名件夹接口
      updateContractFiling(filingNo,filingName){
        let params={
          'filingNo':filingNo,
          'filingName':filingName,
        };
        updateContractFiling(this.interfaceCode,this.accountCode,params).then(res=>{
          console.log(res);

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

      // 查询所有归档文件夹接口
      contractFilings(){

        contractFilings(this.interfaceCode,this.accountCode).then(res=>{

          let resultCode = res.data.resultCode
          if(resultCode=='1'){
           this.folderList=res.data.data;
          }else{

          }
        }).catch(error=>{

        })
      },

      // 删除归档文件夹接口
      deleteContractFiling(filingNo){
        let params={
          'filingNo':filingNo
        };
        deleteContractFiling(this.interfaceCode,this.accountCode,params).then(res=>{
          // console.log(res);

          if(res.data.resultCode=='1'){
            // this.$store.dispatch('showFilingNo',{showFilingNo:''})
            this.contractFilings();
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

        this.$store.dispatch('showFilingNo',{showFilingNo:filingNo});
        this.$emit('FolderSearchData')
      }
    },
    created(){
       this.contractFilings();
    }

  }
</script>


<style lang="scss" scoped>
  @import "../../common/styles/content.scss";
  @import "../../common/styles/Folder.scss";

</style>
