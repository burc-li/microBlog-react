import React, { Component } from 'react'
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

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">退出</Menu.Item>
  </Menu>
);

class AccountSeeting extends Component {
  render() {
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

export default AccountSeeting
