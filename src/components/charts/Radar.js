import React, { useState, useEffect } from "react";
import axios from "axios";
import { withStyles, Paper, Button } from "@material-ui/core";
import { Radar } from "react-chartjs-2";

const styles = theme => {
  {
  }
};

function RadarChart(props) {
  const [chartData, setChartData] = useState([]);

  const chart = {
    labels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"],
    datasets: [
      {
        data: chartData
      }
    ]
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let res = await axios.get(`/surveyresults`);
    mappedData(res.data);
  };

  const mappedData = async data => {
    let fakeData = [0, 0, 0, 0, 0, 0, 0, 0];
    await data.forEach((question, id) => {
      let realId = question.question_id - 1;
      fakeData[realId] = question.avg;
    });
    setChartData(fakeData);
  };

  const test = async () => {
    console.log(chartData);
  };

  return (
    <>
      <Radar data={chart} />
    </>
  );
}

export default withStyles(styles)(RadarChart);
