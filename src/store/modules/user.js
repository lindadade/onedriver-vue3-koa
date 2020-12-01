import user from '@/api/user'
import { getToken, setToken, removeToken, getRedirect, setRedirect, removeRedirect } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  redirect: getRedirect()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_REDIRECT: (state, url) => {
  state.redirect = url
},
}

const actions = {
  // user login
  async login({ commit }, token) {
    await commit('SET_TOKEN', token)
    await setToken(token)
  },

  // redirect
  async redirect({ commit }, url) {
    await commit('SET_REDIRECT', url)
    await setRedirect(url)
  },

  // user logout
  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      user.logout(state.token).then(async() => {
        commit('permission/SET_ROUTES', [], { root: true })
        await dispatch('resetToken')
        // reset visited views and cached views
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 退出登录重置数据
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_MENUS', '')
      commit('SET_NAME', '')
      commit('SET_UintOptions', '')
      removeToken()
      removeRedirect()
      resetRouter()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

