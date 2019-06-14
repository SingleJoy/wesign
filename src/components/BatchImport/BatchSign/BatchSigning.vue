<template>
    <div>
        <Top></Top>
        <div class="batchsign-main">
            <div class="batchsign-progress">
                <div class="batchsign-progress-title">已经完成{{progress}}%</div>
                <el-progress :percentage="progress" :show-text="false"></el-progress>
            </div>
            <div class="progress-hint-title">你可以在当前页面等待所有的合同签署完成</div>
            <div class="progress-hint-operate">
                <span>不想等待</span>
                <button class="back" @click="goBack">返回首页</button>
            </div>
            <div class="contract-describe">
                <div>
                    <img src="/static/images/Common/contract-sign-success.png" alt="">
                </div>
                <div>
                    <div class="progress-hint-content">
                        <span>你可以在</span>
                        <span class="progress-hint-color">我的合同-批量合同模块</span>
                        <span>中查看该笔订单的签署状态</span>
                    </div>
                    <div class="progress-hint-end">签署成功的链接将会通过短信的方式通知到签署合约方</div>
                    <div class="contract-link">
                        <span>签约室链接：</span>
                        <span class="contract-link-url">{{signUrl}}</span>
                        <button 
                            class="copy-link"  
                            v-clipboard:copy="signUrl"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError">复制链接
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Bottom></Bottom>
    </div>
</template>、
<script>
import cookie from '@/common/js/getTenant'
import Top from '@/common/components/Top.vue'
import Bottom from '@/common/components/Bottom.vue'
import { getsignresult } from '@/api/template'
export default {
    name: "BatchSigning",
    data() {
        return {
            signUrl: "",
            progress: 0,
            timer: null
        }
    },
    components: {
        Top,
        Bottom
    },
    created() {
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        });
        let interfaceCode = sessionStorage.getItem("interfaceCode");
        let conOrderNo = sessionStorage.getItem("conOrderNo");
        let isComplete = this.serchSignResult(interfaceCode, conOrderNo);
        this.timer = setInterval(() => {
            this.serchSignResult(interfaceCode, conOrderNo);
        }, 3000);
    },
    methods: {
        serchSignResult(interfaceCode, conOrderNo) {
            getsignresult(interfaceCode, conOrderNo).then(res => {
                let data = res.data.data,
                    failNum = data.failNum,
                    signRoomLink = data.signRoomLink,
                    successNum = data.successNum,
                    totalNum = data.totalNum;
                    if(res.data.resultCode == "1"){
                        clearInterval(this.timer);
                        this.$router.push({path:'/BatchSigned',query:{
                            failNum:failNum, 
                            signRoomLink: signRoomLink, 
                            successNum: successNum, 
                            totalNum: totalNum
                        }});
                        return "complete"
                    } else {
                        if(!this.signUrl) {
                            this.signUrl = signRoomLink;
                        }
                        this.progress = parseFloat(((Number(successNum) + Number(failNum))/Number(totalNum)*100).toFixed(2));
                    }
                // if(res.data.resultCode == "0") {
                //     if(!this.signUrl) {
                //         this.signUrl = signRoomLink;
                //     }
                //     this.progress = parseFloat(((Number(successNum) + Number(failNum))/Number(totalNum)*100).toFixed(2));
                // } else if(res.data.resultCode == "1"){
                //     clearInterval(this.timer);
                //     this.$router.push({path:'/BatchSigned',query:{
                //         failNum:failNum, 
                //         signRoomLink: signRoomLink, 
                //         successNum: successNum, 
                //         totalNum: totalNum
                //     }});
                //     return "complete"
                // }
            }).catch(error => {
                // clearInterval(this.timer);
            })
        },
        //复制成功  
        onCopy: function (e) {
            this.$message({
                message: '签约室链接复制成功',
                type: 'success'
            });
        },

        //复制失败
        onError: function (e) {
            console.log(e)
        },
        //返回首页
        goBack(){
            this.$router.push("/Home");
            clearInterval(this.timer);
        }, 
    },
    beforeDestroy() {
        if(this.timer) { //如果定时器在运行则关闭
            clearInterval(this.timer); 
            this.timer = null;
        }
    }
}
</script>
<style lang="scss" scoped>
.batchsign-main {
    width: 1200px;
    margin: 20px auto;
    padding: 150px 0;
    background-color: #fff;
    .batchsign-progress {
        width: 670px;
        margin: 30px auto;
        .batchsign-progress-title {
            margin-bottom: 10px;
            text-align: center;
            color: #666666;
        }
    }
    .progress-hint-title {
        margin-top: 30px;
        font-size: 14px;
        color: #666666;
        text-align: center;
    }
    .progress-hint-operate {
        text-align: center;
        // display: inline-block;
        color: #666666;
        font-size: 16px;
        margin-top: 30px;
        .back {
            color: #4091fb;
            font-weight: 700;
            margin-left: 20px;
            border: none;
            background-color: #fff;
            cursor: pointer;
            font-size: 16px;
        }
    }
    .progress-hint-content {
        margin-top: 60px;
        .progress-hint-color {
            color: #4091fb;
        }
    }
    .progress-hint-end {
        margin: 30px 0;
    }
    .contract-describe {
        // width: 670px;
        justify-content: center;
        display: flex;
        margin: 0 auto;
        img{
            vertical-align: middle;
            margin-right: 20px;
            margin-top: 42px;
        }
        .contract-link {
            .contract-link-url {
                color: #4091fb;    
            }
            .copy-link {
                display: inline-block;
                width: 100px;
                height: 36px;
                line-height: 36px;
                text-align: center;
                color: #4091fb;
                border: 1px solid #4091fb;
                border-radius: 5px;
                margin-left: 20px;
                border: 1px solid #4091fb;
                background-color: #fff;
                cursor: pointer;
            }
        }
    }
}
</style>