"use client";
import { useMemo, useState } from "react";
import calculateHYSA from "./calculateHYSA";

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
        <h2 style={{color:"black"}}>HYSA calculator</h2>
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
        </form>
    </div>
  )
}
