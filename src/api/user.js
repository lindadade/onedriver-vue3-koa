import { get, post } from '../utils/request'

const user = {
  getToken: data => post('/onedrive/common/oauth2/v2.0/token', data),
  login: data => get('http://127.0.0.1:7001/code', data)
}

export default user
