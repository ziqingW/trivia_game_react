import * as actions from '../actions'

const initialState = {
  data: [],
  visibleItem: 0,
  end: false,
  result: 0,
  start: false,
  amount: 10,
  corrections: {}
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
  state.corrections[state.visibleItem] = action.result
  const visibleItem = state.visibleItem + 1
  let result = (action.result ? (state.result+10) : (state.result))
  if (visibleItem < state.amount) {
    return {
      ...state,
      visibleItem,
      result
    }
  } else {
    return {
      ...state,
      result,
      end: true
    }
  }
}

const replayGame = (state, action) => {
  return {
    data: [],
    visibleItem: 0,
    end: false,
    result: 0,
    start: false,
    amount: 10,
    corrections: {}
  }
}

const handlers = {
  [actions.LOAD_QUIZ]: startLoading,
  [actions.QUIZ_DATA_RECEIVED]: quizDataReceived,
  [actions.SELECT_SINGLE_QUIZ]: singleQuizSelected,
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
