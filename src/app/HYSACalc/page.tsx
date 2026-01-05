"use client";
import { useMemo, useState } from "react";
import calculateHYSA from "@/components/Calculator/HYSACalc/calculateHYSA";

export default function HYSACalc() {
  const [initial, setInitial] = useState(0);
  const [contribution, setContribution] = useState(0);
  const [rate, setRate] = useState(0);
  const [freq, setFreq] = useState(12);
  const [duration, setDuration] = useState(0);

  const result = useMemo( () =>
    calculateHYSA({ initial, contribution, rate, freq, duration }),
    [initial, contribution, rate, freq, duration]
  );

  return (
    <div>
        <h2>HYSA calculator</h2>
        <form >
            <label htmlFor="initial">Initial Amount:</label>
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
            <input
                type="number"
                name="duration"
                value={duration}
                id="duration"
                onChange={(e) => setDuration(parseInt(e.target.value))}
                required
            />
        </form>
        <div className="totals_display">
            <p> Contribution Total:
                {result.totalContributed.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })}
            </p>
            <p> Interest Total:
                {result.interest.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })}
            </p>
            <p> Total:
                {result.amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })}
            </p>
        </div>
    </div>
  )
}
