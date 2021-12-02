import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { firestore } from '../../shared/firebase'

const SET_POST = 'SET_POST'
const ADD_POST = 'ADD_POST'

const setPost = createAction(SET_POST, (post_list) => ({ post_list }))
const addPost = createAction(ADD_POST, (post) => ({ post }))

const initialState = {
  list: [],
}

const initialPost = {
  id: 0,
  user_info: {
    user_name: '213am',
    user_profile: 'http://newsimg.hankookilbo.com/2019/04/29/201904291390027161_3.jpg',
  },
  image_url: 'http://newsimg.hankookilbo.com/2019/04/29/201904291390027161_3.jpg',
  contents: '고양이네요!',
  comment_cnt: 10,
  insert_dt: '2021-11-30 10:00:00',
}

const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post')

    postDB.get().then((docs) => {
      let post_list = []
      docs.forEach((doc) => {
        let _post = doc.data()

        //['comment_cnt', 'contents', ...]
        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf('user_') !== -1) {
              return { ...acc, user_info: { ...acc.user_info, [cur]: _post[cur] } }
            }
            return { ...acc, [cur]: _post[cur] }
          },
          { id: doc.id, user_info: {} }
        )
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

    [ADD_POST]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
)

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
}

export { actionCreators }
