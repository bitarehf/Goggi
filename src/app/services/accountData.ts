export interface AccountData {
    id: string;
    withdrawalAddress: string;
    bankAccountNumber: string;
    derivation: number;
    fee: number;
    balance: number;
    transactions: Transaction[];
    marketTransactions: MarketTransaction[];
    knowYourCustomers: KnowYourCustomer[];
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

export interface KnowYourCustomer {
  id?: number;
  personalId?: string;
  occupation: string;
  originOfFunds: string;
  ownerOfFunds: boolean;
  time?: string;
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