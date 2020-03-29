import { observable, action } from 'mobx'
import {
  getFansData,
  getFollowersData,
  follow,
  unFollow
} from 'apis/relation'
import { getProfileBlogData } from 'apis/blog'
import { message } from 'antd';

class Store {
  @observable
  fansData = { fansList: [], count: 0 }
  @observable
  followersCount = 0
  @observable
  profileBlog = {
    pageSize: 0,
    count: 0
  }

  @action.bound
  async getFans(userId) {
    try {
      const res = await getFansData(userId)
      if (res.data.success) {
        this.fansData = res.data.data
      }
    } catch{
      message.error('获取粉丝数据失败，请刷新');
    }
  }

  @action.bound
  async getFollowers(userId) {
    try {
      const res = await getFollowersData(userId)
      if (res.data.success)
        this.followersCount = res.data.data.count
    } catch{
      message.error('获取关注人数据失败，请刷新');
    }
  }

  @action.bound
  async getProfileBlog(userId, pageIndex) {
    try {
      const res = await getProfileBlogData(userId, pageIndex)
      if (res.data.success)
        this.profileBlog = res.data.data
    } catch{
      message.error('获取个人微博数据失败，请刷新');
    }
  }

  /**
   * 关注
   * @param {number} userId  当前登录账号的userId
   * @param {number} followerId  想要关注的账号Id
   */
  @action.bound
  async follow(userId, followerId) {
    try {
      const res = await follow(followerId)
      if (res.data.success) {
        await this.getFans(followerId)
        message.success('关注成功');
      }
    } catch{
      message.error('关注失败，请刷新');
    }
  }
  /**
   * 取消关注
   * @param {number} userId  当前登录账号的userId
   * @param {number} followerId  被关注的账号Id
   */
  @action.bound
  async unFollow(userId, followerId) {
    // console.log(userId, followerId)
    try {
      const res = await unFollow(followerId)
      if (res.data.success) {
        await this.getFans(followerId)
        message.success('取消关注成功');
      }
    } catch{
      message.error('取消关注失败，请刷新');
    }
  }

}

export default new Store()