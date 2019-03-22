import React, { Component } from 'react'
import { toast } from "react-toastify"
import {Grid, withStyles, Card, CardContent, Button} from '@material-ui/core'
import {Check, Close} from '@material-ui/icons'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

const styles = {
  card: {
    maxWidth: 400,
    backgroundColor: '#b3e5fc',
  },
  option: {
    '&:hover': {
      cursor: 'pointer',
      filter: 'brightness(110%)'
    },
    backgroundColor: '#eee',
    padding: '0.8em',
    fontWeight: '600',
    color: '#424242',
    borderRadius: '8px'
  }
}

class SingleQuiz extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentClicked: null,
      correct: null
    }
  }

  handleChange = (answer, index) => {
    const correct = (answer === this.props.correct_answer ? true : false)
    this.setState({
      currentClicked: index,
      correct: correct
    }, ()=> {
      const ToastCorrect = () => (
        <p><Check />It's Correct !</p>
      )
      const ToastWrong = () => (
        <p><Close />It's Incorrect !</p>
      )
      const toastStyle = { position: "top-center",
                          autoClose: 1500,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: true }
      if (this.state.correct) {
      toast.success(<ToastCorrect />, toastStyle)
    } else {
      toast.error(<ToastWrong />, toastStyle)
    }
  })
}

  setBackground = (answer, index) => {
    console.log(this.props.correct_answer)
    if (this.state.correct) {
      if (this.state.currentClicked === index) {
        return {backgroundColor : "#4caf50", color: 'white'}
      }
    } else if (this.state.correct === false){
        if (this.state.currentClicked === index) {
          return {backgroundColor: "#ef5350", color: 'white'}
        } else {
          if (answer === this.props.correct_answer) {
            return {backgroundColor : "#4caf50", color: 'white'}
          }
        }
      }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        currentClicked: null,
        correct: null
      })
    }
  }

  render () {

    const {data, classes} = this.props
    var answers = []
    const question = data.question
    if (data.type === "boolean") {
      answers = ["True", "False"]
      } else {
        answers = Object.assign([], data.all_answers)
      }
    return (
      <Grid container direction="row" justify="center" alignItems="center" spacing={0} style={{ minHeight: '80vh' }}>
        <Card className={classes.card}>
          <CardContent>
            <h4 style={{ marginTop: '3em' }} dangerouslySetInnerHTML={{__html: question}}/>
            <Grid container direction="column" justify="flex-start" >
              {answers.map((answer, j) => {
              return (
                <p className={classes.option} key={j} style={this.setBackground(answer, j)} dangerouslySetInnerHTML={{__html: answer}} onClick={
                  this.state.currentClicked === null ? (() => this.handleChange(answer,j)) : (()=>null)} />)
            })}
            </Grid>
            <Grid container justify="center">
              {this.state.currentClicked !== null ? (<Button color="primary" variant="contained" onClick={() => this.props.selectSingleQuiz(this.state.correct)}>Next</Button>) : null}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    )
  }
}

const mapDispatch = dispatch => ({
  selectSingleQuiz: result => dispatch({
    type: actions.SELECT_SINGLE_QUIZ,
    result: result,
  }),
})

SingleQuiz = withStyles(styles)(SingleQuiz)
export default connect(null, mapDispatch)(SingleQuiz)
