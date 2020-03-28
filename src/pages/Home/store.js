import { observable, action } from 'mobx'
import { createBolg, getAllBolgData, getFollowerBolgData } from 'apis/blog'
import { likeBlog, complainBlog, deleteBlog } from 'apis/message'
import { message } from 'antd'

class Store {
  @observable
  allBlogData = {
    blogList: [],
    pageSize: 0,
    pageIndex: 0,
    count: 0,
  }
  @observable
  followerBlogData = {
    blogList: [],
    pageSize: 0,
    pageIndex: 0,
    count: 0,
  }

  @action
  async createBolg(content, image, userId) {
    try {
      const res = await createBolg(content, image)
      if (res.data.success) {
        this.getAllBolg(0)
        this.getFollowerBolgData(userId, 0)
        message.success('创建微博成功');
      }
    } catch{
      message.error('创建微博失败');
    }
  }

  @action.bound
  async getAllBolg(pageIndex) {
    try {
      const res = await getAllBolgData(pageIndex)
      if (res.data.success) {
        this.allBlogData = res.data.data
      }
    } catch{
      message.error('获取全部用户微博列表失败');
    }
  }

  @action.bound
  async getFollowerBolgData(userId, pageIndex) {
    try {
      const res = await getFollowerBolgData(userId, pageIndex)
      if (res.data.success) {
        this.followerBlogData = res.data.data
      }
    } catch{
      message.error('获取关注用户微博列表失败');
    }
  }


  @action.bound
  async likeBlog(userId, blogId) {
    try {
      const res = await likeBlog(userId, blogId)
      if (res.data.success) {
        // message.success('点赞成功')
      }
    } catch{
      message.error('点赞失败');
    }
  }
  @action.bound
  async complainBlog(userId, blogId) {
    try {
      const res = await complainBlog(userId, blogId)
      if (res.data.success) {
        message.success('举报成功')
      }
    } catch{
      message.error('举报失败');
    }
  }
  @action.bound
  async deleteBlog(blogId, userId) {
    try {
      const res = await deleteBlog(blogId)
      if (res.data.success) {
        this.getAllBolg(0)
        this.getFollowerBolgData(userId, 0)
        message.success('删除成功')
      }
    } catch{
      message.error('删除失败');
    }
  }

}

export default new Store()