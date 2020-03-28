import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import BlogItem from '../BlogItem'
import store from '../store'
import { Pagination } from 'antd';
import './index.less'

@inject(() => {
  const { followerBlogData, getFollowerBolgData } = store
  return {
    followerBlogData: toJS(followerBlogData),
    getFollowerBolgData
  }
})
@observer
class FollowerBlogPane extends Component {

  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.getFollowerBolgData(userId, 0)
  }

  onChangePage = (page, pageSize) => {
    const userId = this.props.match.params.userId
    this.props.getFollowerBolgData(userId, page - 1)
  }

  render() {
    const { followerBlogData } = this.props
    const { blogList, pageSize, pageIndex, count } = followerBlogData

    const PaginationOption = {
      current: Number(pageIndex) + 1,
      pageSize: pageSize,
      total: count,
      onChange: this.onChangePage,
    }

    return (
      <div className="all-blog-pane">
        {
          blogList.map(item => <BlogItem
            key={item.id}
            type="allBlog"
            currentPage={Number(pageIndex) + 1}
            blogData={item} />)
        }
        <Pagination {...PaginationOption} />
      </div>
    )
  }
}

export default withRouter(FollowerBlogPane)