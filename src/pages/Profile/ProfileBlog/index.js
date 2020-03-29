import React, { Component } from 'react'
import BlogItem from '../BlogItem'
import { Pagination } from 'antd';
import './index.less'

class ProfileBlog extends Component {

  onChangePage = (page, pageSize) => {
    const { userIdUrl, getProfileBlog } = this.props
    console.log(userIdUrl, page)
    getProfileBlog(userIdUrl, page - 1)
  }

  render() {
    const { profileBlog, userIdUrl, userInfoStorage } = this.props
    // console.log("profileBlog", profileBlog)
    return (
      <div className="profile-blog">

        {
          profileBlog.blogList ?
            profileBlog.blogList.map(item =>
              <BlogItem
                key={item.id}
                item={item}
                profileBlog={profileBlog}
                userIdUrl={userIdUrl}
                userInfoStorage={userInfoStorage} />
            )
            : null
        }

        <Pagination
          defaultCurrent={1}
          current={Number(profileBlog.pageIndex) + 1}
          pageSize={profileBlog.pageSize}
          total={profileBlog.count}
          onChange={this.onChangePage}
        />
      </div>
    )
  }
}

export default ProfileBlog