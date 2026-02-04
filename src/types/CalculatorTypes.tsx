export interface HYSAResult {
  amount: number;
  totalContributed: number;
  interest: number;
  year: number;
}

export interface HYSAInput {
  initial: number;
  contribution: number;
  rate: number;
  freq: number;
  duration: number;
}