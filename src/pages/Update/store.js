import { observable, action, toJS } from 'mobx'
import { changePassword, changeBriefIntroduce, changePic } from 'apis/account'
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
  //修改密码
  @action.bound
  async changeBriefIntroduce(briefIntroduce) {
    try {
      const res = await changeBriefIntroduce(briefIntroduce)
      if (res.data.success) {
        message.success("修改简介成功")
      }
    } catch{
      message.error("修改简介失败")
    }
  }
  //修改头像
  @action.bound
  async changePic(picture) {
    try {
      const res = await changePic(picture)
      if (res.data.success) {
        message.success("修改头像成功，请刷新")
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        userInfo.picture = picture
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
      }
    } catch{
      message.error("修改头像失败")
    }
  }
}

export default new Store()