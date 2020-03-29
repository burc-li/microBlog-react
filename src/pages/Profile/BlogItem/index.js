import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import moment from 'moment';
import { Link } from 'react-router-dom'
import store from '../store'
import { DOMAIN } from 'util'
import { Menu, Dropdown } from 'antd';
import './index.less'


@inject((stores) => {
  const { homeStore } = stores
  const { getProfileBlog } = store
  const { likeBlog, complainBlog, deleteBlog } = homeStore
  return {
    likeBlog,
    complainBlog,
    deleteBlog,
    getProfileBlog
  }
})
@observer
class BlogItem extends Component {

  like = (blogId) => {
    const { userInfoStorage, userIdUrl, profileBlog } = this.props
    this.props.likeBlog(userInfoStorage.id, blogId)
      .then(() => {
        this.props.getProfileBlog(userIdUrl, Number(profileBlog.pageIndex))
      })
  }
  complain = (blogId) => {
    const { userInfoStorage } = this.props
    this.props.complainBlog(userInfoStorage.id, blogId)
  }
  delete = (blogId) => {
    const { userIdUrl, profileBlog } = this.props
    this.props.deleteBlog(blogId)
      .then(() => {
        this.props.getProfileBlog(userIdUrl, Number(profileBlog.pageIndex))
      })
  }

  render() {
    const { item, userInfoStorage } = this.props
    // console.log("item", item)
    // console.log("userInfoStorage", userInfoStorage)
    const menu = (item) => (
      <Menu>
        <Menu.Item onClick={() => { this.complain(item.id) }}>
          举报
        </Menu.Item>
        {
          userInfoStorage.id === 0 || userInfoStorage.id === item.user.id ?
            <Menu.Item onClick={() => { this.delete(item.id) }}>
              删除
         </Menu.Item>
            : null
        }
      </Menu>
    )

    return (
      <div className="blog-item">
        <div className="item-header">
          <img src={`${DOMAIN}${item.user.picture}`} alt='' />
          <div className="header-title">
            <h2>{item.user.userName}</h2>
            <p>{moment(item.createdAt).format('YYYY年MM月DD日 HH:mm:ss')}</p>
          </div>
          <Dropdown
            overlay={menu(item)}
            trigger={['click']}
          >
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()} href='true'>
              <i className="iconfont">&#xe637;</i>
            </a>
          </Dropdown>
        </div>
        <Link to={`/${item.id}/detail`}>
          <div className="item-body">
            <p>
              {item.content}
            </p>
            {
              item.image ? <img src={`${DOMAIN}${item.image}`} alt='' /> : null
            }
          </div>
        </Link>
        <div className="item-footer">
          <div
            className="footer-operate"
            onClick={() => { this.like(item.id) }}
          >
            <i className="iconfont">
              &#xe60d;
              </i>
            <span>{item.likeCount}</span>
          </div>
          <div className="footer-operate">
            <i className="iconfont">&#xe64b;</i>
            <span>{item.commentCount}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default BlogItem