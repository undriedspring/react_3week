import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { firestore, storage } from '../../shared/firebase'
import moment from 'moment'
import { actionCreators as imageActions } from './image'

const SET_POST = 'SET_POST'
const ADD_POST = 'ADD_POST'

const setPost = createAction(SET_POST, (post_list) => ({ post_list }))
const addPost = createAction(ADD_POST, (post) => ({ post }))

const initialState = {
  list: [],
}

const initialPost = {
  //   id: 0,
  //   user_info: {
  //     user_name: '213am',
  //     user_profile: 'http://newsimg.hankookilbo.com/2019/04/29/201904291390027161_3.jpg',
  //   },
  image_url: 'http://newsimg.hankookilbo.com/2019/04/29/201904291390027161_3.jpg',
  contents: '',
  comment_cnt: 0,
  insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
}

const addPostFB = (contents = '') => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post')
    const _user = getState().user.user
    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    }
    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
    }

    const _image = getState().image.preview

    console.log(_image)
    console.log(typeof _image)
    const _upload = storage.ref(`images/${user_info.user_id}_${new Date().getTime()}`).putString(_image, 'data_url')

    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          console.log(url)

          return url
        })
        .then((url) => {
          postDB
            .add({ ...user_info, ..._post, image_url: url })
            .then((doc) => {
              let post = { user_info, ..._post, id: doc.id, image_url: url }
              dispatch(addPost(post))
              history.replace('/')

              dispatch(imageActions.setPreview(null))
            })
            .catch((err) => {
              window.alert('앗! 포스트 작성에 문제가 있어요!')
              console.log('post 작성에 실패했어요!', err)
            })
        })
        .catch((err) => {
          window.alert('앗! 이미지 업로드에 문제가 있어요!')
          console.log('앗! 이미지 업로드에 문제가 있어요!', err)
        })
    })
  }
}

const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post')

    postDB.get().then((docs) => {
      let post_list = []
      docs.forEach((doc) => {
        let _post = {
          id: doc.id,
          ...doc.data(),
        }

        let post = {
          id: doc.id,
          user_info: {
            user_name: _post.user_name,
            user_profile: _post.user_profile,
            user_id: _post.user_id,
          },
          image_url: _post.image_url,
          contents: _post.contents,
          comment_cnt: _post.comment_cnt,
          insert_dt: _post.insert_dt,
        }

        post_list.push(post)
      })

      dispatch(setPost(post_list))
    })
  }
}

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post)
      }),
  },
  initialState
)

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
}

export { actionCreators }
