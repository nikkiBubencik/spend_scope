interface HYSAResult {
  amount: number;
  totalContributed: number;
  interest: number;
}

interface HYSAInput {
  initial: number;
  contribution: number;
  rate: number;
  freq: number;
  duration: number;
}

export default function calculateHYSA({ initial,  contribution, rate, freq, duration}: HYSAInput): HYSAResult {
  if (rate <= 0 || duration <= 0) {
    return {
      amount: initial,
      totalContributed: initial,
      interest: 0,
    };
  }

  const r = rate / 100;
  const n = freq;
  const t = duration;

  const initialGrowth =
    initial * Math.pow(1 + r / n, n * t);

  const contributionGrowth =
    contribution *
    ((Math.pow(1 + r / n, n * t) - 1) / (r / n));

  const amount = initialGrowth + contributionGrowth;
  const totalContributed = initial + contribution * n * t;

  return {
    amount,
    totalContributed,
    interest: amount - totalContributed,
  };
}
