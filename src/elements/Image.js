import React from 'react'
import styled from 'styled-components'

const Image = (props) => {
  const { shape, src, size } = props
  const styles = {
    src: src,
    size: size,
  }

  if (shape === 'circle') {
    return <ImageCircle {...styles}></ImageCircle>
  }
  if (shape === 'rectangle') {
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    )
  }
  return <React.Fragment></React.Fragment>
}

Image.defaultProps = {
  shpae: 'circle',
  src: 'http://newsimg.hankookilbo.com/2019/04/29/201904291390027161_3.jpg',
  size: 36,
}

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);

  background-image: url('${(props) => props.src}');
  background-size: cover;
  background-position: center;
  margin: 4px;
`

const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
`

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url('${(props) => props.src}');
  background-size: cover;
  width: 100%;
  height: 100%;
`

export default Image
