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

function SurveyQuestion(props) {
  const { answerValue, id } = props;
  const [question, setQuestion] = useState({});

  function setQuestionOnState() {
    let question = props.question;
    setQuestion(question);
  }

  useEffect(() => {
    setQuestionOnState();
  });

  function test(e) {
    answerValue(id, e.target.value)
  }


  return (
    <>
      <div>
        <Typography>{question.question_text}</Typography>
        <Typography>{question.example_text}</Typography>
        <FormControl component="fieldset">
          <RadioGroup name="answers" onChange={test}>
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

export default SurveyQuestion;
