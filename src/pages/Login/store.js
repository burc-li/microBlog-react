import { observable, action } from "mobx";
import { isExit, login } from "apis/account";
import { message } from 'antd'

class Store {
  @observable
  userInfo = {};
  @observable
  loginStatus = false

  @action.bound
  async login(account) {
    try {
      const res = await login(account);
      if (res.data.success) {
        this.loginStatus = true
        this.userInfo = res.data
        return
      }
      message.error('用户名密码不正确');
    } catch{
      message.error('登录失败');
    }
  }
}
export default new Store();