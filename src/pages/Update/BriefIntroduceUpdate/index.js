import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};

class BriefIntroduceUpdate extends Component {

  onFinish = vaules => {
    this.props.changeBriefIntroduce(vaules.briefIntroduce)
  }

  render() {
    return (
      <Form
        {...layout}
        name="control-ref"
        onFinish={this.onFinish}
      >
        <Form.Item
          name="briefIntroduce"
          label="简介"
          hasFeedback
          rules={[{ required: true, message: "请输入简介" }]}
        >
          <Input placeholder="请输入简介" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            修改简介
            </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default BriefIntroduceUpdate