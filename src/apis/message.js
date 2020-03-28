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
