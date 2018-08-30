<template>
	<div class="BatchTemplate">
		<div class="template-body">
			<div class="template-title">
				<div class="title-bg">
					<span class="title-name">模板列表</span>
					<span class="title-tip" >批量发起合同：一次批量发起多份合同，发起方与每个签署方签署一份独立合同</span>
					<span class="search-btn">
						<input type="text" id='textInfo' placeholder="请输入模板名称" max-length='20' v-model="inputTempBatch">
						<el-button type="primary"  style='margin-left:5px;letter-spacing:5px;' @click="queryTempBatch">搜索</el-button>
					</span>
				</div>
            </div>
            <div class="line"></div> 
			<div class="template-list">
				<ul>
					<li v-for="(item,index) in tableData" :key="index" >
						<div class="contract-box">
							<div class="contract-content">
								<div class="content-left">
									<p>{{item.templateName}}</p>
								</div>
								<div class="content-right">
									<h3>{{item.templateName}}</h3>
								
									<p class="item-name">
										<span class="initiator item-default">绑定账号：</span>
										<span class="initiator">{{item.Character}}</span>
									</p>
									<p class="item-name">
										<span class="initiator item-default">累计发起：</span>
										<span class="initiator-total"><span class="total-num">{{item.total}}</span>次</span>
									</p>
									<p class="item-name upload-time">
										<span class="initiator item-default">上传时间：</span>
										<span class="initiator">{{item.tempalateDate}}</span>
									</p>
									<p>
										<span class="item-option">
											<img src="../../../../static/images/Multiparty/see.png" alt="">
											<span>在线预览</span>
										</span>
										
										<span class="item-option">
											<img src="../../../../static/images/Multiparty/creater.png" alt="">
											<span @click="generateClick(item)">立即发起</span>
										</span>
									</p>
								</div>
							</div>
						</div>
						<div class="line"></div>
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
	@import "../../../common/styles/content.css";
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
</style>

<script>
import { mapActions, mapState } from 'vuex'
import cookie from '@/common/js/getTenant'
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      num:'',
      inputTempBatch:'',
      query:false,
      show:false
    };
  },
  methods: {
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
    handleCurrentChange(val) {
      if ( this.queryTempBatch !== '') {
        if(this.query == true){
          var templateInfoRequest ={'templateName':this.inputTempBatch,'pageNnm':val,'userStatus':1,'pageSize':'10','templateSpecies':'batch','order':'DESC'};
          this.getTemplateList (templateInfoRequest)
        }else{
          var templateInfoRequest ={'pageNnm':val,'userStatus':1,'pageSize':'10','templateSpecies':'batch','order':'DESC'};
          this.getTemplateList (templateInfoRequest)
        }
      } else {
        var templateInfoRequest ={'pageNnm':val,'userStatus':1,'pageSize':'10','templateSpecies':'batch','order':'DESC'};
        this.getTemplateList (templateInfoRequest)
      }
    },
    generateClick(row){
      this.$store.dispatch('template',{templateName:row.templateName,templateNo:row.templateNo})
      this.$store.dispatch('templateType',{templateGenre:row.templateGenre,signatory:row.signatory})
      sessionStorage.setItem('templateName', JSON.stringify(row.templateName))
      sessionStorage.setItem('templateNo', JSON.stringify(row.templateNo))
      sessionStorage.setItem('templateGenre',JSON.stringify(row.templateGenre))
      this.$router.push('/batchSetting') //需要传模板编号和模板有几方 传至Signaturesetting
    },
    getTemplateList (templateInfoRequest) {
      var data =[];
      let url = process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/templates';
      this.$http.get(url, {params: templateInfoRequest}).then(function (res) {
        if(res.data.sessionStatus == '0'){
          this.$router.push('/Server')
        } else {
        for (let i = 0; i < res.data.contents.length;i++) {
          var obj = {}
          obj.templateNo = res.data.contents[i][1]
          obj.templateName = res.data.contents[i][3]
          obj.templateGenre = res.data.contents[i][6]
          obj.tempalateDate = res.data.contents[i][7]
          obj.signatory = res.data.contents[i][8]
           if (obj.signatory == '' || obj.signatory == null){
            obj.signatory = ''
          } else {
            obj.signatory += '方'
          }
          data[i] = obj
        }
        this.tableData = data
        this.num = res.data.totalItemNumber
        this.loading = false
        }
      })
    },
    queryTempBatch () {
      if( this.inputTempBatch === 'null'){
        this.$message({
          showClose: true,
          message: '输入关键字不合法',
          type: 'error'
        })
        return false
      }
      var templateInfoRequest ={'templateName':this.inputTempBatch,'pageNnm':'1','userStatus':1,'pageSize':'10','templateSpecies':'batch','order':'DESC'};
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
    var templateInfoRequest ={'pageNnm':'1','userStatus':1,'pageSize':'10','templateSpecies':'batch','order':'DESC'};
    this.getTemplateList (templateInfoRequest)
  }
}
</script>

