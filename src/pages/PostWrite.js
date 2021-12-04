import React, { useState } from 'react'
import { Grid, Text, Button, Image, Input } from '../elements'
import Upload from '../shared/Upload'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as postActions } from '../redux/modules/post'
import { actionCreators as imageActions } from '../redux/modules/image'

const PostWrite = (props) => {
  const dispatch = useDispatch()
  const is_login = useSelector((state) => state.user.is_login)
  const preview = useSelector((state) => state.image.preview)
  const post_list = useSelector((state) => state.post.list)

  const post_id = props.match.params.id
  const is_edit = post_id ? true : false
  const is_click = onclick ? true : false
  // const be_equipped = !_post.contents || !preview ? (btn.disabled = 'disabled') : null

  const { history } = props

  let _post = is_edit ? post_list.find((p) => p.id === post_id) : null

  const [contents, setContents] = React.useState(_post ? _post.contents : '')

  React.useEffect(() => {
    if (is_edit && !_post) {
      window.alert('포스트 정보가 없어요!')
      history.goBack()

      return
    }
    if (is_edit) {
      dispatch(imageActions.setPreview(_post.image_url))
    }
  }, [])

  const changeContents = (e) => {
    setContents(e.target.value)
  }
  const addPost = () => {
    dispatch(postActions.addPostFB(contents))
  }
  const editPost = () => {
    dispatch(postActions.editPostFB(post_id, { contents: contents }))
  }

  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>
          앗! 잠깐!
        </Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
        <Button
          _onClick={() => {
            history.replace('/')
          }}
        >
          로그인 하러가기
        </Button>
      </Grid>
    )
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="36px" margin="10px" bold>
          {is_edit ? '게시글 수정' : '게시글 작성'}
        </Text>
        <hr />
        <Upload margin="10px" />
      </Grid>
      <Grid>
        <Grid padding="20px">
          <Text size="20px">레이아웃 선택하기</Text>
          <Grid is_flex padding="20px">
            <Button
              text="A"
              width="100px"
              onClick={
                is_click ? (
                  <Grid is_flex>
                    <Image shape="rectangle" src={preview ? preview : 'http://via.placeholder.com/400x300/FEC96C/000000'} />
                    <Grid width="250px" padding="15px">
                      {contents}
                    </Grid>
                  </Grid>
                ) : null
              }
            ></Button>
            <Button text="B" width="100px" _onClick></Button>
            <Button text="C" width="100px" _onClick></Button>
          </Grid>
        </Grid>
        <Grid padding="16px">
          <Text size="24px" margin="0px" bold>
            ∆ 미리보기{' '}
          </Text>
        </Grid>
        {/* <Grid is_flex>
          <Image shape="rectangle" src={preview ? preview : 'http://via.placeholder.com/400x300/FEC96C/000000'} />
          <Grid width="250px" padding="15px">
            {contents}
          </Grid>
        </Grid> */}
      </Grid>
      <Grid padding="16px">
        <Input value={contents} _onChange={changeContents} label="내용" placeholder="게시글 작성" multiLine />
      </Grid>
      <Grid padding="16px">{is_edit ? <Button text="게시글 수정" _onClick={editPost}></Button> : <Button text="게시글 작성" _onClick={addPost}></Button>}</Grid>
    </React.Fragment>
  )
}

export default PostWrite
