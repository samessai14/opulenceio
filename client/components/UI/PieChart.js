import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Be', 'Present', 'Above', 'All', 'Else'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 8],
      backgroundColor: ['#495867', '#577399', '#bdd5ea', '#f7f7ff', '#fe5f55'],
      borderColor: ['#495867', '#577399', '#bdd5ea', '#f7f7ff', '#fe5f55'],
      borderWidth: 1,
    },
  ],
};

export function PieChart() {
  return <Pie data={data} />;
}
