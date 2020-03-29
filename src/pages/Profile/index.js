import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import store from './store'
import ProfileInfo from './ProfileInfo'
import ProfileBlog from './ProfileBlog'
import './index.less'


@inject(() => {
  const {
    getFans,
    getFollowers,
    getProfileBlog,
    profileBlog } = store
  return {
    getFans,
    getFollowers,
    getProfileBlog,
    profileBlog: toJS(profileBlog)
  }
})
@observer
class Profile extends Component {

  state = {
    userInfoStorage: {},
    userIdUrl: 0,
  }

  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const userId = this.props.match.params.userId
    this.setState({
      userInfoStorage: userInfo,
      userIdUrl: userId
    })

    this.props.getFans(userId)
    this.props.getFollowers(userId)
    this.props.getProfileBlog(userId, 0)
  }

  render() {

    const { userInfoStorage, userIdUrl } = this.state
    const { profileBlog, getProfileBlog } = this.props


    return (
      <div className="profile-wrap">
        <ProfileInfo
          userInfoStorage={userInfoStorage}
          userIdUrl={userIdUrl}
        />
        <ProfileBlog
          userInfoStorage={userInfoStorage}
          profileBlog={profileBlog}
          userIdUrl={userIdUrl}
          getProfileBlog={getProfileBlog}
        />
      </div>
    )
  }
}

export default withRouter(Profile)