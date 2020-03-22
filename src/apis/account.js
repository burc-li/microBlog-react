// 登录、注册、退出登录
import axios from "axios";

/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
export const isExit = userName => {
  return axios.post(`/api/user/isExist`, { userName })
}
/**
 * 登录
 * @param {object} account {userName:'burc', password:'123456'}
 */
export const login = account => {
  return axios.post(`/api/user/login`, account);
};
