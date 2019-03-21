import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'
import quizReducer from './reducers/Quiz'

export default () => {
  const rootReducer = combineReducers({
    quiz: quizReducer
  })

  const composeEnhancers = composeWithDevTools({})
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = applyMiddleware(sagaMiddleware)
  const store = createStore(rootReducer, composeEnhancers(middlewares))
  sagas.forEach(sagaMiddleware.run)

  return store
}
