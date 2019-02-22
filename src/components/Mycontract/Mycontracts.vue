<template>
  <div class="Mycontracts">
    <div class="main">

      <Folder @FolderSearchData="FolderSearchData" ref="folder" @changeDefaultFillNo="changeDefaultFillNo" @defaultSelectValue="defaultSelectValue"></Folder>

      <!--企业对个人-->
      <div class="contract-type" v-if="$store.state.showTypePanel" >

        <el-tabs v-model="$store.state.PanelActiveName" tab-position="40px" @tab-click="handleClick">
          <el-tab-pane label="全部文件" name="first" >
            <B2CTotalContract ref="first" @setFolder="setFolder"></B2CTotalContract>
          </el-tab-pane>
          <el-tab-pane label="待我签署" name="second">
            <B2CInquiryWaitMe ref="second" @setFolder="setFolder"></B2CInquiryWaitMe>
          </el-tab-pane>
          <el-tab-pane label="待他人签署" name="third">
            <B2CInquiryWaitOthers ref="third" @setFolder="setFolder"></B2CInquiryWaitOthers>
          </el-tab-pane>
          <el-tab-pane label="已生效" name="fourth">
            <B2CInquiryIntoForce ref="fourth" @setFolder="setFolder"></B2CInquiryIntoForce>
          </el-tab-pane>
          <el-tab-pane label="已截止" name="five">
            <B2CInquiryExpired ref="five" @setFolder="setFolder"></B2CInquiryExpired>
          </el-tab-pane>
        </el-tabs>
      </div>

      <!--企业对企业-->
      <div class='contract-type' v-else >

        <el-tabs v-model="$store.state.PanelActiveName" tab-position="40px" @tab-click="handleClick">
          <el-tab-pane label="全部文件" name="first">
            <B2BTotalCont ref="first" @setFolder="setFolder"></B2BTotalCont>
          </el-tab-pane>
          <el-tab-pane label="待我签署" name="second">
            <B2BInquiryWaMe ref="second" @setFolder="setFolder"></B2BInquiryWaMe>
          </el-tab-pane>
          <el-tab-pane label="待他人签署" name="third">
            <B2BInquiryWaOther ref="third" @setFolder="setFolder"></B2BInquiryWaOther>
          </el-tab-pane>
          <el-tab-pane label="已生效" name="fourth">
            <B2BInquiryInto ref="fourth" @setFolder="setFolder"></B2BInquiryInto>
          </el-tab-pane>
          <el-tab-pane label="已截止" name="five">
            <B2BInquiryExp ref="five" @setFolder="setFolder" ></B2BInquiryExp>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>

  import Folder from '@/common/components/Folder';

  import B2CTotalContract from './B2C/TotalContract';
  import B2CInquiryWaitMe from './B2C/InquiryWaitMe';
  import B2CInquiryWaitOthers from './B2C/InquiryWaitOthers';
  import B2CInquiryIntoForce from './B2C/InquiryIntoForce';
  import B2CInquiryExpired from './B2C/InquiryExpired';

  import B2BTotalCont from './B2B/TotalCont';
  import B2BInquiryWaMe from './B2B/InquiryWaMe';
  import B2BInquiryWaOther from './B2B/InquiryWaOther';
  import B2BInquiryInto from './B2B/InquiryInto';
  import B2BInquiryExp from './B2B/InquiryExp';

  import {state, actions,mutations} from '@/store/index';
  export default {
    name: 'Mycontracts',
    components: {
      B2CTotalContract,
      B2CInquiryWaitMe,
      B2CInquiryWaitOthers,
      B2CInquiryIntoForce,
      B2CInquiryExpired ,

      B2BTotalCont,
      B2BInquiryWaMe,
      B2BInquiryWaOther,
      B2BInquiryInto,
      B2BInquiryExp,
      Folder
    },
    data() {
      return {
        interfaceCode:sessionStorage.getItem('interfaceCode'),
        accountCode:sessionStorage.getItem('accountCode'),
        showFilingNo:this.$store.state.showFilingNo,
      }
    },

    methods:{

      handleClick(tab, event) {
       let name=tab.paneName;
        this.$store.dispatch('PanelActiveName',{PanelActiveName:name});
         this.getChildData(name);
      },

      //查询子组件（数据表格）列表数据
      getChildData(){

        this.$nextTick(()=>{
          this.$refs[this.$store.state.PanelActiveName].getData()
        })


      },

      //检测 folder组件是否出发了点击文件夹的 FolderSearchData事件
      FolderSearchData(){
        this.$nextTick(()=>{
          this.getChildData(this.$store.state.PanelActiveName);
        })
      },
      //检测 数据列表组件归档合同后，Folder组件中查询所有合同文件请求一次
      setFolder(){
        this.$refs.folder.contractFilings();
      },

      //切换归档文件夹  Folder组件对应修改兄弟组件(table表格中 默认便当文件夹编号)
      changeDefaultFillNo(){
        this.$refs[this.$store.state.PanelActiveName].changeDefaultFillNo();
      },

      defaultSelectValue(){
        this.$refs[this.$store.state.PanelActiveName].defaultSelectValue();
      }
    },
    created(){
      this.getChildData(this.$store.state.PanelActiveName)

    },

  }
</script>
<style lang='scss'>
  @import '../../styles/Multiparty/Multiparties.scss';
  @import "../../styles/Mycontract/Mycontract.scss";
  @import "../../common/styles/content.scss";
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


