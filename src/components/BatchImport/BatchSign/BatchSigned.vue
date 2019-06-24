<template>
    <div>
        <Top></Top>
        <div class="batchsign-main">
            <div class="batchsign-progress">
                <div class="batchsign-progress-title">已经完成100%</div>
                <el-progress :percentage="100" status="success"></el-progress>
            </div>
            <div class="contract-describe">
                <div class="contract-describe-img">
                    <img src="/static/images/Common/contract-sign-success.png" alt="">
                </div>
                <div>
                    <div class="progress-hint-content">恭喜合同签署完成</div>
                    <div class="progress-hint-end">签署成功的链接将会通过短信的方式通知到签署合约方</div>
                    <div class="contract-link">
                        <span>签约室链接：</span>
                        <span class="contract-link-url">{{signRoomLink}}</span>
                        <button 
                            class="copy-link"
                            v-clipboard:copy="signRoomLink"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError">复制链接
                        </button>
                    </div>
                </div>
            </div>
            <div class="batchsign-line"></div>
            <div class="contract-number">
                <div class="contract-number-statistics contract-number-first">
                    <div class="contract-number-all">共创建合同数</div>
                    <div class="contract-number-image">
                        <img src="/static/images/BatchImport/create-contract.png" alt="">
                    </div>
                    <div class="style-center">共创建合同</div>
                    <div class="style-center">
                        <span class="num-color">{{totalNum}}</span>
                        <span>条</span>
                    </div>
                </div>
                <div class="contract-number-statistics">
                    <div class="contract-number-all">签署成功</div>
                    <div class="contract-number-image">
                        <img src="/static/images/BatchImport/contract-success.png" alt="">
                    </div>
                    <div class="style-center">签署成功</div>
                    <div class="style-center">
                        <span class="num-color">{{successNum}}</span>
                        <span>条</span>
                    </div>
                </div>
                <div class="contract-number-statistics contract-number-end">
                    <div class="contract-number-all">签署失败</div>
                    <div class="contract-number-image">
                        <img src="/static/images/BatchImport/contract-fail.png" alt="">
                    </div>
                    <div class="style-center">签署失败</div>
                    <div class="style-center">
                        <span class="num-color">{{failNum}}</span>
                        <span>条</span>
                    </div>
                </div>
            </div>
            <div class="look-detail">
                <button @click="lookDetail">查看详情</button>
            </div>
            
        </div>
        <Bottom></Bottom>
    </div>
</template>

<script>
import cookie from '@/common/js/getTenant'
import Top from '@/common/components/Top.vue'
import Bottom from '@/common/components/Bottom.vue'
export default {
    name: "BatchSigned",
    data() {
        return {
            signRoomLink: "", //签署链接
            failNum: "",      //失败条数
            successNum: "",   //成功条数
            totalNum: "",     //总条数
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
        let querys = this.$route.query;
        this.failNum = querys.failNum;
        this.signRoomLink = querys.signRoomLink;
        this.successNum = querys.successNum;
        this.totalNum = querys.totalNum;
    },
    methods: {
        //复制成功
        onCopy: function (e) {
            this.$message({
                message: '签约室链接复制成功',
                type: 'success'
            });
        },
        //复制失败
        onError: function (e) {
            // console.log(e)
        },
        //查看详情
        lookDetail() {
            this.$router.push("/BatchContractList");   
        }
    }
}
</script>
<style lang="scss" scoped>
.batchsign-main {
    width: 1200px;
    margin: 20px auto;
    padding: 50px 0;
    background-color: #fff;
    .batchsign-progress {
        width: 670px;
        margin: 0 auto;
        /deep/ .el-progress.is-success .el-progress-bar__inner {
            background-color: #4091fb;
        }
        /deep/ .el-icon-circle-check:before {
            color: #4091fb;
        }
        .batchsign-progress-title {
            margin-bottom: 30px;
            text-align: center;
            color: #666666;
        }
    }
    .progress-hint-content {
        margin-top: 60px;
        color: #4091fb;
        font-size: 18px;
    }
    .progress-hint-end {
        margin: 30px 0;
    }
    .contract-describe {
        // width: 670px;
        justify-content: center;
        display: flex;
        .contract-describe-img {
                margin-right: 20px;
                margin-top: 42px;
            img{
                vertical-align: middle;
                text-align: center;
                margin: 0 auto;
        }
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
    .batchsign-line {
        height: 1px;
        width: 100%;
        background-color: #ddd;
        margin-top: 60px;
    }
    .contract-number{
        display: flex;
        margin-top: 50px;
        .contract-number-statistics{
            flex: 1;
            height: 244px;
            margin: 0 10px;
            box-shadow: 1px 0px 12px #f5f5f5;
            border-radius: 5px;
            padding: 20px;
            .contract-number-all {
                border-bottom: 1px dashed #4091fb;
                padding-bottom: 20px;
                color: #4091fb;
            }
            .contract-number-image {
                text-align: center;
                margin: 20px 0 30px 0;
            }
            .num-color {
                color: #4091fb;
                font-weight: 700;
                font-size: 24px;
            }
            .style-center {
                text-align: center;
                margin-bottom: 20px;
            }
        }
        .contract-number-first {
            margin-left: 20px;
        }
        .contract-number-end {
            margin-right: 20px;
        }
    }
    .look-detail {
        margin-top: 46px;
        text-align: center;
        button {
            border: none;
            background-color: #fff;
            color: #4091fb;
            font-size: 16px;
            cursor: pointer;
        }
    }
}
</style>