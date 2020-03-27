import React from 'react'
import { Link } from 'react-router-dom'
import { DOMAIN } from 'util'
import './index.less'

export default function UserInfo(props) {
  const { fansCount, followersCount, profileBlogCount } = props
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  return (
    <div className="user-info">
      <Link to={`/${userInfo.id}/profile`}>
        <img src={`${DOMAIN}${userInfo.picture}`} alt='' />
        <p>{userInfo ? userInfo.userName : '未登录'}</p>
      </Link>
      <div className="info-count">
        <div className="count">
          <h2>关注人</h2>
          <p>{followersCount}</p>
        </div>
        <div className="count">
          <h2>粉丝</h2>
          <p>{fansCount}</p>
        </div>
        <div className="count">
          <h2>微博</h2>
          <p>{profileBlogCount}</p>
        </div>
      </div>
    </div>
  )
}