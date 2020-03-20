import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import './index.less'

@inject(stores => {
  const { homeStore } = stores
  const { homeValue } = homeStore
  return {
    homeValue
  }
})

@observer
class Home extends Component {
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