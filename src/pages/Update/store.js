import { observable, action, toJS } from 'mobx'
import { changePassword } from 'apis/account'
import { message } from 'antd'

class Store {


  //修改密码
  @action.bound
  async changePassword(password, newPassword) {
    try {
      const res = await changePassword(password, newPassword)
      if (res.data.success) {
        message.success("修改密码成功,请退出重新登陆")
      } else {
        message.error("原密码输入有误")
      }
    } catch{
      message.error("修改密码错误")
    }
  }
}

export default new Store()