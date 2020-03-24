import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import store from '../store'
import {
  Form,
  Input,
  Button,
  Radio,
} from 'antd';

const { Item } = Form
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 8 }
};
const tailLayout = {
  wrapperCol: { offset: 5, span: 8 }
};
// 表单初始化值
const initialValues = {
  email: "",
  userName: '',
  password: '',
  confirmPassword: '',
  gender: 1
}

@inject(() => {
  const { isExit, register } = store
  return {
    isExit,
    register
  }
})
@observer
class SingupPane extends Component {

  // 推荐使用 Form.useForm 创建表单数据域进行控制。如果是在 class component 下，你也可以通过 ref 获取数据域。
  formRef = React.createRef();

  state = {
    password: '',
  }

  // 验证用户名是否存在
  onValidateUsername = (rule, value) => {
    return this.props.isExit(value).then((res) => {
      if (res.data.success)
        return Promise.reject('该用户名已存在')
      return Promise.resolve()
    })
  }
  // 验证两次密码是否一致
  onValidatePassword = (rule, value) => {
    const { password } = this.state
    if (password === value || !value)
      return Promise.resolve()
    return Promise.reject('密码不一致')
  }

  // 提交表单且数据验证成功后回调事件 (Button按钮类型要设置为submit；htmlType="submit")
  onFinish = values => {
    const { email, userName, password, gender } = values
    this.props.register({
      email,
      userName,
      password,
      gender
    })
    this.formRef.current.resetFields();
  };

  // 字段值更新时触发回调事件
  onValuesChange = (changedValues, allValues) => {
    if (changedValues.password)
      this.setState({ password: allValues.password })
  }


  render() {

    return (
      <Form
        {...layout}
        name="singupPane"
        initialValues={initialValues}
        onFinish={this.onFinish}
        onValuesChange={this.onValuesChange}
        ref={this.formRef}
      >

        <Item
          name="email"
          label="邮箱"
          rules={[{ required: true, message: '不能为空' }, {
            type: 'email', message: '邮箱格式不正确'
          }]}
          hasFeedback
        >
          <Input placeholder="请输入邮箱" />
        </Item>

        <Item
          name="userName"
          label="用户名"
          rules={[
            {
              required: true,
              message: "不能为空"
            }, {
              min: 2,
              message: "不能小于2个字符长度"
            }, {
              max: 6,
              message: "不能大于6个字符长度"
            }, {
              pattern: /^([\u4E00-\u9FA5]*|\w*)[\u4E00-\u9FA5]*\w*$/,
              message: "不能包含特殊字符"
            }, {
              validator: this.onValidateUsername
            }
          ]}
          hasFeedback
        >
          <Input placeholder="请输入用户名" />
        </Item>
        <Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: '不能为空'
            }]}
          hasFeedback
        >
          <Input.Password placeholder="请输入密码" />
        </Item>
        <Item
          name="confirmPassword"
          label="确认密码"
          rules={[
            {
              required: true,
              message: '不能为空'
            },
            {
              validator: this.onValidatePassword
            }
          ]}
          hasFeedback
        >
          <Input.Password placeholder="请确认密码" />
        </Item>

        <Item
          name="gender"
          label="性别"
          rules={[{ required: true }]}
        >
          <Radio.Group >
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
          </Radio.Group>
        </Item>

        <Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Item>
      </Form >
    )
  }
}

export default SingupPane