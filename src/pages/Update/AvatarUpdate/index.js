import React, { Component } from 'react'
import { DOMAIN } from 'util'
import { Upload, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};

class AvatarUpdate extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
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
      // message.success(`${info.file.name} 上传成功`);
      this.props.changePic(info.file.response.data.url)
      // console.log(info.file.response.data.url)

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

  render() {

    const {
      previewVisible,
      previewImage,
      fileList,
    } = this.state
    console.log("fileList", fileList)
    console.log("previewImage", previewImage)
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Upload {...props}>
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.onCancel}>
          <img alt="example" style={{ width: '100%' }} src={`${DOMAIN}${previewImage}`} />
        </Modal>
      </div>
    )
  }
}

export default AvatarUpdate