import axios from 'axios'

export const getHomeData = () => {
  return axios.get(`https://www.easy-mock.com/mock/5d48fd5ffc529c75f94136fd/api/blog/detail`)
}