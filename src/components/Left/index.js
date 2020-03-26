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


@inject(() => {
  const {
    fansData,
    followersData,
    profileBlogCount,
    getFans,
    getFollowers,
    getProfileBlog,
    follow,
    unFollow
  } = store
  return {
    fansData: toJS(fansData),
    followersData: toJS(followersData),
    profileBlogCount: profileBlogCount,
    getFans,
    getFollowers,
    getProfileBlog,
    follow,
    unFollow
  }
})
@observer
class Left extends Component {
  componentDidMount() {
    const userId = this.props.match.params.userId
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
      unFollow
    } = this.props
    const userId = this.props.match.params.userId
    const followersList = followersData.followersList ? followersData.followersList : []
    const fansList = fansData.fansList ? fansData.fansList : []

    return (
      <div className="left-sider">
        <UserInfo
          fansCount={fansData.count}
          followersCount={followersData.count}
          profileBlogCount={profileBlogCount}
        />
        <Collapse defaultActiveKey={['1', '2']}>
          < Panel header="关注人列表" key="1" >
            {
              followersList ?
                followersList.map(item =>
                  <UserItem
                    key={item.id}
                    userId={userId}
                    type="follower"
                    userItem={item.user}
                    onClickUnfollow={unFollow}
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
                      type="fans"
                      userItem={item}
                      onClickFollow={follow}
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