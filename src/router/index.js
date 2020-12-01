import user from "@/api/user";
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
// import Layout from '@/layout'

/**
 * 注意：子菜单仅在路由children.length> = 1时出现
 *
 * hidden: true                   如果设置true, 不会显示在侧边栏中（默认为false）
 * alwaysShow: true               如果设置true, 将始终显示根菜单
 *                                如果未设置alwaysShow，则当项有多个子路由时，
 *                                它将变为嵌套模式，否则不显示根菜单
 * Redirect: noRedirect           如果设置noRedirect，则不会在面包屑中重定向
 * name:'routerName'              用来使用<keep-alive>
 * meta : {
    title: 'title'                显示在侧边栏和面包屑的名称（推荐设置）
    icon: 'svg-name'              显示在侧边栏的icon
    noCache: true                 如果设置为true，将不缓存页面（默认为false）
    affix: true                   如果设置为true，则标签将固定在tags-view中
    breadcrumb: false             如果设置为false，在面包屑中不显示（默认为true）
    activeMenu: '/example/list'   如果设置了路径，则侧边栏将高亮显示所设置的路径
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基本页面
 * 所有角色都可以访问
 */
export const constantRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/index')
  },
  {
    path: '/student',
    name: 'About',
    component: () => import('../views/component/Student')
  }
]

/**
 * asyncRoutes
 * 需要根据后端返回的菜单列表动态匹配的路由
 */
export const asyncRoutes = []

const createRouter = () => new Router({
  // mode: 'history', // 需要后端支持
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// 动态重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
