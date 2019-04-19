import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { withStyles, Button } from "@material-ui/core";
import axios from "axios";

const styles = theme => {
  {
  }
};

function LineChart(props) {
  const [chartData, setChartData] = useState([]);
  const [labelData, setLabelData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let res = await axios.get(`/linegraphresults`);
    console.log(res.data)
    
    stringCutter(res.data);
  };

  const stringCutter = async data => {
    let chartClone = [...chartData]
    let labelClone = [...labelData]
    await data.forEach((question, id) => {
      let date = question.date.substring(0,10);
      console.log(date)
      let avg = question.avg
      chartClone.push(avg)
      labelClone.push(date)
    });
    setChartData(chartClone)
    setLabelData(labelClone)
  };


 



  const data = {
    labels: labelData,
    datasets: [
      {
        label: "Avg Rating Per week",
        data: chartData
      }
    ]
  };

  const options = {
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            suggestedMin: 0,
            max: 10
          }
        }
      ]
    }
  };

  const test = () => {
    console.log(chartData, labelData)
  }

  return (
    <>
    <Button onClick={test}>test</Button>
      <Line data={data} options={options} />
    </>
  );
}

export default withStyles(styles)(LineChart);
