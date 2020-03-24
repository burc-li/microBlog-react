import React, { Component } from 'react'
import AccountSeeting from './AccountSeeting'
import Logo from 'images/logo.png'
import './index.less'


class Head extends Component {
  render() {
    const loginStatus = localStorage.getItem('loginStatus')
    return (
      <div className="layout-header">
        <h1>
          <img src={Logo} alt='' />
          校园微博
        </h1>
        {
          loginStatus ? <AccountSeeting /> : null
        }
      </div>
    )
  }
}

export default Head