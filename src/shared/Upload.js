import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Text, Grid } from '../elements'
import { storage } from './firebase'
import { actionCreators as imageActions } from '../redux/modules/image'

const Upload = (props) => {
  const dispatch = useDispatch()
  const is_uploading = useSelector((state) => state.image.uploading)
  const fileInput = React.useRef()

  const selectFile = (e) => {
    console.log(fileInput.current.files[0])
    const reader = new FileReader()
    const file = fileInput.current.files[0]

    reader.readAsDataURL(file)
    reader.onloadend = () => {
      console.log(reader.result)
      dispatch(imageActions.setPreview(reader.result))
    }
  }
  const uploadFB = () => {
    let image = fileInput.current.files[0]
    dispatch(imageActions.uploadImageFB(image))
  }

  return (
    <React.Fragment>
      <Grid padding="10px">
        <Text size="20px">이미지 선택하기</Text>
        <input type="file" onChange={selectFile} ref={fileInput} disabled={is_uploading} />
        {/* <Button _onClick={uploadFB}>업로드 하기</Button> */}
      </Grid>
    </React.Fragment>
  )
}

export default Upload
