import { Transaction } from '@/utils/transactionStorage';

export interface SearchInterface {
    filter: keyof Transaction,
    value: string
}