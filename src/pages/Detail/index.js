import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import moment from 'moment'
import { DOMAIN } from 'util'
import store from './store.js'
import { Form, Input, Button } from 'antd';
import './index.less'

const layout = {
  wrapperCol: { span: 22 },
};

@inject(() => {
  const { detail, getBlogDetail, likeBlog, addComment } = store
  return {
    detail: toJS(detail),
    getBlogDetail,
    likeBlog,
    addComment
  }
})
@observer
class Detail extends Component {

  state = {
    toUser: ''
  }

  componentDidMount() {
    const blogId = this.props.match.params.blogId
    this.props.getBlogDetail(blogId)
  }

  like = () => {
    const blogId = this.props.match.params.blogId
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.props.likeBlog(userInfo.id, blogId)
  }

  onFinsh = values => {
    const blogId = this.props.match.params.blogId
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.props.addComment(userInfo.id, blogId, values.comment)
  }

  render() {
    const { detail } = this.props
    console.log("Detail", detail)
    return (
      <div className="detail">
        <div className="detail-header">
          <img src={detail.user ? `${DOMAIN}${detail.user.picture}` : ``} alt='' />
          <div className="header-title">
            <h2>{detail.user ? detail.user.userName : ''}</h2>
            <p>{moment(detail.createdAt).format('YYYY年MM月DD日 HH:mm:ss')}</p>
          </div>
        </div>
        <div className="detail-content">
          <p>{detail.content}</p>
          {
            detail.image ? <img src={`${DOMAIN}${detail.image}`} alt='' /> : null
          }
        </div>
        <div className="detail-footer">
          <span className="like-wrap" onClick={this.like}>
            <i className="iconfont">
              &#xe60d;
              </i>
            {detail.likeCount}
          </span>
          <div className="comment">
            <p>发表新的评论</p>
            <Form
              {...layout}
              name="basic"
              initialValues={{ "comment": "441" }}
              onFinish={this.onFinsh}
            >
              <Form.Item
                name="comment"
                rules={[{ required: true, message: '请输入评论内容' },
                { max: 144, message: '不能超过144个字' }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item >
                <Button type="primary" htmlType="submit">
                  发布
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div >
    )
  }
}

export default withRouter(Detail)