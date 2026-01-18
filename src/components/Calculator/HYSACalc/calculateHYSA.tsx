import { HYSAResult, HYSAInput } from '@/types/CalculatorTypes';

export default function calculateHYSA({ initial,  contribution, rate, freq, duration}: HYSAInput): HYSAResult[] {
  let current: HYSAResult = {
    amount: initial,
    totalContributed: initial,
    interest: 0,
    year: 0
    };
  let result: HYSAResult[] = [current];

  const r = rate / 100;
  const n = freq;
  // const t = duration;
  
  for(let year = 1; year <= duration; year++){  
    const contributionsThisYear = contribution * n;
    let amount: number;

    if (r === 0){
      amount = current.amount + contributionsThisYear;
    }
    else{
      const amountAfterInterest =
        current.amount * Math.pow(1 + r / n, n);

      amount =
        amountAfterInterest +
        contribution * ((Math.pow(1 + r / n, n) - 1) / (r / n));
    }
    const totalContributed =
      current.totalContributed + contributionsThisYear;

    current = {
      year,
      amount,
      totalContributed,
      interest: amount - totalContributed
    };

    result.push(current);
  }
  return result;
}
