import React, {useState, useEffect} from "react";
import axios from 'axios'


export default function SurveyPage(props) {
  const [surveyQuestions, setSurveyQuestions] = useState([])

  async function getAllQuestions() {
    let questions = await axios.get(`/surveypage`)
    setSurveyQuestions(questions.data)
  }

  useEffect(() => {
    getAllQuestions()
  }, [])

  const mappedQuestions = surveyQuestions.map((question, id) => {
    return (
      <div key={id}>
        <h1>{question.question_text}</h1>
        <p>{question.example_text}</p>
      </div>
    );
  });

  return(
    <> 
    {mappedQuestions}
    </>
  )
}
