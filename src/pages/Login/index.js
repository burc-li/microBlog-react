import React, { Component } from "react";
import LoginPane from "./LoginPane"
import SingupPane from "./SingupPane"
import { Tabs } from "antd";
import "./index.less";

const { TabPane } = Tabs

class Login extends Component {
  render() {
    return (
      <div className="login-wraper">
        <Tabs defaultActiveKey="2">
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

export default Login;
