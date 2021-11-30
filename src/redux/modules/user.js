import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { setCookie, getCookie, deleteCookie } from '../../shared/Cookie'
import { auth } from '../../shared/firebase'
import firebase from 'firebase/compat/app'

//Actions
const LOG_OUT = 'LOG_OUT'
const GET_USER = 'GET_USER'
const SET_USER = 'SET_USER'

//Action Creaters
const logOut = createAction(LOG_OUT, (user) => ({ user }))
const getUser = createAction(GET_USER, (user) => ({ user }))
const setUser = createAction(SET_USER, (user) => ({ user }))

//InitialState
const initialState = {
  user: null,
  is_login: false,
}

const user_initial = {
  user_name: '213am',
}

//Middleware
const logInAction = (user) => {
  return function (dispatch, getState, { history }) {
    console.log(history)
    dispatch(setUser(user))
    history.push('/')
  }
}

const signupFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {
    auth
      .createUserWithEmailAndPassword(id, pwd)
      .then((user) => {
        console.log(user)

        auth.currentUser
          .updateProfile({
            displayName: user_name,
          })
          .then(() => {
            dispatch(setUser({ user_name: user_name, id: id, user_profile: '' }))
            history.push('/')
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message

        console.log(errorCode, errorMessage)
      })
  }
}

//Reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie('is_login', 'success')
        draft.user = action.payload.user
        draft.is_login = true
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie('is_login')
        draft.user = null
        draft.is_login = false
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
)

//Action Creater Export

const actionCreators = {
  logOut,
  getUser,
  logInAction,
  signupFB,
}

export { actionCreators }
