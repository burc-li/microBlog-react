import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import WirteBlog from './WirteBlog'
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
    // 创建编辑器
  }
  render() {
    return (
      <div className="Home">
        <WirteBlog />
        <div>博客</div>
      </div>
    )
  }
}

export default Home