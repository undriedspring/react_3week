import React from 'react'
import { Button, Grid, Input, Text } from '../elements'
import { setCookie } from '../shared/Cookie'
import { useDispatch } from 'react-redux'
import { actionCreators as userActions } from '../redux/modules/user'

const Login = (props) => {
  const dispatch = useDispatch()

  const login = () => {
    dispatch(userActions.logInAction({ user_name: 'perl' }))
  }
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          로그인
        </Text>
        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요."
            _onChange={() => {
              console.log('아이디 입력했어!')
            }}
          />
        </Grid>
        <Grid padding="16px 0px">
          <Input
            label="패스워드"
            placeholder="패스워드 입력해주세요."
            _onChange={() => {
              console.log('패스워드 입력했어!')
            }}
          />
        </Grid>
        <Button
          text="로그인하기"
          _onClick={() => {
            login()
          }}
        ></Button>
      </Grid>
    </React.Fragment>
  )
}

export default Login
