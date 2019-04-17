import React, { useState, useEffect } from "react";
import {
  Paper,
  Button,
  Typography,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel
} from "@material-ui/core";
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';



const styles = theme => ({
  answers: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrap: {
    marginBottom: '-75px',
    paddingLeft: '25px',
    paddingRight: '25px',
    paddingTop: '17px',
    paddingbottom: '17px'

  }
})

function SurveyQuestion(props) {
  const { answerValue } = props;
  const [question, setQuestion] = useState({});
  const { classes } = props;

  function setQuestionOnState() {
    let question = props.question;
    setQuestion(question);
  }

  useEffect(() => {
    setQuestionOnState();
  });

  function answerChange(e) {
    answerValue(question.question_id, e.target.value)
  }


  return (

    <>
      <div style={{'margin-top': '75px'}}>
      </div>
        <div className={classes.wrap}>
          <Typography>{question.question_text}</Typography>
          <Typography>{question.example_text}</Typography>
          <FormControl component="fieldset">
            <RadioGroup name="answers" onChange={answerChange} className={classes.answers}>
              <FormControlLabel value="1" control={<Radio />} label="1" />
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="3" control={<Radio />} label="3" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
              <FormControlLabel value="5" control={<Radio />} label="5" />
              <FormControlLabel value="6" control={<Radio />} label="6" />
              <FormControlLabel value="7" control={<Radio />} label="7" />
              <FormControlLabel value="8" control={<Radio />} label="8" />
              <FormControlLabel value="9" control={<Radio />} label="9" />
              <FormControlLabel value="10" control={<Radio />} label="10" />
            </RadioGroup>
          </FormControl>
          <Divider variant="middle" />
        </div>
    </>
  );
}

SurveyQuestion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SurveyQuestion);
