import React, { Component } from "react";
import LoginPane from "./LoginPane"
import { Tabs } from "antd";
import "./index.less";

const { TabPane } = Tabs

class Login extends Component {
  render() {
    return (
      <div className="login-wraper">
        <Tabs defaultActiveKey="1">
          <TabPane tab="登录" key="1">
            <LoginPane />
          </TabPane>
          <TabPane tab="注册" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Login;
