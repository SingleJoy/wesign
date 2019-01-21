<template>
  <div class="Mycontracts">
    <div class="main">

      <Folder @FolderSearchData="FolderSearchData"></Folder>


      <div class="contract-type">
        <el-tabs v-model="activeName" tab-position="40px" @tab-click="handleClick">
          <el-tab-pane label="全部文件" name="first">
            <total-contract ref="first" ></total-contract>
          </el-tab-pane>
          <el-tab-pane label="待我签署" name="second">
            <inquiry-wait-me ref="second"></inquiry-wait-me>
          </el-tab-pane>
          <el-tab-pane label="待他人签署" name="third">
            <inquiry-wait-others ref="third"></inquiry-wait-others>
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
  import {state, actions,mutations} from '@/store/index';
  export default {
    name: 'Mycontracts',
    components: { TotalContract,InquiryWaitMe,InquiryWaitOthers,InquiryIntoForce,InquiryExpired ,Folder},
    data() {
      return {
        interfaceCode:sessionStorage.getItem('interfaceCode'),
        accountCode:sessionStorage.getItem('accountCode'),
        activeName:sessionStorage.getItem('B2CPanelActiveName')?sessionStorage.getItem('B2CPanelActiveName'):'first',
        showFilingNo:this.$store.state.showFilingNo,
      }
    },
    methods:{

      handleClick(tab, event) {
       let name=tab.paneName;
        sessionStorage.setItem("B2CPanelActiveName",name);
         this.getChildData(name);
      },
      getChildData(name){

        this.$refs[name].getData()
      },
      //检测 folder组件是否出发了点击文件夹的 FolderSearchData事件
      FolderSearchData(){
        let name=this.activeName;
        this.getChildData(name)
      }
    },
    mounted(){
      let name=this.activeName;
      this.getChildData(name)
    },


  }
</script>
<style lang='scss'>

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

  .el-table tr:nth-child(odd) {
    background: #fff;
  }
  .el-table tr:nth-child(even) {
    background: #f5f5f5;
  }

</style>


