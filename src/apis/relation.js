import axios from 'axios'
import qs from 'qs'

// 获取粉丝列表 userId:已登录的用户ID
export const getFansData = (userId) => {
  return axios.get(`/api/relation/fans?userId=${userId}`)
}

// 获取关注人列表 userId:已登录的用户ID
export const getFollowersData = (userId) => {
  return axios.get(`/api/relation/follower?userId=${userId}`)
}

// 关注 followerId:想要关注的用户ID
export const follow = (followerId) => {
  return axios.post(`/api/relation/follow`, { userId: followerId })
}

// 取消关注 followerId:被关注的用户ID
export const unFollow = (followerId) => {
  return axios.delete(`/api/relation/unFollow?userIdfollowerId`, { data: { userId: followerId } })
}