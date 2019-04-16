import React, { useState, useEffect } from "react";
import axios from "axios";
import { withStyles, Paper, Button } from "@material-ui/core";
import { Radar } from "react-chartjs-2";

const styles = theme => {
  {
  }
};

function RadarChart(props) {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([0,0,0,0,0,0,0,0])

  const chart = {
    labels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"],
    datasets: [{
      data: data
    }]
  };

  useEffect(async () => {
    await getData();
  }, []);

  const getData = async () => {
    let res = await axios.get(`/surveyresults`);
    setData(res.data);
  };

  const test = () => {
    mappedData();
  };

  const mappedData = () => {
    let values = [[],[],[],[],[],[],[],[]]
    let mappedData = data.map((question, id) => {
      let {question_id, answer_val} = question
      console.log(question_id, answer_val)

    });
  };

  return (
    <>
      <Button onClick={test}>do the thing</Button>
      <Radar data={chartData} />
    </>
  );
}

export default withStyles(styles)(RadarChart);
