import React from 'react'
import { Grid, Image, Text } from '../elements'

const Card = (props) => {
  const { image_url, user_name, post_id } = props

  return (
    <Grid padding="16px" bg="#ffffff" is_flex margin="10px 0px">
      <Grid width="auto" margin="0px 20px 0px 0px">
        <Image size={65} shape="square" image_url={image_url} />
      </Grid>
      <Grid>
        <Text>
          <b>{user_name}</b>님이 게시글에 댓글을 남겼습니다! ミ★
        </Text>
      </Grid>
    </Grid>
  )
}

Card.defaultProps = {
  image_url: '',
  user_name: '',
  post_id: null,
}

export default Card
