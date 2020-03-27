import React, { Component } from 'react'
import Header from 'components/Header'
import Left from 'components/Left'
import { Row, Col } from 'antd';
import './index.less'

class Layout extends Component {
  render() {
    const { isOneRowPage } = this.props
    return (<>
      <Header></Header>
      <Row>
        <Col lg={{ offset: 2, span: 20 }} xl={{ offset: 3, span: 18 }} xxl={{ offset: 4, span: 16 }}>
          <div className="layout-bottom">
            <div className="left" style={{ display: isOneRowPage ? 'none' : 'block' }}>
              <Left></Left>
            </div>
            <div className="right">
              {this.props.children}
            </div>
          </div>
        </Col>
      </Row>
    </>)
  }
}

export default Layout