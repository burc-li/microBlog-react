import React from 'react'
import './index.less'

export default function UserInfo(props) {
  const { fansCount, followersCount, profileBlogCount } = props
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  return (
    <div className="user-info">
      <img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585111316900&di=5c82805955e4ff866595c2e1da559f16&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180919%2F20%2F1537361717-kVlwUMceKA.png' alt='' />
      <p>{userInfo.userName}</p>
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