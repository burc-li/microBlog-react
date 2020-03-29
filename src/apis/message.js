import axios from 'axios'

// 点赞
export const likeBlog = (userId, blogId) => {
  return axios.post(`/api/message/like`, { userId, blogId })
}
// 举报
export const complainBlog = (userId, blogId) => {
  return axios.post(`/api/message/complain`, { userId, blogId })
}
// 删除
export const deleteBlog = (blogId) => {
  return axios.delete(`/api/blog/del`, { data: { id: blogId } })
}

// 添加评论
export const addComment = (userId, blogId, content) => {
  return axios.post(`/api/message/comment`, { userId, blogId, content })
}
// 获取新消息通知
export const getNoticeData = userId => {
  return axios.get(`/api/message/notice?userId=${userId}`)
}
// 获取已读消息通知
export const getReadedNoticeData = userId => {
  return axios.get(`/api/message/oldNotice?userId=${userId}`)
}
// 将已读取消息设置为已读
export const readNotice = userId => {
  return axios.post(`/api/message/read`, { userId })
}
