import { Transaction as MockTransaction } from '@/types/Transaction';

const localStorageMock = (function () {
    let store: { [key: string]: string } = {};

    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        clear: () => {
            store = {};
        },
        // We'll expose the internal store for inspection in tests
        _getStore: () => store,
    };
})();

// Replace the global localStorage with mock
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Import the functions we are testing
import {
    STORAGE_KEY,
    getTransactions,
    saveTransaction,
    getNextID
} from './transactionStorage';


// Example data for use in tests
const MOCK_TRANSACTION_1: MockTransaction = { id: 1, name: 'Salary', description: '', amount: 5000, date: '2025-10-01' , transactionType: 'income', expenseCategory: '' };
const MOCK_TRANSACTION_2: MockTransaction = { id: 2, name: 'Rent', description: '', amount: 1500, date: '2025-10-05' , transactionType: 'expense', expenseCategory: 'Housing'};
const INITIAL_DATA = {
    nextId: 3,
    transactions: [MOCK_TRANSACTION_1, MOCK_TRANSACTION_2]
};


describe('transactionStorage utilities', () => {


    beforeEach(() => {
        // Clear the mock storage before each test to ensure isolation
        localStorage.clear();
    });


    describe('getTransactions', () => {
       
        test('should return an empty array if no data exists in localStorage', () => {
            const transactions = getTransactions();
            expect(transactions).toEqual([]);
        });


        test('should return an empty array if data exists but is malformed', () => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ wrongKey: [] }));
            const transactions = getTransactions();
            expect(transactions).toEqual([]);
        });


        test('should correctly retrieve transactions from existing storage', () => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
            const transactions = getTransactions();
            expect(transactions).toEqual(INITIAL_DATA.transactions);
            expect(transactions.length).toBe(2);
        });
    });


    describe('saveTransaction', () => {
       
        test('should save the transactions array and preserve the existing nextId', () => {
            // 1. Arrange: Set up initial storage with an existing nextId
            localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
           
            // 2. Act: Create a new array and save it
            const newTransactions = [MOCK_TRANSACTION_1]; // Save only one
            saveTransaction(newTransactions as any); // Use 'any' because we're using MockTransaction
           
            // 3. Assert: Check what was saved to localStorage
            const storedData = JSON.parse(localStorage._getStore()[STORAGE_KEY]);


            // The transactions array should be the new one
            expect(storedData.transactions).toEqual(newTransactions);
            // The nextId should have been preserved from INITIAL_DATA (which was 3)
            expect(storedData.nextId).toBe(3);
        });
    });


    describe('getNextID', () => {


        test('should initialize storage and return 1 when storage is empty', () => {
            const nextId = getNextID();
           
            // Should return 1 for the first ID
            expect(nextId).toBe(1);


            // Check if storage was initialized
            const storedData = JSON.parse(localStorage._getStore()[STORAGE_KEY]);
           
            // The next ID should be set to 2 for the future
            expect(storedData.nextId).toBe(2);
            expect(storedData.transactions).toEqual([]);
        });


        test('should return the current nextId and increment it in storage', () => {
            // Arrange: Start with an existing ID of 5
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ nextId: 5, transactions: [] }));
           
            const nextId = getNextID();
           
            // Should return the starting ID (5)
            expect(nextId).toBe(5);


            // Check if the nextId was incremented to 6 in storage
            const storedData = JSON.parse(localStorage._getStore()[STORAGE_KEY]);
            expect(storedData.nextId).toBe(6);
        });
    });
});



