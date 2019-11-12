export interface AccountData {
    id: string;
    withdrawalAddress: string;
    derivation: number;
    fee: number;
    balance: number;
    transactions: Transaction[];
    marketTransactions: MarketTransaction[];
}

export interface Transaction {
  id: number;
  personalId: string;
  date: string;
  reference: string;
  shortReference: string;
  paymentDetail: string;
  amount: number;
}

export interface MarketTransaction {
  id: number;
  personalId: string;
  date: string;
  rate: number;
  fee: number;
  coins: number;
  amount: number;
  txId: string;
  status: TransactionStatus;
}

export enum TransactionStatus {
  Completed,
  Pending,
  Rejected,
  Failed
}