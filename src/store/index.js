import Vue from 'vue'
import vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'   //vuex数据持久化
Vue.use(vuex)
const state = {
  show: 0,
  flag: false,
  data: '111',
  contractName1:'', //拖拽上传合同名字
  roleName:'', //二级角色
  contractNo1:'',    //拖拽上传合同编号
  rowName: '',       //主页table合同名字
  rowNumber: '',     //主页table合同编号
  templateName:'',  //模板名称
  templateNo: '',  // 模板编号
  templateGenre: '', //批量模板类型
  signatory:'',  // 批量模板几方签署
  type:'',        // 数据回显类型
  needSign:'',    //平台方是否签署
  tabIndex:'',     //当前活动tab
  showFilingNoDefault:'',     //当前默认folder编号
  showFilingNo:'',     //当前folder编号
  isBtnActive:true,
  defaultFolderTotalNum:'',
  nowIndex:0,  //归档合同文件左右翻页
  folderNum:0,   //归档合同文件总共多少页
  PanelActiveName:'first', //记录筛选列表状态(全部文件  待我签署 待他人签署 已生效 已截止)
  showTypePanel:true,     //企业对个人或者企业对企业删选条件(默认企业对个人)
  showFilingType:true,       //实名  归档or重新归档 根据当前账号类型以及当前筛选列表是否是默认文件夹  默认文件夹则显示归档 否则显示重新归档
  showFilingTypeUnRec:false,   //未实名  归档or重新归档  未实名  默认文件夹为未归档
}
const actions = {
    fileSuccess1: ({ commit },obj) => commit('fileSuccess1',obj),
    contractsInfo: ({ commit },obj) => commit('contractsInfo',obj),
    template:({ commit },obj) => commit('template',obj),
    templateType:({ commit },obj) => commit('templateType',obj),
    type:({ commit },obj) => commit('type',obj),
    needSign:({ commit },obj) => commit('needSign',obj),
    tabIndex:({commit},obj) => commit('tabIndex',obj),
    showFilingNo:({commit},obj) => commit('showFilingNo',obj),
    showFilingNoDefault:({commit},obj) => commit('showFilingNoDefault',obj),
    isBtnActive:({commit},obj) => commit('isBtnActive',obj),
    nowIndex:({commit},obj) => commit('nowIndex',obj),
    folderNum:({commit},obj) => commit('folderNum',obj),
  PanelActiveName:({commit},obj) => commit('PanelActiveName',obj),
  showTypePanel:({commit},obj) => commit('showTypePanel',obj),
  showFilingType:({commit},obj) => commit('showFilingType',obj),
  showFilingTypeUnRec:({commit},obj) => commit('showFilingTypeUnRec',obj),
  defaultFolderTotalNum:({commit},obj) => commit('defaultFolderTotalNum',obj),
  roleName:({commit},obj) => commit('roleName',obj),

}
const mutations = {
  tabIndex (state,res) {
    state.tabIndex = res.tabIndex
  },
  fileSuccess1 (state,res) {
    state.contractName1 = res.contractName
    state.contractNo1 = res.contractNo
  },
  contractsInfo (state,row) {
    state.rowNumber = row.contractNo
  },
  template (state,res){
    state.templateName = res.templateName
    state.templateNo = res.templateNo
  },
  templateType(state,res){
    state.templateGenre = res.templateGenre
    state.signatory = res.signatory
  },
  type(state,res){
    state.type = res.type
  },
  needSign(state,res){
    state.needSign = res.needSign
  },
  showFilingNo(state,res){
    state.showFilingNo=res.showFilingNo
  },
  showFilingNoDefault(state,res){
    state.showFilingNoDefault=res.showFilingNoDefault
  },
  isBtnActive(state,res){
    state.isBtnActive=res.isBtnActive
  },
  nowIndex(state,res){
    state.nowIndex=res.nowIndex
  },
  folderNum(state,res){
    state.folderNum=res.folderNum
  },

  PanelActiveName(state,res){
    state.PanelActiveName=res.PanelActiveName
  },
  showTypePanel(state,res){
    state.showTypePanel=res.showTypePanel
  },
  showFilingType(state,res){
    state.showFilingType=res.showFilingType
  },
  showFilingTypeUnRec(state,res){
    state.showFilingTypeUnRec=res.showFilingTypeUnRec
  },
  defaultFolderTotalNum(state,res){
    state.defaultFolderTotalNum=res.defaultFolderTotalNum
  },
  roleName(state,res){
    state.roleName=res.roleName
  },

  headclick (state) {
    // state.flag = 'true'
    // state.flag === false ? 'true' : 'false'
    if (state.flag === false) {
      state.flag = 'true'
    } else {
      state.flag = 'false'
    }
  },
  addOption (aa, bb) {
    // console.log(aa)
  }
}

export default new vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })],
    state,
    actions,
    mutations

})
