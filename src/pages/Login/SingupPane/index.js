import React, { Component } from 'react'
import {
  Form,
  Input,
  Button,
  Radio,
} from 'antd';


const { Item } = Form
const { Group } = Radio
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 8 }
};
const tailLayout = {
  wrapperCol: { offset: 5, span: 8 }
};
const sexOptions = [
  { label: '男', value: 1 },
  { label: '女', value: 2 }
]

class SingupPane extends Component {

  state = {
    username: '',
    password: '',
    sex: 1
  }

  onChangeSex = e => {
    this.setState({ sex: e.target.value })
  }

  render() {

    return (
      <Form {...layout} name="singupPane">

        <Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="请输入用户名" />
        </Item>
        <Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="请输入密码" />
        </Item>
        <Item
          name=" confirmPassword"
          label="确认密码"
          rules={[
            {
              required: true,
              message: '请确认密码',
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="请确认密码" />
        </Item>

        <Item
          name=" sex"
          label="性别"
        >
          <Group options={sexOptions} value={'1'} onChange={this.onChangeSex} />
        </Item>

        <Item {...tailLayout}>
          <Button type="primary">
            注册
        </Button>
        </Item>
      </Form>
    )
  }
}

export default SingupPane