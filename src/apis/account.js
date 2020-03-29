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
 * 注册
 * @param {object} registerInfo { email, username, password, sexValue }
 */
export const register = registerInfo => {
  return axios.post(`/api/user/register`, registerInfo)
}

/**
 * 登录
 * @param {object} account {userName:'burc', password:'123456'}
 */
export const login = account => {
  return axios.post(`/api/user/login`, account);
};

/**
 * 退出
 */
export const logout = () => {
  return axios.post(`/api/user/logout`);
}

/**
 * 退出
 */
export const changePassword = (password, newPassword) => {
  return axios.patch(`/api/user/changePassword`, { password, newPassword });
}