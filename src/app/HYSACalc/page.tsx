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
        <p>PLACEHOLDER CALCULATOR CHART</p>
        <div className="totals_display">
            <p> <span className="important">Contribution Total: </span>
                {result.totalContributed.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })}
            </p>
            <p><span className="important">Interest Total: </span>
                {result.interest.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })}
            </p>
            <p> <span className="important">Combined Total: </span>
                {result.amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })}
            </p>
        </div>
        </div>
    </div>
  )
}
