import axios from 'axios'
import qs from 'qs'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { obj2FormData } from '@/utils'

/**
 * @description 过滤params字段
 * @param {Object} data
 * @returns {Object}
 */
export function _filterParams(data) {
  const newData = { ...data }
  for (const key in newData) {
    const val = newData[key]
    if (val === undefined || val === null || val === '') {
      delete newData[key]
    }
  }
  return newData
}

/**
 * @description 请求时过滤data,将''转为null
 * @param {Object} data
 * @param isJson
 * @returns {Object}
 */
function _filterData(data, isJson = false) {
  const newData = { ...data }
  for (const key in newData) {
    newData[key] === '' && (newData[key] = isJson ? null : 'null')
  }
  return newData
}

/**
 * @description 请求时过滤data,将''转为null
 * @param {Object} data
 * @param isJson
 * @returns {Object}
 */
function _filterPostData(data, isJson = false) {
  const newData = { ...data }
  for (const key in newData) {
    newData[key] === '' && (newData[key] = isJson ? null : '')
  }
  return newData
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API // url = base url + request url
  // withCredentials: true, // 跨域请求时发送Cookie
  // timeout: 10e3 // request timeout
})

// axios实例默认配置
service.defaults.transformRequest = data => qs.stringify(data)

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 让每个请求都携带 token
      // ['token'] 是一个自定义的 headers key
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * 如果要获取http信息（例如标题或状态）
   * return  response => response
   */

  /**
   * 通过自定义代码确定请求状态
   * 也可以通过HTTP状态码判断状态
   */
  async response => {
    const { status, statusText } = response
    if (status !== 200) {
      Message({
        message: statusText,
        type: 'error',
        duration: 5e3
      })
      return Promise.reject(statusText)
    }
    // 如果自定义代码不是200，则将其判断为错误
    if (status !== 200) {
      Message({
        message: statusText,
        type: 'error',
        duration: 5e3
      })
      return Promise.reject(new Error(statusText))
    } else {
      return response
    }
  },
  async error => {
    const code = error.toString().replace(/[^0-9]/ig,"")
    switch (code) {
      case '401':
        await MessageBox.confirm('有效身份认证过期，请重新登录', '重新登录', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await store.dispatch('user/resetToken')
        location.reload()
        return Promise.reject(new Error(error))
    }
    return Promise.reject(error)
  }
)
// 处理get请求
export const get = (url, params, config = {}) => service.get(url, { ...config, params: _filterParams(params) })
// 处理delete请求，为了防止和关键词delete冲突，方法名定义为del
export const del = (url, data, config = {}) => service.delete(url, { ...config, data, transformRequest: data => obj2FormData(data) })
// 处理post请求
export const post = (url, data, config = {}, isJSon) => service.post(url, _filterPostData(data, isJSon), config)
// 处理post请求传json
export const postWithJson = (url, data, config, isJSon = true) => post(url, data, {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  transformRequest: data => JSON.stringify(data),
  ...config
}, isJSon)
// 处理put请求
export const put = (url, data, config = {}, isJSon) => service.put(url, _filterData(data, isJSon), config)

export default service
