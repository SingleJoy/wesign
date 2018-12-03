
<template>
  <div class="Role">
    <div class="main">
      <div class="role-body">
        <div class="role-top">
          <p>请选择登录角色</p>
        </div>
        <div class="role-content">
            <div class="content-box">
              <div class="content-bg">
					<div class="business-account">
						<p class="top-img">
							<img class="" src="../../../static/images/Login/company_top.png" alt="企业账号">
							<span>企业</span>
						</p>
						<ul v-if="companyList.length>0" class="role-ul">
							<li v-for="(item,index) in companyList" :key="index" class="role-item">
								<div class="item-left">
									<span class="sign" v-if="item.auditSteps==3">
										<img src="../../../static/images/Login/sign_red.png" alt="">
										<span class="company-status active">已实名</span>
									</span>
									<span class="sign" v-else>
											<img src="../../../static/images/Login/sign_gray.png" alt="">
											<span class="company-status no-active">未实名</span>
									</span>
									<div class="info-content">
										<p class="company-name">{{item.enterpriseName}}</p>
										<div class="sign_info">
											<span class="dot dot-waitme"></span>
											<span>待我签署</span>
											<p style="color: #4091fb">{{item.waitForMeSign?item.waitForMeSign:0}}</p>
										</div>
										<div class="sign_info">
											<span class="dot dot-waitother"></span>
											<span>待他人签署</span>
											<p style="color: #ff7800">{{item.waitForOtherSign?item.waitForOtherSign:0}}</p>
										</div>
									</div>
								</div>
								<p class="item-right" @click="loginEnter(item)"><span>进入</span></p>

							</li>
						</ul>
						<ul v-else>
							<li class="no-data">
								<img src="../../../static/images/blank.png" alt="">
								<p>暂未开通</p>
							</li>
						</ul>
					</div>
					<div class="line"></div>
					<div class="sub-business-account">
						<p class="top-img">
							<img class="" src="../../../static/images/Login/subcompany_top.png" alt="企业子账号">
							<span>企业子账号</span>
							<span style="font-size: 14px;margin-left: 200px;color: red;letter-spacing: 1px; margin-top: 10px;">(子账号为企业管理员分配)</span>
						</p>
						<ul v-if="subCompanyList.length>0"  class="role-ul">
							<li v-for="(item,index) in subCompanyList" :key="index" class='role-item'>
								<div class="item-left">
									<span class="sign" v-if="item.accountStatus==0">
										<img src="../../../static/images/Login/has_sign.png" alt="">
										<span class="subcompany-status active">关闭</span>
									</span>
									<span class="sign" v-if="item.accountStatus==1">
										<img src="../../../static/images/Login/has_sign.png" alt="">
										<span class="subcompany-status active">开通</span>
									</span>
									<span class="sign" v-else-if="item.accountStatus==2">
										<img src="../../../static/images/Login/has_sign.png" alt="">
										<span class="subcompany-status active">未激活</span>
									</span>
									<span class="sign" v-else-if="item.accountStatus==3">
										<img src="../../../static/images/Login/has_sign.png" alt="">
										<span class="subcompany-status active">已激活</span>
									</span>
									<span class="sign" v-else-if="item.accountStatus==4">
										<img src="../../../static/images/Login/has_sign.png" alt="">
										<span class="subcompany-status active">待完善</span>
									</span>
									<span class="sign" v-else-if="item.accountStatus==5">
										<img src="../../../static/images/Login/has_sign.png" alt="">
										<span class="subcompany-status active">永久冻结</span>
									</span>
									<span class="sign" v-else-if="item.accountStatus==6">
											<img src="../../../static/images/Login/un_sign.png" alt="">
											<span class="subcompany-status no-active">冻结</span>
									</span>

									<div class="info-content">
										<p class="subcompany-name">{{item.enterpriseName}}&nbsp;&nbsp;&nbsp;/<span>({{item.accountName}})</span></p>
										<div class="sign_info">
											<span class="dot dot-waitme"></span>
											<span>待我签署</span>
											<p style="color: #a0d8ef">{{item.waitForMeSign?item.waitForMeSign:0}}</p>
										</div>
										<div class="sign_info">
											<span class="dot dot-waitother"></span>
											<span>待他人签署</span>
											<p style="color: #84a2d4">{{item.waitForOtherSign?item.waitForOtherSign:0}}</p>
										</div>

									</div>
								</div>
								<p class="item-right" v-if="item.accountStatus!=5&&item.accountStatus!=6" @click="loginEnter(item)"><span>进入</span></p>
								<p class="item-right-none" v-else><span></span></p>
							</li>
						</ul>
						<ul v-else>
							<li class="no-data">
								<img src="../../../static/images/blank.png" alt="">
								<p>暂未开通</p>
							</li>
						</ul>
					</div>

              </div>

            </div>
        </div>
    </div>
    </div>



  </div>
</template>

<script>
import server from "@/api/url";
import cookie from '@/common/js/getTenant'
  export default {
    name:'Role',
    data () {

      return {
			companyList:[],
			subCompanyList:[],
			personalList:[]
		}
	},
	created(){
		let roleList = sessionStorage.getItem('companyList')?sessionStorage.getItem('companyList'):[];
			roleList = JSON.parse(roleList)
		if(roleList.length>0){
			this.companyList = roleList[0];
			this.subCompanyList = roleList[1];
		}

	},
    methods: {
		loginEnter(item){

			sessionStorage.setItem('accountCode',item.accountCode);      //账户编号
			sessionStorage.setItem('accountLevel',item.accountLevel);      //账号类型一二级
			sessionStorage.setItem('authorizerCode',item.authorizerCode);      	//授权人编号
			sessionStorage.setItem('mobile',item.mobile);      				  //手机号
			sessionStorage.setItem('interfaceCode',item.interfaceCode);
			sessionStorage.setItem('auditStatus',item.auditStatus);
			sessionStorage.setItem('enterpriseName',item.enterpriseName);
			// console.log(item.enterpriseName)
			sessionStorage.setItem('userCode',item.userCode);

			let params = {
				mobile:item.mobile,
				// accountCode:item.accountCode?item.accountCode:''
			}
			let urlParam = item.interfaceCode;
			if(item.accountStatus==2){
                sessionStorage.setItem('accountStatus',2)
				this.$router.push('/ActivateChildAccount')
			}else{
				server.login(params,urlParam).then(res=>{
                    if(res.data.dataList[1].auditSteps!=3){
                        this.$message({
                        showClose: true,
                            duration: 1000,
                            message: "登录成功",
                            type: "success"
                        });
                        console.log(res.data.dataList)
                        cookie.set("tenant", res.data.dataList); //存入cookie 所需信息
                        this.$store.dispatch("tabIndex", { tabIndex: 0 }); //导航高亮
                        this.$router.push("/Merchant");
                    }else{
                            this.$message({
                            showClose: true,
                            duration: 1000,
                            message: "登录成功",
                            type: "success"
                        });
                        cookie.set("tenant", res.data.dataList);
                        this.$store.dispatch("tabIndex", { tabIndex: 0 });
                        this.$router.push("/Home");
                    }

				}).catch(error=>{
					this.$message({
						showClose: true,
						duration:1000,
						message: '登录失败',
						type: 'warning'
					})
				})
			}
		},
    },
    mounted(){

    }
  }
</script>

<style lang="scss" scope>
  	@import "../../common/styles/content.scss";
  	.Role{
		.role-top{
			background: #fff;
			margin-top: 20px;
			border-radius: 5px;
			height: 150px;
			text-align: center;
			p{
				color: #4091fb;
				font-size: 34px;
				line-height: 150px;
			}
		}
    	.role-content{
			background:#fff;
			border-radius: 5px;
			margin-top:20px;
			height:auto;
			padding:40px 30px;
		.content-box{
			background: #fafafa;
			padding:20px 25px;
		}
	  	.content-bg{
			background: #fff;
			border-radius: 5px;
			padding-bottom: 60px;
			.no-data{
				text-align: center;
				padding-top: 80px;
				p{
					margin-top: 20px;
					color: #666;
				}
			}
			//企业账号
			.business-account{
				overflow: hidden;
				.top-img{
					position: relative;
					margin-bottom: 25px;
					margin-top: 20px;
					padding: 0 20px;
					span{
						position: absolute;
						left: 50px;
						font-size: 20px;
						color: #fff;
						letter-spacing: 8px;
						top: 10px;
						font-weight: 700;
					}
					img{
						width: 1047px;
					}
				}
				.role-ul{
					width: 775px;
					height: 175px;
					margin: 0 auto;
					border-radius: 5px;
					.role-item{
						margin-top: 20px;
						height:175px;
                        // float: right;
						.sign img{
							float: right;
						}
						.item-left{
							background: url("../../../static/images/Login/company.png") no-repeat;
							width: 649px;
							border-right: 1px solid #89c3eb;
							height: 175px;
							border-radius: 5px;
							z-index: 99;
							position: absolute;
							.company-status{
								position: absolute;
								transform: rotate(45deg);
								right: 10px;
								top: 30px;

								font-size: 14px;
							}
							.active{
								color: #fff;
							}
							.no-active{
								color:#666666
							}
							.info-content{
								margin-left: 160px;
								margin-top: 30px;
								font-weight: 700;
								color: #333;
							}
							.company-name{
                                font-size: 18px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap
							}
							.sign_info{
								margin-top: 50px;
								float: left;
								margin-right: 76px;
								text-align: center;
								.dot{
									width: 18px;
									height: 18px;
									display: inline-block;
									border-radius: 50%;
									margin-right: 15px;
								}
								.dot-waitme{
									background: #57bcef;
								}
								.dot-waitother{
									background: #ff7800;
								}
								p{
									font-size: 20px;
									margin-top:10px;
								}
							}
						}
						.item-right{
							float: right;
							// display: inline-block;
							line-height: 172px;
							width: 138px;
							height:172px;
							text-align: center;
							background: #d7ebfc;
							border-radius: 5px;
							border: 1px solid #89c3eb;
							border-top-left-radius: 0;
							color:#333;
							cursor: pointer;

						}
						.item-right:hover{
							color: #4091fb;
						}
                        .item-right-none{
                            float: right;
                            line-height: 172px;
                            width: 138px;
                            height: 172px;
                            background: #ffffff;
                            border-radius: 5px;
                            border-top-left-radius: 0;
                        }
					}
				}
			}

			//企业子账号
			.sub-business-account{
				overflow: hidden;
				.top-img{
					position: relative;
					padding: 0 20px;
					span{
						position: absolute;
						left: 50px;
						font-size: 20px;
						color: #fff;
						letter-spacing: 4px;
						top: 10px;
						font-weight: 700;
					}
					img{
						width: 1047px;
					}
				}
				.role-ul{
					width: 775px;
					height: 175px;
					margin: 0 auto;
					border-radius: 5px;
					.role-item{
						margin-top: 20px;
						height:175px;
						.sign img{
							float: right;
							margin-top:-5px;
							margin-right: 5px;
						}
						.item-left{
							background: url("../../../static/images/Login/subcompany.png") no-repeat;
							width: 649px;
							border-right: 1px solid #89c3eb;
							height: 175px;
							border-radius: 5px;
							z-index: 99;
							position: absolute;
							.subcompany-status{
								position: absolute;
								writing-mode: vertical-rl;;
								right: 24px;
								top: 3px;
								color: #fff;
								font-size: 14px;
							}
							.active{
								color: #fff;
							}
							.no-active{
								color:#666666
							}
							.info-content{
								margin-left: 160px;
								margin-top: 30px;
								font-weight: 700;
								color: #333;
							}
							.subcompany-name{
                                font-size: 18px;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
								span{
									color:#4091fb;
									font-size: 14px;
									margin-left: 15px;
								}
							}
							.sign_info{
								margin-top: 50px;
								float: left;
								margin-right: 76px;
								text-align: center;
								.dot{
									width: 18px;
									height: 18px;
									display: inline-block;
									border-radius: 50%;
									margin-right: 15px;
								}
								.dot-waitme{
									background: #a0d8ef;
								}
								.dot-waitother{
									background: #8da9d7;
								}
								p{
									font-size: 20px;
									margin-top:10px;
								}
							}
						}
						.item-right{
							float: right;
							// display: inline-block;
							color: #4091fb;
							line-height: 172px;
							width: 138px;
							height:172px;
							text-align: center;
							background: #f4faff;
							border-radius: 5px;
							border: 1px solid #89c3eb;
							border-top-left-radius: 0;
							color:#333;
							cursor: pointer;

                        }
                         .item-right-none{
                            float: right;
                            line-height: 172px;
                            width: 138px;
                            height: 172px;
                            background: #ffffff;
                            border-radius: 5px;
                            border-top-left-radius: 0;
                        }
						.item-right:hover{
							color:#4091fb;
						}
					}
				}
			}

	  	}
    }
  }



</style>
