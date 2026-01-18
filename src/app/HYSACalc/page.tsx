"use client";
import { useMemo, useState } from "react";
import calculateHYSA from "@/components/Calculator/HYSACalc/calculateHYSA";
import CalcChart from "@/components/Calculator/CalcChart";
import { HYSAResult } from '@/types/CalculatorTypes';

interface CalcChart {
  interest: number;
  contributions: number;
  total: number
  label: string;
}

export default function HYSACalc() {
  const [initial, setInitial] = useState(0);
  const [contribution, setContribution] = useState(0);
  const [rate, setRate] = useState(0);
  const [freq, setFreq] = useState(12);
  const [duration, setDuration] = useState(0);

  const result: HYSAResult[] = useMemo( () =>
    calculateHYSA({ initial, contribution, rate, freq, duration }),
    [initial, contribution, rate, freq, duration]
  );

  const exampleData: CalcChart[] = [
    {label: "year 1", contributions: 50, interest: 5, total: 55},
    {label: "year 2", contributions: 150, interest: 50, total: 200},
    {label: "year 3", contributions: 450, interest: 75, total: 525},
    {label: "year 4", contributions: 500, interest: 125, total: 625}
  ];

  return (
    <div className="componentGroup">
        <h2>HYSA calculator</h2>
        <div className="calcContainer">
        <form >
            <label htmlFor="initial">Initial Amount:</label>
            <br/>
            <input
                type="number"
                name="initital"
                value={initial}
                id="initial"
                onChange={(e) => setInitial(parseFloat(e.target.value))}
                required
            />
            <br />
            <label htmlFor="contribution">contribution Amount:</label>
            <br/>
            <input
                type="number"
                name="contribution"
                value={contribution}
                id="contribution"
                onChange={(e) => setContribution(parseFloat(e.target.value))}
                required
            />
            <br />
            <label htmlFor="Rate">APY:</label>
            <br/>
            <input
                type="number"
                name="rate"
                value={rate}
                id="rate"
                onChange={(e) => setRate(parseFloat(e.target.value))}
                required
            />
            <br />
            <label htmlFor="duration">Duration(years):</label>
            <br/>
            <input
                type="number"
                name="duration"
                value={duration}
                id="duration"
                onChange={(e) => setDuration(parseInt(e.target.value))}
                required
            />
        </form>
        <CalcChart calcData={result} />
        {/* <ul>
        {result.map(data => <li key={data.year}>{JSON.stringify(data)}</li> )}
        </ul> */}
        <div className="totals_display">
            <p> <span className="important">Contribution Total: </span>
                {result[duration].totalContributed.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })}
            </p>
            <p><span className="important">Interest Total: </span>
                {result[duration].interest.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })}
            </p>
            <p> <span className="important">Combined Total: </span>
                {result[duration].amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })}
            </p>
        </div>
        </div>
    </div>
  )
}
