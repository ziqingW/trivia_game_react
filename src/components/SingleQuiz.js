import React, { Component } from 'react'
import {Grid, withStyles, Card, CardContent} from '@material-ui/core'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

const styles = {
  card: {
    maxWidth: 400,
    backgroundColor: '#b3e5fc',
  },
  option: {
    backgroundColor: '#eee',
    padding: '0.8em',
    fontWeight: '600',
    color: '#424242',
    borderRadius: '8px'
  }
}

class SingleQuiz extends Component {

  handleChange = answer => {
    if (answer === this.props.correct_answer) {
      this.props.addResults()
    }
      this.props.selectSingleQuiz()
  }

  render () {
    const {data, classes} = this.props
    const correct_answer = data.correct_answer
    var answers = []
    const question = data.question
    if (data.type === "boolean") {
      answers = ["True", "False"]
      } else {
        const index = Math.floor(Math.random()*3)
        answers = Object.assign(answers, data.incorrect_answers)
        answers.splice(index, 0, correct_answer)
      }
    return (
      <Grid container direction="row" justify="center" alignItems="center" spacing={0} style={{ minHeight: '80vh' }}>
        <Card className={classes.card}>
          <CardContent>
            <h4 dangerouslySetInnerHTML={{__html: question}}/>
            <Grid container direction="column" justify="flex-start" >
              {answers.map((answer, j) => {
              return (<p className={classes.option} key={j} dangerouslySetInnerHTML={{__html: answer}} onClick={() => this.handleChange(answer)} />)
            })}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    )
  }

}

const mapDispatch = dispatch => ({
  selectSingleQuiz: () => dispatch({
    type: actions.SELECT_SINGLE_QUIZ,
  }),
  addResults: () => dispatch({
    type: actions.ADD_RESULTS,
  })
})

SingleQuiz = withStyles(styles)(SingleQuiz)
export default connect(null, mapDispatch)(SingleQuiz)
