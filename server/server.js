const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const cors = require('koa2-cors')
const axios = require('axios')
const qs = require('qs')

// 开启跨域
// 前端vue跨微软域名失败
app.use(cors())

// 获取code接口
router.get('/code', async (ctx, next) => {
  // oneDrive配置
  const oneDriveConfig = {
    client_id: 'daaf8f1a-052d-4f38-9483-7d45cf7fd429',
    scope: 'offline_access Files.Read Files.Read.All',
    response_type: 'code',
    // 重定向回后端获取token接口
    redirect_uri: 'http://localhost:7001/token'
  }
  let path = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${oneDriveConfig.client_id}&scope=${oneDriveConfig.scope}&response_type=${oneDriveConfig.response_type}&redirect_uri=${oneDriveConfig.redirect_uri}`
  // 拼接链接，返回前端进行登陆获取code跳转
  ctx.body = path
})

// 获取token接口
router.get('/token', async (ctx, next) => {
  // 重定向回前端页面
  const redirectPath = 'http://localhost:2020/login'
  // 获取到 /code返回的code值
  const { code } = ctx.query
  // oneDrive配置
  const oneDriveConfig = {
    grant_type: 'authorization_code',
    client_id: 'daaf8f1a-052d-4f38-9483-7d45cf7fd429',
    redirect_uri: 'http://localhost:7001/token',
    client_secret: '6TOPuwB5tR-h~QUpA383MZmTM~~3C0eHVc',
    code
  }
  const path = 'https://login.microsoftonline.com/common/oauth2/v2.0/token'
  // axios post请求接口
  // 利用qs将body的json格式转为form-data格式
  const result = await axios.post(path, qs.stringify(oneDriveConfig), {
    // 设置请求头配置 - form-data格式
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  // 获取到access_token数据
  const token = result.data.access_token
  // 拼接token值重定向回前端登陆页面
  ctx.redirect(`${redirectPath}?token=${token}`)
})

// 开启路由
app.use(router.routes(), router.allowedMethods())

// 开启7001端口
app.listen(7001, () => {
  console.log('run on 7001')
})
