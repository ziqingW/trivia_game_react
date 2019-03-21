import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Typography, Card, CardHeader, CardContent, withStyles, Button, Grid, Select, MenuItem, InputLabel, FormControl} from '@material-ui/core'
import * as actions from '../store/actions'

const styles = {
  card: {
    maxWidth: 400,
    backgroundColor: '#03a9f4',
  },
  subtitle: {
    fontSize: '1.2em',
    color: 'white',
    textAlign: 'center',
    textShadow: '1px 1px 1px black'
  },
  formLabel: {
    color: 'white'
  },
  formControl: {
    marginBottom: '0.8em'
  }
}

class Welcome extends Component {
  constructor (props) {
    super(props)
    this.state = {
      category: "",
      difficulty: "",
      amount: 10,
      clickable: false
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.category !== this.state.category || prevState.difficulty !== this.state.difficulty) {
    if (this.state.category && this.state.difficulty) {
      this.setState({
        clickable: true
        })
      }
    }
  }

  render () {
    const { classes } = this.props
    return (
        <Grid container direction="row" justify="center" alignItems="center" spacing={0} style={{ minHeight: '80vh' }}>
          <Card className={classes.card}>
            <CardHeader title="Welcome to the Trivia Game" />
              <CardContent>
                <Typography className={classes.subtitle} variant="display1" gutterBottom>Set up your game</Typography>
                  <br />
                <form autoComplete="off" >
                  <Grid container direction="column" justify="center" spacing={8}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="category" className={classes.formLabel}>Category</InputLabel>
                        <Select
                          value={this.state.category}
                          onChange={this.handleChange}
                          inputProps={{
                            name: 'category',
                          }}
                        >
                          <MenuItem value="">{""}</MenuItem>
                          <MenuItem value={9}>General Knowledge</MenuItem>
                          <MenuItem value={10}>Entertainment: Books</MenuItem>
                          <MenuItem value={11}>Entertainment: Film</MenuItem>
                          <MenuItem value={12}>Entertainment: Music</MenuItem>
                          <MenuItem value={14}>Entertainment: Television</MenuItem>
                          <MenuItem value={15}>Entertainment: Video Games</MenuItem>
                          <MenuItem value={16}>Entertainment: Board Games</MenuItem>
                          <MenuItem value={17}>Science & Nature</MenuItem>
                          <MenuItem value={18}>Science: Computers</MenuItem>
                          <MenuItem value={19}>Science: Mathematics</MenuItem>
                          <MenuItem value={20}>Mythology</MenuItem>
                          <MenuItem value={21}>Sports</MenuItem>
                          <MenuItem value={22}>Geography</MenuItem>
                          <MenuItem value={23}>History</MenuItem>
                          <MenuItem value={24}>Politics</MenuItem>
                          <MenuItem value={26}>Celebrities</MenuItem>
                          <MenuItem value={27}>Animals</MenuItem>
                        </Select>
                      </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="difficulty" className={classes.formLabel}>Difficulty</InputLabel>
                <Select
                  value={this.state.difficulty}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'difficulty',
                  }}
                >
                  <MenuItem value="">{""}</MenuItem>
                  <MenuItem value={"easy"}>Easy</MenuItem>
                  <MenuItem value={"medium"}>Medium</MenuItem>
                  <MenuItem value={"hard"}>Hard</MenuItem>
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="amount" className={classes.formLabel}>Question Numbers</InputLabel>
              <Select
                value={this.state.amount}
                onChange={this.handleChange}
                inputProps={{
                  name: 'amount',
                }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </form>
        <Grid container justify="center">
          {this.state.clickable? (<Button color="secondary" variant="contained" onClick={() => this.props.onSubmit(this.state.category, this.state.difficulty, this.state.amount)}>OK</Button>) : (<Button color="secondary" variant="contained" disabled>OK</Button>)}
        </Grid>
      </CardContent>
    </Card>
  </Grid>
    )
  }
}

const mapDispatch = dispatch => ({
  onSubmit: (category, difficulty, amount) => dispatch({
    type: actions.LOAD_QUIZ,
    category: category,
    difficulty: difficulty,
    amount: amount
  })
})

Welcome = withStyles(styles)(Welcome)
export default connect(null, mapDispatch)(Welcome)
