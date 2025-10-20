import { Transaction } from "@/types/Transaction";

export interface SearchInterface {
    filter: keyof Transaction,
    value: string,
    endValye: string
}