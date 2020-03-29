import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import UserInfo from './UserInfo'
import UserItem from './UserItem'
import store from './store'
import { Collapse } from 'antd';
import './index.less'

const { Panel } = Collapse;


@inject((stores) => {
  const { profileStore } = stores
  const { getFans: getFans_profile } = profileStore
  const {
    fansData,
    followersData,
    profileBlogCount,
    getFans,
    getFollowers,
    getProfileBlog,
    follow,
    unFollow,
  } = store
  return {
    fansData: toJS(fansData),
    followersData: toJS(followersData),
    profileBlogCount: profileBlogCount,
    getFans,
    getFollowers,
    getProfileBlog,
    follow,
    unFollow,
    getFans_profile
  }
})
@observer
class Left extends Component {

  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const userId = userInfo ? userInfo.id : 0
    this.props.getFans(userId)
    this.props.getFollowers(userId)
    this.props.getProfileBlog(userId, 0)
  }

  render() {
    const {
      fansData,
      followersData,
      profileBlogCount,
      follow,
      unFollow,
      getFans_profile
    } = this.props

    const followersList = followersData.followersList ?
      followersData.followersList : []
    const fansList = fansData.fansList ?
      fansData.fansList : []
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const userId = userInfo ? userInfo.id : 0

    const profileId = this.props.match.params.userId
    console.log("profileId", profileId)

    return (
      <div className="left-sider">
        <UserInfo
          fansCount={fansData.count}
          followersCount={followersData.count}
          profileBlogCount={profileBlogCount}
        />
        <Collapse defaultActiveKey={['1', '2']}>
          <Panel header="关注人列表" key="1" >
            {
              followersList ?
                followersList.map(item =>
                  <UserItem
                    key={item.id}
                    userId={userId}
                    type="follower"
                    profileId={profileId}
                    userItem={item.user}
                    onClickUnfollow={unFollow}
                    callback={getFans_profile}
                  />) : null
            }
          </Panel>
          <Panel header="粉丝列表" key="2">
            {
              fansList ?
                fansList.map(item => {

                  const isFollower = followersList ?
                    followersList.some(followerItem =>
                      followerItem.followerId === item.id
                    ) : false

                  return (
                    <UserItem
                      key={item.id}
                      isFollower={isFollower}
                      userId={userId}
                      profileId={profileId}
                      type="fans"
                      userItem={item}
                      onClickFollow={follow}
                      callback={getFans_profile}
                    />
                  )
                }) : null
            }
          </Panel>
        </Collapse>
      </div >
    )
  }
}

export default withRouter(Left)