import { observable, action, toJS } from "mobx";
import { isExit, register, login, logout } from "apis/account";
import { message } from 'antd'

class Store {

  // 登录
  @action.bound
  async login(account) {
    try {
      const res = await login(account);
      if (res.data.success) {
        // 持久化存储
        // console.log("res.data.data", res.data.data)
        localStorage.setItem('loginStatus', true)
        localStorage.setItem('userInfo', JSON.stringify(res.data.data))
        return res
      }
      message.error('用户名密码不正确');
      return res
    } catch{
      message.error('登录失败');
    }
  }

  // 退出 清除持久化存储
  @action.bound
  async logout() {
    const res = await logout()
    if (res.data.success)
      localStorage.clear()

    return res
  }

  // 注册时用户名是否存在
  @action.bound
  async isExit(userName) {
    const res = await isExit(userName)
    return res
  }

  // 注册
  @action.bound
  async register({ email, userName, password, gender }) {
    try {
      const res = await register({ email, userName, password, gender })
      if (res.data.success)
        message.success('注册成功');
    } catch{
      message.error('注册失败');
    }
  }
}
export default new Store();
