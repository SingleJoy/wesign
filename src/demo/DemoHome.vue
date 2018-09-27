<template>
	<div class="container">
		<DemoTop></DemoTop>
		<div class="layer">
		</div>
		<div class="select-experience" v-show="isShow">
			<img src="../../static/images/Demo/demo-home.png" alt="">
			<div class="home-character">
				<div class="welcome">欢迎使用微签</div>
				<div class="upgrade">
					<span>系统已自动将您升级为</span>
					<span class="company">企业体验账号</span>
				</div>
				<div class="test">现在可以给自己发送一份测试合同，体验文件签署的新旅程</div>
				<div class="btn_operation">
					<button class="abandon" @click="giveUp()">放弃体验</button>
					<button class="experience" @click="immediateExperience()">立即体验</button>
				</div>
			</div>
		</div>
		<div class="form-board" v-show="!isShow">
			<div class="sponsor">模板发起</div>
			<div class="img-hand"><img src="../../static/images/Demo/pointer.png" alt=""></div>
			<div class="img-handle">
				<img src="../../static/images/Demo/dialog.png" alt="">
				<div class="template_content">
					<div class="template-click">点击这里</div>
					<div class="template-start">您可以发起合同哟~ ~</div>
					<div class="btn-template">
						<button class="give-up" @click="giveUp()">放弃体验</button>
						<button class="next-skep" @click="nextSkep()">下一步</button>
					</div>
				</div>
			</div>

			<div class="img-portrait"><img src="../../static/images/Demo/expression.png" alt=""></div>
			<div class="img-indicate"><img src="../../static/images/Demo/nextStep.png" alt=""></div>

		</div>
		<div class="content">
			<img src="../../static/images/Demo/demo-homePage.png" alt="">
		</div>

		<Bottom></Bottom>
	</div>
</template>
<script>
import DemoTop from '../common/components/DemoTop'
import Bottom from '../common/components/Bottom'
export default {
	name: 'DemoHome',
	data() {
		return {
			// msg: '这个是Home模板页'
			isShow: true
		}
	},
	components: {
		DemoTop,
		Bottom,
	},
	methods: {
		giveUp() {

			this.$router.push('/')

		},
		immediateExperience() {
			this.isShow = !this.isShow
		},
		nextSkep() {
			this.$router.push('/DemoTemplateList');
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
		height 697px
		margin 150px auto
		position absolute
		left 50%
		transform translate(-50%)
	.home-character
		text-align center
		position absolute
		bottom 40px
		left 297.5px
		.welcome
			font-size 32px
			color #4091fb
			margin-top 36px;
		.upgrade
			margin-top 32px
			color #4091fb
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
				border 1px solid #4091fb
				border-radius 30px
				text-align center
				color #4091fb
				background-color #ffffff
				cursor pointer
			.experience
				font-size 22px
				color #ffffff;
				border none
				background-color #4091fb
				width 209px
				height 47px
				display inline-block
				border-radius 30px
				cursor pointer
				margin-left 30px
	.form-board
		width 1200px
		margin 40px auto
		position relative
		top -80px
		left 0
		z-index 10000
		.sponsor
			width 90px
			height 42px
			line-height 42px
			text-align center
			background-color #fff
			color #4091fb
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
					margin-top 18px
				.template-start
					font-size 16px
					margin-top 18px
				.btn-template
					margin-top 18px
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
						color #4091fb
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

