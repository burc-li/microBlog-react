import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link, withRouter } from 'react-router-dom'
import moment from 'moment';
import { DOMAIN } from 'util'
import store from '../store'
import { Menu, Dropdown } from 'antd';
import './index.less'

const userInfo = JSON.parse(localStorage.getItem('userInfo'))

@inject(() => {
  const { likeBlog, complainBlog, deleteBlog, getAllBolg, getFollowerBolgData } = store
  return {
    likeBlog,
    complainBlog,
    deleteBlog,
    getAllBolg,
    getFollowerBolgData
  }
})
@observer
class BlogItem extends Component {

  // 点赞博客
  like = blogId => {
    const { currentPage } = this.props
    const userId = this.props.match.params.userId
    this.props.likeBlog(userInfo.id, blogId)
    this.props.getFollowerBolgData(userId, currentPage - 1)
    this.props.getAllBolg(currentPage - 1)
  }
  // 举报博客
  complain = blogId => {
    this.props.complainBlog(userInfo.id, blogId)
  }
  // 删除博客
  delete = blogId => {
    const { currentPage } = this.props
    this.props.deleteBlog(blogId)

    const userId = this.props.match.params.userId
    this.props.getFollowerBolgData(userId, currentPage - 1)
    this.props.getAllBolg(currentPage - 1)

  }

  render() {
    const { blogData, currentPage } = this.props
    const { user } = blogData
    // console.log("userInfo.id", userInfo.id)
    // console.log("blogData", blogData)
    // console.log("currentPage", currentPage)
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
              <Menu.Item onClick={() => { this.delete(blogData.id) }}>
                {userInfo ? userInfo.id === 0 || userInfo.id === blogData.userId ? `删除` : '' : ''}
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
            <span>{blogData.likeCount}</span>
          </div>
          <div className="footer-operate">
            <i className="iconfont">&#xe64b;</i>
            <span>{blogData.commentCount}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(BlogItem)