import React, { useState, useEffect } from "react";
import axios from "axios";
import SurveyQuestion from "./SurveyQuestion";
import { withStyles, Paper, Button } from "@material-ui/core";

const styles = theme => ({});

function SurveyPage(props) {
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
    let user_id = 1;
    let questionee_id = 2;
    await axios.post(`/surveysubmit`, {
      answerArray,
      user_id,
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
  };

  return (
    <>
      <Paper>{mappedQuestions}</Paper>
      <Button onClick={test}>click this shit yo</Button>
    </>
  );
}

export default withStyles(styles)(SurveyPage);
