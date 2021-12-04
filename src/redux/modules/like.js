import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { firestore } from '../../shared/firebase'
import firebase from 'firebase/compat/app'
import { actionCreators as postActions } from './post'
import 'moment'
import moment from 'moment'

const LIKE = 'LIKE'
const DISLIKE = 'DISLIKE'

const like = createAction(LIKE, (post_id, comment_list) => ({ post_id, comment_list }))
const disLike = createAction(DISLIKE, (post_id, comment) => ({ post_id, comment }))

const initialState = {
  list: {},
  is_loading: false,
}

const addLikeFB = (post_id, like) => {
  return function (dispatch, getState, { history }) {
    const likeDB = firestore.collection('like')
    const user_info = getState().user.user
    let like = {
      post_id: post_id,
      user_id: user_info.uid,
    }

    likeDB.add(like).then((doc) => {
      const postDB = firestore.collection('post')
      const post = getState().post.list.find((l) => l.id === post_id)

      const increment = firebase.firestore.FieldValue.increment(1)
      // increment(1) -> comment_cnt + 1

      like = { ...like, id: doc.id }
      postDB
        .doc(post_id)
        .update({ like_cnt: increment })
        .then((_post) => {
          dispatch(like(post_id, like))
        })
      if (post) {
        dispatch(postActions.editPost(post_id, { like_cnt: parseInt(post.like_cnt) + 1 }))
      }
    })
  }
}

const disLikeFB = (post_id, like) => {
  return function (dispatch, getState, { history }) {}
}

export default handleActions(
  {
    [DISLIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.comment_list
      }),
    [LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id].unshift(action.payload.comment)
      }),
  },
  initialState
)

const actionCreators = {
  addLikeFB,
}

export { actionCreators }
