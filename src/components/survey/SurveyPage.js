import React, { useState, useEffect } from "react";
import axios from "axios";
import SurveyQuestion from "./SurveyQuestion";
import { withStyles, Paper } from "@material-ui/core";

const styles = theme => ({});

function SurveyPage(props) {
  const [surveyQuestions, setSurveyQuestions] = useState([]);
  const [answers, setAnswers] = useState({
    a0:0,
    a1:0,
    a2:0,
    a3:0,
    a4:0,
    a5:0,
    a6:0,
    a7:0,
  })

  async function getAllQuestions() {
    let questions = await axios.get(`/surveypage`);
    setSurveyQuestions(questions.data);
  }

  useEffect(() => {
    getAllQuestions();
  }, []);

  function answerValue(answer, val) {
    let answersCopy = answers
    answersCopy['a' + answer] = val
    setAnswers(answersCopy)
    console.log(answersCopy)
  }

  const mappedQuestions = surveyQuestions.map((question, id) => {
    return <SurveyQuestion question={question} id={id} answerValue={answerValue}/>;
  });

  return (
    <>
      <Paper>{mappedQuestions}</Paper>
    </>
  );
}

export default withStyles(styles)(SurveyPage);
