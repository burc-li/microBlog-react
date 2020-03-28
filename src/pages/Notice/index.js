import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import NoticeItem from './NoticeItem'
import store from './store'
import './index.less'

@inject(() => {
  const { noticeMess, getNoticeData, readNotice } = store
  return {
    noticeMess: toJS(noticeMess),
    getNoticeData,
    readNotice
  }
})
@observer
class Notice extends Component {

  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.props.getNoticeData(userInfo.id)
  }

  componentWillUnmount() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.props.readNotice(userInfo.id)
  }

  render() {
    const { noticeMess } = this.props
    return (
      <div className="notice-wrap">
        <p>新消息</p>
        {
          noticeMess.messageList.map(item =>
            <NoticeItem
              key={item.id}
              item={item}
            />
          )
        }
      </div>
    )
  }
}

export default Notice