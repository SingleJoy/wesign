<template>
  <div class="SingleTemplate">
    <h6 style="text-align: left;">温馨提示：一次发起一份合同，合同签署方数量以模板限定的签署方数量为准</h6>
    <h2 style="text-align: left;"><span>输入关键字</span> <input type="text" id='textInfo' placeholder="请输入关键字" max-length='20' v-model="inputTempSingle"><el-button type="primary" icon="el-icon-search" style='margin-left:5px;' @click="queryTemplate"></el-button></h2>
     <div  v-if="num === 0 && show == false" style="text-align: center;margin-top: 7%;">
      <img src="../../../../static/images/Multiparty/multiparties.png" alt="" >
     </div>
     <div class='beacthImg' v-else-if="num === 0 && show == true">
       <img src="../../../../static/images/Multiparty/multiparties.png" alt="">
     </div>
     <div v-else>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%;text-align:center"
        @row-click="generateClick"
        >
        <el-table-column
          prop="templateName"
          label="模板名称"
          width="300"
          style="text-align:center"
          >
        </el-table-column>
        <el-table-column
          prop="tempalateDate"
          label="创建时间"
          width="300">
        </el-table-column>
        <el-table-column
          prop="signatory"
          label="签署方"
          width="300">
        </el-table-column>
        <el-table-column
          prop="operation"
            width="250"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="generateClick(scope.row)" type="primary" size="mini">生成合同</el-button>
          </template>
        </el-table-column>
      </el-table>
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
</template>

<style lang="css" scoped>
  @import "../../../styles/Multiparty/Multiparties.css";
  .el-input el-input--small{
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
      inputTempSingle:'',
      query:false,
      show:false
    };
  },
  methods: {
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      if (this.inputTemplate !== ''){
        if(this.query == true){
          var templateInfoRequest ={'templateName':this.inputTempSingle,'pageNnm':val,'userStatus':1,'pageSize':'10','templateSpecies':'single','order':'DESC'};
          this.getTemplateList (templateInfoRequest)
        }else{
          var templateInfoRequest ={'pageNnm':val,'userStatus':1,'pageSize':'10','templateSpecies':'single','order':'DESC'};
          this.getTemplateList (templateInfoRequest)
        }
      } else {
        var templateInfoRequest ={'pageNnm':val,'userStatus':1,'pageSize':'10','templateSpecies':'single','order':'DESC'};
        this.getTemplateList (templateInfoRequest)
      }
    },
    generateClick(row){
       var templateName = ''
       var templateNo = ''
       this.$store.dispatch('template',{templateName:row.templateName,templateNo:row.templateNo})
       sessionStorage.setItem('templateName', JSON.stringify(row.templateName))
       sessionStorage.setItem('templateNo', JSON.stringify(row.templateNo))
       this.$router.push('/Fillinformation')
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
    queryTemplate () {
      if( this.inputTempSingle === 'null'){
        this.$message({
          showClose: true,
          message: '输入关键字不合法',
          type: 'error'
        })
        return false
      }
      var templateInfoRequest ={'templateName':this.inputTempSingle,'pageNnm':'1','userStatus':1,'pageSize':'10','templateSpecies':'single','order':'DESC'};
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
    var templateInfoRequest ={'pageNnm':'1','userStatus':1,'pageSize':'10','templateSpecies':'single','order':'DESC'};
    this.getTemplateList (templateInfoRequest)
  }
}
</script>
