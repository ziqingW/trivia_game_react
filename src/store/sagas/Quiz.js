import {
  takeEvery,
  call,
  put,
  cancel,
  all
} from 'redux-saga/effects'
import API from '../api'
import * as actions from '../actions'

function* watchLoadQuiz(action) {
  const {
    category,
    difficulty,
    amount
  } = action
  const {
    error,
    data
  } = yield call(
    API.loadQuiz,
    category,
    difficulty,
    amount
  )
  if (error) {
    yield put({
      type: actions.API_ERROR,
      code: error.code
    })
    yield cancel()
    return
  }
  yield put({
    type: actions.QUIZ_DATA_RECEIVED,
    data
  })
}

function* watchAppLoad() {
  yield all([
    takeEvery(actions.LOAD_QUIZ, watchLoadQuiz)
  ])
}

export default [watchAppLoad]
