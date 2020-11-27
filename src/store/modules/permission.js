import { asyncRoutes, constantRoutes } from '@/router'

/**
 * @description 后端菜单匹配前端路由
 * @param {Array} menus 后端菜单
 * @param {Array} routers 前端路由
 * @returns {[]}
 */
function dynamicRouter(menus, routers) {
  const res = []
  menus.forEach(temp => {
    const router = routers.find(router => temp.path === router.name)
    const accessedRouter = router && Object.assign({}, router)
    if (accessedRouter) {
      accessedRouter.meta.title = temp.name
      if (temp.children && temp.children.length > 0) {
        accessedRouter.children = dynamicRouter(temp.children, accessedRouter.children)
      }
      res.push(accessedRouter)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, menus) {
    return new Promise(resolve => {
      const accessedRoutes = dynamicRouter(menus, asyncRoutes)
      // 404页必须放在最后!!!
      commit('SET_ROUTES', [...accessedRoutes, { path: '*', redirect: '/404', hidden: true }])
      resolve([...accessedRoutes, { path: '*', redirect: '/404', hidden: true }])
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
