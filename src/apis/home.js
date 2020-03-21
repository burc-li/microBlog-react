import axios from 'axios'

export const getHomeData = () => {
  return axios.get(`/api/blog/profile/list/?userId=2&pageIndex=0`)
}