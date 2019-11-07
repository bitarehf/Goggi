import { Transaction } from './transaction';

export interface AccountData {
    id: string;
    withdrawalAddress: string;
    derivation: number;
    balance: number;
    transactions: Transaction[];
}