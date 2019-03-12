<template>
  <div class="Procontracts">

    <div class='main'>
      <Folder @FolderSearchData="FolderSearchData" ref="folder"  @changeDefaultFillNo="changeDefaultFillNo"></Folder>

      <div class="contract-type">

      <el-tabs v-model="$store.state.PanelActiveName" tab-position="40px" style="margin-top:20px;" @tab-click="handleClick">
        <el-tab-pane label="全部文件" name="first">
          <total-contract ref="first" @setFolder="setFolder"></total-contract>
        </el-tab-pane>
        <el-tab-pane label="待我签署" name="second">
          <inquiry-wait-me ref="second" @setFolder="setFolder"></inquiry-wait-me>
        </el-tab-pane>
        <el-tab-pane label="待他人签署" name="third">
          <inquiry-wait-others ref="third" @setFolder="setFolder"></inquiry-wait-others>
        </el-tab-pane>
        <el-tab-pane label="已生效" name="fourth">
          <inquiry-into-force ref="fourth" @setFolder="setFolder"></inquiry-into-force>
        </el-tab-pane>
        <el-tab-pane label="已截止" name="five">
          <inquiry-expired ref="five" @setFolder="setFolder"></inquiry-expired>
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
    name: 'Procontracts',
    components: { TotalContract,InquiryWaitMe,InquiryWaitOthers,InquiryIntoForce,InquiryExpired ,Folder},
    data() {
      return {
        interfaceCode:sessionStorage.getItem('interfaceCode'),
        accountCode:sessionStorage.getItem('accountCode'),
        activeName:this.$store.state.PanelActiveName,
        showFilingNo:this.$store.state.showFilingNo,
      }
    },
    methods:{

      handleClick(tab, event) {
        let name=tab.paneName;
        this.$store.dispatch('PanelActiveName',{PanelActiveName:name});
        this.getChildData(name);
      },
      getChildData(){
        this.$refs[this.$store.state.PanelActiveName].getData()
      },
      //检测 folder组件是否出发了点击文件夹的 FolderSearchData事件
      FolderSearchData(){
        let name=this.activeName;
        this.getChildData(name)
      },
      //子组件添加归档合同  调用兄弟组件方法  查询兄弟组件归档文件接口
      setFolder(){
        this.$refs.folder.contractFilings();
      },
      changeDefaultFillNo(){
        this.$refs[this.$store.state.PanelActiveName].changeDefaultFillNo();
      }
    },
    mounted(){
      let name=this.activeName;
      this.getChildData(name)
    },
  }
</script>
<style lang='scss' >
  @import '../../styles/Multiparty/Multiparties.scss';

  @import "../../common/styles/content.scss";

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
  #app{
    overflow: hidden;
  }
  .el-table__row .cell{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .Procontracts{
    .contract-type{
      .el-tabs__header{
        background: #fff;
        margin: 0 auto;
      }
      .el-tabs__nav-scroll{
        line-height: 58px;
        padding:0 25px;
      }
      .el-tabs__item{
        height:58px;
        line-height: 58px;
      }
      .el-tabs__item.is-active {
        color: #4091fb;
        border-bottom: 2px solid #4091fb;
      }
    }


  }

</style>


