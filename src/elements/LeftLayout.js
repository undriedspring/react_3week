import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Text, Grid, Image } from './index'
import { useParams } from 'react-router'

const LeftLayout = (props) => {
  const dispatch = useDispatch()
  const is_login = useSelector((state) => state.user.is_login)
  const preview = useSelector((state) => state.image.preview)
  const post_list = useSelector((state) => state.post.list)

  // const be_equipped = !_post.contents || !preview ? (btn.disabled = 'disabled') : null

  const { history } = props

  const [contents, setContents] = React.useState()

  const changeContents = (e) => {
    setContents(e.target.value)
  }

  const {} = props

  return (
    <React.Fragment>
      <Grid is_flex>
        <Grid width="250px" padding="15px">
          {contents}
        </Grid>
        <Image shape="rectangle" src={preview ? preview : 'http://via.placeholder.com/400x300/FEC96C/000000'} />
      </Grid>
    </React.Fragment>
  )
}

LeftLayout.defaultProps = {}

export default LeftLayout
