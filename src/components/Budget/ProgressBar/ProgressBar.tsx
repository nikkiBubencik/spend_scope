"use client";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartData,
  ChartOptions,
} from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale);

interface progressProps {
  value: number; 
}

export default function ProgressBar({ value }: progressProps) {
    const color = 
        value <=.8 ? 
            "rgba(49, 118, 14, 0.8)"
            : (value >= .95
                ? "rgba(233, 4, 4, 0.8)"
                : "rgba(255, 255, 0, 0.8)");
    
    const data: ChartData<"bar"> = {
        labels: [""],
        datasets: [
        {
            label: "Progress",
            data: [value],
            backgroundColor: color,
            stack: "total",
        },
        {
            label: "Remaining",
            data: [1 - value],
            backgroundColor: "rgba(200, 200, 200, 0.4)",
            stack: "total",
        },
        ],
    };

    const options: ChartOptions<"bar"> = {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false, 
        scales: {
        x: {
            stacked: true,
            max: 1,
            display: false,
        },
        y: {
            stacked: true,
            display: false,
        },
        },
        plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        },
    };

    return (
        <div style={{ height: "1.25rem", width: "100%" }}>
            <Bar data={data} options={options} />
        </div>
    );
}

