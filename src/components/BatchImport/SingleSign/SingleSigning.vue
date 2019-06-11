<template>
  <div class='infos'>
   <div class="Tops">
    <nav class='nav'>
      <p class='logo'>
        <img src="/static/images/Top/v1.6-logo.png" alt="logo图">
      </p>
      <div class='buttons'>
        <el-button type="info" style='background:#ccc' @click="contractCancel">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
      </div>
    </nav>
  </div>
  <div class='Contents'>
    <!-- 签署合同开始 -->
    <div class='signing'>
      <!-- 左侧页码导航开始 -->
      <div class='sign_left' ref="leftWrapper">
        <ul class="pagination">
          <div id="top_box">
            <p id='top' v-show="currentIndex != 0" @click="goto(currentIndex)"><a class='el-icon-arrow-up' href="javascript:void(0);"></a></p>
          </div>
          <li v-for="index in pages" :class="{'active':currentIndex === (index - 1)}" :key="index" @click="clickNav(index)">
            <a href="javascript:void(0);" >{{index}}</a>
          </li>
          <div id="bottom_box">
            <p id='bottom' v-show="allpage != currentIndex + 1 && allpage != 0 " @click="goto2(currentIndex+1)"><a class='el-icon-arrow-down'  href="javascript:void(0);" ></a></p>
          </div>
        </ul>
      </div>
      <!-- 左侧页码导航结束 -->
      <!-- 合同内容开始 -->
      <div class='sign_center' ref="rightWrapper"> <!-- 渲染合同页面 -->
        <ul class='content contractImg' id="contractImg">
          <li v-for="(lis, index) in imgArray" :key="index" class="contractImg-hook" style="height:844px;">
              <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+lis" alt="" id='imgSign' style='width:100%;height:844px;'>
          </li>
        </ul>
      </div>
      <!-- 合同内容结束 -->
      <!-- 右侧签署按钮开始 -->
      <div class='sign_right' v-show="contSignImg == false">
        <a href="javascript:void(0);" @click="verifySign">
          <img src="/static/images/Contract/submit.png" alt="" >
        </a>
      </div>
    </div>
    <!-- 签署合同结束 -->
  </div>
    <div class="sign_dialog">
        <el-dialog
            title="校验签署密码"
            :visible.sync="dialogVisibleSign"
            :before-close="closeSign"
            width="30%">
            <div class="sign_element">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
                    <el-form-item label="请输入签署密码：" prop="password">
                        <el-input type="password" placeholder="请输入签署密码" maxlength="16" v-model="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeSign()">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" :loading= load>确 定</el-button>
            </span>
        </el-dialog>
    </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import {state, actions,mutations} from '@/store/index';
import cookie from '@/common/js/getTenant'
import md5 from "js-md5";
import {prohibit} from '@/common/js/prohibitBrowser'
import {b2cSignPosition,b2cSubmitSign,signature,verifySignPassword} from '@/api/personal.js'
import {getcontracts,contractkeywordsignNew,signleKeyWordSign} from '@/api/template.js'
import {contractimgs} from '@/api/detail.js'
export default {
    name: 'Contents',
    data () {
            var validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入签署密码'));
                } else{
                    callback();
                }
            };
        return {
            ruleForm:{
                password:'',
            },
            rules: {
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
            },
            dialogVisibleSign: false, //签署密码弹框
            load: false,
            repeat:true,  // 标识是否可以点击
            baseURL:this.baseURL.BASE_URL,
            interfaceCode:cookie.getJSON('tenant')[1].interfaceCode,
            contractName:sessionStorage.getItem('contractName'),
            contractNo:'',
            current: 0,
            showItem:0,
            allpage: 0,
            imgArray:[],
            imgHeight: [],
            contractImgHeight: 0,
            contractUrl:[],
            scrollY: 0,
            flag: true,//重复提交标示
            clickSign:false,
            centerDialogVisible:false,
            signPosition:'',
            contSignImg:false, // 确认签隐藏标示
            resubmit:true,
            conOrderNo:''
        }
    },
    computed:{
        currentIndex() {
            for (let i = 0; i < this.imgHeight.length; i++) {
                /*当前本身的高度*/
                let height1 = this.imgHeight[i]
                /*下一个的高度*/
                let height2 = this.imgHeight[i + 1]
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                return i
                }
            }
            return 0
        },
        pages:function(){
            this.showItem = 10;
            let pag = [];
            let i = '';
            if( this.currentIndex < this.showItem ){ //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    i = Math.min(this.showItem,this.allpage);
                    while(i){
                        pag.unshift(i--);
                    }
                }else{ //当前页数大于显示页数了
                    //var middle = this.currentIndex - Math.floor(this.showItem / 2 ),//从哪里开始
                    let middle = this.currentIndex + 1
                    i = this.showItem;
                    if( middle >  (this.allpage - this.showItem)  ){
                        middle = (this.allpage - this.showItem) + 1
                    }
                    while(i--){
                        pag.push( middle++ );
                    }
                }
            return pag
        }
    },
    created() {

        this.$loading.show(); //显示
        let data =[]
        let t=Math.random();
        let param = JSON.parse(sessionStorage.getItem('signleContract'));
        this.contractNo = param.contractNo;
        contractimgs(this.interfaceCode,this.contractNo,t).then(res=>{

        /*获取后台数据，并使用imgArray*/
            for(let i=0;i<res.data.length;i++){
                let contractUrl = res.data[i].contractUrl
                data[i] = contractUrl
                this.$loading.hide(); //隐藏
            }
            this.imgArray = data
            /*获取总的页码*/
            this.allpage = res.data.length

            this.$nextTick(() => {
                this._initScroll()
                this._calculateHeight()
            })
            this.rightScroll = new BScroll(this.$refs.rightWrapper, {
            probeType: 3,
            scrollY: true,
            preventDefaultException: { className: /(^|\s)sign_left(\s|$)/ }
            });

        }).catch(error=>{

        })
        
    },
    methods:{
        goto (currentIndex){
            this.clickNav(currentIndex)
        },
        goto2 (currentIndex){
        currentIndex++
        this.clickNav(currentIndex)
        },
        clickNav(index) {
            let imgList = this.$refs.rightWrapper.getElementsByClassName('contractImg-hook')
            let el = imgList[index - 1]
            this.rightScroll.scrollToElement(el, 300)
        },
        _initScroll(){
            this.leftScroll = new BScroll(this.$refs.leftWrapper, {
                click: true
            })

            this.rightScroll = new BScroll(this.$refs.rightWrapper, {
                scrollY:true,
                probeType: 3,
                preventDefaultException:{className:/(^|\s)sign_center(\s|$)/}
            })

            this.rightScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y))
            })
        },
        _calculateHeight(){
            let imgList = this.$refs.rightWrapper.getElementsByClassName('contractImg-hook')
            let height = 0
            this.imgHeight.push(height)
            for (let i = 1; i < imgList.length; i++) {
                let item = imgList[i]
                height += item.offsetHeight
                this.imgHeight.push(height)
            }
        },
        //头部取消操作
        contractCancel() {    
            const h = this.$createElement;
            this.$msgbox({
            title: '提示',
            message: h('p', null, [
                h('span', null, ' 确定将返回首页'),
                h('i', { style: 'color: teal' }, '')
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                setTimeout(() => {
                    done();
                    this.$router.push('/Home')
                    setTimeout(() => {
                    instance.confirmButtonLoading = false;
                    }, 50);
                }, 100);
                } else {
                done();
                }
            }
            })
        },
        //校验是否需要签署密码
        verifySign() {
            let signVerify = cookie.getJSON('tenant')[1].signVerify;
            if(signVerify == 1) {
                this.dialogVisibleSign = true;
            } else {
                this.signConfirm();
            }
        },
        //校验签署密码格式
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.valitedSignPass();
                }
            });
        },
        closeSign() {
            this.$message({
                type: 'info',
                message: "取消签署"
            });
            this.dialogVisibleSign = false;
            this.$refs.ruleForm.resetFields();
        },
        //校验签署密码
        valitedSignPass() {
            this.load = true;
            let accountCode = sessionStorage.getItem("accountCode");
            let signVerifyPassword = {
                signVerifyPassword: md5(this.ruleForm.password)
            };
            verifySignPassword(accountCode, signVerifyPassword).then(res => {
                if(res.data.resultCode == 1) {
                    this.load = false;
                    this.dialogVisibleSign = false;
                    this.submitContract();
                } else {
                    this.$message({
                        type: 'error',
                        message: "签署密码错误"
                    });
                    this.load = false;
                }
            }).catch(error => {

            })
            
        },

        //无签署密码签署确认
        signConfirm(){
            const h = this.$createElement;
            this.$msgbox({
                title: '提示',
                message: h('p', null, [
                    h('span', null, '是否确定要提交？ '),
                    h('i', { style: 'color: teal' }, '')
                ]),
                center:true,
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '执行中...';
                        setTimeout(() => {
                            this.submitContract();
                            done();
                            setTimeout(() => {
                                instance.confirmButtonLoading = false;
                            }, 50);
                        }, 100);
                    } else {
                        done();
                        this.$message({
                            type: 'info',
                            message: '取消签署'
                        });
                    }
                }
            })
        },
        //提交签署
        submitContract () { 
            let contractParam = JSON.parse(sessionStorage.getItem('signleContract'));
            this.conOrderNo = contractParam.contractNo;
            signleKeyWordSign(this.interfaceCode,this.conOrderNo).then(res=>{
                if(res.data.resultCode == 1){
                    this.$router.push('/SignleSigned')
                }else{
                    //弹框点击确定跳转我的合同列表页面
                    this.$message({
                        type: 'error',
                        message: res.data.resultMessage
                    });
                }

            }).catch(error=>{

            })
        }
    },
    mounted() {
        sessionStorage.removeItem("type");
        prohibit()
    }
}
</script>
<style scoped>
  @import "../../../styles/Contract/Contents.css";
  @import "../../../common/styles/Tops.css";
  @import "../../../common/styles/SigningSteps.css";
</style>
<style>
  .out{
    height:200px !important;
    width:400px !important;
    overflow-x: hidden;
  }

</style>

