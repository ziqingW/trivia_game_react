import React, { Component } from 'react'
import {Typography, Card, Grid, withStyles, LinearProgress, Button} from '@material-ui/core'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import SingleQuiz from './SingleQuiz'
import Summary from './Summary'

const styles = {
  card: {
    minWidth: 300,
    minHeight: 240,
    backgroundColor: '#03a9f4',
    padding: '1em'
  },
  subtitle: {
    fontSize: '1.2em',
    color: 'white',
    textAlign: 'center',
  },
  subtitle2: {
    fontSize: '2em',
    marginTop: '1.3em',
    color: '#d32f2f',
    textShadow: '1px 1px 1px white',
    textAlign: 'center'
  },
  result: {
    color: '#ffea00',
    fontSize: '1.2em',
    textShadow: '1px 1px 1px black'
  },
  replay: {
    marginTop: '2em',
  },
  button: {
    backgroundColor: '#00e676',
    fontWeight: 'bold',
    boxShadow: '2px 2px 3px black'
  }
}

class Main extends Component {

  render() {
    const {data, visibleItem, end, result, amount, classes} = this.props
      if (!data.length) {return <LinearProgress />}
      else if (!end) {
        const singleQuiz = data[visibleItem]
        const correct_answer = singleQuiz.correct_answer
        if (singleQuiz.type !== "boolean") {
          const index = Math.floor(Math.random()*3)
          const answers = Object.assign([], singleQuiz.incorrect_answers)
          answers.splice(index, 0, correct_answer)
          singleQuiz['all_answers'] = answers
        }
    return (
    <SingleQuiz data={singleQuiz} correct_answer={correct_answer}/>
  )
  } else {
  return (
    <Grid container direction="column" justify="center" alignItems="center" spacing={0} style={{ minHeight: '80vh' }}>
      <Card className={classes.card}>
        <Typography className={classes.subtitle} variant="display1" gutterBottom>Your've made <span className={classes.result}>{parseInt(result*100/(amount*10))}%</span> Correct !</Typography>
        <Typography variant="display1" gutterBottom className={classes.subtitle2}>Play it again ?</Typography>
        <Grid container justify='center' className={classes.replay}>
          <Button variant="contained" className={classes.button} onClick={this.props.replay}>Yes</Button>
        </Grid>
        <Summary />
      </Card>
    </Grid>
    )
  }
  }
}

const mapState = (state, ownProps) => {
  const {data, visibleItem, end, result, amount} = state.quiz
  return {
    data,
    visibleItem,
    end,
    result,
    amount
  }
}

const mapDispatch = dispatch => ({
  replay: () => dispatch({
    type: actions.REPLAY_GAME,
  })
})

Main = withStyles(styles)(Main)
export default connect(mapState, mapDispatch)(Main)
