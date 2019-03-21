import React, {Component} from 'react'
import { connect } from 'react-redux'
import Main from './Main'
import Welcome from './Welcome'

class Game extends Component {
  render() {
    const {start} = this.props
    if (start) {
      return <Main />
    }
    return <Welcome />
  }
}

const mapState = (state, ownProps) => {
  const {start} = state.quiz
  return {
    start
  }
}

export default connect(mapState)(Game)
