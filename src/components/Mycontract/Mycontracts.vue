<template>
  <div class="Mycontracts">
    <div class="main">

      <div class="folder-content">
        <div class="left-arrow"><p></p></div>
        <div class="folder-list">
          <div class="list-item">
            <ul >
              <li v-for="(item ,index) in folderList" :key="index" >
                <p class="folder-img"></p>
                <p class="folder-num">{{item.num}}</p>
                <p class="folder-setting"  >
                <el-dropdown style="position: absolute;left: 10px;top:10px" placement="bottom" @command="handleCommand">
                  <span class="el-dropdown-link">
                      <b class="setting-img"></b>
                 </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="(item.no,name)">重命名</el-dropdown-item>
                    <el-dropdown-item command="(item.no,delete)">删除</el-dropdown-item>

                  </el-dropdown-menu>
                </el-dropdown>
                </p>
                <p class="folder-name" :title=item.name>{{item.name}}</p>

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
          <div class="btn-active" @click="EnterPer">企业对个人</div>
          <div class="btn-default" style="margin-left: -5px;" @click="EnterEnter">企业对企业</div>
        </div>

      </div>

      <div class='contract-type'>
        <el-tabs v-model="activeName" tab-position="40px">
          <el-tab-pane label="全部文件" name="first">
            <total-contract></total-contract>
          </el-tab-pane>
          <el-tab-pane label="待我签署" name="second">
            <inquiry-wait-me></inquiry-wait-me>
          </el-tab-pane>
          <el-tab-pane label="待他人签署" name="third">
            <inquiry-wait-others></inquiry-wait-others>
          </el-tab-pane>
          <el-tab-pane label="已生效" name="fourth">
            <inquiry-into-force></inquiry-into-force>
          </el-tab-pane>
          <el-tab-pane label="已截止" name="five">
            <inquiry-expired></inquiry-expired>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<style lang="scss">

  @import "../../common/styles/content.scss";
  @import "../../styles/Mycontract/Mycontract";
  .el-tabs__nav-scroll{
    font-size: 16px;
    color: #333;
  }
  #tab-first,#tab-second,#tab-third,#tab-fourth,#tab-five{
    font-size: 16px;
  }
  .el-table th>.cell{
    text-align: center;
  }

  .el-table__row .cell{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }



</style>

<script>
  import TotalContract from './TotalContract'
  import InquiryWaitMe from './InquiryWaitMe'
  import InquiryWaitOthers from './InquiryWaitOthers'
  import InquiryIntoForce from './InquiryIntoForce'
  import InquiryExpired from './InquiryExpired'
  export default {
    name: 'Mycontracts',
    components: { TotalContract,InquiryWaitMe,InquiryWaitOthers,InquiryIntoForce,InquiryExpired },
    data() {
      return {
        // activeName:sessionStorage.getItem('second')
        activeName:'first',
        folderList:[
          {name:'第一个文件夹12221213123',no:'11111',num:'10'},
          {name:'第二个文件夹',no:'222222',num:'12'},
          {name:'第三个文件夹',no:'33333',num:'20'},
          {name:'第四个文件夹',no:'444444',num:'35'},
          {name:'第五个文件夹',no:'444444',num:'70'},
          {name:'第六个文件夹',no:'444444',num:'36'},
          {name:'第七个文件夹',no:'444444',num:'26'},
          {name:'第八个文件夹',no:'444444',num:'15'},
          {name:'第九个文件夹',no:'444444',num:'26'},
          {name:'第十个文件夹',no:'444444',num:'10'},
        ]
      }
    },
    methods:{
      EnterPer:function () {
        this.$router.push("/Mycontract")
      },
      EnterEnter:function () {
        this.$router.push("/CompanyContract")
      },

      reNameFolder(no){

        this.$prompt('请输入新的文件名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {

          this.$message({
            type: 'success',
            message: '文件夹名称是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });
        });
      },
      deleteFolder(no){
        this.$confirm('您确定删除该文件夹？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      handleCommand(no,type) {

        if(type=='name'){
          this.reNameFolder(no);
        }else{
          this.deleteFolder(no);
        }

      },
      addFolder(){
        this.$prompt('请输入文件夹名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /![@#\$%\^&\*]\d{0,30}/,
          inputErrorMessage: '文件夹长度最多30位'
        }).then(({ value }) => {

          this.$message({
            type: 'success',
            message: '文件夹名称是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });
        });
      }
    }

  }
</script>
<style lang='css' scoped>
  @import '../../styles/Multiparty/Multiparties.scss';
  .el-button--primary:focus{
    background: #eee;
    border-color: #95989d;
    color: #333;
  }
</style>


