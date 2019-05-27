<template>
    <div>
        <Top></Top>
        <div class="batchsign-main">
            <div class="batchsign-progress">
                <div class="batchsign-progress-title">已23经完成100%</div>
                <el-progress :percentage="70" :show-text="false"></el-progress>
            </div>
            <div class="contract-describe">
                <div>
                    <img src="../../../../static/images/Common/contract-sign-success.png" alt="">
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
                        <span class="contract-link-url">www.zqsign.com</span>
                        <span class="copy-link">复制链接</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="batchsign-line"></div>
        <div>
            <div>
                <div>共创建合同数</div>
                <div></div>
            </div>
            <div></div>
            <div></div>
        </div>
        <Bottom></Bottom>
    </div>
</template>
<style lang="scss">
    .batchsign-main {
        width: 1200px;
        margin: 20px auto;
        padding: 50px 0;
        background-color: #fff;
        .batchsign-progress {
            width: 670px;
            margin: 30px auto;
            .batchsign-progress-title {
                margin-bottom: 30px;
                text-align: center;
                color: #666666;
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
                    height: 44px;
                    line-height: 44px;
                    text-align: center;
                    color: #4091fb;
                    border: 1px solid #4091fb;
                    border-radius: 15px;
                    margin-left: 20px;
                }
            }
        }
        .batchsign-line {
            height: 1px;
            width: 100%;
            background-color: #666;
        }
    }
</style>
<script>
import cookie from '@/common/js/getTenant'
import Top from '@/common/components/Top.vue'
import Bottom from '@/common/components/Bottom.vue'
export default {
    name: "batchSigned",
    data() {
        return {

        }
    },
    components: {
        Top,
        Bottom
    }
}
</script>