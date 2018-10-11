<template>
  <div class="Procontracts">
    <div class='main'>
        <el-tabs v-model="activeName" tab-position="40px" style="margin-top:20px;">
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
<style lang="scss" scoped>
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

</style>

<script>
import TotalContract from './TotalContract'
import InquiryWaitMe from './InquiryWaitMe'
import InquiryWaitOthers from './InquiryWaitOthers'
import InquiryIntoForce from './InquiryIntoForce'
import InquiryExpired from './InquiryExpired'
export default {
  name: 'Procontracts',
  components: { TotalContract,InquiryWaitMe,InquiryWaitOthers,InquiryIntoForce,InquiryExpired },
  data() {
    return {
        // activeName:sessionStorage.getItem('second')
      activeName:'first'
    }
  }
}
</script>
<style lange='scss' scoped>
@import '../../styles/Multiparty/Multiparties.scss';

</style>


