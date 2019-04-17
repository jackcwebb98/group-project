import React, { useState, useEffect } from "react";
import axios from "axios";
import SurveyQuestion from "./SurveyQuestion";
import { withStyles, Paper, Button } from "@material-ui/core";
import PropTypes from 'prop-types';


const styles = theme => ({
  button: {
    marginTop: '90px'
  },
  questionContainer: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(400 + theme.spacing.unit * 2 * 2)]: {
      width: 650,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  laper: {
  }
});

function SurveyPage(props) {
  const { classes } = props;
  const [surveyQuestions, setSurveyQuestions] = useState([]);
  const [answerArray, setAnswerArray] = useState([]);
  const [date, setDate] = useState("");
  const [answers, setAnswers] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0
  });

  useEffect(() => {
    getAllQuestions();
    dateCreator();
  }, []);

  const getAllQuestions = async () => {
    let questions = await axios.get(`/surveypage`);
    setSurveyQuestions(questions.data);
  };

  const answerValue = (answer, val) => {
    let answersCopy = answers;
    answersCopy[answer] = val;
    setAnswers(answersCopy);
    objectLoop();
  };

  const objectLoop = () => {
    let answerArrayCopy = [];
    Object.keys(answers).forEach(key => {
      let answer_id = key;
      let answer = { [answer_id]: answers[key] };
      if (answerArrayCopy.length < 8) {
        answerArrayCopy.push(answer);
      }
    });
    setAnswerArray(answerArrayCopy);
  };

  const dateCreator = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    setDate(today);
  };

  const submit = async () => {
    let questionee_id = props.match.params.id ;
    await axios.post(`/surveysubmit`, {
      answerArray,
      questionee_id,
      date
    });
  };

  const mappedQuestions = surveyQuestions.map((question, id) => {
    return (
      <SurveyQuestion question={question} key={id} answerValue={answerValue} />
    );
  });

  const test = () => {
    submit();
    props.history.push('/landing')
  };


  return (
    <>
      <div className={classes.questionContainer}>
        <Paper className={classes.laper}>{mappedQuestions}</Paper>
        <Button className={classes.button} onClick={test}>click this shit yo</Button>
      </div>
    </>
  );
}

SurveyPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SurveyPage);
