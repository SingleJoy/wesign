<template>
  <div class="Mycontracts">
    <div class="main">

      <Folder ></Folder>

      <div class="common-top">
        <div class="common-top-tab">
          <div class="btn-active" @click="EnterPer">企业对个人</div>
          <div class="btn-default" style="margin-left: -5px;" @click="EnterEnter">企业对企业</div>
        </div>

      </div>

      <div class="contract-type">
        <el-tabs v-model="activeName" tab-position="40px" @tab-click="handleClick">
          <el-tab-pane label="全部文件" name="first">
            <total-contract ref="first" ></total-contract>
          </el-tab-pane>
          <el-tab-pane label="待我签署" name="second">
            <inquiry-wait-me ref="second"></inquiry-wait-me>
          </el-tab-pane>
          <el-tab-pane label="待他人签署" name="third">
            <inquiry-wait-others ref="second"></inquiry-wait-others>
          </el-tab-pane>
          <el-tab-pane label="已生效" name="fourth">
            <inquiry-into-force ref="fourth"></inquiry-into-force>
          </el-tab-pane>
          <el-tab-pane label="已截止" name="five">
            <inquiry-expired ref="five"></inquiry-expired>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>


<script>
  import TotalContract from './TotalContract'
  import InquiryWaitMe from './InquiryWaitMe'
  import InquiryWaitOthers from './InquiryWaitOthers'
  import InquiryIntoForce from './InquiryIntoForce'
  import InquiryExpired from './InquiryExpired'
  import Folder from '../../common/components/Folder'

  export default {
    name: 'Mycontracts',
    components: { TotalContract,InquiryWaitMe,InquiryWaitOthers,InquiryIntoForce,InquiryExpired ,Folder},
    data() {
      return {
        interfaceCode:sessionStorage.getItem('interfaceCode'),
        accountCode:sessionStorage.getItem('accountCode')?sessionStorage.getItem('accountCode'):'first',
        activeName:sessionStorage.getItem('panelActiveName'),
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
      handleClick(tab, event) {
       let name=tab.paneName;
       // console.log(this.$refs[name])
        sessionStorage.setItem("panelActiveName",name);
         this.$refs[name].getData()
      },
      getChildData(name){
        this.$refs[name].getData()
      }
    },
    created(){

      this.$nextTick(() => {
        let name=this.activeName;
        this.getChildData(name)
      })


    }


  }
</script>
<style lang='css'>
  @import '../../styles/Multiparty/Multiparties.scss';
  @import "../../common/styles/content.scss";
  @import "../../styles/Mycontract/Mycontract.scss";
  .el-button--primary:focus{
    background: #eee;
    border-color: #95989d;
    color: #333;
  }

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


