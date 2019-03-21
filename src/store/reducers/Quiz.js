import * as actions from '../actions'

const initialState = {
  data: [],
  visibleItem: 0,
  end: false,
  result: 0,
  start: false,
  amount: 10
}

const startLoading = (state, action) => {
  return {
    ...state,
    amount: action.amount
  }
}

const quizDataReceived = (state, action) => {
  const data = action.data
  return {
    ...state,
    data,
    start: true
  }
}

const singleQuizSelected = (state, action) => {
  const visibleItem = state.visibleItem + 1
  if (visibleItem < state.amount) {
    return {
      ...state,
      visibleItem
    }
  } else {
    return {
      ...state,
      end: true
    }
  }
}

const calculateResults = (state, action) => {
  const result = state.result + 10
  return {
    ...state,
    result
  }
}

const replayGame = (state, action) => {
  return {
    data: [],
    visibleItem: 0,
    end: false,
    result: 0,
    start: false,
    amount: 10
  }
}

const handlers = {
  [actions.LOAD_QUIZ]: startLoading,
  [actions.QUIZ_DATA_RECEIVED]: quizDataReceived,
  [actions.SELECT_SINGLE_QUIZ]: singleQuizSelected,
  [actions.ADD_RESULTS]: calculateResults,
  [actions.REPLAY_GAME]: replayGame
}

export default (state = initialState, action) => {
  const handler = handlers[action.type]
  if (typeof handler === "undefined") {
    return state
  } else {
    return handler(state, action)
  }
}
