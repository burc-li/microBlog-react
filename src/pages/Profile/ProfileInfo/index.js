import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import moment from 'moment'
import { DOMAIN } from 'util'
import store from '../store'
import { Button } from 'antd';
import './index.less'

@inject((stores) => {
  const { leftStore } = stores
  const { getFans, getFollowers } = leftStore
  const {
    fansData,
    followersCount,
    profileBlog,
    follow,
    unFollow } = store
  return {
    fansData: toJS(fansData),
    followersCount,
    profileBlog: toJS(profileBlog),
    follow,
    unFollow,
    getFans,
    getFollowers
  }
})
@observer
class ProfileInfo extends Component {

  onUnfollow = () => {
    const { userInfoStorage,
      userIdUrl: followerId, } = this.props
    this.props.unFollow(userInfoStorage.id, followerId).then(() => {
      this.props.getFans(userInfoStorage.id)
      this.props.getFollowers(userInfoStorage.id)
    })
  }

  onfollow = () => {
    const { userInfoStorage,
      userIdUrl: followerId, } = this.props
    this.props.follow(userInfoStorage.id, followerId).then(() => {
      this.props.getFans(userInfoStorage.id)
      this.props.getFollowers(userInfoStorage.id)
    })
  }

  render() {

    const { userInfoStorage,
      userIdUrl,
      fansData,
      followersCount,
      profileBlog } = this.props

    const pic = profileBlog.blogList ?
      profileBlog.blogList[0].user.picture : '/default_avator.jpg'

    const userName = profileBlog.blogList ?
      profileBlog.blogList[0].user.userName : '用户不存在'

    const briefIntroduce = profileBlog.blogList ?
      profileBlog.blogList[0].user.briefIntroduce : '用户不存在'

    const isSelf = userInfoStorage.id == userIdUrl
    const isFollower = fansData.fansList.some(item =>
      item.id == userInfoStorage.id)


    return (
      <div className="profile-info">
        <img src={`${DOMAIN}${pic}`} alt='' />
        <h2>{userName}</h2>
        <p>{briefIntroduce}</p>
        <div className="info-count">
          <div className="count-box">
            <h2>关注人</h2>
            <p>{followersCount}</p>
          </div>
          <div className="count-box">
            <h2>粉丝</h2>
            <p>{fansData.count}</p>
          </div>
          <div className="count-box">
            <h2>微博</h2>
            <p>{profileBlog.count}</p>
          </div>
          {
            isSelf ? null :
              isFollower ? <Button
                onClick={this.onUnfollow}
              >取消关注
          </Button> : <Button
                  onClick={this.onfollow}
                >关注
          </Button>
          }
        </div>
      </div>
    )
  }
}

export default withRouter(ProfileInfo)