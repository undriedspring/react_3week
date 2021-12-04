import React from 'react'
import { Grid, Image, Text, Button } from '../elements'
import { useDispatch } from 'react-redux'
import LikeButton from '../elements/LikeButton'
import { history } from '../redux/configureStore'
import { actionCreators as postActions } from '../redux/modules/post'

const Post = (props) => {
  const dispatch = useDispatch()

  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.src} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text>{props.insert_dt}</Text>
            {props.is_me && (
              <Button
                padding="7px"
                width="auto"
                margin="10px"
                _onClick={() => {
                  history.push(`/write/${props.id}`)
                }}
              >
                수정
              </Button>
            )}
            {props.is_me && (
              <Button
                padding="7px"
                width="auto"
                margin="0px"
                _onClick={() => {
                  dispatch(postActions.deletePostFB({}))
                }}
              >
                삭제
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.image_url} />
        </Grid>
        <Grid padding="16px" is_flex>
          <Grid width="auto" padding="10px">
            <LikeButton />
            <Text margin="1px -14px">좋아요 {props.like_cnt}회</Text>
          </Grid>
          <Text margin="0px" bold>
            댓글 {props.comment_cnt}개
          </Text>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

Post.defaultProps = {
  user_info: {
    user_name: '213am',
    user_profile: 'http://newsimg.hankookilbo.com/2019/04/29/201904291390027161_3.jpg',
  },
  image_url: 'http://newsimg.hankookilbo.com/2019/04/29/201904291390027161_3.jpg',
  contents: '고양이네요!',
  comment_cnt: 10,
  insert_dt: '2021-11-30 10:00:00',
  is_me: false,
}

export default Post
