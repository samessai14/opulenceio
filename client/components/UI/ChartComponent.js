import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartComponent(props) {
  const ticker = props.active;

  const options = {
    // responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Price Action This Month : ${ticker}`,
      },
    },
    // maintainAspectRatio: false,
  };
  const labels = [];
  for (let i = 0; i < 21; i++) {
    labels.push('');
  }
  let asset;
  let priceData = [];
  if (ticker) {
    // console.log(ticker);
    props.portfolio.forEach((holding) => {
      if (holding.ticker === ticker) {
        asset = holding;
      }
    });
    console.log(asset.history);

    asset.history.forEach((el) => {
      if (el) {
        priceData.push(el.close);
      }
    });
    priceData = priceData.reverse();
  }

  const data = {
    labels,
    datasets: [
      {
        label: ticker,
        data: priceData,
        borderColor: '#577399',
        backgroundColor: '#fe605555',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
