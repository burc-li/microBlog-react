import { observable, action, toJS } from 'mobx'
import { getBlogDetail } from 'apis/blog'
import { likeBlog, addComment } from 'apis/message'
import { message } from 'antd'

class Store {

  @observable
  detail = {}

  @action.bound
  async getBlogDetail(blogId) {
    try {
      const res = await getBlogDetail(blogId)
      if (res.data.success) {
        this.detail = res.data.data.detail
        // console.log("执行获取详细信息", toJS(this.detail))
      }
    } catch{
      message.error("获取详细信息失败")
    }
  }

  @action.bound
  async likeBlog(userId, blogId) {
    try {
      const res = await likeBlog(userId, blogId)
      this.getBlogDetail(blogId)
      if (res.data.success) {
        console.log("点赞")
      }
    } catch{
      message.error("点赞失败")
    }
  }

  //添加评论
  @action.bound
  async addComment(userId, blogId, content) {
    try {
      const res = await addComment(userId, blogId, content)
      this.getBlogDetail(blogId)
      if (res.data.success) {
        message.success("评论成功")
      }
    } catch{
      message.error("评论失败")
    }
  }
}

export default new Store()