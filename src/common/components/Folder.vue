<template>
  <div class="Folder">
    <div class="folder-content">
      <div class="left-arrow"><p></p></div>
      <div class="folder-list">
        <div class="list-item">
          <ul >
            <li v-for="(item ,index) in folderList" :key="index" >
              <p class="folder-img"></p>
              <p class="folder-num">{{item.num}}</p>
              <p class="folder-setting"  >
                <el-dropdown style="position: absolute;left: 10px;top:10px"  trigger="click" placement="bottom" >
                  <span class="el-dropdown-link">
                      <b class="setting-img"></b>
                 </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="reNameFolder(item.filingNo)">重命名</el-dropdown-item>
                    <el-dropdown-item @click.native="deleteFolder(item.filingNo)">删除</el-dropdown-item>

                  </el-dropdown-menu>
                </el-dropdown>
              </p>
              <p class="folder-name" :title=item.name>{{item.name}}</p>

            </li>
            <li class="add-folder" @click="addFolder()">

            </li>
          </ul>
        </div>
      </div>
      <div class="right-arrow"><p></p></div>
    </div>
  </div>
</template>

<script>
  import {addContractFiling, contractFiling, contractFilings, deleteContractFiling, updateContractFiling} from '@/api/folder'
  export default {
    name: 'Folder',
    data() {
      return {
        interfaceCode:sessionStorage.getItem('interfaceCode'),
        accountCode:sessionStorage.getItem('accountCode'),
        folderList:[
          {name:'第一个文件夹12221213123',filingNo:'11111',num:'10'},
          {name:'第二个文件夹',filingNo:'222222',num:'12'},
          {name:'第三个文件夹',filingNo:'33333',num:'20'},
          {name:'第四个文件夹',filingNo:'444444',num:'35'},
          {name:'第五个文件夹',filingNo:'555555',num:'70'},
          {name:'第六个文件夹',filingNo:'666666',num:'36'},
          {name:'第七个文件夹',filingNo:'777777',num:'26'},
          {name:'第八个文件夹',filingNo:'888888',num:'15'},
          {name:'第九个文件夹',filingNo:'9699999',num:'26'},
          {name:'第十个文件夹',filingNo:'444444',num:'10'},
        ]
      }
    },
    methods:{

      //重命名归档文件夹名称
      reNameFolder(filingNo){
        console.log(filingNo)
        this.$prompt('请输入新的文件名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '文件夹名称不能包含非法符号且30位以内！'
        }).then(({ filingName }) => {
           this.updateContractFiling(filingNo,filingName);

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });
        });
      },

      //删除归档文件
      deleteFolder(filingNo){
        console.log(filingNo)
        this.$confirm('您确定删除该文件夹？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.deleteContractFiling(filingNo);

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },

      // 删除文档，数据更新  调用兄弟组件方法

      addFolder(){
        this.$prompt('请输入文件夹名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /![@#\$%\^&\*]\d{0,30}/,
          inputErrorMessage: '文件夹长度最多30位'
        }).then(({ value }) => {
          //输入文件夹名称格式正确调用
          this.addContractFiling();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });
        });
      },

      //新增文件夹接口
      addContractFiling(){
        addContractFiling(this.interfaceCode,this.accountCode).then(res=>{
          console.log(res)
          let resultCode = res.data.resultCode;

          if(resultCode=='0'){
            this.$message({
              type: 'success',
              message: '添加新文件夹成功 '
            });
          }
          this.contractFilings();
        }).catch(error=>{

        })
      },

      //重命名件夹接口
      updateContractFiling(filingNo,filingName){
        let params={
          'filingNo':filingNo,
          'filingName':filingName,
        };
        updateContractFiling(params).then(res=>{
          console.log(res);

          if(res.data.resultCode=='0'){
            this.$message({
              type: 'success',
              message: '修改文件夹名称成功!'
            });
          }else{
            this.$message({
              type: 'error',
              message: res.data.resultMessage
            });
          }

        }).catch(error=>{

        })
      },

      // 查询所有归档文件夹接口
      contractFilings(){

        let params={
          'pageNo':1,
          'pageSize':10,
        }
        contractFilings(this.interfaceCode,this.accountCode,params).then(res=>{
          console.log(res)
          let resultCode = res.data.resultCode
          if(resultCode=='0'){

          }else{

          }
        }).catch(error=>{

        })
      },

      // 删除归档文件夹接口
      deleteContractFiling(filingNo){
        let params={
          'filingNo':filingNo
        };
        deleteContractFiling(params).then(res=>{
          console.log(res);

          if(res.data.resultCode=='0'){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }else{
            this.$message({
              type: 'error',
              message: res.data.resultMessage
            });
          }

        }).catch(error=>{

        })
      }
    },
    created(){
      this.contractFilings();
    }

  }
</script>


<style lang="scss" scoped>
  .folder-content{
  position: relative;
  margin-top: 20px;
  background: #fff;
  padding: 20px;
  height: 80px;
  div{
  display: inline-block;
}
  .left-arrow{
  width:35px;
  height: 86px;
  cursor: pointer;
  p{
  width: 16px;
  height: 60px;
  background: url("/static/images/Folder/left-arrow.png") center center no-repeat;
}
  p:hover{
  transform:rotate(0) scale(1.5);
  -webkit-transform:rotate(0) scale(1.5);
  -moz-transform:rotate(0) scale(1.5);
  -o-transform:rotate(0) scale(1.5);
  /*transform 属性下 rotate（旋转）和scale（放大）属性；可以同时用*/
  -ms-transform:rotate(0) scale(1.5);
  -webkit-transition: all .20s ease-in .1s;
  transition: all .20s ease-in .1s;
}
}
  .right-arrow{
  width:35px;
  height: 86px;
  cursor: pointer;
  text-align: center;
  p{
  width: 16px;
  height: 60px;
  background: url("/static/images/Folder/right-arrow.png") center center no-repeat;
}
  p:hover{
  transform:rotate(0) scale(1.5);
  -webkit-transform:rotate(0) scale(1.5);
  -moz-transform:rotate(0) scale(1.5);
  -o-transform:rotate(0) scale(1.5);
  /*transform 属性下 rotate（旋转）和scale（放大）属性；可以同时用*/
  -ms-transform:rotate(0) scale(1.5);
  -webkit-transition: all .15s ease-in .1s;
  transition: all .15s ease-in .1s;
}
}
  .folder-list{
  position: relative;
  margin: 0 15px 0 15px;
  box-sizing: border-box;
  .list-item{
  overflow: hidden;
  height: 86px;
  ul{
  li{
  position: relative;
  width: 94px;
  display: inline-block;
  height:60px;
  float: left;
  text-align: center;
  cursor: pointer;
  padding-top: 5px;
  p{
  display: inline-block;
  vertical-align: middle;
}
  .folder-img{
  width:40px;
  height: 40px;
  padding-top: 5px;
  background: url("/static/images/Folder/folder-normal.png") center no-repeat;
}
  .folder-num{
  width:54px;
  height: 20px;
  background: url("/static/images/Folder/folder-number.png") center no-repeat;
  position: absolute;
  left:60px;
  top:-4px;
  transform:rotate(0) scale(0.8);
  -webkit-transform:rotate(0) scale(0.8);
  -moz-transform:rotate(0) scale(0.8);
  -o-transform:rotate(0) scale(0.8);
  color: #fff;
  line-height: 20px;
  font-size:12px;
}
  .folder-setting{
  position: absolute;
  left:56px;
  top:32px;
  .el-dropdown-link{
  b.setting-img{
  display: block;
  position: absolute;
  width:15px;
  height: 15px;
  background: url("/static/images/Folder/setting.png") no-repeat;
}
}
}
  .folder-name{
  display: block;
  font-size:12px;
  color: #333;
  padding-top: 20px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

  .folder-img:hover{
  transform:rotate(0) scale(1.5);
  -webkit-transform:rotate(0) scale(1.5);
  -moz-transform:rotate(0) scale(1.5);
  -o-transform:rotate(0) scale(1.5);
  /*transform 属性下 rotate（旋转）和scale（放大）属性；可以同时用*/
  -ms-transform:rotate(0) scale(1.5);
  -webkit-transition: all .15s ease-in .1s;
  transition: all .15s ease-in .1s;

}
}
  li.add-folder{
  background: url("/static/images/Folder/add-folder.png") center no-repeat;
}
  li.add-folder:hover{
  transform:rotate(0) scale(1.5);
  -webkit-transform:rotate(0) scale(1.5);
  -moz-transform:rotate(0) scale(1.5);
  -o-transform:rotate(0) scale(1.5);
  /*transform 属性下 rotate（旋转）和scale（放大）属性；可以同时用*/
  -ms-transform:rotate(0) scale(1.5);
  -webkit-transition: all .15s ease-in .1s;
  transition: all .15s ease-in .1s;
}
  li.active{
  .folder-img{
  background: url("/static/images/Folder/folder-open.png") no-repeat;
}
}

}
}

}
}
</style>
