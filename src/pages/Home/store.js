import { observable, action } from 'mobx'
import { createBolg } from 'apis/blog'
import { message } from 'antd'

class Store {

  @action
  async createBolg(content, image) {
    try {
      const res = await createBolg(content, image)
      if (res.data.success) {
        message.success('创建微博成功');
      }
    } catch{
      message.error('创建微博失败');
    }
  }
}

export default new Store()