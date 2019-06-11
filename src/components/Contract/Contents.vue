<template>
    <div class='infos'>
        <div class="Tops">
            <nav class='nav'>
                <p class='logo'>
                    <img src="/static/images/Top/v1.6-logo.png" alt="logo图">
                </p>
                <div class='buttons'>
                    <el-button type="info" style='background:#ccc' @click="contractCancel">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
                    <el-button style='color:#4091fb' v-show="clickSign==true" @click="verifySign">提交签署</el-button>
                </div>
            </nav>
        </div>
        <div class='Contents'>
            <div class='step' style="width:720px;">
                <ul>
                    <li class="active"><i class='el-icon-document'></i><b>上传文件</b></li>
                    <p></p>
                    <li  class="active"><i class='el-icon-goods'></i><b>签署设置</b></li>
                    <p></p>
                    <li  class="active"><i class='el-icon-edit'></i><b>指定位置</b></li>
                    <p></p>
                    <li  class="active"><i class='el-icon-menu'></i><b>合同签署</b></li>
                    <p></p>
                    <li><i class='el-icon-check'></i><b>完成</b></li>
                </ul>
            </div>
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
                        <div id='hidden' style='display:none'>
                            <img :src="[contractSignImg]"  id="signImg" style="height:125px;width:125px">
                        </div>
                    </ul>
                </div>
                <!-- 合同内容结束 -->
                <!-- 右侧签署按钮开始 -->
                <div class='sign_right' v-show="contSignImg == false">
                    <a href="javascript:void(0);" @click="gainPosition">
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
    import {contractimgs} from '@/api/detail.js'
    export default {
        name: 'Contents',
        data () {
            var validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入签署密码'));
                } else{
                    callback();
                    // let verificationPsd = /^[a-zA-Z0-9]{4,16}$/;
                    // if(!verificationPsd.test(value)) {
                    //     callback(new Error('格式不正确，签署密码为4~16位，可录入数字、字母、数字+字母'));
                    // } else {
                    //     callback();
                    // }
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
                contractNo:sessionStorage.getItem('contractNo'),
                current: 0,
                showItem:0,
                allpage: 0,
                imgArray:[],
                imgHeight: [],
                contractImgHeight: 0,
                contractUrl:[],
                scrollY: 0,
                contractSignImg:'',
                flag: true,//重复提交标示
                clickSign:false,
                centerDialogVisible:false,
                signPosition:'',
                contSignImg:false, // 确认签隐藏标示
                resubmit:true
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
            contractimgs(this.interfaceCode,this.contractNo,t).then(res=>{

                /*获取后台数据，并使用imgArray*/
                for(let i=0;i<res.data.length;i++){
                    let contractUrl = res.data[i].contractUrl
                    data[i] = contractUrl
                    this.$loading.hide(); //隐藏
                }
                this.imgArray = data;
                /*获取总的页码*/
                this.allpage = res.data.length;

                this.$nextTick(() => {
                    this._initScroll();
                    this._calculateHeight();
                });
                this.rightScroll = new BScroll(this.$refs.rightWrapper, {
                    probeType: 3,
                    scrollY: true,
                    preventDefaultException: { className: /(^|\s)sign_left(\s|$)/ }
                });

            }).catch(error=>{

            });

            signature(this.interfaceCode).then(res=> {

                this.contractSignImg = res.data
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
            contractCancel() {    //取消操作
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
            gainPosition () { //点击签署

                this.contSignImg = true
                if (this.flag == true){
                    this.flag = false
                    b2cSignPosition(this.interfaceCode,this.contractNo).then(res=>{
                        let array = res.data.list;
                        let signPositionStr = '';
                        for (let i =0 ; i<array.length; i++){
                            let pageNum = array[i].pageNum;
                            let offsetX = array[i].offsetX;
                            let offsetY = array[i].offsetY;
                            let parentBox = document.getElementById('contractImg')
                            let firstImg =parentBox.getElementsByTagName('img')[1]
                            let imgWight = document.getElementById('imgSign').offsetWidth //获取合同页面的宽度
                            let imgHeight = document.getElementById('imgSign').offsetHeight//获取合同页面的高度
                            let hidden = document.getElementById('hidden');
                            let leftX = offsetX * imgWight;
                            let topY = (pageNum - 1 + offsetY) * imgHeight;
                            let signPic = document.getElementById('signImg').cloneNode(true)
                            parentBox.appendChild(signPic);
                            signPic.style.position= 'absolute';
                            signPic.style.top= topY + 'px'
                            signPic.style.left = leftX + 'px'
                            hidden.style.display='none'
                            let windowScrollTop = document.documentElement.scrollTop
                            if(i == array.length-1){
                                signPositionStr += pageNum+","+leftX+","+offsetY * (imgHeight);
                            }else{
                                signPositionStr += pageNum+","+leftX+","+offsetY * (imgHeight)+"&";
                            }
                        }
                        this.signPosition = signPositionStr
                    }).catch(error=>{

                    })
                    this.flag = false
                    this.clickSign = true
                }
            },
            verifySign() {
                let signVerify = cookie.getJSON('tenant')[1].signVerify;
                if(signVerify == 1) {
                    this.dialogVisibleSign = true;
                } else {
                    this.submitBtn("signVerify");
                }
            },
            closeSign() {
                this.$message({
                    type: 'info',
                    message: "取消签署"
                });
                this.dialogVisibleSign = false;
                this.$refs.ruleForm.resetFields();
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.submitBtn();
                    } else {
                        return false;
                    }
                });
            },
            submitBtn(signVerify) {
                if(!signVerify) {
                    if (!this.repeat){
                        return;
                    }
                    this.repeat = false;
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
                            this.repeat = true;
                            this.load = false;
                        }
                    }).catch(error => {

                    })
                    return;
                }
                if(this.resubmit == true){
                    this.resubmit = false
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
                                this.resubmit = true
                                this.$message({
                                    type: 'info',
                                    message: '取消签署'
                                });
                            }
                        }
                    })
                }
            },
            submitContract () { //确认签署
                this.$loading.show(); //显示
                let imgWight = document.getElementById('imgSign').offsetWidth //获取合同页面的宽度
                let imgHeight = document.getElementById('imgSign').offsetHeight //获取合同页面的高度
                let base64Img = this.contractSignImg.split(",")[1]
                let signH = parseInt(document.getElementById('signImg').style.height)
                let signW =  parseInt(document.getElementById('signImg').style.width)
                let signContractVo = {
                    'contractNum':this.contractNo,
                    'phoneHeight':imgHeight,
                    'phoneWidth': imgWight,
                    'signatureImg': base64Img,
                    'signH':signH,
                    'signW':signW,
                    'signPositionStr':this.signPosition
                };
                b2cSubmitSign(this.interfaceCode,this.contractNo,signContractVo).then(res=>{
                    if (res.data.responseCode == 0){
                        this.centerDialogVisible = false
                        this.$message({
                            showClose: true,
                            message: '合同签署成功！',
                            type: 'success'
                        })
                        this.$loading.hide(); //隐藏
                        this.$router.push('/Complete')
                    }else if(res.data.responseCode == 2){
                        this.$loading.hide(); //隐藏
                        this.$confirm(res.data.responseMsg, '提示', {
                            confirmButtonText: '确定',
                            type: 'warning'
                        }).then(() => {
                            cookie.set("state", "Home");

                            this.$router.push('/ContractInfo');
                        }).catch(() => {
                            cookie.set("state", "Home");

                            this.$router.push('/ContractInfo');
                        })

                    }else{
                        this.$message({
                            showClose: true,
                            message: res.data.responseMsg,
                            type: 'warning'
                        })
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
    @import "../../styles/Contract/Contents.css";
    @import "../../common/styles/Tops.css";
    @import "../../common/styles/SigningSteps.css";
</style>
<style>
    .out{
        height:200px !important;
        width:400px !important;
        overflow-x: hidden;
    }

</style>

