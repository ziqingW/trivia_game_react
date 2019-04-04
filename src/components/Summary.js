import React, {Component} from 'react'
import {Grid, withStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core'
import {Check, Close, ExpandMore} from '@material-ui/icons'
import {connect} from 'react-redux'


const styles = {
  panel : {
    width: "85%",
    backgroundColor: "#eee",
    borderRadius: "5px",
    margin: "5px",
  },
}

class Summary extends Component {

  render() {
    const {data, corrections, classes} = this.props

    return(
      <Grid container justify="center" alignItems="center" style={{marginTop: "30px"}}>
      {data.map((quiz, i) => {
        const marker = (corrections[i] ? <Check style={{color: "green"}}/> : <Close style={{color: "red"}}/>)
        return (
          <ExpansionPanel key={i} className= {classes.panel}>
            <ExpansionPanelSummary style={{fontWeight: "500"}} expandIcon={<ExpandMore />}>
              {marker}
              Quiz {i+1}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{flexDirection: "column"}}>
              <p dangerouslySetInnerHTML={{__html: quiz.question}}/>
              <p style={{color: "green"}}>Correct answer:  {quiz.correct_answer}</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      })}

      </Grid>
    )
  }
}

const mapState = (state, ownProps) => {
  const {data, corrections} = state.quiz
  return {data, corrections}
}

Summary = withStyles(styles)(Summary)
export default connect(mapState)(Summary)
