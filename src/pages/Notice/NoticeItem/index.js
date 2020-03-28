import React from 'react'
import { Link } from 'react-router-dom'
import { DOMAIN } from 'util'
import './index.less'

function NoticeType({ type }) {
  if (type === 1) {
    return (
      <span>点赞了你</span>
    )
  }
  if (type === 2) {
    return (
      <span>举报了你</span>
    )
  }
  if (type === 3) {
    return (
      <span>评论了你</span>
    )
  }
}


function NoticeItem({ item }) {
  return (
    <div className="notice-item">
      <Link to={`/${item.user.id}/profile`}>
        <img src={`${DOMAIN}/3ff940c7240b48e369fd6211b1564ec0_123.jpg`} alt='' />
        <span className="userName">
          {item.user.userName}
        </span>
      </Link>
      <NoticeType
        type={item.type}
      />
      <Link to={`/${item.blog.id}/detail`}>
        <span className="link">
          博客详情
        </span>
      </Link>
    </div>
  )
}

export default NoticeItem