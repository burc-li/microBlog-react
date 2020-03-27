import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DOMAIN } from 'util'
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './index.less'

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        举报
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        删除
      </a>
    </Menu.Item>
  </Menu>
);

const userInfo = JSON.parse(localStorage.getItem('userInfo'))

class BlogItem extends Component {
  render() {
    return (
      <div className="blog-wrap">
        <div className="blog-header">
          <Link to={`/10/profile`}>
            <img src={`${DOMAIN}${userInfo.picture}`} alt='' />
          </Link>
          <div className="blog-title">
            <Link to={`/10/profile`}>
              <h2>李柏成</h2>
            </Link>
            <p id="ppp">12月03日</p>
          </div>
          <Dropdown
            overlay={menu}
            trigger={['click']}
          >
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()} href>
              <i class="iconfont">&#xe637;</i>
            </a>
          </Dropdown>
        </div>
        <div className="blog-content">
          <p>
            1211111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111333344445555
          </p>
          <img src={`${DOMAIN}${userInfo.picture}`} alt='' />
        </div>
        <div className="blog-footer">
          <div className="footer-operate">
            <i class="iconfont">&#xe60d;</i>
            <span>3</span>
          </div>
          <div className="footer-operate">
            <i class="iconfont">&#xe64b;</i>
            <span>5</span>
          </div>
        </div>
      </div>
    )
  }
}

export default BlogItem