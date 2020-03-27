import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import moment from 'moment';
import { DOMAIN } from 'util'
import store from '../store'
import { Menu, Dropdown } from 'antd';
import './index.less'

const userInfo = JSON.parse(localStorage.getItem('userInfo'))

@inject(() => {
  const { likeBlog, complainBlog } = store
  return {
    likeBlog,
    complainBlog
  }
})
@observer
class BlogItem extends Component {

  like = blogId => {
    this.props.likeBlog(userInfo.id, blogId)
  }
  complain = blogId => {
    this.props.complainBlog(userInfo.id, blogId)
  }

  render() {
    const { blogData } = this.props
    const { user } = blogData

    return (
      <div className="blog-wrap">
        <div className="blog-header">
          <Link to={`/${user.id}/profile`}>
            <img src={`${DOMAIN}${user.picture}`} alt='' />
          </Link>
          <div className="blog-title">
            <Link to={`/${user.id}/profile`}>
              <h2>{user.userName}</h2>
            </Link>
            <p>
              {moment(blogData.createdAt).format("YYYY年MM月DD日 HH:mm:ss")}
            </p>
          </div>
          <Dropdown
            overlay={<Menu>
              <Menu.Item onClick={() => { this.complain(blogData.id) }}>
                举报
            </Menu.Item>
              <Menu.Item>
                删除
            </Menu.Item>
            </Menu>}
            trigger={['click']}
          >
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()} href='true'>
              <i className="iconfont">&#xe637;</i>
            </a>
          </Dropdown>
        </div>
        <Link to={`/${blogData.id}/detail`}>
          <div className="blog-content">
            <p>
              {blogData.content}
            </p>
            {
              blogData.image ? <img src={`${DOMAIN}${blogData.image}`} alt='' /> : null
            }
          </div>
        </Link>
        <div className="blog-footer">
          <div
            className="footer-operate"
            onClick={() => { this.like(blogData.id) }}
          >
            <i className="iconfont">
              &#xe60d;
              </i>
            <span>3</span>
          </div>
          <div className="footer-operate">
            <i className="iconfont">&#xe64b;</i>
            <span>5</span>
          </div>
        </div>
      </div>
    )
  }
}

export default BlogItem