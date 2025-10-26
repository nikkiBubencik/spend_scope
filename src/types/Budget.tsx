export const DAYS_OF_WEEK = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;
type dow = typeof DAYS_OF_WEEK[number] | '';

export interface Budget {
    id: number;
    name: string;
    description: string;
    limit: number;
    expenseCategory: string;
    startDate: string;
    endDate?: string;
    frequency: "weekly" | "monthly";
}