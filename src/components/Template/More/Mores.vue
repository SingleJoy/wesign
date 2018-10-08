<template>
    <div class='Mores'>
        <div class='main'>
            <div class="">
                <el-tabs class="multi-tab" v-model="activeName">
                    <el-tab-pane label="单次发起合同" name="first">
                        <div class='one'>
                            <img src="../../../../static/images/Multiparty/multiparties.png" alt="">
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="批量发起合同" name="second">
                        <div class='two' style='width:540px'>
                            <img src="../../../../static/images/Multiparty/multiparties1.png" alt="">
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Mores',
    data() {
    return {
      activeName: 'first',
    }
  }
}
</script>
<style lang="scss">
    /* @import "../../../styles/Multiparty/Mores.css"; */
    @import "../../../common/styles/SigningSteps.css";
    @import "../../../common/styles/content.scss";

.one{
    margin: 30px auto;
    width: 490px;
}
.one:hover{
    border:none
}
.two{
    margin: 30px auto;
    width: 490px;
}
.two:hover{
    border:none
}
.Mores .el-tabs__content{
    background: #fff;
}
.multi-tab{
	.el-tabs__header{
		background: #fff;
		margin-bottom: 20px;
		height: 126px;
		.el-tabs__active-bar{
			height:0;
		}
		.el-tabs__nav-scroll{
			padding:0;
			line-height: 48px;
			text-align: center;
			padding-top:38px;
			.el-tabs__nav{
				float:none;
			}
		}
		.el-tabs__item.is-top{
			width: 300px;
			height: 48px;
			background: #fff;
			border: 1px solid #4091fb;
			cursor: pointer;
			outline: none;
			-webkit-box-shadow: none;
			box-shadow: none;
			line-height: 48px;
			text-align: center;
			display: inline-block;
			vertical-align: bottom;
			padding:0;
		}
		.el-tabs__item.is-active{
			border:none;
			width: 300px;
			height: 48px;
			background: #4091fb;
			color: #fff;
			cursor: pointer;
			outline: none;
			-webkit-box-shadow: none;
			box-shadow: none;
			line-height: 48px;
			text-align: center;
			display: inline-block;
			vertical-align: bottom;
			padding:0;
		}
	}
	.el-tabs__nav-wrap::after{
		height:0;
	}
}

</style>


