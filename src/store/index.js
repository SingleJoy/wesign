import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
const state = {
  show: 0,
  flag: false,
  data: '111',
  contractName1:'', //拖拽上传合同名字
  contractNo1:'',    //拖拽上传合同编号
  rowName: '',       //主页table合同名字
  rowNumber: '',     //主页table合同编号
  templateName:'',  //模板名称
  templateNo: '',  // 模板编号
  templateGenre: '', //批量模板类型
  signatory:'',  // 批量模板几方签署
  type:'',        // 数据回显类型
  needSign:'',    //平台方是否签署
  tabIndex:''     //当前活动tab
}
const actions = {
    fileSuccess1: ({ commit },obj) => commit('fileSuccess1',obj),
    contractsInfo: ({ commit },obj) => commit('contractsInfo',obj),
    template:({ commit },obj) => commit('template',obj),
    templateType:({ commit },obj) => commit('templateType',obj),
    type:({ commit },obj) => commit('type',obj),
    needSign:({ commit },obj) => commit('needSign',obj),
    tabIndex:({commit},obj) => commit('tabIndex',obj)
}
const mutations = {
  tabIndex (state,res) {
    state.tabIndex = res.tabIndex
  },
  fileSuccess1 (state,res) {
    state.contractName1 = res.contractName,
    state.contractNo1 = res.contractNo
  },
  contractsInfo (state,row) {
    state.rowNumber = row.contractNo
  },
  template (state,res){
    state.templateName = res.templateName,
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
//   const actions = {
//     increment: ({ commit }) => commit('increment'),
//     decrement: ({ commit }) => commit('decrement'),
//     incrementIfOdd ({ commit, state }) {
//       if ((state.count + 1) % 2 === 0) {
//         commit('increment')
//       }
//     },
//     incrementAsync ({ commit }) {
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           commit('increment')
//           resolve()
//         }, 1000)
//       })
//     }
//   }


export default new vuex.Store({
  // plugins: [createPersistedState()],  
  state,
  actions,
  mutations

})
