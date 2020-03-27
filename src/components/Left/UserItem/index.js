import React from 'react'
import { Link } from 'react-router-dom'
import { DOMAIN } from 'util'
import { Button } from 'antd'
import './index.less'

function DisabledBtn() {
  return <Button className="item-btn" disabled >
    已关注
  </Button>
}

function FollowBtn(props) {
  const { userId, followerId } = props
  return <Button
    className="item-btn"
    onClick={() => { props.onClickFollow(userId, followerId) }}
  >
    关注
</Button>
}

function UnfollowBtn(props) {
  const { userId, followerId } = props
  return <Button
    className="item-btn"
    onClick={() => { props.onClickUnfollow(userId, followerId) }}
  >
    取消关注
</Button>
}

export default function UserItem(props) {

  const { type, userId, userItem } = props

  return (
    <div className="user-item">
      <Link to={`/${userItem.id}/profile`} >
        <img src={`${DOMAIN}${userItem.picture}`} alt='' />
      </Link>
      <div className="item-info">
        <Link to={`/${userItem.id}/profile`} >
          <h2>
            {userItem.userName}
          </h2>
          <p>{userItem.briefIntroduce}</p>
        </Link>
      </div>


      {
        type === 'fans' ?
          props.isFollower ?
            <DisabledBtn /> :
            <FollowBtn
              onClickFollow={props.onClickFollow}
              userId={userId}
              followerId={userItem.id}
            /> :
          <UnfollowBtn
            onClickUnfollow={props.onClickUnfollow}
            userId={userId}
            followerId={userItem.id}
          />
      }
    </div >
  )
}