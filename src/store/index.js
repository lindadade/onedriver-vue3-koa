import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)
// 工具化导入modules文件
const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

// namespaced 解决不同模块命名冲突的问题 -> 模块名/模块中的mutations
const store = new Vuex.Store({
  namespaced: true,
  modules,
  getters
})

export default store
