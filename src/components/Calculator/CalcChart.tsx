"use client";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { HYSAResult as inputType} from '@/types/CalculatorTypes';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

interface CalcChartProps {
    calcData: inputType[];
}

export default function CalcChart({ calcData }: CalcChartProps) {

  const data: ChartData<"line"> = {
    labels: calcData.map((row: inputType) => row.year),
    datasets: [
      {
        label: "Total Contribution",
        data: calcData.map((row: inputType) => row.totalContributed),
        borderColor: "rgb(34, 197, 94)",
        tension: 0.3,
      },
      {
        label: "Total",
        data: calcData.map((row: inputType) => row.amount),
        borderColor: "rgb(59, 130, 246)",
        tension: 0.3,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: 300 }}>
      <Line data={data} options={options} />
    </div>
  );
}
