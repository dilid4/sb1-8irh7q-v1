import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ClientPerformanceChartProps {
  monthlyReturns: Record<string, number>;
}

const ClientPerformanceChart: React.FC<ClientPerformanceChartProps> = ({
  monthlyReturns
}) => {
  const months = Object.keys(monthlyReturns);
  const returns = Object.values(monthlyReturns);

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Monthly Returns (%)',
        data: returns,
        fill: false,
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Performance'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `${value}%`
        }
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Line data={data} options={options} />
    </div>
  );
};

export default ClientPerformanceChart;