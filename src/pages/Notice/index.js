import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import NoticeItem from './NoticeItem'
import store from './store'
import './index.less'

@inject(() => {
  const { noticeMess, readedNoticeMess, getNoticeData, getReadedNoticeData, readNotice } = store
  return {
    noticeMess: toJS(noticeMess),
    readedNoticeMess: toJS(readedNoticeMess),
    getNoticeData,
    getReadedNoticeData,
    readNotice,
  }
})
@observer
class Notice extends Component {

  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.props.getNoticeData(userInfo.id)
    this.props.getReadedNoticeData(userInfo.id)
  }

  componentWillUnmount() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.props.readNotice(userInfo.id)
  }

  render() {
    const { noticeMess, readedNoticeMess } = this.props
    // console.log("readedNoticeMess", readedNoticeMess)
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
        <p>已读取消息</p>
        {
          readedNoticeMess.messageList.map(item =>
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