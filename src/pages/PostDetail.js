import React from 'react'
import Post from '../components/Post'
import Permit from '../shared/Permit'
import { Grid } from '../elements'
import CommentList from '../components/CommentList'
import CommentWrite from '../components/CommentWrite'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as postActions } from '../redux/modules/post'

const PostDetail = (props) => {
  const dispatch = useDispatch()
  const id = props.match.params.id
  const user_info = useSelector((state) => state.user.user)
  const post_list = useSelector((store) => store.post.list)
  const post_idx = post_list.findIndex((p) => p.id === id)
  const post = post_list[post_idx]

  React.useEffect(() => {
    if (post) {
      return
    }
    dispatch(postActions.getOnePostFB(id))
  }, [])

  return (
    <React.Fragment>
      <Grid bg={'#EFF6FF'} padding="30px 5px">
        {post && <Post {...post} is_me={post.user_info.user_id === user_info?.uid} />}
        <Permit>
          <CommentWrite post_id={id} />
        </Permit>
        <CommentList post_id={id} />
      </Grid>
    </React.Fragment>
  )
}

export default PostDetail
