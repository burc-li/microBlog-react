import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { observer, inject } from "mobx-react"
import { toJS } from 'mobx';
import { Form, Input, Button } from "antd";

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

  // 提交表单且数据验证成功后回调事件 (Button按钮类型要设置为submit；htmlType="submit")
  onLogin = async (values) => {
    const { userName, password } = values

    const res = await this.props.login({ userName, password })

    if (res.data.success) {
      let userInfo = localStorage.getItem('userInfo')
      userInfo = JSON.parse(userInfo)
      this.props.history.push(`/${userInfo.data.id}/home`)
    }
  }


  render() {

    return (
      <Form
        {...layout}
        name="loginPane"
        onFinish={this.onLogin}
      >
        <Item
          label="用户名"
          name="userName"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input placeholder="请输入用户名" />
        </Item>

        <Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password placeholder="请输入密码" />
        </Item>

        <Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
          >
            登录
          </Button>
        </Item>
      </Form>
    );
  }
}

export default withRouter(LoginPane);
