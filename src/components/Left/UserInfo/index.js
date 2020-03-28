import React from 'react'
import { Link } from 'react-router-dom'
import Logo from 'images/logo.png'
import { DOMAIN } from 'util'
import './index.less'

export default function UserInfo(props) {
  const { fansCount, followersCount, profileBlogCount } = props
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  return (
    <div className="user-info">
      <Link to={userInfo ? `/${userInfo.id}/profile` : '/'}>
        <img src={userInfo ? `${DOMAIN}${userInfo.picture}` : Logo} alt='' />
        <p>{userInfo ? userInfo.userName : '未登录'}</p>
      </Link>
      <div className="info-count">
        <div className="count">
          <h2>关注人</h2>
          <p>{userInfo ? followersCount : 0}</p>
        </div>
        <div className="count">
          <h2>粉丝</h2>
          <p>{userInfo ? fansCount : 0}</p>
        </div>
        <div className="count">
          <h2>微博</h2>
          <p>{userInfo ? profileBlogCount : 0}</p>
        </div>
      </div>
    </div>
  )
}