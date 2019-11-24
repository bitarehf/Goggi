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
  time: string;
  reference: string;
  shortReference: string;
  paymentDetail: string;
  amount: number;
}

export interface MarketTransaction {
  id: number;
  personalId: string;
  time: string;
  rate: number;
  fee: number;
  coins: number;
  amount: number;
  txId: string;
  balance: number;
  type: TransactionType;
  status: TransactionStatus;
}

export enum TransactionType {
  Buy,
  Sell,
  Deposit,
  Withdrawal
}

export enum TransactionStatus {
  Completed,
  Pending,
  Rejected,
  Failed
}