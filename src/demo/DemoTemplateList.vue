<template>
	<div class="container">
		<Top></Top>
		<div class="layer">
		</div>
		<div class="select-experience" v-show="isShow">
				<img src="../../static/images/Demo/demo-listOver.png" alt="">
				<div class="form-board" v-show="isShow">
					<div class="img-hand"><img src="../../static/images/Demo/pointer.png" alt=""></div>
					<div class="img-handle">
						<img src="../../static/images/Demo/dialog.png" alt="">
						<div class="template_content">
							<div class="template-click">从列表选择一个合同模板点击</div>
							<div class="template-start">
								<span class="immediately-sponsor">【立即发起】</span>
								<span>发起合同，本次选用</span>
							</div>
							<div class="template-fill">
								<span>的是单次合同模板可填充</span>
								<span class="more-parameter">多个参数</span>
							</div>
							<div class="btn-template">
								<button class="give-up" @click="giveUp()">上一步</button>
								<button class="next-skep" @click="nextSkep()">下一步</button>
							</div>
						</div>
					</div>
					<div class="img-portrait"><img src="../../static/images/Demo/expression.png" alt=""></div>	
					<div class="img-indicate"><img src="../../static/images/Demo/nextStep.png" alt=""></div>	
				</div>
			</div>
		<div class="content">
			<img src="../../static/images/Demo/demo-homeList.jpg" alt="">
		</div>
		<Bottom></Bottom>
	</div>
</template>
<script>
import Top from '../common/components/Top'
import Bottom from '../common/components/Bottom'
export default {
	name: 'DemoTemplateList',
	data() {
		return {
			// msg: '这个是Home模板页'
			isShow: true
		}
	},
	components: {
		Top,
		Bottom,
	},
	methods: {
		giveUp() {
			this.$router.push('/DemoHome');
		},
		immediateExperience() {
			this.isShow = !this.isShow
		},
		nextSkep() {
			this.$router.push('/DemoTemplateFill');
		}
	}
}
</script>
<style lang="stylus" scoped>
.container
	.layer 
		height 100%
		width 100%
		background-color rgba(0, 0, 0, 0.5);
		position fixed 
		top 0
		left 0
	.select-experience
		width 1063px
		height 0
		margin 0 auto
		position relative
		top 622px
		left -39px
		.home-character
			text-align center
			position absolute
			bottom 40px
			left 297.5px
			.welcome
				font-size 32px
				color #22a7ea
				margin-top 36px;
			.upgrade
				margin-top 32px
				color #22a7ea
				font-size 18px
				color #666666
				.company
					color #ff8a00
			.test
				font-size 18px
				color #666666
				margin-top 10px
			.btn_operation
				margin-top 46px
				line-height 47px
				.abandon
					font-size 22px
					width 209px
					height 47px
					display inline-block
					border 1px solid #22a7ea
					border-radius 30px
					text-align center
					color #22a7ea
					background-color #ffffff
					cursor pointer
				.experience
					font-size 22px
					color #ffffff;
					border none 
					background-color #22a7ea
					width 209px
					height 47px
					display inline-block
					border-radius 30px
					cursor pointer
					margin-left 30px
		.form-board
			width 1200px
			margin 40px auto
			position absolute
			z-index 10000
			top 249px
			left -425px
			.sponsor
				width 90px
				height 42px
				line-height 42px
				text-align center
				background-color #fff
				color #22a7ea
				border-radius 5px
				position absolute
				top -22px
				right 340px
			.img-hand
				position absolute
				top 34px
				right 330px
				transform:rotate(45deg);
				-ms-transform:rotate(45deg); 	
				-moz-transform:rotate(45deg); 	
				-webkit-transform:rotate(45deg); 
				-o-transform:rotate(45deg);
			.img-handle
				position absolute
				top 106px
				right 78px
				.template_content
					width 303px
					color #ffffff
					position absolute
					text-align center
					top 0
					left 0
					.template-click
						font-size 18px
						margin-top 12px
					.template-start
						font-size 16px
						margin-top 12px
						.immediately-sponsor
							color #ffc000
					.template-fill
						margin-top 12px
						.more-parameter
							color #ffc000
					.btn-template
						margin-top 12px
						.give-up
							width 120px
							height 40px
							border-radius 5px
							border 2px solid #ffffff
							background-color #4a3d38
							color #ffffff
							font-size 16px
							cursor pointer
						.next-skep
							width 120px
							height 40px
							margin-left 12px
							border-radius 5px
							background-color #ffffff
							color #39bbfd
							border none
							font-size 16px
							cursor pointer
			.img-portrait
				position absolute
				top 207px
				right 25px
			.img-indicate
				position absolute
				top 268px
				right 335px
	.content 
		width 1200px
		margin 20px auto
		img 
			width 100%
</style>

