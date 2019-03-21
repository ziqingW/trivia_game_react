import {
  takeEvery,
  call
} from 'redux-saga/effects'
import * as actions from '../actions'
import {
  toast
} from 'react-toastify'

function* apiErrorReceived(action) {
  yield call(toast.error,
    'Option unavailable, change numbers !', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })
}

function* watchApiError() {
  yield takeEvery(actions.API_ERROR, apiErrorReceived)
}

export default [watchApiError]
