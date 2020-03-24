import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import {
  UserOutlined,
  SettingFilled,
  SoundOutlined,
} from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import './index.less'

const IconStyle = {
  color: '#fff',
  fontSize: '22px',
  margin: '0 12px 0'
}

@inject((store) => {
  const { accountStore } = store
  const { logout } = accountStore
  return {
    logout
  }
})
@observer
class AccountSeeting extends Component {

  onClickOut = async () => {
    const res = await this.props.logout()

    if (res.data.success)
      this.props.history.push('/login')
  }

  render() {
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
        <UserOutlined style={IconStyle} />

        <span className="userName">李百成</span>

        <SoundOutlined style={IconStyle} />

        <Dropdown overlay={menu}>
          <SettingFilled style={IconStyle} />
        </Dropdown>

      </div>
    )
  }
}

export default withRouter(AccountSeeting)
