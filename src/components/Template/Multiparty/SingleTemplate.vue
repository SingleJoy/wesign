<template>
  	<div class="SingleTemplate">
      <div class="template-body">
        <div class="template-title">
          <div class="title-bg">
            <span class="title-name">模板列表</span>
            <span class="title-tip" >单次发起合同：一次发起一份合同，合同签署方数量以模板限定签署方数量为准</span>
            <span class="search-btn">
              <input type="text" id='contractTextInfo' placeholder="请输入模板名称" max-length='20' v-model="inputTempSingle">
              <el-button type="primary"  style='margin-left:5px;letter-spacing:5px;' @click="queryTempBatch">搜索</el-button>
            </span>
          </div>
        </div>

        <div class="line"></div>
        <div class="template-list">
          <ul v-if="tableData.length>0">
            <li v-for="(item,index) in tableData" :key="index">
                <div class="contract-box">
                    <div class="contract-content">
                    <div class="content-left" @click="previewContract(item)">
                        <img  style="height: 270px; width: 180px;" v-if="item.imgs" :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+item.imgs[0]" alt="" />
                        <p>{{item.templateName}}</p>
                    </div>
                    <div class="content-right">
                        <h3>{{item.templateName}}</h3>
                        <p class="item-name">
                            <span class="initiator item-default">合同方：</span>
                            <span class="initiator">{{item.signatory}}&nbsp;&nbsp;方</span>
                        </p>
                        <p v-if="accountLevel==1" class="item-name" style="text-overflow: ellipsis; overflow: hidden;word-break: break-all;white-space: nowrap;width: 800px;">
                            <span class="initiator item-default">绑定账号：</span>
                            <!-- <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top"> -->
                                    <span v-if="item.bindAccounts.length>0" v-for="(acountItem,accountIndex) in item.bindAccounts" :key="accountIndex">
                                        <span class="initiator" v-if="accountIndex<item.bindAccounts.length-1">{{acountItem+"、"}}</span>
                                        <span class="initiator" v-else>{{acountItem}}</span>
                                    </span>
                                    <span v-else>{{'——'}}</span>
                            <!-- </el-tooltip> -->


                        </p>
                        <p class="item-name">
                            <span class="initiator item-default">累计发起：</span>
                            <span class="initiator-total"><span class="total-num">{{item.usedNum}}</span>&nbsp;&nbsp;&nbsp;次</span>
                        </p>
                        <p class="item-name upload-time">
                            <span class="initiator item-default">上传时间：</span>
                            <span class="initiator">{{item.tempalateDate}}</span>
                        </p>
                        <p>
                            <span  @click="previewContract(item)" class="item-option">
                                <img src="/static/images/Multiparty/see.png" alt="">
                            <span>在线预览</span>
                        </span>

                        <span  @click="generateClick(item)" class="item-option">
                            <img src="/static/images/Multiparty/creater.png" alt="">
                            <span>立即发起</span>
                        </span>
                        </p>
                    </div>
                    </div>
                </div>
                <el-dialog title="模板详情图片" :visible.sync="item.dialogTableVisible"  custom-class='showDialogs'>
                    <div v-for="(itemImg,indexImg) in item.imgs" :key="indexImg" >
                        <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+itemImg" alt="" style='width:100%;'>
                    </div>
                </el-dialog>
                <div class="line" v-if="index+1<tableData.length"></div>
            </li>
            </ul>
            <ul v-else style="text-align: center;margin-top: 100px;">
                    <li class="no-data">
                        <img src="../../../../static/images/blank.png" alt="">
                        <p>{{textTip}}</p>
                    </li>
            </ul>
          <div class='pagetion'>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            layout="total,prev, pager, next, jumper"
            :total=Number(num)>
            </el-pagination>
          </div>
        </div>

      </div>
  	</div>
</template>

<style lang="scss" scoped>
  @import "../../../styles/Multiparty/Multiparties.scss";
  @import "../../../common/styles/content.scss";

  .el-input .el-input--small{
    width: 150px !important;
  }
   .beacthImg{
    width: 153px;
    margin: 300px auto;
    height: 89px;
    margin-bottom: 175px;
  }
  .beacthImg>img{
    width: 100%;
    height:100%;
  }
  .customer-service{
    width: 200px!important;
    height: 50px!important;
    background: url('../../../../static/images/Common/customer-service.gif') no-repeat !important;
    margin-left: 80px;
  }

</style>

<script>
import { mapActions, mapState } from 'vuex'
import cookie from '@/common/js/getTenant'
import server from '@/api/url.js'
export default {
    data() {
        return {
        baseURL:this.baseURL.BASE_URL,
        total:'',
        inputTempBatch:'',
        tableData: [],
        currentPage: 1,
        num:'',
        inputTempSingle:'',
        query:false,
        show:false,
        dialogTableVisible:false,
        imgList:[],
        textTip:'暂无模板',
        accountLevel:sessionStorage.getItem("accountLevel"),
        interfaceCode:cookie.getJSON('tenant')?cookie.getJSON('tenant')[1].interfaceCode:'',

        };
    },
    methods: {
        previewContract(value){
            let list = this.tableData
            list.map(function(item,index){
                if(value.templateNo==item.templateNo){
                    item.dialogTableVisible = true;
                }
            })
            this.tableData = list;
        },

        getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == 0) {
            return "background:#f5f5f5;text-align:center;font-weight:bold;";
        } else {
            return "";
        }
        },
        handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        },
        queryTempBatch(){
        let templateInfoRequest ={'templateName':this.inputTempSingle,'pageNnm':1,'useStatus':1,'pageSize':'10','templateSpecies':'single','order':'DESC'}
        this.getTemplateList (templateInfoRequest)
            var data =[];
            let accountCode=sessionStorage.getItem('accountCode')
            server.contractTemplate(templateInfoRequest,accountCode).then(res=>{
                if(res.data.sessionStatus == '0'){
                    this.$router.push('/Server')
                } else {
                    if(res.data.contents&&res.data.contents.length>0){
                        for (let i = 0; i < res.data.contents.length;i++) {
                            var obj = {}
                            obj.templateNo = res.data.contents[i].templateCode;         //模板号
                            obj.templateName = res.data.contents[i].templateName;       //模板名
                            obj.tempalateDate = res.data.contents[i].strCreateTime;     //上传日期
                            obj.signatory = res.data.contents[i].template.partyNumber;  //合同方
                            obj.bindAccounts = res.data.contents[i].bindAccounts;       //绑定账号
                            obj.imgs = res.data.contents[i].template.templateImgs;      //图片
                            obj.usedNum = res.data.contents[i].usedNum;                 //累计发起
                            obj.dialogTableVisible = false;                             //图片预览弹框默认不显示
                            if (obj.signatory == '' || obj.signatory == null){
                                obj.signatory = 0;
                            }
                            data[i] = obj
                        }
                        this.tableData = data
                        this.num = res.data.totalItemNumber
                        this.loading = false
                    }else{
                        this.tableData=[];
                        this.num='';
                        this.textTip="无匹配模板"
                    }
                }
            }).catch({

            })

        },
        handleCurrentChange(val) {
            document.documentElement.scrollTop = 0
        if (this.inputTemplate !== ''){
            if(this.query == true){
            var templateInfoRequest ={'templateName':this.inputTempSingle,'pageNnm':val,'useStatus':1,'pageSize':'10','templateSpecies':'single','order':'DESC'};
            this.getTemplateList (templateInfoRequest)
            }else{
            var templateInfoRequest ={'pageNnm':val,'useStatus':1,'pageSize':'10','templateSpecies':'single','order':'DESC'};
            this.getTemplateList (templateInfoRequest)
            }
        } else {
            var templateInfoRequest ={'pageNnm':val,'useStatus':1,'pageSize':'10','templateSpecies':'single','order':'DESC'};
            this.getTemplateList (templateInfoRequest)
        }
        },
        generateClick(row){
            let param={
                t:Math.random()
            }
            server.authorityUpload(param,this.interfaceCode).then(res=>{
             if(res.data.resultCode == 1){

              this.b2cNum = res.data.data.b2cNum;
              sessionStorage.setItem("b2cNum",this.b2cNum);
              if(this.b2cNum<=0){
                this.$confirm(
                <div class="warn-num ">
                  <p class="title" style="font-size:16px;text-align:center;">对个人合同份数已用尽</p>
                  <p style="font-size:16px;text-align:center;">请联系客服购买套餐</p>
                  <div class="customer-service"></div>
                </div>,'提示', {confirmButtonText: '确定',showCancelButton:false})
              }else {
                var templateName = ''
                var templateNo = ''
                this.$store.dispatch('template',{templateName:row.templateName,templateNo:row.templateNo})
                sessionStorage.setItem('templateName', row.templateName)
                sessionStorage.setItem('templateNo', row.templateNo)
                this.$router.push('/Fillinformation')
              }

            }
          })
        },
        getTemplateList (templateInfoRequest) {
            var data =[];
            let accountCode=sessionStorage.getItem('accountCode')
            server.contractTemplate(templateInfoRequest,accountCode).then(res=>{
                if(res.data.sessionStatus == '0'){
                    this.$router.push('/Server')
                } else {
                    if(res.data.contents){
                        for (let i = 0; i < res.data.contents.length;i++) {
                            var obj = {}
                            obj.templateNo = res.data.contents[i].templateCode;         //模板号
                            obj.templateName = res.data.contents[i].templateName;       //模板名
                            obj.tempalateDate = res.data.contents[i].strCreateTime;     //上传日期
                            obj.signatory = res.data.contents[i].template.partyNumber;  //合同方
                            obj.bindAccounts = res.data.contents[i].bindAccounts;       //绑定账号
                            obj.imgs = res.data.contents[i].template.templateImgs;      //图片
                            obj.usedNum = res.data.contents[i].usedNum;                 //累计发起
                            obj.dialogTableVisible = false;                             //图片预览弹框默认不显示
                            if (obj.signatory == '' || obj.signatory == null){
                                obj.signatory = 0;
                            }
                            data[i] = obj
                        }
                        this.tableData = data
                        this.num = res.data.totalItemNumber
                        this.loading = false
                    }
                }
            }).catch({

            })
        },
        queryTemplate () {
            if( this.inputTempSingle === 'null'){
                this.$message({
                showClose: true,
                message: '输入关键字不合法',
                type: 'error'
                })
                return false
            }
            var templateInfoRequest ={'templateName':this.inputTempSingle,'pageNnm':'1','useStatus':1,'pageSize':'10','templateSpecies':'single','order':'DESC'};
            this.getTemplateList (templateInfoRequest)
            this.$message({
                showClose: true,
                message: '查询成功',
                type: 'success'
            })
            this.query = true
            this.show = true
        }
    },

    created() {
        var templateInfoRequest ={'pageNnm':'1','useStatus':1,'pageSize':'10','templateSpecies':'single','order':'DESC'};
        this.getTemplateList (templateInfoRequest)
    }
}
</script>
