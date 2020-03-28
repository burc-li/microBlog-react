import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observer, inject } from "mobx-react"
import { Form, Input, Button, Upload, message, Modal } from 'antd';
import store from '../store'
import { DOMAIN } from 'util'
import { PlusOutlined } from '@ant-design/icons';
import './index.less'

const layout = {
  wrapperCol: { span: 24 },
};

@inject(() => {
  const { createBolg, getAllBolg, getFollowerBolgData } = store
  return {
    createBolg,
    getAllBolg,
    getFollowerBolgData
  }
})
@observer
class WirteBlog extends Component {

  formRef = React.createRef();
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    publishDisable: true
  }

  // 上传文件之前的钩子
  // 如果文件超过2M，在钩子函数中清空了fileList，并返回fasle停止上传，
  // 但是在onChangeUpload中依然执行setState，设置fileList为[]，停止上传
  onBeforeUpload = (file, fileList) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过2M');
      fileList.pop()
      return false
    }
    return true;
  }

  // 上传文件改变时的状态
  onChangeUpload = info => {

    this.setState({
      fileList: info.fileList,
    })

    if (info.file.status !== 'uploading') {
      console.log("info.fileList", info.fileList)
    }
    if (info.file.status === 'done') {
      this.setState({
        previewImage: info.file.response.data.url
      })
      message.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  }

  // 预览图片
  onPreviewPic = file => {
    this.setState({
      previewVisible: true,
      previewImage: file.response.data.url
    })
  }

  onCancel = () => {
    this.setState({ previewVisible: false })
  }

  // 字段值更新时触发回调事件 若无内容则禁用发布按钮
  onValueChange = changedValues => {
    this.setState({
      publishDisable: changedValues.content ? false : true
    })
  }

  // 提交表单且数据验证成功后回调事件
  onFinsh = values => {
    const userId = this.props.match.params.userId
    const content = values.content
    const image = this.state.previewImage
    this.props.createBolg(content, image, userId)

    // 清空文本框内容 
    this.formRef.current.resetFields()
    // 禁用发布按钮  清空上传图片的路径  清空上传文件列表   
    this.setState({
      publishDisable: true,
      previewImage: '',
      fileList: []
    })
  }


  render() {
    const {
      previewVisible,
      previewImage,
      fileList,
      publishDisable
    } = this.state

    const props = {
      name: 'pic',
      listType: "picture-card",
      accept: '.jpg,.png',
      fileList: fileList,
      action: '/api/utils/upload',
      beforeUpload: this.onBeforeUpload,
      onPreview: this.onPreviewPic,
      onChange: this.onChangeUpload,
    };

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    )

    return (
      <div className="write-blog">
        <p>有什么新鲜事要告诉大家~</p>
        <Form
          {...layout}
          name="nest-messages"
          ref={this.formRef}
          onValuesChange={this.onValueChange}
          onFinish={this.onFinsh}
        >
          <Form.Item
            name="content"
            className="item-content"
            rules={[{ max: 144, message: "不能超过144个字" }]}
          >
            <Input.TextArea className="text-area" />
          </Form.Item>
          <Form.Item
            className="item-upload"
          >
            <Upload {...props}>
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item
            className="item-btn"
          >
            <Button
              type="primary"
              htmlType="submit"
              disabled={publishDisable}
            >
              发布
            </Button>
          </Form.Item>
        </Form>
        <Modal visible={previewVisible} footer={null} onCancel={this.onCancel}>
          <img alt="example" style={{ width: '100%' }} src={`${DOMAIN}${previewImage}`} />
        </Modal>
      </div >
    )
  }
}

export default withRouter(WirteBlog)