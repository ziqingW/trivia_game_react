import React from 'react';
import createStore from './store'
import { Provider } from 'react-redux'
import Game from './components/Game'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const store = createStore()
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Game />
        <ToastContainer />
      </Provider>
    );
  }
}
