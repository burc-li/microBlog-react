import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import './index.less'
import {
  Form,
  Input,
  Button,
  Radio,
} from 'antd';

@inject(stores => {
  const { homeStore } = stores
  const { homeValue, changeHomeData } = homeStore
  return {
    homeValue,
    changeHomeData,
  }
})

@observer
class Home extends Component {

  componentDidMount() {
    this.props.changeHomeData()
  }
  render() {
    return (
      <div className="Home">Home
        <p>home页面</p>
        <p>{this.props.homeValue}</p>
        {/* <Form.Item name="radio-group" label="Radio.Group"> */}
        <Radio.Group value='a'>
          <Radio value="a">item 1</Radio>
          <Radio value="b">item 2</Radio>
          <Radio value="c">item 3</Radio>
        </Radio.Group>
        {/* </Form.Item> */}
      </div>
    )
  }
}

export default Home