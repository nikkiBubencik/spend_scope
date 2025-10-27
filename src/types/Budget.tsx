export const DAYS_OF_WEEK = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] as const;
type dow = typeof DAYS_OF_WEEK[number];

export type freqType = 'weekly' | 'monthly';

export interface Budget {
    id: number;
    name: string;
    description: string;
    limit: number;
    expenseCategory: string;
    startDate: string;
    endDate?: string;
    frequency: freqType;
    startsOn: number;
}