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

    const currentResult = result[duration];
    if (!currentResult) return null;

    return (
        <div className="componentGroup">
            <h2>HYSA calculator</h2>
            <div className="calcContainer">
            <form >
                <label htmlFor="initial">Initial Amount:</label>
                <br/>
                <input
                    type="number"
                    name="initial"
                    value={initial}
                    id="initial"
                    min="0"
                    step=".01"
                    onChange={(e) => setInitial(parseFloat(e.target.value) || 0)}
                    required
                />
                <br />
                <label htmlFor="contribution">Contribution Amount:</label>
                <br/>
                <input
                    type="number"
                    name="contribution"
                    value={contribution}
                    id="contribution"
                    min="0"
                    step=".01"
                    onChange={(e) => setContribution(parseFloat(e.target.value)|| 0)}
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
                    min="0"
                    step=".01"
                    onChange={(e) => setRate(parseFloat(e.target.value)|| 0)}
                    required
                />
                <br />
                <label htmlFor="duration">Duration(years):</label>
                <br/>
                <input
                    type="number"
                    name="duration"
                    value={duration}
                    id="duration"min="0"
                    step="1"
                    onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                    required
                />
            </form>
            <CalcChart calcData={result} />

            <div className="totals_display">
                <p> <span className="important">Contribution Total: </span>
                    {currentResult.totalContributed.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    })}
                </p>
                <p><span className="important">Interest Total: </span>
                    {currentResult.interest.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    })}
                </p>
                <p> <span className="important">Combined Total: </span>
                    {currentResult.amount.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    })}
                </p>
            </div>
        </div>
    </div>
    )
}
