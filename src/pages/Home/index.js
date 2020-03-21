import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import './index.less'

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
      </div>
    )
  }
}

export default Home