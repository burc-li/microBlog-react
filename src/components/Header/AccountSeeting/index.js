import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import {
  UserOutlined,
  SettingFilled,
  SoundOutlined,
} from '@ant-design/icons';
import { Menu, Dropdown, Badge } from 'antd';
import './index.less'

const IconStyle = {
  cursor: 'pointer',
  color: '#fff',
  fontSize: '22px',
  margin: '0 12px 0'
}
const SeetingIconStyle = {
  cursor: 'pointer',
  color: '#fff',
  fontSize: '22px',
  marginLeft: '18px'
}

@inject((store) => {
  const { accountStore } = store
  const { noticeStore } = store
  const { logout } = accountStore
  const { noticeMess, getNoticeData } = noticeStore
  return {
    logout,
    noticeMess: toJS(noticeMess),
    getNoticeData
  }
})
@observer
class AccountSeeting extends Component {

  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.props.getNoticeData(userInfo.id)
  }

  onClickOut = async () => {
    const res = await this.props.logout()

    if (res.data.success)
      this.props.history.push('/login')
  }

  render() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const { noticeMess } = this.props
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" onClick={this.onClickOut}>退出</Menu.Item>
      </Menu>
    );

    return (
      <div className="account-seeting">

        <Link to={`/${userInfo.id}/home`}>
          <span>首页</span>
        </Link>

        <UserOutlined style={IconStyle} />

        <span className="userName">
          {userInfo ? userInfo.userName : '未登录'}
        </span>


        <Badge count={noticeMess.count}>
          <Link to={`/${userInfo.id}/notice`}>
            <SoundOutlined style={IconStyle} />
          </Link>
        </Badge>


        <Dropdown overlay={menu}>
          <SettingFilled style={SeetingIconStyle} />
        </Dropdown>

      </div>
    )
  }
}

export default withRouter(AccountSeeting)
