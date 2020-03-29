import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};

class PasswordUpdate extends Component {
  formRef = React.createRef();
  state = {
    newPass: ''
  }

  onValuesChange = (changedValues, allValues) => {
    if (changedValues.newPass) {
      this.setState({
        newPass: changedValues.newPass
      })
    }
  }

  onFinish = vaules => {
    this.props.changePassword(vaules.oldPass, vaules.newPass)
    console.log("vaules", vaules.oldPass)
    console.log("vaules", vaules.newPass)
  }

  onValidatePassword = (rule, value) => {
    const { newPass } = this.state
    if (newPass === value || !value)
      return Promise.resolve()
    return Promise.reject('密码不一致')
  }

  render() {
    return (
      <Form
        {...layout}
        ref={this.formRef}
        name="control-ref"
        onValuesChange={this.onValuesChange}
        onFinish={this.onFinish}
      >
        <Form.Item
          name="oldPass"
          label="原密码"
          hasFeedback
          rules={[{ required: true, message: "请输入原密码" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="newPass"
          label="新密码"
          hasFeedback
          rules={[{ required: true, message: "请输入新密码" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmPass"
          label="确认新密码"
          hasFeedback
          rules={[{
            required: true, message: "请确认新密码"
          }, {
            validator: this.onValidatePassword
          }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            修改密码
            </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default PasswordUpdate