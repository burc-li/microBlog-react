import React, { Component } from 'react'
import Header from 'components/Header'
import Left from 'components/Left'
import './index.less'

class Layout extends Component {
  render() {
    const { isLoginPage } = this.props
    return (<>
      <Header></Header>
      <div className="layout-bottom">
        <div className="left" style={{ width: isLoginPage ? '0px' : '' }}>
          <Left></Left>
        </div>
        <div className="right">
          {this.props.children}
        </div>
      </div>
    </>)
  }
}

export default Layout