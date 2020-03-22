import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import AccountSeeting from './AccountSeeting'
import Logo from 'images/logo.png'
import './index.less'


@inject((store) => {
  const { accountStore } = store
  const { loginStatus } = accountStore
  return {
    loginStatus
  }
})
@observer
class Head extends Component {
  render() {
    const { loginStatus } = this.props
    return (
      <div className="layout-header">
        <h1>
          <img src={Logo} alt='' />
          校园微博
        </h1>
        {
          loginStatus ? <AccountSeeting /> : <AccountSeeting />
        }
      </div>
    )
  }
}

export default Head