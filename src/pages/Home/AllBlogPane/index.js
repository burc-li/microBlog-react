import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import BlogItem from '../BlogItem'
import store from '../store'
import { Pagination } from 'antd';
import './index.less'

@inject(() => {
  const { allBlogData, getAllBolg } = store
  return {
    allBlogData: toJS(allBlogData),
    getAllBolg
  }
})
@observer
class AllBlogPane extends Component {

  componentDidMount() {
    this.props.getAllBolg(0)
  }

  onChangePage = (page, pageSize) => {
    this.props.getAllBolg(page - 1)
  }

  render() {
    const { allBlogData } = this.props
    const { blogList, pageSize, pageIndex, count } = allBlogData

    const PaginationOption = {
      current: Number(pageIndex) + 1,
      pageSize: pageSize,
      total: count,
      onChange: this.onChangePage,
    }

    return (
      <div className="all-blog-pane">
        {
          blogList.map(item => <BlogItem key={item.id} blogData={item} />)
        }
        <Pagination {...PaginationOption} />
      </div>
    )
  }
}

export default AllBlogPane