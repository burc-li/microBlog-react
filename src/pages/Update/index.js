import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PasswordUpdate from './PasswordUpdate'
import AvatarUpdate from './AvatarUpdate'
import BriefIntroduceUpdate from './BriefIntroduceUpdate'
import store from './store'
import { Tabs } from 'antd';
import './index.less'


const { TabPane } = Tabs;

@inject(() => {
  const { changePassword, changeBriefIntroduce, changePic } = store
  return {
    changePassword,
    changeBriefIntroduce,
    changePic
  }
})
@observer
class Update extends Component {

  render() {
    const { changePassword, changeBriefIntroduce, changePic } = this.props
    return (
      <div className="update-wrap">
        <Tabs defaultActiveKey="1">
          <TabPane tab="修改头像" key="1">
            <AvatarUpdate
              changePic={changePic}
            />
          </TabPane>
          <TabPane tab="修改简介" key="2">
            <BriefIntroduceUpdate
              changeBriefIntroduce={changeBriefIntroduce}
            />
          </TabPane>
          <TabPane tab="修改密码" key="3">
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