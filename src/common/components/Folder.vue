<template>
  <div class="Folder">
    <div class="folder-content">
      <div class="left-arrow" @click="slideLeft"><p></p></div>
      <div class="folder-list">
        <div class="list-item" style="width: 80px;float: left;">
          <ul >
            <li style="width: 80px;" :class="{'active':(!$store.state.showFilingNo)}">
              <p class="folder-img" @click="searchFolderData(null)"></p>
              <p class="folder-name" >默认文件夹</p>
            </li>
          </ul>
        </div>
        <div class="list-item" style="width: 980px;">

            <div class="for-folder-list" :style="{'transform':'translateX('+nowIndex*980+'px)'}" v-if="folderListShow1">
              <ul >
                <li v-for="(item ,index) in folderListShow1" :key="index" :class="{'active':(item.filingNo==$store.state.showFilingNo)}">
                  <p class="folder-img" @click="searchFolderData(item.filingNo)"></p>
                  <p class="folder-num" >{{item.contractNum}}</p>
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
              </ul>
            </div>
            <div class="for-folder-list" :style="{'transform':'translateX('+(nowIndex+1)*980+'px)'}" v-if="folderListShow2">
              <ul >
                <li v-for="(item ,index) in folderListShow2" :key="index" :class="{'active':(item.filingNo==$store.state.showFilingNo)}">
                  <p class="folder-img" @click="searchFolderData(item.filingNo)"></p>
                  <p class="folder-num" >{{item.contractNum}}</p>
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
              </ul>
            </div>
            <div class="for-folder-list" :style="{'transform':'translateX('+(nowIndex+3)*980+'px)'}" v-if="folderListShow3">
              <ul >
                <li v-for="(item ,index) in folderListShow3" :key="index" :class="{'active':(item.filingNo==$store.state.showFilingNo)}">
                  <p class="folder-img" @click="searchFolderData(item.filingNo)"></p>
                  <p class="folder-num" >{{item.contractNum}}</p>
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
              </ul>
            </div>
            <div class="for-folder-list" :style="{'transform':'translateX('+(nowIndex+3)*980+'px)'}" v-if="folderListShow4">
              <ul >
                <li v-for="(item ,index) in folderListShow4" :key="index" :class="{'active':(item.filingNo==$store.state.showFilingNo)}">
                  <p class="folder-img" @click="searchFolderData(item.filingNo)"></p>
                  <p class="folder-num" >{{item.contractNum}}</p>
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
              </ul>
            </div>
            <div class="for-folder-list" :style="{'transform':'translateX('+(nowIndex+4)*980+'px)'}" v-if="folderListShow5">
              <ul >
                <li v-for="(item ,index) in folderListShow5" :key="index" :class="{'active':(item.filingNo==$store.state.showFilingNo)}">
                  <p class="folder-img" @click="searchFolderData(item.filingNo)"></p>
                  <p class="folder-num" >{{item.contractNum}}</p>
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
              </ul>
            </div>
        </div>
        <div class="list-item" style="position: absolute;right: 40px;top:10px;width: 90px;">
          <div class="operate-folder">
          <div class="add-folder" @click="addFolder()"></div>
          </div>
      </div>
      <div class="right-arrow" @click="slideRight"><p></p></div>
    </div>
     <div class="common-top" v-if="auditSteps==3" >
      <div class="common-top-tab">
        <div @click="EnterPer(showFilingNo)" :class="{'btn-active':isBtnActive,'btn-default':!isBtnActive}">企业对个人</div>
        <div style="margin-left: -5px;" @click="EnterEnter(showFilingNo)" :class="{'btn-active':!isBtnActive,'btn-default':isBtnActive}">企业对企业</div>
      </div>

    </div>
  </div>
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
      return {
        interfaceCode:sessionStorage.getItem('interfaceCode'),
        accountCode:sessionStorage.getItem('accountCode'),
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
        nowIndex:0
      }
    },
    methods:{
      EnterPer(showFilingNo) {
        // this.$store.dispatch('showFilingNo',{showFilingNo:showFilingNo});
        this.$store.dispatch('isBtnActive',{isBtnActive:true});
        sessionStorage.setItem("B2BPanelActiveName",'');
        sessionStorage.setItem("B2CPanelActiveName",'');
        this.$router.push("/Mycontract")
      },
      EnterEnter(showFilingNo) {
        // this.$store.dispatch('showFilingNo',{showFilingNo:showFilingNo});
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
        if(this.folderList.length>=50){
          this.$message({
            type: 'info',
            message: '您可新增的文件夹数量已达上限'
          });
        }
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
            // console.log(this.folderList)
            for(let i=0;i<this.folderList.length;i++){
              this.$set(this.folderList[i], 'index', i);
              this.$set(this.folderList[i], 'allIndex', this.folderList)
            }
            if(res.data.data.length<=10){
              this.folderListShow=this.folderList;
              this.folderListShow1=this.folderList;
              this.folderListShow2=null;
              this.folderListShow3=null;
              this.folderListShow4=null;
              this.folderListShow5=null;
            }
            else if(res.data.data.length>=11&&res.data.data.length<=20){
              this.folderListShow=this.folderList.slice(0,10);
              this.folderListShow1=this.folderList.slice(0,10);
              this.folderListShow2=this.folderList.slice(11,this.folderList.length);
              this.folderListShow3=null;
              this.folderListShow4=null;
              this.folderListShow5=null;
            }
            else if(res.data.data.length>=21&&res.data.data.length<=30){
              this.folderListShow=this.folderList.slice(0,10);
              this.folderListShow1=this.folderList.slice(0,10);
              this.folderListShow2=this.folderList.slice(11,20);
              this.folderListShow3=this.folderList.slice(21,this.folderList.length);
              this.folderListShow4=null;
              this.folderListShow5=null;
            }
            else if(res.data.data.length>=31&&res.data.data.length<=40){
              this.folderListShow=this.folderList.slice(0,10);
              this.folderListShow1=this.folderList.slice(0,10);
              this.folderListShow2=this.folderList.slice(11,20);
              this.folderListShow3=this.folderList.slice(21,30);
              this.folderListShow4=this.folderList.slice(31,this.folderList.length);
              this.folderListShow5=null;
            }
            else if(res.data.data.length>=41&&res.data.data.length<=50){
              this.folderListShow=this.folderList.slice(0,10);
              this.folderListShow1=this.folderList.slice(0,10);
              this.folderListShow2=this.folderList.slice(11,20);
              this.folderListShow3=this.folderList.slice(21,30);
              this.folderListShow4=this.folderList.slice(31,40);
              this.folderListShow5=this.folderList.slice(41,this.folderList.length);
            }
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
      },
      slideLeft(){
        // let index=this.folderListShow[this.folderListShow.length].index;
        // let allIndex=this.folderListShow[0].allIndex;
       if(this.nowIndex>=0){
         return false
       }else{
         this.nowIndex++;
       }
        // if(index<=19&&index<allIndex){
        //   this.folderListShow=this.folderListShow1;
        // }
        // if(index<=29&&index<allIndex){
        //   this.folderListShow=this.folderListShow2;
        // }
        // if(index<=39&&index<allIndex){
        //   this.folderListShow=this.folderListShow3;
        // }
      },
      slideRight(){
        // console.log(this.folderListShow)
        // console.log(this.folderListShow[0].index)
        let length=parseInt(this.folderList.length/10);
        console.log(length)
        console.log(this.nowIndex)
        if(this.nowIndex<length){
          this.nowIndex--
        }else{
          return false
        }
        // console.log(length)
        // let index=this.folderListShow[length].index;
        // let allIndex=this.folderListShow[0].allIndex;
        // if(index<=9&&index<allIndex){
        //   this.folderListShow=this.folderListShow2;
        // }
        // if(index<=19&&index<allIndex){
        //   this.folderListShow=this.folderListShow3;
        // }
        // if(index<=29&&index<allIndex){
        //   this.folderListShow=this.folderListShow4;
        // }
        // if(index<=39&&index<allIndex){
        //   this.folderListShow=this.folderListShow5;
        // }


      },
    },
    created(){
      this.auditSteps = cookie.getJSON('tenant')[1].auditSteps;

      this.contractFilings();
    }

  }
</script>


<style lang="scss" scoped>
  @import "../../common/styles/content.scss";
  @import "../../common/styles/Folder.scss";

</style>
