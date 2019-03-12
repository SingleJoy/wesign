<template>
    <div>
        <div class="Tops">
            <nav class='nav'>
                <p class='logo'>
                <img src="/static/images/logo2.png" alt="">
                </p>
                <div class='buttons'>
                <el-button type="info" style='background:#ccc' @click="templateSignCancel">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
                <el-button style='color:#4091fb' v-show="clickSign==true" @click="verifySign()">提交签署</el-button>
                </div>
                <!-- <el-dialog
                title="提示"
                :visible.sync="centerDialog"
                width="25%"
                top='35vh'
                center>
                <span style="margin-left: 111px;">3秒后跳转回首页</span>
                </el-dialog> -->
            </nav>
        </div>
        <div class='Contractsigns'>
            <div class="step" style="width: 870px;">
                <ul>
                <li class="active"><i class='el-icon-document'></i><b>选择模板</b></li>
                <p></p>
                <li class="active"><i class='el-icon-edit'></i><b>填充信息</b></li>
                <p></p>
                <li class="active"><i class='el-icon-edit'></i><b>签署设置</b></li>
                <p></p>
                <li class="active"><i class='el-icon-edit'></i><b>指定位置</b></li>
                <p></p>
                <li class="active"><i class='el-icon-menu' style='background:#4091fb'></i><b>合同签署</b></li>
                <p></p>
                <li><i class='el-icon-check' style='background:#ccc'></i><b style='color:#ccc'>完成</b></li>
                </ul>
            </div>
            <div class='signing'>   <!--签署合同开始-->
                <div class='sign_left' ref="leftWrapper">
                <ul class="pagination">
                    <p  id='top' v-show="currentIndex != 0" @click="goto(currentIndex)" ><a class='el-icon-arrow-up' href="javascript:void(0);"></a></p>
                    <li v-for="index in pages" :class="{'active':currentIndex === (index - 1)}" :key="index" @click="clickNav(index)">
                    <a href="javascript:void(0);" >{{index}}</a>
                    </li>
                    <p id='bottom' v-show="allpage != currentIndex + 1 && allpage != 0 " @click="goto2(currentIndex+1)"><a class='el-icon-arrow-down'  href="javascript:void(0);" ></a></p>
                </ul>
                </div>
                <div class='sign_center' ref="rightWrapper"> <!-- 渲染合同页面 -->
                <ul class='content contractImg' id="contractImg">
                    <li v-for="(item, index) in imgArray" :key="index" class="contractImg-hook" style="height:844px;">
                    <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+item" alt="" id='imgSign' style='width: 100%;height:844px;'>
                    </li>
                    <div id='hidden' style='display:none'><img :src="[contractSignImg]"  id="signImg" style="height:125px;width:125px"></div>
                </ul>
                </div>
                <div class='sign_right' v-show="signTempImg == false">
                <a href="javascript:void(0);" @click="gainPosition"><img src="/static/images/Contract/submit.png" alt=""></a>
                <br>
                </div>
            </div>
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
    import cookie from '@/common/js/getTenant'
    import {prohibit} from '@/common/js/prohibitBrowser'
    import {signature} from '@/api/business'
    import {contractimgs,contractmoresign} from '@/api/template'
    import {b2cSignPosition, verifySignPassword} from '@/api/personal'
    import md5 from "js-md5";
    export default {
        name: 'Contractsigns',
        data () {
            var validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入签署密码'));
                } else{
                    callback()
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
                baseURL:this.baseURL.BASE_URL,
                // passwordSign: '',
                contractNo: sessionStorage.getItem('contractNo'),
                contractName: sessionStorage.getItem('contractName'),
                interfaceCode: sessionStorage.getItem('interfaceCode'),
                //初始化左侧页码，并使第一个高亮
                current:0,
                // 左侧页码显示的个数
                showItem:0,
                allpage:0,
                imgArray:[],
                imgHeight: [],
                contractImgHeight: 0,
                scrollY: 0,
                contractSignImg:'',
                flag: true,//重复提交标示
                clickSign:false,
                signPosition:'',
                signTempImg:false,
                resubmit:true,
                repeat:true  // 标示
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
            if( this.currentIndex < this.showItem ){ //如果当前的激活的项 小于要显示的条数
            //总页数和要显示的条数那个大就显示多少条
            let i = Math.min(this.showItem,this.allpage);
            while(i){
                pag.unshift(i--);
            }
            }else{ //当前页数大于显示页数了
            // var middle = this.currentIndex - Math.floor(this.showItem / 2 ),//从哪里开始
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

        let data =[]
        this.$loading.show(); //显示
        contractimgs(this.interfaceCode,this.contractNo).then(res=> {
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
        }).catch(error=> {

        })
        //获取签章
        signature(this.interfaceCode).then(res=> {
            this.contractSignImg = res.data
        }).catch(error=>{

        })
        },
        mounted() {
        prohibit()
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
            this.rightScroll = new BScroll(this.$refs.rightWrapper, {
            mouseWheel: {
                speed: 1200,
                invert: false,
                easeTime: 300
            },
            preventDefault:false,
            probeType: 3,
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
            height += item.clientHeight
            this.imgHeight.push(height)
            }
        },
        templateSignCancel() {    //取消操作
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
            if (this.flag == true){
            this.flag = false
            b2cSignPosition(this.interfaceCode,this.contractNo).then(res=> {

                let array = res.data.list
                let signPositionStr = ''
                for (let i =0 ; i<array.length; i++){
                let pageNum = array[i].pageNum;
                let offsetX = array[i].offsetX;
                let offsetY = array[i].offsetY;
                let parentBox = document.getElementById('contractImg')
                let firstImg =parentBox.getElementsByTagName('img')[1]
                let imgWight = document.getElementById('imgSign').offsetWidth //获取合同页面的宽度
                let imgHeight = document.getElementById('imgSign').offsetHeight //获取合同页面的高度
                let hidden =document.getElementById('hidden')
                let leftX = offsetX * imgWight;
                let topY = (pageNum - 1 + offsetY) * imgHeight + (pageNum-1);
                //$("#signDiv").clone(true).attr("id",""+i+"").appendTo(".contract_con");

                let signPic = document.getElementById('signImg').cloneNode(true)
                parentBox.appendChild(signPic);
                signPic.style.position= 'absolute';
                signPic.style.top= topY + 'px'
                signPic.style.left = leftX + 'px'
                hidden.style.display='none'
                //parentBox.scrollTop(topY);
                if(i == array.length-1){
                    signPositionStr += pageNum+","+leftX+","+offsetY * imgHeight;
                }else{
                    signPositionStr += pageNum+","+leftX+","+offsetY * imgHeight+"&";
                }
                }
                this.signPosition = signPositionStr

            }).catch(error=>{

            })
            this.clickSign = true
            this.signTempImg = true
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
            if (this.repeat == true){
                this.repeat = false
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
                        // setTimeout(() => {
                        this.submitContract();
                        done();
                        setTimeout(() => {
                            instance.confirmButtonLoading = false;
                        }, 100);
                    } else {
                        done();
                        this.repeat = true
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
            //   contractNo = JSON.parse(contractNo);
            if(this.resubmit == true){
            this.resubmit = false
            let imgWight = document.getElementById('imgSign').clientWidth //获取合同页面的宽度
            let imgHeight = document.getElementById('imgSign').clientHeight //获取合同页面的高度
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
            }

            contractmoresign(this.interfaceCode,this.contractNo,signContractVo).then(res=> {
                if (res.data.responseCode == 0){
                //this.centerDialogVisible = false
                this.$message({
                    showClose: true,
                    message: '合同签署成功！',
                    type: 'success'
                })
                this.$loading.hide(); //隐藏

                this.$router.push('/Templates')
                }

            }).catch(error=>{

            })
            }
        }
        }
    }
</script>
<style scoped>
  @import "../../../styles/Contractsign/Contractsigns.css";
  @import "../../../common/styles/Tops.css";
  @import "../../../common/styles/SigningSteps.css";
</style>

