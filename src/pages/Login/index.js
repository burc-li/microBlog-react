import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import LoginPane from "./LoginPane"
import SingupPane from "./SingupPane"
import { Tabs } from "antd";
import "./index.less";

const { TabPane } = Tabs

class Login extends Component {

  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo)
      this.props.history.push(`/${userInfo.id}/home`)
  }

  render() {
    return (
      <div className="login-wraper">
        <Tabs defaultActiveKey="1">
          <TabPane tab="登录" key="1">
            <LoginPane />
          </TabPane>
          <TabPane tab="注册" key="2">
            <SingupPane />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default withRouter(Login);
