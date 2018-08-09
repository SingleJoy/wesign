<template>
   <div class="Mycontracts" style="margin-top: 20px;">

     <div style="width: 1200px;margin: 0 auto;background: #fff;padding: 5px;">
       <div class="optPower">
         <div class="btn-active" @click="EnterPer">企业对个人</div>
         <div class="btn-default" style="margin-left: -5px;"@click="EnterEnter">企业对企业</div>
       </div>
     </div>

     <div class='main' >
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
</template>
<style>
  .btn-default{
    width: 300px;
    height: 46px;
    background: #fff;
    border: 1px solid #22a7ea;
    cursor: pointer;
    outline: none;
    box-shadow: none;
    line-height: 48px;
    text-align: center;
    display: inline-block;
    vertical-align: bottom;
  }
  .btn-active{
    width: 300px;
    height:48px;
    background:#22a7ea;
    color: #fff;
    cursor: pointer;
    outline: none;
    box-shadow: none;
    line-height: 48px;
    text-align: center;
    display: inline-block;

    vertical-align: bottom;
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
#app{
  overflow: hidden;
}
.el-table__row .cell{
  overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.optPower{
    width: 630px;
    margin: 0 auto;
    padding-left: 5px;
    padding-right: 5px;
    padding-top:30px;
    padding-bottom: 18px;
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
      isActive:true
    }
  },
  methods:{
    EnterPer:function () {
      this.$router.push("/Mycontract")
    },
    EnterEnter:function () {
      this.$router.push("/CompanyContract")
    }
  }

}
</script>
<style lange='css' scoped>
@import '../../styles/Multiparty/Multiparties.css';
.el-button--primary:focus{
  background: #eee;
  border-color: #95989d;
  color: #333;
}
</style>


