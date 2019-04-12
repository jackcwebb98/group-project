import React, { useState, useEffect } from "react";
import axios from "axios";
import SurveyQuestion from "./SurveyQuestion";
import { withStyles, Paper, Button } from "@material-ui/core";

const styles = theme => ({});

function SurveyPage(props) {
  const [surveyQuestions, setSurveyQuestions] = useState([]);
  const [answerArray, setAnswerArray] = useState([]);
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

  async function getAllQuestions() {
    let questions = await axios.get(`/surveypage`);
    setSurveyQuestions(questions.data);
  }

  useEffect(() => {
    getAllQuestions();
  }, []);

  function answerValue(answer, val) {
    let answersCopy = answers;
    answersCopy[answer] = val;
    setAnswers(answersCopy);
  }

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
  }

  const mappedQuestions = surveyQuestions.map((question, id) => {
    return (
      <SurveyQuestion question={question} key={id} answerValue={answerValue} />
    );
  });

   console.log(answerArray)
  return (
    <>
      <Button onClick={objectLoop}>click this shit yo</Button>
      <Paper>{mappedQuestions}</Paper>
    </>
  );
}

export default withStyles(styles)(SurveyPage);
