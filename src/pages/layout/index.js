import React, { Component } from 'react'
import Header from 'components/Header'
import Left from 'components/Left'
import './index.less'

class Layout extends Component {
  render() {
    return (<>
      <Header></Header>
      <div className="layout-bottom">
        <div className="left">
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