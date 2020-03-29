import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PasswordUpdate from './PasswordUpdate'
import store from './store'
import { Tabs } from 'antd';
import './index.less'


const { TabPane } = Tabs;

@inject(() => {
  const { changePassword } = store
  return {
    changePassword
  }
})
@observer
class Update extends Component {

  render() {
    const { changePassword } = this.props
    return (
      <div className="update-wrap">
        <Tabs defaultActiveKey="2">
          <TabPane tab="修改基本信息" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="修改密码" key="2">
            <PasswordUpdate
              changePassword={changePassword}
            />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default Update