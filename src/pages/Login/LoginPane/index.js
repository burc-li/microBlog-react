import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { toJS } from 'mobx'
import { Form, Input, Button, message } from "antd";
import { observe } from "mobx";

const { Item } = Form;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 8 }
};
const tailLayout = {
  wrapperCol: { offset: 5, span: 8 }
};

@inject(store => {
  const { accountStore } = store;
  const { userInfo, login } = accountStore;
  return {
    userInfo: toJS(userInfo),
    login
  };
})
@observer
class LoginPane extends Component {
  constructor() {
    super()
    this.state = {
      userName: '',
      password: ''
    }
  }

  onChangeUsername = (e) => {
    this.setState({ userName: e.target.value })
  }
  onChangePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  login = () => {
    const { userName, password } = this.state
    this.props.login({ userName, password })
  }

  render() {
    return (
      <Form {...layout} name="loginPane">
        <Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}

        >
          <Input placeholder="请输入用户名" onChange={this.onChangeUsername} />
        </Item>

        <Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password placeholder="请输入密码" onChange={this.onChangePassword} />
        </Item>

        <Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={this.login}
          >
            登录
          </Button>
        </Item>
      </Form>
    );
  }
}

export default LoginPane;
