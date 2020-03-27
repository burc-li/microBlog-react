import axios from 'axios'
import qs from 'qs'

// 测试
export const getHomeData = () => {
  return axios.get(`/api/blog/profile/list/?userId=2&pageIndex=0`)
}

// 获取微博列表 获取个人主页微博列表
export const getProfileBlogData = (userId, pageIndex) => {
  let query = { userId, pageIndex }
  query = qs.stringify(query)
  return axios.get(`/api/blog/profile/list?${query}`)
}

// 创建建微博
export const createBolg = (content, image) => {
  return axios.post(`/api/blog/create`, { content, image })
}
// 获取全部用户的微博列表
export const getAllBolgData = pageIndex => {
  return axios.get(`/api/blog/profile/list/?pageIndex=${pageIndex}`)
}